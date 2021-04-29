<template>

    <div>

    <q-table
        class="overflow-auto"
        :data="data" 
        :columns="columns"
        :loading="loading"
        :pagination.sync="pagination"
    >

        <!-- Loading -->
        <template v-slot:loading>
            <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Header -->
        <template v-slot:top-right="props">
            <!-- @keyup="keyUpFilter" 
            @keydown="keyDownFilter" -->

            <q-input style="min-width: 120px; max-width: 120px" class="q-mr-md" dense v-model="start">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date color="edx-pagination" @input="filterInvoice" v-model="start">
                            <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

            <q-input style="min-width: 120px; max-width: 120px" class="q-mr-md" dense v-model="end">
                <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date color="edx-pagination" @input="filterInvoice" v-model="end">
                            <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>

            <q-select
                style="min-width: 300px; max-width: 300px"
                class="q-mr-md"
                outlines
                dense
                v-model="selectedSchool"
                use-input
                @filter="filterFn"
                :options="schoolsOptions"
                option-value="id"
                option-label="label"
                input-debounce="0"
                map-options
                emit-value
                stack-label
                @input="filterInvoice"
            >
            </q-select>

            <q-select
                class="q-mr-md"
                style="min-width: 150px; max-width: 150px"
                outlines dense 
                v-model="invoiceStatus" 
                :options="invoiceStatusOptions" @input="filterInvoice" label="By Status" />

            <q-select
                class="q-mr-md"
                style="min-width: 150px; max-width: 150px"
                outlines dense 
                v-model="selectedAllocation" 
                :options="allocationOptions" @input="filterInvoice" label="By Allocation" />

            <q-input
                class="q-mr-md"
                outlines
                dense
                v-model="filter"
                @input="filterInvoice"
                placeholder="Search"
                style="min-width: 200px; max-width: 200px"
            >
                <template v-slot:append>
                <q-icon name="search" />
                </template>
            </q-input>

            
            <q-btn 
                @click="openAddPopup"
                square
                class="q-mr-md edx-add-btn" text-color="white"
                icon="add" 
                no-caps
            >
                Invoice
            </q-btn>

            <q-btn
                    round 
                    icon="mdi-file-excel-box"
                    size="10px"
                    class="edx-excel-btn" text-color="white"
                    no-caps
                    @click="exportTable"
                >
                    <q-tooltip content-class="edx-tooltip">Export to Excel</q-tooltip>
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
            <q-tr :props="props" class="cursor-pointer" @click="openInvoicePopup(props.row.id)">
                <q-td key="invoiceNo" :props="props">
                    {{props.row.invoiceNo}}
                </q-td>
                <q-td key="school" :props="props">
                    {{props.row.school}}
                </q-td>
                <q-td key="allocation" :props="props">
                    {{props.row.allocation}}
                </q-td>
                <q-td key="invoiceDate" :props="props">
                    {{props.row.invoiceDate}}
                </q-td>
                <q-td key="amount" :props="props">
                    $ {{props.row.amount}}
                </q-td>
                <q-td key="dueDate" :props="props">
                    {{props.row.dueDate}}
                </q-td>
                <q-td key="status" :props="props">
                    <div :class="statusColor(props.row.invoiceStatus.id)">
                        {{props.row.status}}
                    </div>
                </q-td>
                <q-td key="actions" :props="props">
                        <q-fab 
                            padding="xs" 
                            @click.stop 
                            color="edx-action-btn" 
                            :icon="qFab" 
                            :active-icon="qFavOpen" 
                            direction="left"
                        >
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

    <q-dialog v-model="confirm" persistent>
        <q-card>
            <q-card-section class="row items-center">
            <span class="q-ml-sm">Are you sure to delete this invoice?</span>
            </q-card-section>

            <q-card-actions align="right">
            <q-btn flat label="No, thanks" color="primary" v-close-popup />
            <q-btn label="Yes" :loading="deleteLoading" color="edx-delete-btn" @click="deleteItem" />
            </q-card-actions>
        </q-card>
    </q-dialog>

    <InvoicePopup 
        @editInvoice="editInvoice"
        @addInvoice="addInvoice"
        @togglePopup="togglePopup" 
        :id="id" 
        :show="newInvoice" 
        :isEdit="isEdit" 
    />

    </div>
