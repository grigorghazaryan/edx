<template>
  <q-page class="q-pa-sm edx-background">

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm">
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section
                side
                style="background-color: #fff"
                class="q-pa-lg q-mr-none text-white"
              >
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Cost</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder"
                  >$ {{ barInfo.totalCost }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">

      <div class="edx-header-parent">
        <span class="edx-header-text">{{ schoolName }}</span>
      </div>

      <q-card>

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="1" label="Title I" />
          <q-tab name="2" label="Title II" />
          <q-tab name="3" label="Title III" />
          <q-tab name="4" label="Title IV" />
          <q-tab name="5" label="ESSER" />
          <q-tab name="6" label="GEER" />
        
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated class="tab-panels-parent">

          <q-tab-panel name="1" class="q-p-sm">
            <InventoryTable :type="1" />
          </q-tab-panel>

          <q-tab-panel name="2" class="q-p-sm">
            <InventoryTable :type="2" />
          </q-tab-panel>

          <q-tab-panel name="3" class="q-p-sm">
            <InventoryTable :type="3" />
          </q-tab-panel>

          <q-tab-panel name="4" class="q-p-sm">
            <InventoryTable :type="4" />
          </q-tab-panel>

          <q-tab-panel name="5" class="q-p-sm">
            <InventoryTable :type="5" />
          </q-tab-panel>

          <q-tab-panel name="6" class="q-p-sm">
            <InventoryTable :type="6" />
          </q-tab-panel>

        </q-tab-panels>

      </q-card>
    </div>
    
  </q-page>
</template>

<script>

import {exportFile} from 'quasar'
import axios from 'axios'
import config from '../../../config'

import InventoryTable from '../../components/inventory/InventoryTable'


// let oldObject = {}
// let typingTimer
// let doneTypingInterval = 500

export default {
  name: 'Inventory',
  components: {
    InventoryTable
  },
  data() {
    return {
      schoolName: '',
      barInfo: {},
      // mode: 'list',
      tab: '1',
      // pages: 1,
      // pagination: { rowsPerPage: 10 },
      // current: 1,
      // count: 10,
      // data: [],
      // tempDataX: [],
      // columns: [
      //   {
      //     name: "toggle",
      //     style: 'width: 30px'
      //   },
      //   {
      //     name: "qty",
      //     align: "left",
      //     label: "Qty",
      //     field: "qty",
      //     sortable: true
      //   },
      //   {
      //     name: "category",
      //     align: "left",
      //     label: "Category",
      //     field: "category",
      //     sortable: true
      //   },
      //   {
      //     name: "itemName",
      //     align: "left",
      //     label: "Item Name",
      //     field: "itemName",
      //     sortable: true
      //   },
      //   {
      //     name: "vendor",
      //     align: "left",
      //     label: "Vendor",
      //     field: "vendor",
      //     sortable: true
      //   },
      //   {
      //     name: "costPerItem",
      //     align: "left",
      //     label: "Cost Per Item",
      //     field: "costPerItem",
      //     sortable: true
      //   },
      //   {
      //     name: "totalCost",
      //     align: "left",
      //     label: "Total Cost",
      //     field: "totalCost",
      //     sortable: true
      //   },
      //   {
      //     name: "dateOfPurchase",
      //     align: "left",
      //     label: "Date Of Purchase",
      //     field: "dateOfPurchase",
      //     sortable: true
      //   },
      //   {
      //     name: "condition",
      //     align: "left",
      //     label: "Condition",
      //     field: "condition",
      //     sortable: true
      //   },
      //   {
      //     name: "status",
      //     align: "left",
      //     label: "Status",
      //     field: "status",
      //     sortable: true
      //   },
      //   {
      //     name: "actions",
      //     align: "left",
      //     label: "Actions",
      //     field: "actions",
      //     sortable: true
      //   },
      // ],
      // editedItem: {},

      // filter: '',
      // filterCategoryValue: '',
      // filterVendor: '',
      // filterCondition: '',
      // filterStatus: '',

      // loading: true,
      // confirm: false,
      // typeModel: '',
      // optionsSchool: [],
      // optionsSchoolForFilter: [],
      // optionsAllocation: [
      //   { id: 1, label: 'Title I' },
      //   { id: 2, label: 'Title II' },
      //   { id: 3, label: 'Title III' },
      //   { id: 4, label: 'Title IV' },
      //   { id: 5, label: 'ESSER' },
      //   { id: 6, label: 'GEEP' }
      // ],
      // allocationSelected: this.tab == '1' && { id: 1, label: 'Title I' },
      // optionsCategory: [],
      // optionsCategoryForFilter: [],
      // optionsSupplier: [],
      // optionsSupplierForFilter: [],
      // optionsIdentifier: [],
      // optionsCondition: [],
      // optionsStatus: [],
      // typeModel: null,
      // addNew: false,
      // rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
      // onpremise: false,
      // offpremise: false,
      // disposed: false,
      // lost: false,
      // stolen: false,
      // transfered: false,
      // stored: false,
      // date: '2020-06-06',
      // statusChangeObject: {
        // quantity: '',
        // schoolToTransfer: null,
        // location: '',
        // locationWithinSchool: '',
        // note: '',
        // serial: '',
        // showUntil: '2020-06-06',

        // stickerRangeStart: '',
        // stickerRangeEnd: '',
        // newStickerId: '',
        // newSerial: '',
      // },
      // statusChanged: false,
    }
  },
  methods: {
    // openDeleteModal(item) {
    //   this.item = item
    //   this.confirm = true
    // },
    // deleteItem() {
    //   let item = this.item
    //   // const index = this.data.indexOf(item)
    //   // this.data.splice(index, 1)
    //   const conf = {
    //     method: 'DELETE',
    //     url: config.getInventory + item.id,
    //     headers: {
    //       Accept: 'application/json',
    //     }
    //   }

    //   axios(conf)
    //   .then(res => {
    //     console.log('DELETE RES :', res)
    //     const index = this.data.indexOf(item)
    //     this.data.splice(index, 1)
    //       this.$q.notify({
    //         message: res.data,
    //         type: 'positive',
    //       })
    //   })

    // },
    // filterType() {
    //   if(this.typeModel) {
    //     if(this.typeModel == 'Professional Development') {
    //       this.data = this.tempDataX.filter(a => a.type == 'PD');
    //     }else {
    //       this.data = this.tempDataX.filter(a => a.type == 'FE');
    //     }
    //   }else {
    //     this.data = this.tempDataX
    //   }
    // },
    // addEmptyRow() {
    //   let id = Math.floor(Math.random() * 100)

    //   let obj = {
    //     id: id,
    //     qt0: 0,
    //     categoryDescription: '',
    //     itemName: '' ,
    //     vendor: '',
    //     identifier: '',
    //     mpsId: 0,
    //     serial: parseInt((id * 8) / 4),
    //     costPerItem: 0,
    //     totalCost: 0,
    //     type: 'PD',
    //     dateOfPurchase: '24-11-2020',
    //     condition: '',
    //     location: '',
    //     classroomOrLocationWithinSchool: '',
    //     dateAndExplanationOfRemoval: '',
    //     status: '',
    //     notes: '',
    //     // changed: false,
    //     // showEditButton: true,
    //   }
    //   this.data.unshift(obj)
    // },
    // copyRowData(index) {
    //   oldObject = JSON.stringify(this.tempDataX[index])
    // },
    // copyRow(row, index) {
    //   oldObject = JSON.stringify(this.tempDataX[index])
    //   // oldObject = JSON.stringify(row)
    //   // console.log('tempDataX', JSON.stringify(this.data[index]))
    //   // let old = JSON.stringify(this.data[index])

    //   // let newData = this.data[index]
    //   // newData.id =  Math.floor(Math.random() * 50)
    //   // newData.changed = true
    //   // let ddd = JSON.stringify(newData)
    //   // console.log('new data', JSON.stringify(newData))

    //   // let i = index+1

    //   // this.data.splice(i, 0, JSON.parse(ddd));

    //   // Object.assign(this.data[index], JSON.parse(old));
    // },
    // detectChange(index) {

    //   this.editedItem = this.tempDataX[index]
    //   console.log('detectChange function', this.editedItem)

    //   let d = JSON.parse(oldObject)
    //   let f = JSON.stringify(this.data[index])
    //       f = JSON.parse(f)

    //   let status = _.isEqual(d, f)

    //   if(status) {
    //     this.data[index].changed = false
    //   }else {
    //     this.data[index].changed = true
    //   }


    // },
    // changeStatus(index) {

    //   this.editedItem = this.data[index]
    //   this.statusChangeObject = {
    //     quantity: this.editedItem.quantity,
    //     schoolToTransfer: null,
    //     location: '',
    //     locationWithinSchool: '',
    //     note: '',
    //     serial: '',
    //     showUntil: '',
    //     stickerRangeStart: '',
    //     stickerRangeEnd: '',
    //     newSerial: '',
    //   }

    //   this.getSchools();

    //   this.statusChangeObject.serial = this.editedItem.serial_number
    //   console.log('change status', this.data[index].status_uni)
      
    //   if(this.data[index].status_uni.label == 'On Premise') {

    //     this.onpremise = true
    //     this.statusChangeObject.location = this.$route.query.name
    //     if (this.editedItem.quantity <= 1) {
    //       this.statusChangeObject.locationWithinSchool = ''
    //     }
        
    //   }
    //   else if(this.data[index].status_uni.label == 'Off Premise') {
    //     this.offpremise = true      
    //     this.statusChangeObject.location = 'Off Premise'
    //     if (this.editedItem.quantity <= 1) {
    //       this.statusChangeObject.locationWithinSchool = ''
    //     }

    //   }
    //   else if(this.data[index].status_uni.label == 'Disposed') {
    //     this.disposed = true
    //     this.statusChangeObject.location = 'Disposed'   
    //     if (this.editedItem.quantity <= 1) {
    //       this.statusChangeObject.locationWithinSchool = ''
    //     }    
    //   }
    //   else if(this.data[index].status_uni.label == 'Lost') {

    //     this.lost = true    
    //     this.statusChangeObject.location = 'Lost'
    //     if (this.editedItem.quantity <= 1) {
    //       this.statusChangeObject.locationWithinSchool = ''
    //     }

    //   }
    //   else if(this.data[index].status_uni.label == 'Stolen') {
    //     this.stolen = true     
    //     this.statusChangeObject.location = 'Stolen'
    //     if (this.editedItem.quantity <= 1) {
    //       this.statusChangeObject.locationWithinSchool = ''
    //     }  
    //   }
    //   else if(this.data[index].status_uni.label == 'Transfered') {
    //     this.transfered = true     
    //     this.statusChangeObject.location = 'Transfered'

    //     switch(this.tab) {
    //       case '1':
    //         this.allocationSelected = this.optionsAllocation[0]
    //         break;
    //       case '2':
    //         this.allocationSelected = this.optionsAllocation[1]
    //         break;
    //       case '3':
    //         this.allocationSelected = this.optionsAllocation[2]
    //         break;
    //       case '4':
    //         this.allocationSelected = this.optionsAllocation[3]
    //         break;
    //       case '5':
    //         this.allocationSelected = this.optionsAllocation[4]
    //         break;
    //       case '6':
    //         this.allocationSelected = this.optionsAllocation[5]
    //         break;
    //     }

    //     if (this.editedItem.quantity <= 1) {
          
    //       this.statusChangeObject.locationWithinSchool = ''
    //     }  
    //   }
    //   else {
    //     this.stored = true
    //     this.statusChangeObject.location = 'Stored'
    //     if (this.editedItem.quantity <= 1) {
          
    //       this.statusChangeObject.locationWithinSchool = ''
    //     }
    //   }

    // },
    // cancellChange(index) {

    //   if(this.addNew) {
    //     this.data.splice(0, 1)
    //     this.addNew = false
    //   } else {
    //     let d = JSON.parse(oldObject)
    //     Object.assign(this.data[index], d);
    //     this.data[index].changed = false
    //   }

    // },
    // cancelStatus() {
    //   console.log('cancel status')

    //   let d = JSON.parse(oldObject)
    //   console.log(d)
    //   let index = this.data.findIndex( item => item.id === d.id )
    //   console.log('old', index)

    //   this.data[index].status_uni = d.status_uni
    //   this.statusChanged = false

    // },
    // exportTable() {
    //   // naive encoding to csv format
    //   const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
    //       this.data.map(row => this.columns.map(col => wrapCsvValue(
    //           typeof col.field === 'function'
    //               ? col.field(row)
    //               : row[col.field === void 0 ? col.name : col.field],
    //           col.format
    //       )).join(','))
    //   ).join('\r\n')

    //   const status = exportFile(
    //       'table-export.csv',
    //       content,
    //       'text/csv'
    //   )

    //   if (status !== true) {
    //       this.$q.notify({
    //           message: 'Browser denied file download...',
    //           color: 'negative',
    //           icon: 'warning'
    //       })
    //   }
    // },
    // closePopup() {
    //   this.onpremise = false
    //   this.offpremise = false
    //   this.disposed = false
    //   this.lost = false
    //   this.stolen = false
    //   this.transfered = false
    //   this.stored = false
    // },

    // Filter key events
    // keyUpFilter() {
    //   console.log('Key up')
    //   clearTimeout(typingTimer);
    //   typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    // },
    // keyDownFilter() {
    //   console.log('Key down')
    //   clearTimeout(typingTimer);
    // },
    // doneTyping() {
    //   console.log('Typing done!')
    //   if(this.filter.length > 1 || this.filter.length == 0) {
    //     console.log('Send Request...')
    //     this.filterInventory()
    //   }
    // },

    // changePagination (val) {

    //   console.log('change pagination')
    //   this.current = val
    //   this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, val )
    // },
    // changeRowsPerPage() {

    //   console.log('changeRowsPerPage')
      
    //   this.count = this.pagination.rowsPerPage
    //   this.current = 1

    //   this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )

    // },
    // identifierCheckQuantity(index) {

    //   this.editedItem = this.tempDataX[index]
    //   let i = this.optionsIdentifier.findIndex( item => item.id == 5 )
    //   let indexSticker = this.optionsIdentifier.findIndex( item => item.id == 2 )

    //   if(this.editedItem.quantity <= 1) {
    //     this.optionsIdentifier[i].disable = true
    //     this.optionsIdentifier[indexSticker].disable = false
    //   } else {
    //     this.optionsIdentifier[i].disable = false
    //     this.optionsIdentifier[indexSticker].disable = true
    //   }

    // },

    // filterCategory (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.optionsCategory = this.optionsCategoryForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    // filterSupplier (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
    //   })
    // },
    // filterSchool (val, update, abort) {
    //   update(() => {
    //     const needle = val.toLowerCase()
    //     this.optionsSchool = this.optionsSchoolForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
    //   })
    // },


    // getToday() {
    //   let dateObj = new Date();
    //   let month = dateObj.getUTCMonth() + 1; //months from 1-12
    //   let day = dateObj.getUTCDate();
    //   let year = dateObj.getUTCFullYear();

    //   return year + "-" + month + "-" + day;
    // },
    // // Add new Row 
    // addNewRow() {
      
    //   let date = this.getToday()

    //   const obj  = {
    //     quantity: 1,
    //     add: true,
    //     inventory_category_uni: {
    //       id: 1,
    //       label: 'Comprehension'        
    //     },
    //     item_name: '',
    //     inventory_supplier_uni: {
    //       id: 10001,
    //       label: 'A CHANCE TO GROW'       
    //     },
    //     item_cost: 0,
    //     purchase_date: date,
    //     condition:  {
    //       id: 1,
    //       label: 'Excelent'
    //     },
    //     status_uni: {
    //       id: 1,
    //       label: 'On Premise'
    //     },
    //     identification_uni: {
    //       id: 1,
    //       label: 'Stamp'
    //     },
    //     district_assigned_id: 0,
    //     serial_number: 0,
    //     location: '',
    //     location_information_note: '',
    //     transition_information_note: '',
    //     notes: '',
    //     changed: true,
    //     showEditButton: false,
    //   }

    //   this.data.unshift(obj)
    //   this.editedItem = obj
    
    // },
    // confirmStatusChanges() {

    //   this.statusChanged = true
    //   this.closePopup()

    // },
    // checkQuantity(quantity, index) {

    //   if(quantity < 1) {
    //     let i = this.optionsIdentifier.findIndex( item => item.id == 5 )

    //     if(this.editedItem.quantity <= 1) {
    //       this.optionsIdentifier[i].disable = true
    //     } else {
    //       this.optionsIdentifier[i].disable = false
    //     }

    //     this.data[index].identification_uni = this.optionsIdentifier[0]
    //   }

    //   if(this.data[index].identification_uni.id == 5 && this.editedItem.quantity <= 1) {
    //     this.$q.notify({
    //       message: 'When Identifier status equals Sticker Range you can not change quality 1! /t asdasd',
    //       type: 'negative',
    //       color: 'yellow',
    //       textColor: 'black'
    //     })
    //     this.data[index].identification_uni = this.optionsIdentifier[0]
    //   }
    // },

    // allocationParsing(data) {
    //   for(let i=0; i<data.length; i++) {

    //     // Inventory
    //     if(data[i].inventory_category != null) {
    //       let obj = {
    //         id: data[i].inventory_category.id,
    //         label: data[i].inventory_category.category_name,
    //         value: data[i].inventory_category.id
    //       }
    //       data[i].inventory_category_uni = obj
    //     }
    //     else {
    //       data[i].inventory_category_uni = {
    //         id: 0,
    //         label: 'N/A',
    //         value: 0
    //       }
    //     }


    //     // Suplier
    //     if(data[i].inventory_supplier != null) {

    //       let objSuplier = {
    //         id: data[i].inventory_supplier.id,
    //         label: data[i].inventory_supplier.short_name,
    //         value: data[i].inventory_supplier.id
    //       }

    //       data[i].inventory_supplier_uni = objSuplier
    //     }else {
    //       data[i].inventory_supplier_uni = {
    //         id: 0,
    //         label: 'N/A'       
    //       }
    //     }

    //     // Condition
    //     let conditionObj = {
    //       id: data[i].condition_id,
    //       label: data[i].condition
    //     }
    //     data[i].condition = conditionObj
        
    //     // Status
    //     let statusId = data[i].status
    //     let statusName = ''

    //     switch(statusId) {
    //       case 1:
    //         statusName = "On Premise"
    //         break;
    //       case 2:
    //         statusName = "Off Premise"
    //         break;
    //       case 3:
    //         statusName = "Disposed"
    //         break;
    //       case 4:
    //         statusName = "Lost"
    //         break;
    //       case 5:
    //         statusName = "Stolen"
    //         break;
    //       case 6:
    //         statusName = "Transfered"
    //         break;
    //       case 7:
    //         statusName = "Stored"
    //         break;
    //       default:
    //         break;
    //     }

    //     let statusObj = {
    //       id: data[i].condition_id,
    //       label: statusName
    //     }
    //     data[i].status_uni = statusObj

    //     // Identification
    //     let identificationObj = {
    //       id: data[i].identification_id,
    //       label: data[i].identification
    //     }
    //     data[i].identification_uni = identificationObj

    //     data[i].changed = false
    //     data[i].showEditButton = true
    //   }

    //   console.log('DATA ==============', data)
    //   return data
    // },

    // // Requests
    getAllocationBar(type, id) {
        const conf = {
          method: 'GET',
          url: config.getInventoryTotalCost + type + '/' + id,
          headers: {
              Accept: 'application/json',
          }
        }
        axios(conf).then(res => {
            this.barInfo = res.data
            console.log('Bar info', this.barInfo)
        })
    },
    // getInventoryByType(type, id, limit, page) {
    //     this.loading = true

    //     const conf = {
    //         method: 'GET',
    //         url: config.getInventory + type + '/' + id + '?limit=' + limit + '&page=' + page,
    //         headers: {
    //             Accept: 'application/json',
    //         }
    //     }

    //     axios(conf).then(res => {

    //         console.log('grigor ghazaryan', res.data)
    //         let data = res.data.inventory
    //         this.pages = res.data.pagesCount

    //         // Allocation parsing function here
    //         let finalResult = this.allocationParsing(data)
            
    //         this.data = finalResult
    //         this.tempDataX = finalResult

    //         this.loading = false
    //         console.log('this.datathis.data', this.data)
    //     });
    // },
    // getAdditionalInfo(type) {
    //     const conf = {
    //         method: 'GET',
    //         url: config.getAdditionalInfoForInventory + '/' + type,
    //         headers: {
    //             Accept: 'application/json',
    //         }
    //     }
    //     axios(conf).then(res => {

    //         console.log('getAdditionalInfoForInventory', res.data)

    //         let conditionsArr = []
    //         for(let i=0; i<res.data.conditions.length; i++) {
    //             let obj = {
    //                 id: res.data.conditions[i].id,
    //                 label: res.data.conditions[i].condition_name
    //             }
    //             conditionsArr.push(obj)
    //         }
    //         this.optionsCondition = conditionsArr
    //         console.log('CONDITION ARR =',this.optionsCondition  )


    //         // Status
    //         let statusArr = []
    //         for(let i=0; i<res.data.status.length; i++) {
    //             let obj = {
    //                 id: res.data.status[i].id,
    //                 label: res.data.status[i].status_name
    //             }
    //             statusArr.push(obj)
    //         }
    //         this.optionsStatus = statusArr


    //         // Category
    //         let categoryArr = []
    //         for(let i=0; i<res.data.categories.length; i++) {
    //             let obj = {
    //                 id: res.data.categories[i].id,
    //                 label: res.data.categories[i].category_name,
    //                 value: res.data.categories[i].id
    //             }
    //             categoryArr.push(obj)
    //         }
    //         this.optionsCategory = categoryArr
    //         this.optionsCategoryForFilter = categoryArr


    //         // Supplier
    //         let supplierArr = []
    //         for(let i=0; i<res.data.suppliers.length; i++) {
    //             let obj = {
    //                 id: res.data.suppliers[i].id,
    //                 label: res.data.suppliers[i].short_name,
    //                 value: res.data.suppliers[i].id
    //             }
    //             supplierArr.push(obj)
    //         }
    //         this.optionsSupplier = supplierArr
    //         this.optionsSupplierForFilter = supplierArr

    //         // Identifications
    //         let identArr = []
    //         for(let i=0; i<res.data.identifications.length; i++) {
    //             let obj = {
    //                 id: res.data.identifications[i].id,
    //                 label: res.data.identifications[i].identifcation_name
    //             }
    //             identArr.push(obj)
    //         }
    //         this.optionsIdentifier = identArr

    //         console.log('4444444444444444444',this.optionsSupplier)


    //     })
    // },
    // editInventory(index) {

    //   const updateData = {
    //     school_id: this.editedItem.school_id,
    //     allocation_type_id: parseInt(this.editedItem.allocation_type_id),
    //     quantity:  this.editedItem.quantity,
    //     inventory_category_type_id:  this.editedItem.inventory_category_uni.id,
    //     item_name: this.editedItem.item_name,
    //     supplier_id: this.editedItem.inventory_supplier_uni.id,
    //     item_cost: this.editedItem.item_cost,
    //     inventory_condition_type_id: this.editedItem.condition.id,
    //     status_id: this.editedItem.status_uni.id,
    //     inventory_identification_type_id: this.editedItem.identification_uni.id,
    //     district_assigned_id: this.editedItem.district_assigned_id,
    //     serial_number: this.editedItem.serial_number,
    //     location: this.editedItem.location,
    //     location_information_note: this.editedItem.location_information_note,
    //     note:  this.editedItem.note
    //   }

    //   const modifyData = {

    //     status_id: this.editedItem.status_uni.id,
    //     quantity: parseInt(this.statusChangeObject.quantity),
    //     sticker_range_start: this.editedItem.sticker_range_start,
    //     sticker_range_end: this.editedItem.sticker_range_end,
    //     location: this.statusChangeObject.location,
    //     location_information_note: this.statusChangeObject.locationWithinSchool,
    //     note: this.statusChangeObject.note,
    //     visibility_date: this.statusChangeObject.showUntil,
    //     new_sticker_range_start: this.statusChangeObject.stickerRangeStart,
    //     new_sticker_range_end: this.statusChangeObject.stickerRangeEnd,
    //     allocation_type_id: this.allocationSelected.id,
    //     school_id: this.statusChangeObject.schoolToTransfer && this.statusChangeObject.schoolToTransfer.id,

    //   }

    //   let finalData = {}

    //   if(this.addNew) {

    //     updateData.schoolYearId = 21

    //     const conf = {
    //       method: 'POST',
    //       url: config.addInventory,
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //       data: updateData
    //     }

    //     axios(conf)
    //       .then(res => {

    //         this.$q.notify({
    //           message: 'Inventory Added successfully!',
    //           type: 'positive',
    //         })

    //         this.data[index].changed = false
    //         this.data[index].showEditButton = true

    //         this.data[index].id = res.data.inventory[0].id
    //         this.data[index].add = false

    //         this.addNew = false
    //         this.statusChanged = false

    //       })

    //   } 
    //   else {

    //     console.log('status changed', this.statusChanged)
        
    //     finalData.updateData = updateData

    //     if(this.statusChanged) {
    //       finalData.modifyData = modifyData
    //     }else {
    //       finalData.modifyData = {}
    //     }

    //     let id = this.editedItem.id

    //       const conf = {
    //         method: 'PUT',
    //         url: config.modifyInventoryStatus + id,
    //         headers: {
    //           Accept: 'application/json',
    //         },
    //         data: finalData
    //       }

    //       axios(conf).then(res => {

    //         this.$q.notify({
    //           message: 'Inventory updated successfully!',
    //           type: 'positive',
    //         })

    //         let currentInventory = this.allocationParsing(res.data.currentInventory),
    //             newInventory;

    //         if(res.data.newInventory.length) {
    //           newInventory = this.allocationParsing(res.data.newInventory);
    //           this.data.unshift(newInventory[0])
    //         }
            

    //         let _index = this.data.findIndex( item => item.id === currentInventory[0].id )
    //         this.data = Object.assign( [], this.data, { [_index]: currentInventory[0] } ) 
    //         this.statusChanged = false
            

    //       })
    //   }
      

    // },
    // getSchools() {

    //   const conf = {
    //     method: 'GET',
    //     url: config.getSchools,
    //     headers: {
    //       Accept: 'application/json',
    //     }
    //   }

    //   axios(conf).then(res => {
    //     let schoolsArr = []
    //     for(let i=0; i<res.data.length; i++) {
    //       let obj = {
    //         id: res.data[i].id,
    //         name: res.data[i].school_name,
    //         label: res.data[i].school_name,
    //         value: res.data[i].id,
    //       }
    //       schoolsArr.push(obj)
    //     }
    //     this.optionsSchool = schoolsArr
    //     this.optionsSchoolForFilter = schoolsArr
    //     console.log(schoolsArr)
    //   })
    // },
    // editInventoryRequest(index, data) {

    //     this.data[index].changed = false
    //     data.school_year_id = this.editedItem.school_year_id
    //     data.purchase_date = this.editedItem.purchase_date

    //     const conf = {
    //       method: 'PUT',
    //       url: config.getInventory + this.editedItem.id,
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //       data: data
    //     }

    //     axios(conf)
    //       .then(res => {
    //         this.$q.notify({
    //           message: 'Inventory updated successfully!',
    //           type: 'positive',
    //         })
    //       })
    // },
    // filterInventory() {
    //   this.loading = true
    //   console.log('filterInventory')

    //   let uri = '';

    //   if(this.filter != '') {
    //     uri += '&search=' + this.filter
    //   }

    //   if(this.filterCategoryValue != '') {
    //     uri += '&category=' + this.filterCategoryValue.id
    //   }

    //   if(this.filterVendor != '') {
    //     uri += '&supplier=' + this.filterVendor.id
    //   }

    //   if(this.filterCondition != '') {
    //     uri += '&condition=' + this.filterCondition.id
    //   }

    //   if(this.filterStatus != '') {
    //     uri += '&status=' + this.filterStatus.id
    //   }

    //   console.log('URI', uri)

    //   const conf = {
    //     method: 'GET',
    //     url: config.filterInventory + '1/' + this.$route.params.id + '?' + uri,
    //     headers: {
    //       Accept: 'application/json',
    //     }
    //   }

    //   axios(conf).then(res => {
    //     console.log('res', res)

    //     this.pages = res.data.pagesCount
    //     let data = res.data.inventory
    //     let filteredData = this.allocationParsing(data)

    //     this.data = filteredData
    //     this.tempDataX = filteredData

    //     this.loading = false
    //   });

    // }

  },
  watch: {
    tab(val) {
      this.getAllocationBar( parseInt(val), this.$route.params.id )
    }
  },
  created() {
    this.schoolName = this.$route.query.name
    this.getAllocationBar( parseInt(this.tab), this.$route.params.id )


    // this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
    // this.getAdditionalInfo(1)
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

<style>

._actions.q-btn-dropdown--simple .q-btn-dropdown__arrow {
  margin-left: 0 !important;
}

._actions .q-btn__wrapper {
  padding: 0 5px !important;
}

.white-space-initial {
  white-space: initial;
}

.fixed-height-for-large-text {
  height: 80px;
  overflow-y: auto;
}

.inline-span {
    height: 34px;
    overflow: hidden;
    display: flex;
    justify-content: start;
    align-items: center;
}

.q-table tbody td {
    font-size: 12px;
}

.q-field__bottom.row.items-start.q-field__bottom--animated {
    padding: 3px 0;
    font-size: .75rem;
}

label.left-arrow-input:after {
    content: '';
    position: absolute;
    width: 10px;
    height: 3px;
    background-color: #bbbbbb;
    right: 138px;
    top: 18px;
}

.q-table__control:nth-child(2) {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 30px;
}

.q-card {
  margin-top: 0;
}




</style>
