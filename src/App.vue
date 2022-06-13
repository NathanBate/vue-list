
<template>
  <!-- wrapper -->
  <div class="nbvl-wrapper" :class="theme">

    <!-- search box, clear search, and action button -->
    <div style="display: flex;">
      <div class="nbvl-search-wrapper" style="width:100%; padding-right:10px; position: relative;">
        <input id="nbSearchBox" class="nbvl-search-box" :placeholder="isMac === true ? 'Search &#8984; + k' : 'Search CTRL + k'" type="text" v-model="searchPhrase" />
        <div class="nbvl-clear-search" style="display:flex">
          <div v-if="searchPhrase.length > 0 && isMobile === false" style="font-size: 8pt; padding-top:6px; padding-right:4px; color:gray">ESC</div>
          <a v-if="searchPhrase.length > 0" @click="clearSearch">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" style="fill:gray;"><path d="M12.45 37.95 10.05 35.55 21.6 24 10.05 12.45 12.45 10.05 24 21.6 35.55 10.05 37.95 12.45 26.4 24 37.95 35.55 35.55 37.95 24 26.4Z"/></svg>
          </a>
        </div>
      </div>
      <div class="nbvl-search-bar-spacer"></div>

      <!-- action button -->
      <Link v-if="config.hasOwnProperty('actionButton')" :href="config.actionButton.link">
        <div class="nbvl-action-button">{{ config.actionButton.label }}</div>
      </Link>
    </div>

    <!-- table -->
    <table class="nbvl-table">

      <!-- Table Heading -->
      <thead>
        <tr>
          <th
              class="nbvl-table-heading"
              v-for="(column, index) in config.columns"
              :key="'header-'+index"
              :style="{'width':column.width}"
          >
            {{ column.label }}
          </th>
        </tr>

      </thead>
    <tbody>
    <!-- Table Rows -->
    <tr class="nbvl-table-rows" v-for="(item, rowIndex) in filteredItems" :key="'listItem-'+rowIndex">
      <td v-for="(column, columnIndex) in config.columns" :key="'header-'+columnIndex">
        <Link v-if="config.rowLinkable" class="nbvl-table-cell-link" :href="item.link" :target="config.hasOwnProperty('rowLinkTarget') ? config.rowLinkTarget : ''">
          <div style="padding: 14px; display: inline-block; width: 100%; color:black">
            {{ item[ config.columns[columnIndex].key ] }}
          </div>
        </Link>
        <div v-else>
          {{ item[ config.columns[columnIndex].key ] }}
        </div>
      </td>
    </tr>

    <!-- Table Footer -->
    <tr class="nbvl-table-footer" >
      <td :colspan="config.columns.length">
        <div class="nathanbate-list-pagination-buttons">
          <a @click="pageIndex !== 1 ? pageIndex=1 : '' " :style="{'background-color':pageIndex !== 1 ? '#d8dde3' : '#f3f7fc'}">First</a>
          <a @click="pageIndex !== 1 ? pageIndex=pageIndex-1 : ''" :style="{'background-color': pageIndex !== 1 ? '#d8dde3' : '#f3f7fc'}">Prev</a>
          <span>{{ pageIndex }}</span>
          <a @click="pageIndex !== numberOfPages ? pageIndex=pageIndex+1 :''" :style="{'background-color':pageIndex !== numberOfPages ? '#d8dde3' : '#f3f7fc'}">Next</a>
          <a @click="pageIndex !== numberOfPages ? pageIndex=numberOfPages :''" :style="{'background-color': pageIndex !== numberOfPages ? '#d8dde3' : '#f3f7fc'}">Last</a>
        </div>
      </td>
    </tr>
    </tbody>

    </table>
  </div>
</template>

<script>
import DemoData from "./demo/data";
import DemoConfig from "./demo/config";
import { detectMobile } from "vue-mobile-detection/src/components/VueMobileDetection.js"
import VueListLink from "./components/VueListLink.vue";

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
      default: 'nbvl-craft-theme',
    }
  },
  components: {
    Link : VueListLink
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
      inertiaLinks: false,
      isMac: '',
      styles: {
        rowPad: '',
        cellPad: '',
        cellGap: '',
      },
      pageIndex: 1,
    }
  },
  provide() {
    return {
      inertiaLinks: this.inertiaLinks
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

      if (! this.config.hasOwnProperty("inertiaLinks")) {
        this.inertiaLinks = false
      } else {
        this.inertiaLinks = this.config.inertiaLinks
      }

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

    /**
     * See
     * https://erikmartinjordan.com/navigator-platform-deprecated-alternative
     * https://stackoverflow.com/questions/10527983/best-way-to-detect-mac-os-x-or-windows-computers-with-javascript-or-jquery
     */
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
@import "styles/craft.css";
@import "styles/sunrise.css";
</style>
