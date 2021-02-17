<template>


    <div class="q-gutter-sm">
      <q-card>
        <q-table
            :data="data"
            :columns="columns"
            :loading="loading"
            class="no-shadow"
            row-key="id"
            :pagination.sync="pagination"
        >
            <!-- Loading -->
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>

            <!-- Table Header -->
            <template v-slot:top-right="props">

              <q-btn :disabled="addNew" square class="q-mr-md edx-bg-purple" text-color="white" icon="add" 
              @click="addNew = true, addNewRow()" no-caps>Add</q-btn>

              <q-btn
                icon-right="archive"
                label="Export to Excel"
                class="edx-bg-green" text-color="white"
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
                :class="{ 'bg-red-2' : props.row.changed }"
                @click="copyRowData(props.rowIndex)"
            >

                <q-td auto-width>
                    <q-btn
                        size="sm"
                        flat
                        color="black"
                        @click="props.expand = !props.expand"
                        :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
                    >
                    </q-btn>
                </q-td>

                <q-td key="qty" :props="props">
                    <div>{{ props.row.quantity }}</div>

                    <q-popup-edit v-model="props.row.quantity" title="Qty" buttons>
                        <q-input
                        type="text"
                        v-model="props.row.quantity"
                        dense
                        autofocus
                        @input="detectChange(props.rowIndex)"
                        />
                    </q-popup-edit>
                </q-td>

                <q-td
                    key="name"
                    :props="props"
                    style="white-space: initial;width: 350px; max-width: 350px;"
                >
                <span class="inline-span">{{ props.row.Item_name }}</span>

                <q-popup-edit
                    v-model="props.row.Item_name"
                    title="Name"
                    buttons
                >
                    <q-input
                        type="text"
                        v-model="props.row.Item_name"
                        dense
                        autofocus
                        @input="detectChange(props.rowIndex)"
                    />
                </q-popup-edit>
                </q-td>

                
                <q-td
                    key="vendor"
                    :props="props"
                    style="white-space: initial;width: 350px; max-width: 350px;"
                >

                <span class="inline-span" v-if="props.row.suplier_uni">{{ props.row.suplier_uni.label }}</span>

                <q-popup-edit 
                  v-model="props.row.suplier_uni"
                  title="Vendor" buttons>

                  <q-select  
                      use-input
                      hide-selected
                      fill-input
                      input-debounce="0"
                      @input="detectChange(props.rowIndex)"
                      v-model="props.row.suplier_uni" 
                      :options="optionsSupplier"
                      @filter="filterSupplier"
                      style="width: 350px; max-width: 350px; padding-bottom: 32px"
                  >
                    <template v-slot:no-option>
                      <q-item>
                        <q-item-section class="text-grey">
                          No results
                        </q-item-section>
                      </q-item>
                    </template>

                  </q-select>
                </q-popup-edit> 
                </q-td>

                <q-td
                    key="costPerLicense"
                    :props="props"
                >

                <div>$ {{ props.row.item_cost }}</div>

                <q-popup-edit
                    v-model="props.row.item_cost"
                    title="Name"
                    buttons
                >
                    <q-input
                        type="text"
                        v-model="props.row.item_cost"
                        dense
                        autofocus
                        @input="detectChange(props.rowIndex)"
                    />
                </q-popup-edit>
                </q-td>

                <q-td
                    key="totalCost"
                    :props="props"
                >
                    <div>$ {{ parseFloat(props.row.quantity * props.row.item_cost) }}</div>

                </q-td>

                <q-td key="purchaseDate" :props="props">
                    <div>{{ props.row.purchase_date }}</div>
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="props.row.purchase_date" mask="MM-DD-YYYY" @input="detectChange(props.rowIndex)">
                        <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                </q-td>

                <q-td key="expirationDate" :props="props">
                    <div>{{ props.row.expiration_date }}</div>
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="props.row.expiration_date" mask="MM-DD-YYYY" @input="detectChange(props.rowIndex)">
                        <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                </q-td>

                <q-td key="actions" :props="props" style="min-width: 132px">

                    <div v-if="props.row.changed">

                    <q-btn
                        @click="cancellChange(props.rowIndex)"
                        icon="cancel"
                text-color="white" 
                class="q-mr-sm edx-bg-orange"
                size=sm 
                no-caps
                round 
                    >
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                        <strong>Cancel</strong>
                        </q-tooltip>
                    </q-btn>
                    
                    <q-btn
                        @click="editInventory(props.rowIndex)"
                          text-color="white" 
                class="q-mr-sm edx-bg-green"
                icon="save"
                size=sm 
                no-caps
                round 
                    >
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                        <strong>Save</strong>
                        </q-tooltip>
                    </q-btn>

                    </div>

                    <div v-if="props.row.showEditButton && !props.row.changed">
                    <q-btn 
                        icon="delete_forever"
                    text-color="white" 
                    class="q-mr-sm edx-bg-red"
                    @click="openDeleteModal(props.row)" 
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

            <q-tr v-show="props.expand" :props="props" @click="copyRowData(props.rowIndex)" :class="{ 'bg-red-2' : props.row.changed }">
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
      </q-card>
    </div>

