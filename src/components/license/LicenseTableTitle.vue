<template>


    <div class="q-gutter-sm">
      <q-card>
        <q-table
            :data="data"
            :columns="columns"
            :loading="loading"
            class="no-shadow overflow-auto my-sticky-column-table"
            row-key="id"
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
              @keyup="keyUpFilter" 
              @keydown="keyDownFilter"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

            <q-select
              @input="filterLicense"
              class="q-mr-md"
              style="min-width: 250px; max-width: 250px"
              dense
              outlines
              label="Campus"
              :options="campusOptions"
              v-model="filterCampusValue"
            >
              <template v-if="filterCampusValue" v-slot:append>
                <q-icon name="cancel" @click.stop="filterCampusValue = '', filterLicense()" class="cursor-pointer" />
              </template>
            </q-select>

            <q-select
              @input="filterLicense"
              class="q-mr-md"
              style="min-width: 200px; max-width: 200px"
              dense
              outlines
              label="Vendor"
              :options="optionsSupplier"
              v-model="filterVendor"
            >
              <template v-if="filterVendor" v-slot:append>
                <q-icon name="cancel" @click.stop="filterVendor = '', filterLicense()" class="cursor-pointer" />
              </template>
            </q-select>

            <q-select
              @input="filterLicense"
              class="q-mr-md"
              style="min-width: 150px; max-width: 150px"
              dense
              outlines
              label="Type"
              :options="statusOptions"
              v-model="filterStatus"
            >
              <template v-if="filterStatus" v-slot:append>
                <q-icon name="cancel" @click.stop="filterStatus = '', filterLicense()" class="cursor-pointer" />
              </template>
            </q-select>

              <q-btn square class="q-mr-md edx-add-btn" text-color="white" icon="add" 
              @click="openLicenseModal()" no-caps>Add</q-btn>

              <q-btn
                  round 
                  icon="mdi-file-excel-box"
                  size="10px"
                  class="edx-excel-btn" text-color="white"
                  no-caps
                  @click="exportTable" 
                />

                <q-btn
                    flat
                    round
                    dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    v-if="mode === 'list'"
                    class="q-px-sm"
                >
                    <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
                    >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
                    </q-tooltip>
                </q-btn>

                <div class="q-pa-sm q-gutter-sm">

                  <q-dialog v-model="confirm" persistent>
                    <q-card>
                      <q-card-section class="row items-center">
                        <span class="q-ml-sm"
                          >Are you sure to delete this item?</span
                        >
                      </q-card-section>

                      <q-card-actions align="right">
                        <q-btn
                          flat
                          label="No, thanks"
                          color="primary"
                          v-close-popup
                        />
                        <q-btn
                          label="Yes"
                          color="red"
                          v-close-popup
                          @click="deleteItem"
                        />
                      </q-card-actions>
                    </q-card>
                  </q-dialog>

                </div>

            </template>

            <!-- Table Body -->
            <template v-slot:body="props">
            
            <q-tr
                :props="props"
                class="cursor-pointer"
                @click="openEditLicensePopup(props.row)"
            >

                <!-- <q-td auto-width>
                    <q-btn
                        size="sm"
                        flat
                        color="black"
                        @click="props.expand = !props.expand"
                        :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
                    >
                    </q-btn>
                </q-td> -->

                <q-td key="qty" :props="props">
                    <div>{{ props.row.quantity }}</div>
                </q-td>

                <q-td
                    key="name"
                    :props="props"
                    style="white-space: initial;width: 350px; max-width: 350px;"
                >
                <span class="inline-span">{{ props.row.item_name }}</span>
                </q-td>

                
                <q-td
                    key="vendor"
                    :props="props"
                    style="white-space: initial;width: 350px; max-width: 350px;"
                >

                <span class="inline-span" v-if="props.row.suplier_uni">{{ props.row.suplier_uni.label }}</span>

               
                </q-td>

                <q-td
                    key="costPerLicense"
                    :props="props"
                >

                <div>$ {{ (props.row.item_cost) && (props.row.item_cost).toFixed(2) }}</div>

                </q-td>

                <q-td
                    key="totalCost"
                    :props="props"
                >
                    <div>$ {{ (parseFloat(props.row.quantity * props.row.item_cost)) && (parseFloat(props.row.quantity * props.row.item_cost)).toFixed(2) }}</div>

                </q-td>

                <q-td key="purchaseDate" :props="props">
                    <div>{{ props.row.purchase_date }}</div>
                    <!-- <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date color="edx-pagination" v-model="props.row.purchase_date" mask="MM-DD-YYYY" @input="detectChange(props.rowIndex)">
                        <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                        </div>
                        </q-date>
                    </q-popup-proxy> -->
                </q-td>

                <q-td key="expirationDate" :props="props">
                    <div>{{ props.row.expiration_date }}</div>
                    <!-- <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date color="edx-pagination" v-model="props.row.expiration_date" mask="MM-DD-YYYY" @input="detectChange(props.rowIndex)">
                        <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                        </div>
                        </q-date>
                    </q-popup-proxy> -->
                </q-td>

                <q-td key="status" :props="props">
                    <div v-if="props.row.status">
                      <q-icon v-if="props.row.status.id == 1" name="card_membership" class="edx-green">
                        <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{ props.row.status.label }}</strong>
                          </q-tooltip>
                      </q-icon>
                      <q-icon v-else name="dvr" class="edx-blue">
                        <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{ props.row.status.label }}</strong>
                          </q-tooltip>
                      </q-icon>
                    </div>
                </q-td>

                <q-td key="actions" :props="props" >
                    <q-fab 
                        padding="xs" 
                        @click.stop 
                        color="edx-action-btn" 
                        :icon="qFab" 
                        :active-icon="qFavOpen" 
                        direction="left"
                    >
                        
                        <q-fab-action
                            :icon="duplicateIcon"
                            color="edx-duplicate-btn" 
                            size=sm 
                            no-caps
                            round 
                            class="q-mr-sm"
                            @click="openDuplicatePopup(props.row)"
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Duplicate</strong>
                            </q-tooltip>
                        </q-fab-action>

                        <q-fab-action
                            :icon="deleteIcon"
                            color="edx-delete-btn" 
                            size=sm 
                            no-caps
                            round
                            @click="openDeleteModal(props.row)" 
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Delete</strong>
                            </q-tooltip>
                        </q-fab-action>

                    </q-fab>
                </q-td>

            </q-tr>

            <!-- <q-tr v-show="props.expand" :props="props" @click="copyRowData(props.rowIndex)" :class="{ 'bg-red-2' : props.row.changed }">
                <q-td colspan="100%">
                    <div class="q-mb-lg q-mt-md">
                        <div class="row">
                            <div class="col-md-4 q-mr-sm q-ml-sm">
                                <div class="text-subtitle2 q-mb-md">General Note</div>
                                
                                <q-input
                                    readonly 
                                    dense 
                                    outlined 
                                    type="textarea"
                                    v-model="props.row.note"
                                    />
                                    <q-popup-edit
                                    v-model="props.row.note"
                                    title="Notes"
                                    buttons
                                >
                                <q-input
                                    type="textarea"
                                    v-model="props.row.note"
                                    dense
                                    autofocus
                                    @input="detectChange(props.rowIndex)"
                                />
                                </q-popup-edit>
                            </div>
                        </div>
                    </div>
                </q-td>
            </q-tr> -->

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
      </q-card>


      <LicensePopup 
        :show="licensePopup"
        :data="editedItem" 
        :isEdit="addNew" 
        :isDuplicate="isDuplicate"
        :tab="tab"
        @togglePopup="togglePopup"
        @updateTableList="updateTableList"
      />
      
    </div>

