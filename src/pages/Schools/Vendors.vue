<template>
    <div class="q-pa-sm edx-background">

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Management" />
        <q-breadcrumbs-el label="Vendors" />
      </q-breadcrumbs>
    </div>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
      <div class="edx-header-parent">
        <span class="edx-header-text">Vendors</span>
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
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>

            <q-btn 
              square
              class="q-mr-md edx-add-btn" text-color="white" icon="add" 
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
                  <!-- <q-btn 
                      @click.stop="isShowDeletePopup=true, selectedVendor=props.row"
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
                    </q-btn> -->
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

        <dialog-draggable :width="500" :modelDialog="isShowPopup" :title="'Add New Vendor'" @onHide="isShowPopup=false">
        
            <div class="q-pa-md">
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <q-input outlined v-model="vendor.company_name" label="Company Name" />
                    </div>
                </div>
            </div>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn flat label="Add" color="primary" @click="addSupplier"/>
            </q-card-actions>

        </dialog-draggable>

        <q-dialog v-model="isShowDeletePopup" persistent>
          <q-card>
              <q-card-section class="row items-center">
              <span class="q-ml-sm">Are you sure to delete this Vendor?</span>
              </q-card-section>

              <q-card-actions align="right">
              <q-btn flat label="No, thanks" color="primary" v-close-popup />
              <q-btn label="Yes" color="red" v-close-popup @click="deleteVendor" />
              </q-card-actions>
          </q-card>
        </q-dialog>

    </div>
  </div>
</template>


<script>

import axios from 'axios'
import config from '../../../config'
import dialogDraggable from '../../components/DialogDraggable'

let typingTimer, doneTypingInterval = 500;

export default {




  components: {
      dialogDraggable
  },
  data () {
    return {
      vendor: {
        company_name: ''
      },
      selectedVendor: {},
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
      isShowDeletePopup: false,
      filter: '',
    }
  },
  methods: {
    supplierParsing(data) {
        let supplierArr = []
        for(let i=0; i<data.length; i++) {
          let obj = {
            id: data[i].id,
            name: data[i].company_name
          }
          supplierArr.push(obj)
        }
        return supplierArr
    },
    getSuppliers(limit, page) {

      const conf = {
        method: 'GET',
        url: config.getSuppliers + '?limit=' + limit + '&page=' + page,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        this.pages = res.data.pagesCount
        let data = res.data.supplier

        let finalData = this.supplierParsing(data)

        this.data = finalData
        this.loading = false

      })

    },
    changeRoute(id, name) {
      this.$router.push({
        path: '/Vendors/' + id,
        query: { name }
      })
    },
    changePagination (val) {
      this.current = val
      this.getSuppliers(this.count, this.current)
    },
    changeRowsPerPage() {
      this.count = this.pagination.rowsPerPage
      this.current = 1
      this.getSuppliers(this.count, this.current)
    },
    showPopup() {
      this.isShowPopup = true
    },
    filterVendors() {
      this.loading = true
      console.log('send request')

      const conf = {
        method: 'GET',
        url: config.filterSupplier + this.filter,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        this.pages = res.data.pagesCount
        let data = res.data.supplier

        let filteredData = this.supplierParsing(data)

        this.data = filteredData
        this.loading = false
      })
      .catch(err => {
        this.loading = false
      })
    },
    addSupplier() {
        const conf = {
          method: 'POST',
          url: config.getSuppliers,
          headers: {
            Accept: 'application/json',
          },
          data: this.vendor
        }

        axios(conf).then(res => {

            let newVendor = { id: res.data.supplier[0].id, name: res.data.supplier[0].short_name }
            this.data.unshift(newVendor)

            this.$q.notify({
              message: 'Vendor added!',
              type: 'positive',
            })

            this.isShowPopup = false

            let name = res.data.supplier[0].company_name

            this.$router.push({
              path: '/Vendors/' + res.data.supplier[0].id,
              query: { name }
            })

        })
    },
    deleteVendor() {

        const conf = {
            method: 'DELETE',
            url: config.getSuppliers + '/' + this.selectedVendor.id,
            headers: {
                Accept: 'application/json',
            }
        }

        axios(conf).then(res => {

          const index = this.data.indexOf(this.selectedVendor)
          this.data.splice(index, 1)

            this.$q.notify({
              message: res.data,
              type: 'positive',
            })
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
        this.filterVendors()
      }
    },
  },
  created() {
    this.getSuppliers(this.count, this.current)
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