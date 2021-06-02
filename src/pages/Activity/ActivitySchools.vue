<template>
    <div class="q-pa-sm edx-background">

    <!-- <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Budget" />
        <q-breadcrumbs-el label="Professional Development" />
      </q-breadcrumbs>
    </div> -->

    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
      <div class="edx-header-parent">
        <span class="edx-header-text">Schools</span>
      </div>

      <q-table
        :data="data"
        :columns="columns"
        row-key="id" 
        :loading="loading"
        binary-state-sort
        :pagination.sync="pagination"
      >
        <!-- Loading -->
        <template v-slot:loading>
          <q-inner-loading showing color="primary" />
        </template>


        <!-- Table Header -->
        <template v-slot:top-right="props">

          <q-input
            class="q-mr-md"
            outlines
            dense
            v-model="filter"
            placeholder="Search"
            style="min-width: 250px; max-width: 250px"
            @keyup="keyUpFilter" 
            @keydown="keyDownFilter"
          >
            <!--  -->
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn
              flat
              round
              dense
              :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
              @click="props.toggleFullscreen"
              v-if="mode === 'list'" class="q-px-sm"
          >
              <q-tooltip
              :disable="$q.platform.is.mobile"
              v-close-popup
              >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
              </q-tooltip>
          </q-btn>
          
        </template>

        

        <!-- Table Body -->
        <template v-slot:body="props">
            <q-tr :props="props">

              <q-td key="name" class="cursor-pointer" :props="props" @click="changeRoute(props.row.id, props.row.name)">
                {{ props.row.name }} 
              </q-td>

            </q-tr>
        </template>

        <!-- Pagination -->
        <template v-slot:bottom class="justify-end">
          <div class="q-pa-md flex flex-center">
            <q-pagination
              v-model="current"
              :max-pages="6"
              :max="pages"
              :direction-links="true"
              @click="changePagination(current)"
              color="edx-pagination"
            >
            </q-pagination>

            <div class="row justify-center items-center">
              <span class="q-mr-md">Rows Per page</span>
              <q-select dense outlined 
                @input="changeRowsPerPage"
                v-model="pagination.rowsPerPage" 
                :options="rowsPerPageArr" 
              />
            </div>
            
          </div>
        </template>

      </q-table>

    </div>
  </div>
</template>


<script>

import axios from 'axios'
import config from '../../../config'
let typingTimer, doneTypingInterval = 500;

export default {

  data () {
    return {
      loading: true,
      pagination: { rowsPerPage: 10 },
      current: 1,
      count: 10,
      columns: [
        {
          name: "name",
          align: "left",
          label: "Name",
          field: "date",
          sortable: true
        },
      ],
      data: [
      ],
      rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
      mode: 'list',
      filter: '',
    }
  },
  methods: {
    schoolsParsing(data) {
        let schoolsArr = []
        for(let i=0; i<data.length; i++) {
          let obj = {
            id: data[i].id,
            name: data[i].school_name
          }
          schoolsArr.push(obj)
        }
        return schoolsArr
    },
    getSchools(limit, page) {

      const conf = {
        method: 'GET',
        url: config.getSchools + '?limit=' + limit + '&page=' + page,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        this.pages = res.data.pagesCount
        let data = res.data.schools

        let finalData = this.schoolsParsing(data)

        this.data = finalData
        this.loading = false

      })
    },


    changeRoute(id, name) {
      this.$router.push({
        path: '/Professional Development/' + id,
        query: { name }
      })
    },
    changePagination (val) {
      this.current = val
      this.getSchools(this.count, this.current)
    },
    changeRowsPerPage() {
      this.count = this.pagination.rowsPerPage
      this.current = 1
      this.getSchools(this.count, this.current)
    },


    filterSchools() {
      this.loading = true
      console.log('send request')

      const conf = {
        method: 'GET',
        url: config.filterSchool + this.filter,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        this.pages = res.data.pagesCount
        let data = res.data.schools

        let filteredData = this.schoolsParsing(data)

        this.data = filteredData
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      })


    },
    // Filter key events
    keyUpFilter() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    },
    keyDownFilter() {
      clearTimeout(typingTimer);
    },
    doneTyping() {
      if(this.filter.length > 1 || this.filter.length == 0) {
        this.filterSchools()
      }
    }
    

  },
  created() {
    this.getSchools(this.count, this.current)
  },
  computed: {
    routeTab() {
      if(this.$route.query.name) {
        return `${this.$route.query.name}`
      }else {
        let name = this.$route.path.substring(1);
        return name
      }
      
    }
  }

}
</script>