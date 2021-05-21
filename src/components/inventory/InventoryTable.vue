<template>
<div>

  <q-table
    :data="data"
    :columns="columns"
    :loading="loading"
    class="no-shadow overflow-auto my-sticky-column-table"
    :pagination.sync="pagination"
    row-key="actions"
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
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 300px; max-width: 300px"
        dense
        outlines
        label="Category"
        :options="optionsCategory"
        v-model="filterCategoryValue"
      >
        <template v-if="filterCategoryValue" v-slot:append>
          <q-icon name="cancel" @click.stop="filterCategoryValue = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

      <q-select
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 200px; max-width: 200px"
        dense
        outlines
        label="Vendor"
        :options="optionsSupplier"
        v-model="filterVendor"
      >
        <template v-if="filterVendor" v-slot:append>
          <q-icon name="cancel" @click.stop="filterVendor = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

      <q-select
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 150px; max-width: 150px"
        dense
        outlines
        label="Condition"
        :options="optionsCondition"
        v-model="filterCondition"
      >
        <template v-if="filterCondition" v-slot:append>
          <q-icon name="cancel" @click.stop="filterCondition = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

      <q-select
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 150px; max-width: 150px"
        dense
        outlines
        label="Status"
        :options="optionsStatus"
        v-model="filterStatus"
      >
        <template v-if="filterStatus" v-slot:append>
          <q-icon name="cancel" @click.stop="filterStatus = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

      <q-btn square class="q-mr-md edx-add-btn" text-color="white" icon="add" 
      @click="openAddPopup" no-caps>Add</q-btn>

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
                color="edx-delete-btn"
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
      
      <q-tr :props="props" class="cursor-pointer" :class="{ 'bg-red-2' : props.row.changed }"  @click="openEditPopup(props.row)">

        <q-td auto-width>
            <div v-if="props.row.needs_review">
                <q-icon name="fiber_new" style="font-size: 1.5rem" class="edx-red" />
                <q-tooltip content-class="edx-tooltip">New</q-tooltip>
            </div>
        </q-td>

        <q-td key="qty" :props="props">
          <div>{{ props.row.quantity }}</div>

          <!-- <q-popup-edit v-model="props.row.quantity" title="Qty" buttons>
            <q-input
              type="text"
              v-model="props.row.quantity"
              dense
              autofocus
              @input="detectChange(props.rowIndex), checkQuantity(props.row.quantity, props.rowIndex)"
            />
          </q-popup-edit> -->
        </q-td>

        <q-td
          key="category"
          :props="props"
          style="white-space: initial;width: 350px; max-width: 350px;"
        >
          <div> {{ props.row.inventory_category_uni.label }} </div>

          <!-- <q-popup-edit 
              v-model="props.row.inventory_category_uni"
              title="Category" buttons>

              <q-select  
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  @input="detectChange(props.rowIndex)"
                  v-model="props.row.inventory_category_uni" 
                  :options="optionsCategory"
                  @filter="filterCategory"
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
              

          </q-popup-edit>   -->

        </q-td>

        <q-td
          key="itemName"
          :props="props"
          style="width: 300px; min-width: 300px; max-width: 300px;"
        >
          <span class="inline-span table-text">{{ props.row.item_name }}</span>

          <!-- <q-popup-edit
            v-model="props.row.item_name"
            title="Item name"
            buttons
          >
            <q-input
              type="text"
              v-model="props.row.item_name"
              dense
              autofocus
              @input="detectChange(props.rowIndex)"
            />
          </q-popup-edit> -->
        </q-td>

        <q-td key="vendor" :props="props">
          <div v-if="props.row.inventory_supplier_uni">{{ props.row.inventory_supplier_uni.label }}</div>
          <div v-else>  </div>
            <!-- <q-popup-edit 
              v-model="props.row.inventory_supplier_uni"
              title="Vendor" buttons>

              <q-select  
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  @input="detectChange(props.rowIndex)"
                  v-model="props.row.inventory_supplier_uni" 
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
            </q-popup-edit>   -->
        </q-td>

        <q-td key="costPerItem" :props="props">

          <div>$ {{ props.row.item_cost }}</div>

          <!-- <q-popup-edit
            v-model="props.row.item_cost"
            title="Cost Per Item"
            buttons
          >
            <q-input
              type="text"
              v-model="props.row.item_cost"
              dense
              autofocus
              @input="detectChange(props.rowIndex)"
            />
          </q-popup-edit> -->
        </q-td>

        <q-td key="totalCost" :props="props">
          <div>$ {{ (props.row.item_cost * props.row.quantity).toFixed(2) }}</div>
        </q-td>

        <q-td key="dateOfPurchase" :props="props">
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

        <q-td v-if="props.row.condition" key="condition" :props="props">

            <div v-if="props.row.condition.label == 'Excelent'">
                <q-icon
                    name="sellr" 
                    class="edx-icon-excellent"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.condition.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.condition.label == 'Very Good'">
                <q-icon
                    name="sellr" 
                    class="edx-icon-verygood"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.condition.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.condition.label == 'Good'">
                <q-icon
                    name="sellr" 
                    class="edx-icon-good"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.condition.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.condition.label == 'Fair'">
                <q-icon
                    name="sellr" 
                    class="edx-icon-fair"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.condition.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else>
                <q-icon
                    name="sellr" 
                    class="edx-icon-poor"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.condition.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

          <!-- <q-popup-edit
            v-model="props.row.condition"
            title="Condition"
            buttons
          >
            <q-select
              @input="detectChange(props.rowIndex)"
              dense
              outlined
              v-model="props.row.condition"
              :options="optionsCondition"
            />
          </q-popup-edit> -->

        </q-td>

        <q-td v-if="props.row.status_uni" key="status" :props="props">

            <div v-if="props.row.status_uni.label == 'On Premise'">
                <q-icon
                    name="emoji_transportation" 
                    class="edx-icon-onpremise"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.status_uni.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.status_uni.label == 'Off Premise'">
                <q-icon
                    name="domain_disabled" 
                    class="edx-icon-offpremise"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.status_uni.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.status_uni.label == 'Disposed'">
                <q-icon
                    name="recyclingd" 
                    class="edx-icon-disposed"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.status_uni.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.status_uni.label == 'Lost'">
                <q-icon
                    name="wrong_location" 
                    class="edx-icon-lost"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.status_uni.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.status_uni.label == 'Stolen'">
                <q-icon
                    name="person_search" 
                    class="edx-icon-stolen"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.status_uni.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else-if="props.row.status_uni.label == 'Transfered'">
                <q-icon
                    name="local_shipping" 
                    class="edx-icon-transfered"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.status_uni.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

            <div v-else>
                <q-icon
                    name="inventory" 
                    class="edx-icon-stored"
                >
                    <q-tooltip 
                        content-class="edx-tooltip"
                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                        transition-show="flip-right"
                        transition-hide="flip-left"
                    >
                        <strong>{{ props.row.status_uni.label }}</strong>
                    </q-tooltip>
                </q-icon>
            </div>

          <!-- <q-popup-edit v-model="props.row.status" title="Status">
            <q-select
              @input="changeStatus(props.rowIndex), detectChange(props.rowIndex)"
              dense
              outlined
              v-model="props.row.status_uni"
              :options="optionsStatus"
            />
          </q-popup-edit> -->

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



