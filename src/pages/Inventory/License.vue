<template>
  <q-page class="q-pa-sm">

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Inventory" to="/Inventory" />
        <q-breadcrumbs-el label="License" />
      </q-breadcrumbs>
    </div>

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
                  >$ 400</q-item-label
                >
              </q-item-section>
            </q-item>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-card>
        <q-table
            title="Atlas Prep Academy - 2020 - 2021"
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

                <q-btn :disabled="addNew" square class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" 
                @click="addNew = true, addNewRow()" no-caps>Add</q-btn>

                <q-btn
                    icon-right="archive"
                    label="Export to Excel"
                    color="teal"
                    text-color="white"
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
                        @input="detectChange(props.rowIndex), checkQuantity(props.row.quantity, props.rowIndex)"
                        />
                    </q-popup-edit>
                </q-td>

                <q-td
                    key="foundedBy"
                    :props="props"
                >
                    <div> {{ props.row.foundedBy }} </div>

                    <q-popup-edit v-model="props.row.foundedBy" title="Founded By" buttons>
                        <q-input
                        type="text"
                        v-model="props.row.foundedBy"
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
                <span class="inline-span">{{ props.row.name }}</span>

                <q-popup-edit
                    v-model="props.row.name"
                    title="Name"
                    buttons
                >
                    <q-input
                        type="text"
                        v-model="props.row.name"
                        dense
                        autofocus
                        @input="detectChange(props.rowIndex)"
                    />
                </q-popup-edit>
                </q-td>

                <q-td
                    key="costPerLicense"
                    :props="props"
                >

                <div>{{ props.row.costPerLicense }}</div>

                <q-popup-edit
                    v-model="props.row.costPerLicense"
                    title="Name"
                    buttons
                >
                    <q-input
                        type="text"
                        v-model="props.row.costPerLicense"
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
                    <div>$ {{ props.row.totalCost }}</div>
                <q-popup-edit
                    v-model="props.row.totalCost"
                    title="Name"
                    buttons
                >
                    <q-input
                        type="text"
                        v-model="props.row.totalCost"
                        dense
                        autofocus
                        @input="detectChange(props.rowIndex)"
                    />
                </q-popup-edit>
                </q-td>

                <q-td key="purchaseDate" :props="props">
                    <div>{{ props.row.purchaseDate }}</div>
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="props.row.purchaseDate" mask="MM-DD-YYYY" @input="detectChange(props.rowIndex)">
                        <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                        </div>
                        </q-date>
                    </q-popup-proxy>
                </q-td>

                <q-td key="expirationDate" :props="props">
                    <div>{{ props.row.expirationDate }}</div>
                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="props.row.expirationDate" mask="MM-DD-YYYY" @input="detectChange(props.rowIndex)">
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
                        class="q-mr-sm"
                        icon="cancel"
                        color="orange" 
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
                        class="q-mr-sm"
                        icon="save"
                        color="green" 
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
                        color="red" 
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
                    <div class="q-mb-lg">
                        <div class="row">
                            <div class="col-md-12 q-mr-sm q-ml-sm">
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
  </q-page>
</template>

<script>

import {exportFile} from 'quasar'

export default {
  name: 'License',
  data() {
    return {
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
          name: "foundedBy",
          align: "left",
          label: "Founded By",
          field: "foundedBy",
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
  },
  watch: {
  },
  created() {
  }
}

</script>