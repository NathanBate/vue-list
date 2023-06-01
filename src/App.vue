
<template>
  <!-- wrapper -->
  <div class="nbvl-wrapper" :class="theme" style="position: relative;">

    <!-- search box, clear search, and action button -->
    <div style="display: flex; position:relative;">

      <!-- search box -->
      <div v-if="config.searchBar" class="nbvl-search-wrapper" style="width:100%; position: inherit;" :class="{ searchBarPaddingRight : config.hasOwnProperty('actionButton') }">
        <input id="nbSearchBox" class="nbvl-search-box" :placeholder="isMac === true ? 'Search &#8984; + k' : 'Search CTRL + k'" type="text" v-model="searchPhrase" />
        <div class="nbvl-clear-search" style="display:flex">
          <div v-if="searchPhrase.length > 0 && isMobile === false" style="display: flex; align-items: center; font-size: 8pt; padding-right:4px; color:gray">
            <span style="position: relative;">ESC</span>
          </div>
          <a v-if="searchPhrase.length > 0" @click="clearSearch">
            <svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 48 48" style="fill:gray;"><path d="M12.45 37.95 10.05 35.55 21.6 24 10.05 12.45 12.45 10.05 24 21.6 35.55 10.05 37.95 12.45 26.4 24 37.95 35.55 35.55 37.95 24 26.4Z"/></svg>
          </a>
        </div>
      </div>

      <!-- spacer -->
      <div v-if="config.searchBar || config.hasOwnProperty('actionButton')" class="nbvl-search-bar-spacer"></div>

      <!-- action button -->
      <Link v-if="config.hasOwnProperty('actionButton')" :href="config.actionButton.link" :inertia-links="inertiaLinks">
        <div class="nbvl-action-button">
          <span>
            {{ config.actionButton.label }}
          </span>
        </div>
      </Link>

    </div>
    <!-- END: search box, clear search, and action button -->

    <!-- Results Table -->
    <table v-if="listShowing" class="nbvl-table">

      <!-- Table Heading -->
      <thead v-if="config.showHeading">
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
      <!-- END: Table Heading -->

      <tbody>

        <!-- Table Rows -->
        <tr class="nbvl-table-rows" v-for="(item, rowIndex) in filteredItems" :key="'listItem-'+rowIndex">
          <td v-for="(column, columnIndex) in config.columns" :key="'header-'+columnIndex">

						<!-- Is this cell a button? -->
						<div v-if="column.hasOwnProperty('button') && item.hasOwnProperty(column.key)" style="display: inline-block">
							<div v-if="column.button === true">

								<Link
										v-if="item[column.key].hasOwnProperty('confirmText')"
										@click.prevent="$emit('vueListConfirm', item[column.key])"
										:target="item[column.key].hasOwnProperty('target') ? item[column.key].target : ''">
									<div class="nbvl-action-button" style="display: flex; flex-direction: column; justify-content: center;">
									<span>
										{{ item[column.key].label }}
									</span>
									</div>
								</Link>

								<Link
										v-else
										:href="item[column.key].link"
										:inertia-links="inertiaLinks"
										:target="item[column.key].hasOwnProperty('target') ? item[column.key].target : ''">
									<div class="nbvl-action-button" style="display: flex; flex-direction: column; justify-content: center;">


										<span>
											{{ item[column.key].label }}
										</span>
									</div>
								</Link>
							</div>
						</div>

						<!-- is this cell linkable? -->
            <Link v-else-if="config.rowLinkable" class="nbvl-table-cell-link" :href="item.link" :target="config.rowLinkTarget ? config.rowLinkTarget : ''" :inertia-links="inertiaLinks">
              <div style="padding: 14px; display: inline-block; width: 100%; color:black">
                {{ item[ config.columns[columnIndex].key ] }}
              </div>
            </Link>

						<!-- This is NOT a linkable cell -->
            <div v-else style="padding: 14px; display: inline-block; width: 100%; color:black">
              {{ item[ config.columns[columnIndex].key ] }}
            </div>

          </td>
        </tr><!-- END: Table Rows -->

        <!-- Table Footer -->
        <tr v-if="numberOfPages > 1" class="nbvl-table-footer" >
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
        <!-- END: Table Footer -->

      </tbody>
    </table>
    <!-- END: Results Table -->
  </div>
</template>

<script>
import { ref } from "vue";
import DemoData from "./demo/data";
import DemoConfig from "./demo/config";
import { detectMobile } from "vue-mobile-detection/src/components/VueMobileDetection.js"
import VueListLink from "./components/VueListLink.vue";

export default {
	name: "VueList",
  props: {
    listConfig: {
      type: Object,
      required: false,
      default: null,
    },
    listData: {
      type: Array,
      required: false,
      default: null
    },
    theme: {
      type: String,
      required: false,
      default: 'nbvl-craft-theme',
    },
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
      if (this.config.itemsPerPage == 0) {
        return 1
      } else {
        return Math.ceil(this.data.length / this.config.itemsPerPage)
      }
    },
    listShowing() {
      if (this.config.showList === true) {
        return true
      }
      if ((this.config.showList === false) && (this.searchPhrase.length > 3)) {
        return true
      } else {
        return false
      }
    },
    usingInertiaLinks() {
      return this.inertiaLinks
    },
    data() {
      return this.listData === null ? DemoData : this.listData
    }
  },
  data() {
    return {
			confirmText: '',
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

      if (! this.config.hasOwnProperty("showHeading")) {
        this.config.showHeading = true
      }

      if (! this.config.hasOwnProperty("showList")) {
        this.config.showList = true
      }

      if (! this.config.hasOwnProperty("searchBar")) {
        this.config.searchBar = true
      }

      if (! this.config.hasOwnProperty("rowLinkTarget")) {
        this.config.rowLinkTarget = ""
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
    this.listConfig === null ? this.config = DemoConfig : this.config = this.listConfig
    //this.listData === null ? this.data = this.data = ref(DemoData) : this.data = ref(this.listData)
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
div.searchBarPaddingRight {
	padding-right: 10px;
}
</style>
