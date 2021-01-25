<template>
    <div class="q-pa-sm">

      <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
          <q-breadcrumbs-el label="Schools" />
        </q-breadcrumbs>
      </div>

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
          >
            <!-- @keyup="keyUpFilter" 
            @keydown="keyDownFilter" -->
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

          <q-btn 
            square
            class="q-mr-md" 
            style="background-color: #546bfa" text-color="white" icon="add" 
            @click="showPopup" 
            no-caps
          >
            Add
          </q-btn>

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
                <div class="row justify-between items-center">

                  {{ props.row.name }} 
                  <q-btn 
                    @click.stop
                    icon="delete_forever"
                    color="red"
                    size=sm 
                    no-caps
                    round 
                  >
                    <q-tooltip 
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                      <strong>Delete</strong>
                    </q-tooltip>
                  </q-btn>

                </div>
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

        <dialog-draggable :width="500" :modelDialog="isShowPopup" :title="'Add New School'" @onHide="isShowPopup=false">
        
            <div class="q-pa-md">
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <q-input outlined v-model="school.name" label="School Name" />
                    </div>
                    <div class="col-md-12 q-mb-sm">
                        <q-input outlined v-model="school.url" label="URL" />
                    </div>
                    <div class="col-md-12 q-mb-sm">
                        <q-input outlined v-model="school.abbreviation" label="School Abbreviation" />
                    </div>
                    <div class="col-md-12">
                        <q-input outlined v-model="school.short_name" label="Short Name" />
                    </div>
                </div>
            </div>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn flat label="Add" color="primary" @click="addSchool"/>
            </q-card-actions>

        </dialog-draggable>

      </div>
    </div>
</template>


<script>

import axios from 'axios'
import config from '../../../config'
import dialogDraggable from '../../components/DialogDraggable'


export default {
  components: {
      dialogDraggable
  },
  data () {
    return {
      school: {
        name: '',
        url: '',
        abbreviation: '',
        short_name: ''
      },
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
      isShowPopup: false,
      filter: '',
    }
  },
  methods: {
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
        let schoolsArr = []
        for(let i=0; i<res.data.schools.length; i++) {
          let obj = {
            id: res.data.schools[i].id,
            name: res.data.schools[i].school_name
          }
          schoolsArr.push(obj)
        }
        this.data = schoolsArr
        this.loading = false
      })
    },
    changeRoute(id, name) {
      this.$router.push({
        path: '/Schools/' + id,
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
    showPopup() {
      this.isShowPopup = true
    },
    addSchool() {
        const conf = {
          method: 'POST',
          url: config.getSchools,
          headers: {
            Accept: 'application/json',
          },
          data: this.school
        }

        axios(conf).then(res => {

            let newSchool = { id: res.data.school[0].id, name: res.data.school[0].name }
            this.data.unshift(newSchool)

            this.$q.notify({
              message: 'School added!',
              type: 'positive',
            })

            this.isShowPopup = false
        })
    }
  },
  created() {
    this.getSchools(this.count, this.current)
  }

}
</script>