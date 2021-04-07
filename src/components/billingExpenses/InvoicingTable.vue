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
                        <q-date v-model="start">
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
                        <q-date v-model="end">
                            <div class="row items-center justify-end">
                            <q-btn v-close-popup label="Close" color="primary" flat />
                            </div>
                        </q-date>
                        </q-popup-proxy>
                    </q-icon>
                </template>
            </q-input>


            <q-select
            class="q-mr-md"
            style="min-width: 250px; max-width: 250px"
            outlines dense 
            v-model="searchBy" 
            :options="searchByOptions" label="Search by" />

            <q-input
                class="q-mr-md"
                outlines
                dense
                v-model="filter"
                placeholder="Search"
                style="min-width: 250px; max-width: 250px"
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
                icon-right="archive"
                label="Export to Excel"
                class="edx-excel-btn" text-color="white"
                no-caps
            />

            <q-checkbox class="q-ml-sm" v-model="checkbox" />

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
                    <div :class="props.row.isPaid ? 'edx-excel-green' : 'edx-red'">
                        {{props.row.status}}
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

    <InvoicePopup @togglePopup="togglePopup" :id="id" :show="newInvoice" :isEdit="isEdit" />

    </div>
</template>

<script>

import InvoicePopup from '../../components/billingExpenses/InvoicePopup'
import axios from 'axios'
import config from '../../../config'

export default {
    components: {
        InvoicePopup
    },
    data () {
        return {
            loading: false,
            mode: 'list',
            columns: [
            {
                name: "invoiceNo",
                align: "left",
                label: "Invoice No",
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
            ],
            data: [
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Pending',
                    isPaid: false,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Paid',
                    isPaid: true,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Pending',
                    isPaid: false,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Paid',
                    isPaid: true,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Pending',
                    isPaid: false,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Paid',
                    isPaid: true,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Pending',
                    isPaid: false,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Paid',
                    isPaid: true,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Pending',
                    isPaid: false,
                },
                {
                    invoiceNo: 111,
                    school: 'Atlas Preparaty Academy',
                    allocation: 'ESSER',
                    invoiceDate: '14/06/1965',
                    amount: 4899,
                    dueDate: '14/07/1965',
                    status: 'Paid',
                    isPaid: true,
                },
            ],

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
            searchByOptions: [
                'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
            ],
            searchBy: '',
            start: '',
            end: '',
            //////////
            newInvoice: false,
        }
    },
    methods: {
        // Pagination
        changePagination (val) {
            this.current = val
            // function
        },
        changeRowsPerPage() {
            this.count = this.pagination.rowsPerPage
            this.current = 1
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

                for(let i=0; i<invoices.length; i++) {
                    
                    console.log(i, invoices[i])
                    invoiceArray.push({
                        id: invoices[i].id,
                        invoiceNo: invoices[i].id,
                        school: invoices[i].schoolName,
                        allocation: invoices[i]?.line_item?.budget?.allocation?.name,
                        invoiceDate: invoices[i].date,
                        amount: invoices[i].total_amount,
                        dueDate: invoices[i].due_date,
                        status: invoices[i].invoice_status?.name,
                        isPaid: invoices[i]?.invoice_status?.id == 2 ? true : false,
                    })

                }

                this.data = invoiceArray

            })

        }
    },
    created() {
        this.getInvoices(this.count, this.current)
    }
}

</script>