</template>

<script>


import {exportFile} from 'quasar'
import lodash from 'lodash'
import axios from 'axios'
import config from '../../../config'

let oldObject = {}
let typingTimer
let doneTypingInterval = 500

export default {
  name: 'License',
  data() {
    return {
      schoolName: '',
      mode: 'list',
      tab: '4',
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
          name: "toggle",
          style: 'width: 30px'
        },
        {
          name: "qty",
          align: "left",
          label: "Qty",
          field: "qty",
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
          name: "name",
          align: "left",
          label: "Name",
          field: "name",
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
            }
            return data
    },

    getToday() {
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      return year + "-" + month + "-" + day;
    },
        // Add new Row 
    addNewRow() {
      
      let date = this.getToday()

      const obj  = {
        quantity: 1,
        add: true,
        allocation_type_id_uni: {
          id: 1,
          label: 'Title I'      
        },
        Item_name: '',
        supplier_id: 1,
        item_cost: 0,
        total_cost: 0,
        purchase_date: date,
        expiration_date: date,
        notes: '',
        changed: true,
        showEditButton: false,
      }

      this.data.unshift(obj)
      this.editedItem = obj
    
    },
    editInventory(index) {

      if(this.addNew) {

        let data = {

          school_id: this.$route.params.id,
          allocation_type_id: this.editedItem.allocation_type_id_uni.id,
          quantity: this.editedItem.quantity,
          item_name: this.editedItem.Item_name,
          item_cost: this.editedItem.item_cost,
          purchase_date: this.editedItem.purchase_date,
          supplier_id: this.editedItem.suplier_uni.id,
          note: this.editedItem.note,
          expiration_date: this.editedItem.purchase_date

        }

        const conf = {
          method: 'POST',
          url: config.getLicense,
          headers: {
            Accept: 'application/json',
          },
          data: data
        }

        axios(conf)
          .then(res => {

            this.$q.notify({
              message: 'License Added successfully!',
              type: 'positive',
            })

            this.data[index].changed = false
            this.data[index].showEditButton = true

            this.data[index].id = res.data.licese[0].id
            this.data[index].add = false

            this.addNew = false

          })

      } 
      else {

          let id = this.editedItem.id

          let data = {

            school_id: this.$route.params.id,
            allocation_type_id: this.editedItem.allocation_type_id_uni.id,
            quantity: this.editedItem.quantity,
            item_name: this.editedItem.Item_name,
            item_cost: this.editedItem.item_cost,
            purchase_date: this.editedItem.purchase_date,
            supplier_id: this.editedItem.suplier_uni.id,
            note: this.editedItem.note,
            expiration_date: this.editedItem.purchase_date

          }
        

          const conf = {
            method: 'PUT',
            url: config.getLicense + '/' + id,
            headers: {
              Accept: 'application/json',
            },
            data: data
          }

          axios(conf).then(res => {

            this.$q.notify({
              message: 'License updated successfully!',
              type: 'positive',
            })

            let finalData = this.parsingLicense(res.data.licese)

            let _index = this.data.findIndex( item => item.id === finalData[0].id )
            this.data = Object.assign( [], this.data, { [_index]: finalData[0] } ) 
            this.statusChanged = false
            

          })
      
      }
      

    },
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
        const needle = val.toLowerCase()
        this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
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
                let obj = {
                    id: res.data.suppliers[i].id,
                    label: res.data.suppliers[i].short_name,
                    value: res.data.suppliers[i].id
                }
                supplierArr.push(obj)
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
    getLicenseBar(id) {
      const conf = {
        method: 'GET',
        url: config.getTotalLicense + id,
        headers: {
            Accept: 'application/json',
        }
      }
      axios(conf).then(res => {
          this.barInfo = res.data
          console.log('Bar info', this.barInfo)
      })
    },
  },
  watch: {
  },
  created() {
    this.getLicense(this.$route.params.id, this.count, this.current)
    this.getAdditionalInfo(this.tab)
  }
}

</script>