</template>

<script>

import InvoicePopup from '../../components/billingExpenses/InvoicePopup'
import axios from 'axios'
import config from '../../../config'
import ICONS from '../../../icons'

export default {
    components: {
        InvoicePopup
    },
    data () {
        return {
            loading: false,
            deleteLoading: false,
            mode: 'list',
            columns: [
            {
                name: "invoiceNo",
                align: "left",
                label: "Invoice",
                field: "invoiceNo",
                sortable: true
            },
            {
                name: "school",
                align: "left",
                label: "School",
                field: "school",
                sortable: true
            },
            {
                name: "allocation",
                align: "left",
                label: "Allocation",
                field: "allocation",
                sortable: true
            },
            {
                name: "invoiceDate",
                align: "left",
                label: "Invoice Date",
                field: "invoiceDate",
                sortable: true
            },
            {
                name: "amount",
                align: "left",
                label: "Amount",
                field: "amount",
                sortable: true
            },
            {
                name: "dueDate",
                align: "left",
                label: "Due Date",
                field: "dueDate",
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
            data: [],

            isEdit: false,
            id: null,
            /////
            pages: 1,
            current: 1,
            count: 10,
            pagination: { rowsPerPage: 10 },
            rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 

            // Search
            filter: '',
            checkbox: false,

            //
            schoolsOptions: [],
            selectedSchool: '',

            start: '',
            end: '',
            //////////
            newInvoice: false,

            invoiceStatus: null,
            invoiceStatusOptions: [],

            selectedAllocation: null,
            allocationOptions: [],

            confirm: false,
        }
    },
    methods: {
        filterInvoice() {

            let uri = '?';

            if(this.start) {
                uri += `start=${this.start}&`
            }
            if(this.end) {
                uri += `end=${this.end}&`
            }
            if(this.selectedSchool) {
                uri += `school=${this.selectedSchool}&`
            }
            if(this.invoiceStatus) {
                uri += `status=${this.invoiceStatus.id}&`
            }
            if(this.selectedAllocation) {
                uri += `allocation=${this.selectedAllocation.id}&`
            }
            if(this.filter.length) {
                uri += `search=${this.filter}&`
            }

            console.log(uri, 'URI')

            const conf = {
                method: 'GET',
                url: config.filterInvoice + uri,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('FILTER = ', res.data.items)

                let invoices = res.data.items
                let invoiceArray = []

                this.pages = res.data.pagesCount

                for(let i=0; i<invoices.length; i++) {
                    
                    console.log(i, invoices[i])
                    invoiceArray.push({
                        id: invoices[i].id,
                        invoiceNo: invoices[i].number,
                        school: invoices[i].schoolName,
                        allocation: invoices[i]?.allocation?.name,
                        invoiceDate: invoices[i].date,
                        amount: invoices[i].total_amount,
                        dueDate: invoices[i].due_date,
                        status: invoices[i].invoice_status?.name,
                        isPaid: invoices[i]?.invoice_status?.id == 2 ? true : false,
                        invoiceStatus: invoices[i]?.invoice_status
                    })

                }

                this.data = invoiceArray
            })


        },
        // get invoice status
        getInvoiceStatus() {

            const conf = {
                method: 'GET',
                url: config.getInvoiceStatus,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                console.log('getInvoiceStatus ===', res.data)

                let invoiceStatus = res.data.invoiceStatus
                let arr = []
                for(let i=0; i<invoiceStatus.length; i++) {
                    arr.push({
                        id: invoiceStatus[i].id,
                        label: invoiceStatus[i].name
                    })
                }
                this.invoiceStatusOptions = arr
            })

        },
        // Get titles
        getAllocations() {

            const conf = {
                method: 'GET',
                url: config.getAllocations,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let allocations = res.data.allocationTypes
                let arr = []
                for(let i=0; i<allocations.length; i++) {
                    arr.push({
                        id: allocations[i].id,
                        label: allocations[i].name
                    })
                }
                this.allocationOptions = arr
            })

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
        addInvoice(newInvoice) {
            this.getInvoices(this.count, this.current)
        },
        editInvoice(editedInvoice) {

             this.getInvoices(this.count, this.current)

            // console.log('Child to parent: ', editedInvoice )
            // console.log('Child to parent: ', typeof editedInvoice )

            // let index = this.data.findIndex( item => item.id == editedInvoice.id )
            // console.log(index)
            // this.data[index] = null

            // console.log('KKLLKKLL', this.data)

        },
        // Pagination
        changePagination (val) {
            this.current = val
            // function
            this.getInvoices(this.count, this.current)
        },
        changeRowsPerPage() {
            this.count = this.pagination.rowsPerPage
            this.current = 1
            this.getInvoices(this.count, this.current)
            // function
        },
        openInvoicePopup(id) {
            this.id = id
            this.isEdit = true
            this.newInvoice = true
        },
        togglePopup(bool) {
            this.newInvoice = bool
        },
        openAddPopup() {
            this.isEdit = false
            this.newInvoice = true
        },
        getInvoices(limit, page) {

            const conf = {
                method: 'GET',
                url: config.getInvoices + '?limit=' + limit + '&page=' + page,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let invoices = res.data.items
                let invoiceArray = []

                this.pages = res.data.pagesCount

                for(let i=0; i<invoices.length; i++) {
                    
                    console.log(i, invoices[i])
                    invoiceArray.push({
                        id: invoices[i].id,
                        invoiceNo: invoices[i].number,
                        school: invoices[i].schoolName,
                        allocation: invoices[i]?.allocation?.name,
                        invoiceDate: invoices[i].date,
                        amount: invoices[i].total_amount,
                        dueDate: invoices[i].due_date,
                        status: invoices[i].invoice_status?.name,
                        isPaid: invoices[i]?.invoice_status?.id == 2 ? true : false,
                        invoiceStatus: invoices[i]?.invoice_status
                    })

                }

                this.data = invoiceArray

            })

        },
        statusColor(id) {
            let className = ''

            switch(id) {
                case 1:
                    // Created
                    className = 'edx-teal'
                    break;
                case 2:
                    // Billed
                    className = 'edx-orange'
                    break;
                case 3:
                    // Paid
                    className = 'edx-green'
                    break;
            }
            return className
        },
        // Filter
        filterFn (val, update, abort) {

            if (val.length < 1) {
                abort()
                return
            }

            update(() => {
                console.log('Update...')
                let arr = []
                const conf = {
                    method: 'GET',
                    url: config.filterSchool + val + '&limit=1000&offset=1',
                    headers: {
                        Accept: 'application/json',
                    }
                }

                axios(conf).then(res => {
                    for(let i=0; i<res.data.schools.length; i++) {
                        arr.push({
                            id: res.data.schools[i].id,
                            label: res.data.schools[i].name
                        })
                    }
                    this.schoolsOptions = arr
                })
            })
        },
        openDeleteModal(row) {
            this.confirm = true
            this.id = row.id
        },
        deleteItem() {

            this.deleteLoading = true

            const conf = {
                method: 'DELETE',
                url: config.deleteInvoice + this.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let index = this.data.findIndex( item => item.id === this.id )
                this.data.splice(index, 1)

                    this.$q.notify({
                        message: 'Invoice deleted!',
                        type: 'positive',
                    })

                this.deleteLoading = false
                 this.confirm = false

                })
                .catch(err=> {
                    this.deleteLoading = false
                    this.confirm = false
                })
        }
    },
    created() {
        this.getInvoices(this.count, this.current)
        this.getInvoiceStatus()
        this.getAllocations()
    },
    computed: {
        // BUTTONS
        qFab() {
            return ICONS.qFab
        },
        qFavOpen() {
            return ICONS.qFabOpen
        },
        deleteIcon() {
            return ICONS.delete
        },
    }
}

</script>