<InventoryPopup 
    :data="editedItem" 
    :show="showPopup" 
    :isEdit="isEdit" 
    :tab="tab"
    @togglePopup="togglePopup"
    @updateTableList="updateTableList"
/>

</div>
</template>

<script>

import {exportFile} from 'quasar'
import lodash from 'lodash'
import axios from 'axios'
import config from '../../../config'
import ICONS from '../../../icons'

let oldObject = {}
let typingTimer
let doneTypingInterval = 500
import dialogDraggable from '../../components/DialogDraggable'
import InventoryPopup from './InventoryPopup'

export default {
    name: 'InventoryTitle1',
    components: {
        dialogDraggable,
        InventoryPopup
    },
    props: { 
        type: { required: true },
    },
    data() {
        return {

            optionsCategory: [],
            optionsCategoryForFilter: [],
            optionsCondition: [],
            optionsStatus: [],
            optionsSupplier: [],
            optionsSupplierForFilter: [],
            optionsIdentifier: [],




            // for delete
        
        showPopup: false,
        isEdit: false,

        mode: 'list',
        tab: '1',
        pages: 1,
        pagination: { rowsPerPage: 10 },
        current: 1,
        count: 10,
        data: [],
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
            name: "category",
            align: "left",
            label: "Category",
            field: "category",
            sortable: true
            },
            {
            name: "itemName",
            align: "left",
            label: "Item Name",
            field: "itemName",
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
            name: "costPerItem",
            align: "left",
            label: "Cost Per Item",
            field: "costPerItem",
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
            name: "dateOfPurchase",
            align: "left",
            label: "Date Of Purchase",
            field: "dateOfPurchase",
            sortable: true
            },
            {
            name: "condition",
            align: "left",
            label: "Condition",
            field: "condition",
            sortable: true
            },
            {
            name: "status",
            align: "left",
            label: "Status",
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

        filter: '',
        filterCategoryValue: '',
        filterVendor: '',
        filterCondition: '',
        filterStatus: '',

        loading: true,
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
        typeModel: null,
        addNew: false,
        barInfo: {},
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
        },
        statusChanged: false,
        }
    },
    methods: {

        togglePopup(val) {
            this.showPopup = val
        },
        updateTableList(val) {
          this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
        },

        openDuplicatePopup(row) {
            this.showPopup = true
            this.isEdit = false
            this.editedItem = row
        },
        openAddPopup() {
            this.showPopup = true
            this.isEdit = false
            this.editedItem = {}
        },
        openEditPopup(row) {
            this.showPopup = true
            this.isEdit = true
            this.editedItem = row
        },

        openDeleteModal(item) {
        this.item = item
        this.confirm = true
        },
        deleteItem() {
        let item = this.item
        // const index = this.data.indexOf(item)
        // this.data.splice(index, 1)
        const conf = {
            method: 'DELETE',
            url: config.getInventory + item.id,
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
        filterType() {
            if(this.typeModel) {
                if(this.typeModel == 'Professional Development') {
                this.data = this.tempDataX.filter(a => a.type == 'PD');
                }else {
                this.data = this.tempDataX.filter(a => a.type == 'FE');
                }
            }else {
                this.data = this.tempDataX
            }
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
        
        // closePopup() {
        // this.onpremise = false
        // this.offpremise = false
        // this.disposed = false
        // this.lost = false
        // this.stolen = false
        // this.transfered = false
        // this.stored = false
        // },

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
            this.filterInventory()
        }
        },

        changePagination (val) {

        console.log('change pagination')
        this.current = val
        this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, val )
        },
        changeRowsPerPage() {

        console.log('changeRowsPerPage')
        
        this.count = this.pagination.rowsPerPage
        this.current = 1

        this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )

        },
        identifierCheckQuantity(index) {

            this.editedItem = this.tempDataX[index]
            let i = this.optionsIdentifier.findIndex( item => item.id == 5 )
            let indexSticker = this.optionsIdentifier.findIndex( item => item.id == 2 )

            if(this.editedItem.quantity <= 1) {
                this.optionsIdentifier[i].disable = true
                this.optionsIdentifier[indexSticker].disable = false
            } else {
                this.optionsIdentifier[i].disable = false
                this.optionsIdentifier[indexSticker].disable = true
            }

        },

        filterCategory (val, update, abort) {
            update(() => {
                if(val) { 
                const needle = val.toLowerCase()
                this.optionsCategory = this.optionsCategoryForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },
        filterSupplier (val, update, abort) {
            update(() => {
                if(val) {
                const needle = val.toLowerCase()
                this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },
        filterSchool (val, update, abort) {
            update(() => {
                if(val) {
                const needle = val.toLowerCase()
                this.optionsSchool = this.optionsSchoolForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },


        getToday() {
        let dateObj = new Date();
        let month = dateObj.getUTCMonth() + 1; //months from 1-12
        let day = dateObj.getUTCDate();
        let year = dateObj.getUTCFullYear();

        return year + "-" + month + "-" + day;
        },
        // Add new Row 
        // addNewRow() {
        
        // let date = this.getToday()

        // const obj  = {
        //     quantity: 1,
        //     add: true,
        //     inventory_category_uni: {
        //     id: 1,
        //     label: 'Comprehension'        
        //     },
        //     item_name: '',
        //     inventory_supplier_uni: {
        //     id: 10001,
        //     label: 'A CHANCE TO GROW'       
        //     },
        //     item_cost: 0,
        //     purchase_date: date,
        //     condition:  {
        //     id: 1,
        //     label: 'Excelent'
        //     },
        //     status_uni: {
        //     id: 1,
        //     label: 'On Premise'
        //     },
        //     identification_uni: {
        //     id: 1,
        //     label: 'Stamp'
        //     },
        //     district_assigned_id: 0,
        //     serial_number: 0,
        //     location: '',
        //     location_information_note: '',
        //     transition_information_note: '',
        //     notes: '',
        //     changed: true,
        //     showEditButton: false,
        // }

        // this.data.unshift(obj)
        // this.editedItem = obj
        
        // },
        // confirmStatusChanges() {

        // this.statusChanged = true
        // this.closePopup()

        // },
        checkQuantity(quantity, index) {

        if(quantity < 1) {
            let i = this.optionsIdentifier.findIndex( item => item.id == 5 )

            if(this.editedItem.quantity <= 1) {
            this.optionsIdentifier[i].disable = true
            } else {
            this.optionsIdentifier[i].disable = false
            }

            this.data[index].identification_uni = this.optionsIdentifier[0]
        }

        if(this.data[index].identification_uni.id == 5 && this.editedItem.quantity <= 1) {
            this.$q.notify({
            message: 'When Identifier status equals Sticker Range you can not change quality 1! /t asdasd',
            type: 'negative',
            color: 'yellow',
            textColor: 'black'
            })
            this.data[index].identification_uni = this.optionsIdentifier[0]
        }
        },

        allocationParsing(data) {

            console.log('DDDAAAATTTTAAAAA', data)

        for(let i=0; i<data.length; i++) {

            // is new
            if(data[i].needs_review == "0") {
                data[i].needs_review = true
            }else data[i].needs_review = false


            // Inventory
            if(data[i].inventory_category != null) {
                data[i].inventory_category_uni = {
                    id: data[i].inventory_category?.id,
                    label: data[i].inventory_category?.name,
                    value: data[i].inventory_category?.id
                }
            }else {
                data[i].inventory_category_uni = {
                    id: 0,
                    label: 'N/A',
                    value: 0
                }
            }


            // Suplier
            if(data[i].inventory_supplier != null) {

                let objSuplier = {
                    id: data[i].inventory_supplier.id,
                    label: data[i].inventory_supplier.short_name,
                    value: data[i].inventory_supplier.id
                }

            data[i].inventory_supplier_uni = objSuplier
            }else {
                data[i].inventory_supplier_uni = {
                    id: 0,
                    label: 'N/A'       
                }
            }

            // Condition
            let conditionObj = {
                id: data[i].condition_id,
                label: data[i].condition
            }
            data[i].condition = conditionObj
            
            // Status
            let statusId = data[i].status
            let statusName = ''


            switch(statusId) {
            case 1:
                statusName = "On Premise"
                break;
            case 2:
                statusName = "Checked Out"
                break;
            case 3:
                statusName = "Disposed"
                break;
            case 4:
                statusName = "Lost"
                break;
            case 5:
                statusName = "Stolen"
                break;
            case 6:
                statusName = "Transfered"
                break;
            case 7:
                statusName = "Stored"
                break;
            default:
                break;
            }

            let statusObj = {
                id: data[i].status_id,
                label: statusName
            }
            data[i].status_uni = statusObj

            data[i].campus_uni = {
                id: data[i].campus ? data[i].campus.id : null,
                label: data[i].campus ? data[i].campus.name : 'N/A',
            }

            // Identification
            let identificationObj = {
                id: data[i].identification_id,
                label: data[i].identification
            }
            data[i].identification_uni = identificationObj

            data[i].changed = false
            data[i].showEditButton = true

        }

        return data
        },

        // Requests
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
        getInventoryByType(type, id, limit, page) {

            this.loading = true

            const conf = {
                method: 'GET',
                url: config.getInventory + type + '/' + id + '?limit=' + limit + '&page=' + page,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                console.log('grigor ghazaryan', res.data)
                let data = res.data.inventory
                this.pages = res.data.pagesCount

                // Allocation parsing function here
                let finalResult = this.allocationParsing(data)
                
                this.data = finalResult
                this.tempDataX = finalResult

                this.loading = false
                console.log('this.datathis.data', this.data)
            });
        },

        editInventory(index) {

        const updateData = {
            school_id: this.editedItem.school_id,
            allocation_type_id: parseInt(this.editedItem.allocation_type_id),
            quantity:  this.editedItem.quantity,
            inventory_category_type_id:  this.editedItem.inventory_category_uni.id,
            item_name: this.editedItem.item_name,
            supplier_id: this.editedItem.inventory_supplier_uni.id,
            item_cost: this.editedItem.item_cost,
            inventory_condition_type_id: this.editedItem.condition.id,
            status_id: this.editedItem.status_uni.id,
            inventory_identification_type_id: this.editedItem.identification_uni.id,
            district_assigned_id: this.editedItem.district_assigned_id,
            serial_number: this.editedItem.serial_number,
            location: this.editedItem.location,
            location_information_note: this.editedItem.location_information_note,
            note:  this.editedItem.note,
            purchase_date: this.editedItem.purchase_date
        }

        const modifyData = {

            status_id: this.editedItem.status_uni.id,
            quantity: parseInt(this.statusChangeObject.quantity),
            sticker_range_start: this.editedItem.sticker_range_start,
            sticker_range_end: this.editedItem.sticker_range_end,
            location: this.statusChangeObject.location,
            location_information_note: this.statusChangeObject.locationWithinSchool,
            note: this.statusChangeObject.note,
            visibility_date: this.statusChangeObject.showUntil,
            new_sticker_range_start: this.statusChangeObject.stickerRangeStart,
            new_sticker_range_end: this.statusChangeObject.stickerRangeEnd,
            allocation_type_id: this.allocationSelected.id,
            school_id: this.statusChangeObject.schoolToTransfer && this.statusChangeObject.schoolToTransfer.id,
            purchase_date: this.editedItem.purchase_date,

        }

        let finalData = {}

        if(this.addNew) {

            updateData.schoolYearId = 21

            const conf = {
            method: 'POST',
            url: config.addInventory,
            headers: {
                Accept: 'application/json',
            },
            data: updateData
            }

            axios(conf)
            .then(res => {

                this.$q.notify({
                message: 'Inventory Added successfully!',
                type: 'positive',
                })

                this.data[index].changed = false
                this.data[index].showEditButton = true

                this.data[index].id = res.data.inventory[0].id
                this.data[index].add = false

                this.addNew = false
                this.statusChanged = false

            })

        } 
        else {

            console.log('status changed', this.statusChanged)
            
            finalData.updateData = updateData

            if(this.statusChanged) {
            finalData.modifyData = modifyData
            }else {
            finalData.modifyData = {}
            }

            let id = this.editedItem.id

            const conf = {
                method: 'PUT',
                url: config.modifyInventoryStatus + id,
                headers: {
                Accept: 'application/json',
                },
                data: finalData
            }

            axios(conf).then(res => {

                this.$q.notify({
                message: 'Inventory updated successfully!',
                type: 'positive',
                })

                let currentInventory = this.allocationParsing(res.data.currentInventory),
                    newInventory;

                if(res.data.newInventory.length) {
                newInventory = this.allocationParsing(res.data.newInventory);
                this.data.unshift(newInventory[0])
                }
                

                let _index = this.data.findIndex( item => item.id === currentInventory[0].id )
                this.data = Object.assign( [], this.data, { [_index]: currentInventory[0] } ) 
                this.statusChanged = false
                

            })
        }
        

        },
        getSchools() {

          const conf = {
              method: 'GET',
              url: config.getSchools,
              headers: {
              Accept: 'application/json',
              }
          }

          axios(conf).then(res => {
              let schoolsArr = []
              for(let i=0; i<res.data.length; i++) {
              let obj = {
                  id: res.data[i].id,
                  name: res.data[i].school_name,
                  label: res.data[i].school_name,
                  value: res.data[i].id,
              }
              schoolsArr.push(obj)
              }
              this.optionsSchool = schoolsArr
              this.optionsSchoolForFilter = schoolsArr
              console.log(schoolsArr)
          })
        },
        editInventoryRequest(index, data) {

            this.data[index].changed = false
            data.school_year_id = this.editedItem.school_year_id
            data.purchase_date = this.editedItem.purchase_date

            const conf = {
            method: 'PUT',
            url: config.getInventory + this.editedItem.id,
            headers: {
                Accept: 'application/json',
            },
            data: data
            }

            axios(conf)
            .then(res => {
                this.$q.notify({
                message: 'Inventory updated successfully!',
                type: 'positive',
                })
            })
        },
        filterInventory() {
        this.loading = true
        console.log('filterInventory')

        let uri = '';

        if(this.filter != '') {
            uri += '&search=' + this.filter
        }

        if(this.filterCategoryValue != '') {
            uri += '&category=' + this.filterCategoryValue.id
        }

        if(this.filterVendor != '') {
            uri += '&supplier=' + this.filterVendor.id
        }

        if(this.filterCondition != '') {
            uri += '&condition=' + this.filterCondition.id
        }

        if(this.filterStatus != '') {
            uri += '&status=' + this.filterStatus.id
        }

        console.log('URI', uri)

        const conf = {
            method: 'GET',
            url: config.filterInventory + '1/' + this.$route.params.id + '?' + uri,
            headers: {
            Accept: 'application/json',
            }
        }

        axios(conf).then(res => {
            console.log('res', res)

            this.pages = res.data.pagesCount
            let data = res.data.inventory
            let filteredData = this.allocationParsing(data)

            this.data = filteredData
            this.tempDataX = filteredData

            this.loading = false
        });

        }

    },
    created() {
        this.tab = this.type
        this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
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

<style lang="scss">



</style>
