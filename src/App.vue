
<template>
  <!-- wrapper -->
  <div class="nathanbate-vue-list-wrapper" :class="theme">

    <!-- search box, clear search, and action button -->
    <div style="display: flex;">
      <input id="nbSearchBox" class="nathanbate-vue-list-search-box" :placeholder="isMac === true ? 'Search &#8984; + k' : 'Search CTRL + k'" type="text" v-model="searchPhrase" />
      <div class="nathanbate-vue-list-clear-search" style="display:flex">
        <div v-if="searchPhrase.length > 0 && isMobile === false" style="font-size: 8pt; padding-top:6px; padding-right:4px; color:gray">ESC</div>
        <a v-if="searchPhrase.length > 0" @click="clearSearch">
          <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" style="fill:gray;"><path d="M12.45 37.95 10.05 35.55 21.6 24 10.05 12.45 12.45 10.05 24 21.6 35.55 10.05 37.95 12.45 26.4 24 37.95 35.55 35.55 37.95 24 26.4Z"/></svg>
        </a>
      </div>
      <div class="nathanbate-vue-list-search-bar-spacer"></div>
      <a class="nathanbate-vue-list-action-button" v-if="config.hasOwnProperty('actionButton')" :href="config.actionButton.link">{{ config.actionButton.label }}</a>
    </div>

    <!-- table -->
    <table class="nathanbate-list-table">

      <!-- Table Heading -->
      <th
          class="nathanbate-vue-list-table-heading"
          v-for="(column, index) in config.columns"
          :key="'header-'+index"
          :style="{'width':column.width}"
      >
        {{ column.label }}
      </th>

      <!-- Table Rows -->
      <tr class="nathanbate-vue-list-table-rows" v-for="(item, rowIndex) in filteredItems" :key="'listItem-'+rowIndex">
        <td v-for="(column, columnIndex) in config.columns" :key="'header-'+columnIndex">
          <a v-if="config.rowLinkable" :href="item.link" :target="config.hasOwnProperty('rowLinkTarget') ? config.rowLinkTarget : ''">
              {{ item[ config.columns[columnIndex].key ] }}
          </a>
          <div v-else>
            {{ item[ config.columns[columnIndex].key ] }}
          </div>
        </td>
      </tr>

      <!-- Table Footer -->
      <tr class="nathanbate-vue-list-table-footer" :colspan="config.columns.length">
        <td>
          <div class="nathanbate-list-pagination-buttons" style="display: flex;">
            <a @click="pageIndex !== 1 ? pageIndex=1 : '' " :style="{'text-decoration':pageIndex !== 1 ? 'underline' : 'none'}">First</a>
            <a @click="pageIndex !== 1 ? pageIndex=pageIndex-1 : ''" :style="{'text-decoration': pageIndex !== 1 ? 'underline' : 'none'}">Prev</a>
            <a @click="pageIndex !== numberOfPages ? pageIndex=pageIndex+1 :''" :style="{'text-decoration':pageIndex !== numberOfPages ? 'underline' : 'none'}">Next</a>
            <a @click="pageIndex !== numberOfPages ? pageIndex=numberOfPages :''" :style="{'text-decoration': pageIndex !== numberOfPages ? 'underline' : 'none'}">Last</a>
          </div>
        </td>
      </tr>

    </table>
  </div>
</template>

<script>
import DemoData from "./demo/data";
import DemoConfig from "./demo/config";
import { detectMobile } from "vue-mobile-detection/src/components/VueMobileDetection.js"

export default {
  props: {
    configProp: {
      type: Object,
      required: false,
      default: null,
    },
    dataProp: {
      type: Array,
      required: false,
      default: null
    },
    theme: {
      type: String,
      required: false,
      default: 'nathanbate-vue-list-classic-theme',
    }
  },
  computed: {
    filteredItems() {
      if (this.searchPhrase.length > 3) {
        return this.data.filter(item =>{
          let data = ""
          this.config.columns.forEach((column,index) => {
            if (column.search) {
              data = data + " " + item[column.key]
            } // if column search
          }) // this.config.columns.forEach
          item.searchData = data
          return item.searchData.toLocaleLowerCase().includes(this.searchPhrase.toLowerCase())
        }) // return this.data.filter
      } else {
        return this.currentPageElements()
      } // if this.searchPhrase.length
    }, // filteredItems
    numberOfPages() {
      return Math.ceil(this.data.length / this.config.itemsPerPage)
    },
  },
  data() {
    return {
      data: null,
      config: null,
      isMobile: detectMobile(),
      searchPhrase: '',
      isMac: '',
      styles: {
        rowPad: '',
        cellPad: '',
        cellGap: '',
      },
      pageIndex: 1,
    }
  },
  methods: {
    currentPageElements() {
      if (this.paginating() === false) {
        return this.data
      }
      let firstElement = this.pageIndex === 1 ? 0 : ((this.pageIndex * this.config.itemsPerPage)-this.config.itemsPerPage)
      let lastElement = firstElement + this.config.itemsPerPage-1
      if (lastElement > this.data.length-1) {
        lastElement = this.data.length-1
      }
      return this.data.filter((item, index) =>{
        if (index >= firstElement && index <= lastElement) {
          return item
        }
      })
    }, // currentpage elements
    paginating() {
      if (this.config.itemsPerPage === 0) {
        return false
      }
      if (this.searchPhrase.length > 3) {
        return false
      } else {
        return true
      }
    }, // paginating
    clearSearch() {
      this.searchPhrase = ''
    },
    initConfig() {
      this.config.columns.forEach((column, index, array) => {
        if (! column.hasOwnProperty("search")) {
          this.config.columns[index].search = false
        }
        if (! column.hasOwnProperty("width")) {
          this.config.columns[index].width = -1
        }
        if (! column.hasOwnProperty("link")) {
          this.config.columns[index].link = false
        }
      })
    },
  },
  created() {
    this.configProp === null ? this.config = DemoConfig : this.config = this.configProp
    this.dataProp === null ? this.data = DemoData : this.data = this.dataProp
    this.initConfig()

    let platform = navigator?.userAgentData?.platform || navigator?.platform || 'unknown'
    this.isMac = platform.toUpperCase().indexOf('MAC')>=0
  },
  mounted() {
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.searchPhrase = ""
      }
    })

    document.onkeydown = function(e) {
      if (e.key === "k" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        document.getElementById("nbSearchBox").focus()
      }
    };
  },
}
</script>

<style scoped>
@import "styles/classic.css";
@import "styles/sunrise.css";
</style>