</template>

<script>


import {exportFile} from 'quasar'
import axios from 'axios'
import config from '../../../config'
import ICONS from '../../../icons'

let oldObject = {}

let typingTimer
let doneTypingInterval = 500

import LicensePopup from './LicensePopup'

export default {
    name: 'License',
    props: {
        type: {
            required: true
        }
    },
    components: {
        LicensePopup
    },
  data() {
    return {
        licensePopup: false,
        statusOptions: [],

        filter: '',
        filterCategoryValue: '',
        filterCampusValue: '',
        filterVendor: '',
        filterCondition: '',
        filterStatus: '',
        campusOptions: [],



      schoolName: '',
      mode: 'list',
      tab: '1',
      pages: 1,
      pagination: { rowsPerPage: 10 },
      current: 1,
      count: 10,
      data: [
          {
            quantity: 111,
            foundedBy: 'foundedBy',
            name: 'name',
            vendor: 'Vendor',
            costPerLicense: 'costPerLicense',
            totalCost: 'totalCost',
            purchaseDate: 'purchaseDate',
            expirationDate: 'expirationDate',
            changed: false,
            showEditButton: true
          }
      ],
      tempDataX: [],
      columns: [
        {
          name: "qty",
          align: "left",
          label: "Qty",
          field: "qty",
          sortable: true
        },
                {
          name: "name",
          align: "left",
          label: "Name",
          field: "name",
          sortable: true
        },
        {
          name: "vendor",
          align: "left",
          label: "Vendor",
          field: "vendor",
          sortable: true
        },

        {
          name: "costPerLicense",
          align: "left",
          label: "Cost Per License",
          field: "costPerLicense",
          sortable: true
        },
        {
          name: "totalCost",
          align: "left",
          label: "Total Cost",
          field: "totalCost",
          sortable: true
        },
        {
          name: "purchaseDate",
          align: "left",
          label: "Date Of Purchase",
          field: "purchaseDate",
          sortable: true
        },
        {
          name: "expirationDate",
          align: "left",
          label: "Expiration Date",
          field: "expirationDate",
          sortable: true
        },
        {
          name: "status",
          align: "left",
          label: "Type",
          field: "status",
          sortable: true
        },
        {
          name: "actions",
          align: "left",
          label: "Actions",
          field: "actions",
          sortable: true
        },
      ],
      editedItem: {},

      loading: false,
      confirm: false,
      typeModel: '',
      optionsSchool: [],
      optionsSchoolForFilter: [],
      optionsAllocation: [
        { id: 1, label: 'Title I' },
        { id: 2, label: 'Title II' },
        { id: 3, label: 'Title III' },
        { id: 4, label: 'Title IV' },
        { id: 5, label: 'ESSER' },
        { id: 6, label: 'GEEP' }
      ],
      allocationSelected: this.tab == '1' && { id: 1, label: 'Title I' },
      optionsCategory: [],
      optionsCategoryForFilter: [],
      optionsSupplier: [],
      optionsSupplierForFilter: [],
      optionsIdentifier: [],
      optionsCondition: [],
      optionsStatus: [],
      typeModel: null,

      addNew: false,
      isDuplicate: false,

      rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
      onpremise: false,
      offpremise: false,
      disposed: false,
      lost: false,
      stolen: false,
      transfered: false,
      stored: false,
      date: '2020-06-06',
      statusChangeObject: {
      },
      statusChanged: false,
    }
  },
  methods: {
    togglePopup(val) {
      this.licensePopup = val
    },

    updateTableList() {
        this.getLicense(this.$route.params.id, this.count, this.current)
    },



      
    exportTable() {
      // naive encoding to csv format
      const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
          this.data.map(row => this.columns.map(col => wrapCsvValue(
              typeof col.field === 'function'
                  ? col.field(row)
                  : row[col.field === void 0 ? col.name : col.field],
              col.format
          )).join(','))
      ).join('\r\n')

      const status = exportFile(
          'table-export.csv',
          content,
          'text/csv'
      )

      if (status !== true) {
          this.$q.notify({
              message: 'Browser denied file download...',
              color: 'negative',
              icon: 'warning'
          })
      }
    },
    getLicense(id, limit, page) {

        this.loading = true

        const conf = {
            method: 'GET',
            url: config.getLicense + '/' + id + '/' + this.tab + '?limit=' + limit + '&page=' + page,
            headers: {
                Accept: 'application/json',
            }
        }

        axios(conf).then(res => {

            console.log('license', res.data)

            let data = res.data.license
            this.pages = res.data.pagesCount


            let finalData = this.parsingLicense(data)
            
            this.data = finalData
            this.tempDataX = finalData

            this.loading = false
            // console.log('this.datathis.data', this.data)
        });
    },

    parsingLicense(data) {
            for(let i=0; i<data.length; i++) {
              data[i].changed  = false
              data[i].showEditButton = true

              console.log(parseInt(data[i].allocation_type_id))

              switch(data[i].allocation_type_id) {
                case '1':
                  data[i].allocation_type_id_uni = { id: 1, label: 'Title I' }
                  break;
                case '2':
                  data[i].allocation_type_id_uni = { id: 2, label: 'Title II' }
                  break;
                case '3':
                  data[i].allocation_type_id_uni = { id: 3, label: 'Title III' }
                  break;
                case '4':
                  data[i].allocation_type_id_uni = { id: 4, label: 'Title IV' }
                  break;
                case '5':
                  data[i].allocation_type_id_uni = { id: 5, label: 'ESSER' }
                  break;
                case '6':
                  data[i].allocation_type_id_uni = { id: 6, label: 'GEEP' }
                  break;
              }

              if(data[i].supplier != null) {
                data[i].suplier_uni = {
                  id: data[i].supplier_id,
                  label: data[i].supplierName
                }
              }else {
                data[i].suplier_uni = {
                  id: 999,
                  label: 'N/A'
                }
              }

              data[i].is_subscription == 1 ? true : false
              data[i].supplier && ( data[i].inventory_supplier_uni = { id: data[i].supplier.id, label: data[i].supplier.company_name  })
              data[i].campus ? (data[i].campus_uni = { id: data[i].campus.id, label: data[i].campus.name  }) : (data[i].campus_uni = { id: null, label: 'N/A'  })
              data[i].status && (data[i].status = { id: data[i].status.id, label: data[i].status.name  })

            }
            console.log('license data = ',data)
            return data
    },

    getToday() {
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      return year + "-" + month + "-" + day;
    },
    openEditLicensePopup(data) {

        this.addNew = false
        this.isDuplicate = false
        this.editedItem = data
        this.licensePopup = true

    },
    openDuplicatePopup(data) {

        this.addNew = true
        this.isDuplicate = true

        this.editedItem = data
        this.licensePopup = true

    },
    openLicenseModal(data) {

        this.addNew = true
        this.isDuplicate = false

        this.editedItem = data
        this.licensePopup = true
    
    },

    // editInventory(index) {


    //   if(this.addNew) {

    //     let data = {

    //       school_id: this.$route.params.id,
    //       allocation_type_id: this.editedItem.allocation_type_id_uni.id,
    //       quantity: this.editedItem.quantity,
    //       item_name: this.editedItem.Item_name,
    //       item_cost: this.editedItem.item_cost,
    //       purchase_date: this.editedItem.purchase_date,
    //       supplier_id: this.editedItem.suplier_uni.id,
    //       note: this.editedItem.note,
    //       expiration_date: this.editedItem.purchase_date

    //     }

    //     const conf = {
    //       method: 'POST',
    //       url: config.getLicense,
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //       data: data
    //     }

    //     axios(conf)
    //       .then(res => {

    //         this.$q.notify({
    //           message: 'License Added successfully!',
    //           type: 'positive',
    //         })

    //         this.data[index].changed = false
    //         this.data[index].showEditButton = true

    //         this.data[index].id = res.data.licese[0].id
    //         this.data[index].add = false

    //         this.addNew = false

    //       })

    //   } 
    //   else {

    //       let id = this.editedItem.id

    //       let data = {

    //         school_id: this.$route.params.id,
    //         allocation_type_id: this.editedItem.allocation_type_id_uni.id,
    //         quantity: this.editedItem.quantity,
    //         item_name: this.editedItem.Item_name,
    //         item_cost: this.editedItem.item_cost,
    //         purchase_date: this.editedItem.purchase_date,
    //         supplier_id: this.editedItem.suplier_uni.id,
    //         note: this.editedItem.note,
    //         expiration_date: this.editedItem.purchase_date

    //       }
        

    //       const conf = {
    //         method: 'PUT',
    //         url: config.getLicense + '/' + id,
    //         headers: {
    //           Accept: 'application/json',
    //         },
    //         data: data
    //       }

    //       axios(conf).then(res => {

    //         this.$q.notify({
    //           message: 'License updated successfully!',
    //           type: 'positive',
    //         })

    //         let finalData = this.parsingLicense(res.data.licese)

    //         let _index = this.data.findIndex( item => item.id === finalData[0].id )
    //         this.data = Object.assign( [], this.data, { [_index]: finalData[0] } ) 
    //         this.statusChanged = false
            

    //       })
      
    //   }
      

    // },
    
    
    
    changePagination (val) {

      console.log('change pagination')
      this.current = val
      this.getLicense( this.$route.params.id, this.count, val )
    },
    changeRowsPerPage() {

      console.log('changeRowsPerPage')
      
      this.count = this.pagination.rowsPerPage
      this.current = 1

      this.getLicense( this.$route.params.id, this.count, this.current )

    },
    filterSupplier (val, update, abort) {
      update(() => {
        if(val) {
                  const needle = val.toLowerCase()
        this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
        }
      })
    },
    getAdditionalInfo(type) {
        const conf = {
            method: 'GET',
            url: config.getAdditionalInfoForInventory + '/' + type,
            headers: {
                Accept: 'application/json',
            }
        }
        axios(conf).then(res => {

            // Supplier
            let supplierArr = []
            for(let i=0; i<res.data.suppliers.length; i++) {
                if(i < 30) {
                  let obj = {
                    id: res.data.suppliers[i].id,
                    label: res.data.suppliers[i].company_name,
                    value: res.data.suppliers[i].id
                }
                supplierArr.push(obj)
                }
            }
            this.optionsSupplier = supplierArr
            this.optionsSupplierForFilter = supplierArr

        })
    },
    copyRowData(index) {
      oldObject = JSON.stringify(this.tempDataX[index])
    },
    detectChange(index) {

      this.editedItem = this.tempDataX[index]
      console.log('detectChange function', this.editedItem)

      let d = JSON.parse(oldObject)
      let f = JSON.stringify(this.data[index])
          f = JSON.parse(f)

      let status = _.isEqual(d, f)

      if(status) {
        this.data[index].changed = false
      }else {
        this.data[index].changed = true
      }


    },
    cancellChange(index) {

      if(this.addNew) {
        this.data.splice(0, 1)
        this.addNew = false
      } else {
        let d = JSON.parse(oldObject)
        Object.assign(this.data[index], d);
        this.data[index].changed = false
      }

    },
    openDeleteModal(item) {
      this.item = item
      this.confirm = true
    },
    deleteItem() {
      let item = this.item
      const conf = {
        method: 'DELETE',
        url: config.getLicense + '/' + item.id,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf)
      .then(res => {
        console.log('DELETE RES :', res)
        const index = this.data.indexOf(item)
        this.data.splice(index, 1)
          this.$q.notify({
            message: res.data,
            type: 'positive',
          })
      })

    },
    getStatus() {

            const conf = {
                method: 'GET',
                url: config.getLicenseStatus,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let status = []
                
                for(let i=0; i<res.data.status.length; i++) {
                    status.push({
                        id: res.data.status[i].id,
                        label: res.data.status[i].name || '',
                    })
                }
                this.statusOptions = status

            })
    },
                // Filter key events
    keyUpFilter() {
    console.log('Key up')
    clearTimeout(typingTimer);
    typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    },
    keyDownFilter() {
    console.log('Key down')
    clearTimeout(typingTimer);
    },
    doneTyping() {
    console.log('Typing done!')
    if(this.filter.length > 1 || this.filter.length == 0) {
        console.log('Send Request...')
        this.filterLicense()
    }
    },
    getCampusBySchoolId(id) {
            

            let arr = []
            const conf = {
                method: 'GET',
                url: config.getCampuses + id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let campuses = res.data[0].campus
                if(campuses.length) {
                    for(let i=0; i<campuses.length; i++) {
                        arr.push({
                            id: campuses[i].id,
                            label: campuses[i].name
                        })
                    }
                }
                
                this.campusOptions = arr
            })
        },
    filterLicense() {
      this.loading = true

        let uri = '?';

        if(this.filter != '') {
            uri += `search=${this.filter}&`
        }

        if(this.filterVendor != '') {
            uri += `supplier=${this.filterVendor.id}&`
        }

        if(this.filterStatus != '') {
            uri += `status=${this.filterStatus.id}&`
        }

        if(this.filterCampusValue != '') {
            uri += `campus=${this.filterCampusValue.id}&`
        }

        const conf = {
            method: 'GET',
            url: config.filterLicense + this.tab + '/' + this.$route.params.id + uri,
            headers: {
            Accept: 'application/json',
            }
        }

        axios(conf).then(res => {
            console.log('res', res)

            this.pages = res.data.pagesCount
            let data = res.data.license
            let filteredData = this.parsingLicense(data)

            this.data = filteredData
            this.tempDataX = filteredData

            this.loading = false
        });

    },
  },
  watch: {
  },
  created() {
    this.tab = parseInt(this.type)

    this.getLicense(this.$route.params.id, this.count, this.current)
    this.getAdditionalInfo(this.tab)
    this.getStatus()
    this.getCampusBySchoolId(this.$route.params.id)
  },
    computed: {
        // BUTTONS
        qFab() {
            return ICONS.qFab
        },
        qFavOpen() {
            return ICONS.qFabOpen
        },
        duplicateIcon() {
            return ICONS.duplicate
        },
        deleteIcon() {
            return ICONS.delete
        },
    }
}

</script>