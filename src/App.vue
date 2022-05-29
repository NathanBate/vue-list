
<template>
  <div>
    <div><input type="text" v-model="searchPhrase" /> </div>
    <div class="nathanbate-list-header-row"
          :style="{'padding-top':rowPad,'padding-bottom':rowPad, 'gap':cellGap }"
          style="display: flex;">
      <span v-for="(column, index) in config.columns"
            :key="'header-'+index"
            style="display: inline-block;"
            :style="{ 'width': column.width === -1 ? 'auto' : column.width + 'rem',
              'padding-left':cellPad,'padding-right':cellPad}">
        {{ column.label }}
      </span>
    </div>
    <div class="nathanbate-list-data-rows">
      <div v-for="(item, rowIndex) in filteredItems"
            :key="'listItem-'+rowIndex"
            :style="{'padding-top':rowPad,'padding-bottom':rowPad, 'gap':cellGap }"
            style="display: flex">
        <span v-for="(column, columnIndex) in config.columns"
              :key="'header-'+columnIndex"
              style="display: inline-block;"
              :style="{'width': config.columns[columnIndex].width === -1 ? 'auto' : config.columns[columnIndex].width + 'rem',
                'padding-left':cellPad,'padding-right':cellPad}">
          <a v-if="column.link" :href="item.link">
            <span>{{ item[ config.columns[columnIndex].key ] }}</span>
          </a>
          <span v-else>{{ item[ config.columns[columnIndex].key ] }}</span>
        </span>
      </div>
    </div>
    <div class="nathanbate-list-pagination-buttons" style="display: flex;" :style="{'gap': cellGap}">
      <a v-if="pageIndex !== 1" @click="pageIndex=1">First</a>
      <a v-if="pageIndex !== 1" @click="pageIndex=pageIndex-1">Prev</a>
      <a v-if="pageIndex !== numberOfPages" @click="pageIndex=pageIndex+1">Next</a>
      <a v-if="pageIndex !== numberOfPages" @click="pageIndex=numberOfPages">Last</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['config', 'data'],
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
      searchPhrase: '',
      rowPad: '',
      cellPad: '',
      cellGap: '',
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
    },
  },
  created() {
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
    this.rowPad = this.config.rowPadding+'rem'
    this.cellPad = this.config.cellPadding+'rem'
    this.cellGap = this.config.cellGap+'rem'
  }
}
</script>
