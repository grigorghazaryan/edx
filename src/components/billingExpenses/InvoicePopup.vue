<template>
    <div>
        
        
        <dialog-draggable 
            :width="900" 
            :modelDialog="showPopup" 
            :title=" isEdit ? 'Edit Invoice' : 'New Invoice'" 
            :icon="'description'"
        >  
            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="q-mb-sm">
                                <div class="text-subtitle2 q-mb-sm">School</div>
                                <q-select
                                    :disable="isEdit"
                                    outlined
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
                                >
                                </q-select>
                            </div>
                        </div>
                        <div class="col-md-3"></div>
                        <div class="col-md-5">
                            <div class="row justify-end">
                                <div class="text-center q-mr-md"> 
                                    <div class="text-subtitle2 q-mb-sm">Allocation</div>
                                    <q-chip v-if="title" class="cursor-pointer" square color="edx-bg-pd">
                                        <span>{{ title.label }}</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>{{ title.label }}</strong>
                                        </q-tooltip>
                                    </q-chip>
                                    <q-popup-edit v-if="!isEdit"  v-model="title" buttons>
                                        <div class="row">
                                            <div class="col-md-12 q-pr-sm q-mb-md">
                                                <div class="text-subtitle2 q-mb-sm">Change allocation</div>
                                                <div class="row cursor-pointer h-popup">
                                                    <q-select 
                                                        class="w-100"
                                                        v-model="title" 
                                                        :options="allocationOptions"
                                                        outlined
                                                        dense
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </q-popup-edit>  
                                </div>
                                
                                <div v-if="fundSourceOptions.length" class="text-center">
                                    <div class="text-subtitle2 q-mb-sm">Funding Source</div>
                                    <q-chip v-if="fundSource" square class="bg-edx-bg-wr cursor-pointer">
                                        <span>{{ fundSource.abbr }}</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>{{ fundSource.label }}</strong>
                                        </q-tooltip>
                                    </q-chip>
                                    <q-popup-edit v-model="fundSource" buttons>
                                        <div class="row">
                                            <div class="col-md-12 q-pr-sm q-mb-md">
                                                <div class="text-subtitle2 q-mb-sm">Change Funding Source</div>
                                                <div class="row cursor-pointer h-popup">
                                                    <q-select 
                                                        class="w-100"
                                                        v-model="fundSource" 
                                                        :options="fundSourceOptions"
                                                        outlined
                                                        dense
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </q-popup-edit>  
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="q-mb-lg" v-if="campusOptions.length">
                                <div class="text-subtitle2 q-mb-sm">Campus</div>
                                <q-select
                                    :disable="!selectedSchool || isEdit"
                                    class="q-mr-md w-100"
                                    outlined 
                                    dense 
                                    v-model="selectedCampus" 
                                    :options="campusOptions" 
                                />
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="q-mr-md text-right">
                                    <div class="text-subtitle2 q-mb-sm">Invoice Status</div>
                                   
                                    <div v-if="invoiceStatus">

                                        <q-icon 
                                            :name="invoiceStatusIcon(invoiceStatus.id)" 
                                            :class="invoiceStatusIconColor(invoiceStatus.id)"
                                        >
                                            <q-tooltip 
                                                content-class="edx-tooltip"
                                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                transition-show="flip-right"
                                                transition-hide="flip-left"
                                            >
                                                <strong>
                                                    {{invoiceStatus.label}}
                                                </strong>
                                            </q-tooltip>
                                        </q-icon>

                                         {{invoiceStatus.label}}

                                        <q-popup-edit  v-model="invoiceStatus" buttons>
                                            <div class="row">
                                                <div class="col-md-12 q-pr-sm q-mb-md">
                                                    <div class="text-subtitle2 q-mb-sm">Change Invoice Status</div>
                                                    <div class="row cursor-pointer h-popup">
                                                        <q-select 
                                                            class="w-100"
                                                            v-model="invoiceStatus" 
                                                            :options="invoiceStatusOptions"
                                                            outlined
                                                            dense
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </q-popup-edit>  
                                    </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 q-mt-lg">
                            <div class="text-subtitle2 q-mb-sm">Bill to</div>
                            <div class="row justify-between">
                                <div>
                                    <div>{{ billTo.schoolName  }}</div>
                                    <div>{{ billTo.address }}</div>
                                    <div>{{ billTo.state }} {{ billTo.city }} {{ billTo.zip }}</div>
                                    <div>{{ billTo.phone }}</div>
                                </div>
                                <div @click="showBillToModal">
                                    <q-icon :name="edit" class="edx-icon-edit cursor-pointer"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-11">

                            <div class="q-mt-lg">
                                    <q-table hide-bottom class="overflow-auto" :data="internalInvoiceData" :columns="internalInvoiceColumns">
                                        <!-- Table Body -->
                                        <template v-slot:body="props">
                                            <q-tr :props="props">
                                                <q-td key="internalInvoice" :props="props">
                                                    <q-input dense outlined v-model="props.row.internalInvoice" />
                                                </q-td>
                                                <q-td key="invoiceDate" :props="props">
                                                    <q-input outlined class="q-mr-md" dense v-model="props.row.invoiceDate">
                                                        <template v-slot:append>
                                                            <q-icon name="event" class="cursor-pointer">
                                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                <q-date color="edx-pagination" v-model="props.row.invoiceDate">
                                                                    <div class="row items-center justify-end">
                                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                                    </div>
                                                                </q-date>
                                                                </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                    </q-input>
                                                </q-td>
                                                <q-td key="totalDue" :props="props">
                                                    $ {{props.row.totalDue}}
                                                </q-td>
                                                <q-td key="dueDate" :props="props">
                                                    <q-input outlined class="q-mr-md" dense v-model="props.row.dueDate">
                                                        <template v-slot:append>
                                                            <q-icon name="event" class="cursor-pointer">
                                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                                <q-date color="edx-pagination" v-model="props.row.dueDate">
                                                                    <div class="row items-center justify-end">
                                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                                    </div>
                                                                </q-date>
                                                                </q-popup-proxy>
                                                            </q-icon>
                                                        </template>
                                                    </q-input>
                                                </q-td>
                                                <q-td class="w-80px" key="terms" :props="props">
                                                    <q-select outlined dense :options="termsOptions" v-model="internalInvoiceData[0].terms" />
                                                </q-td>
                                            </q-tr>
                                        </template>
                                    </q-table>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="q-mt-md">
                                <q-table hide-bottom :pagination.sync="pagination" class="overflow-auto" :data="data" :columns="columns">
                                    <!-- Table Body -->
                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td key="date" :props="props">
                                                {{props.row.date}}
                                            </q-td>
                                            <q-td key="description" :props="props">
                                               <span class="inline-span">
                                                    {{props.row.description}}
                                               </span>
                                            </q-td>
                                            <q-td key="type" :props="props">
                                                <q-chip square :class="checkType(props.row.type)">
                                                    <span> {{props.row.type}}</span>
                                                    <q-tooltip 
                                                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                        transition-show="flip-right"
                                                        transition-hide="flip-left"
                                                    >
                                                        <strong> {{props.row.type}}</strong>
                                                    </q-tooltip>
                                                </q-chip>
                                            </q-td>
                                            <q-td key="qty" :props="props">
                                                {{props.row.qty}}
                                            </q-td>
                                            <q-td key="cost" :props="props">
                                                {{props.row.cost}}
                                            </q-td>
                                            <q-td key="amount" :props="props">
                                                {{props.row.amount}}
                                            </q-td>
                                            <q-td>
                                                <q-btn @click="openDeleteModal(props.row)" icon="delete" class="bg-edx-delete-btn" size="sm" round>
                                                    <q-tooltip 
                                                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                        transition-show="flip-right"
                                                        transition-hide="flip-left"
                                                    >
                                                        <strong>Delete</strong>
                                                    </q-tooltip>
                                                </q-btn>
                                            </q-td>
                                        </q-tr>
                                    </template>
                                </q-table>
                                
                            </div>
                        </div>
                        <div class="col-md-12">
                            <div class="q-mt-md">
                                <q-btn @click="showBudgetItemsPopup=true" icon="add" class="edx-add-btn" round/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <div class="row justify-end items-center q-mb-sm">
                            <div class="col-md-4 text-right q-mr-md">
                                <div>Subtotal: </div>
                            </div>
                            <div class="col-md-2 text-left">
                                <div>
                                    $ <span>{{ subtotal }}</span>
                                </div>
                            </div>
                        </div>

                        <div class="row justify-end items-center q-mb-sm">
                            <div class="col-md-4 text-right q-mr-md">
                                <div>
                                    <q-checkbox size="sm" v-model="isTax" label="Tax:" />
                                </div>
                            </div>
                            <div class="col-md-2 text-left">
                                <div>
                                    <q-input :disable="!isTax" prefix="$" outlined dense v-model="calculatedTax" />
                                    <q-popup-edit v-if="isTax" v-model="tax" buttons>
                                        <div class="row">
                                            <div class="col-md-12 q-mb-sm">
                                                <div class="text-subtitle2 q-mb-sm">Tax Rate</div>
                                                <q-input  prefix="%" dense outlined v-model="tax" />
                                            </div>
                                        </div>
                                    </q-popup-edit> 
                                </div>
                                 
                            </div>
                        </div>

                        <div class="row justify-end items-center q-mb-sm">
                            <div class="col-md-4 text-right q-mr-md">
                                <div>
                                    <q-checkbox size="sm" v-model="isCharges" label="Shipping / Other Charges:" />
                                </div>
                            </div>
                            <div class="col-md-2 text-left">
                                <div>
                                    <q-input :disable="!isCharges" prefix="$" outlined dense v-model="charges" />
                                    <q-popup-edit v-if="isCharges" v-model="charges" buttons>
                                        <div class="row">
                                            <div class="col-md-12 q-mb-sm">
                                                <div class="text-subtitle2 q-mb-sm">Shipping Amount</div>
                                                <q-input  prefix="$" dense outlined v-model="charges" />
                                            </div>
                                        </div>
                                    </q-popup-edit> 
                                </div>
                            </div>
                        </div>

                        <div class="row justify-end items-center q-mb-sm">
                            <div class="col-md-4 text-right q-mr-md">
                                <div>Total: </div>
                            </div>
                            <div class="col-md-2 text-left">
                                <div> <b> $ {{ total  }}</b></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-6 q-pr-sm">
                            <div class="q-mt-lg">
                                <div class="text-subtitle2 q-mb-sm">Note</div>
                                <q-input type="textarea" outlined v-model="note" />
                            </div>
                        </div>
                        <div class="col-md-6 q-pl-sm">
                            <div class="q-mt-lg">
                                <div class="text-subtitle2 q-mb-sm">Invoice Memo</div>
                                <q-input type="textarea" outlined v-model="invoiceMemo" />
                            </div>
                        </div>
                    </div>

                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn flat label="Cancel" color="primary" @click="emitClosePopup"></q-btn>
                    <q-btn v-if="!isEdit" @click="addInvoice" flat label="Add" color="primary"></q-btn>
                    <q-btn v-else @click="editInvoice" flat label="Save" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

        <q-dialog v-model="openDeletePopup" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure to delete this item?</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                <q-btn :loading="loading" label="Yes" color="edx-delete-btn" @click="deleteItem" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        
        <BudgetItemsPopup
            @toggleBudgetItemsPopup="toggleBudgetItemsPopup" 
            :show="showBudgetItemsPopup"
            :categoryId="title"
            :invoiceId="showBudgetItemsPopup ? id : null"
            :allocation="showBudgetItemsPopup ? title : null"
        />

        <BillToModal 
            @toggleBillToModal="toggleBillToModal" 
            :show="isShowBillToModal" 
            @receiveAddress="receiveAddress"
            :schoolId="selectedSchool"
        />
        
    </div>
</template>

<script>

import ICONS from '../../../icons'
import dialogDraggable from '../../components/DialogDraggable'
import BudgetItemsPopup from './BudgetItemsPopup'
import BillToModal from './BillToPopup'
import axios from 'axios'
import config from '../../../config'

export default {
    
    props: {
        show: {
            required: true
        },
        isEdit: {
            required: true
        },
        id: {
            required: true
        }
    },
    components: {
        dialogDraggable,
        BudgetItemsPopup,
        BillToModal
    },
    data() {
        return {

            loading: false, 
            pagination: { rowsPerPage: 999 },

            selectedSchool: '',
            schoolsOptions: [],

            internalInvoiceData: [
                {
                    internalInvoice: 0,
                    invoiceDate: '',
                    totalDue: 0,
                    dueDate: '',
                    terms: {
                        id: null,
                        label: 'N/A'
                    }
                }
            ],
            internalInvoiceColumns: [
                {
                    name: "internalInvoice",
                    align: "left",
                    label: "Internal Invoice",
                    field: "internalInvoice",
                    sortable: false
                },
                {
                    name: "invoiceDate",
                    align: "left",
                    label: "Invoice Date",
                    field: "invoiceDate",
                    sortable: false
                },
                {
                    name: "totalDue",
                    align: "left",
                    label: "Total Due",
                    field: "totalDue",
                    sortable: false
                },
                {
                    name: "dueDate",
                    align: "left",
                    label: "Due Date",
                    field: "dueDate",
                    sortable: false
                },
                {
                    name: "terms",
                    align: "left",
                    label: "Terms",
                    field: "terms",
                    sortable: false
                },
            ],

            data: [],
            columns: [
                {
                    name: "date",
                    align: "left",
                    label: "Date",
                    field: "date",
                    sortable: false
                },
                {
                    name: "description",
                    align: "left",
                    label: "Description",
                    field: "description",
                    sortable: false,
                    style: 'width: 300px; min-width: 300px; max-width: 300px'
                },
                {
                    name: "type",
                    align: "left",
                    label: "Type",
                    field: "type",
                    sortable: false
                },
                {
                    name: "qty",
                    align: "left",
                    label: "Qty",
                    field: "qty",
                    sortable: false
                },
                {
                    name: "cost",
                    align: "left",
                    label: "Cost",
                    field: "cost",
                    sortable: false
                },
                {
                    name: "amount",
                    align: "left",
                    label: "Amount",
                    field: "amount",
                    sortable: false
                },
                {
                    name: "actions",
                    align: "left",
                    label: "",
              field: "actions",
                    sortable: false
                },
            ],

            termsOptions: [],

            selectedCampus: null,
            campusOptions: [],

            title: {
                id: null,
                label: 'N/A'
            },
            fundSource: null,
            invoiceStatus: {
                id: null,
                label: 'N/A'
            },

            subTotal: 0,
            isTax: false,
            tax: null,
            charges: null,
            isCharges: false,
            note: '',
            invoiceMemo: '',

            invoiceId: null,

            showBudgetItemsPopup: false,
            openDeletePopup: false,

            isShowBillToModal: false,

            allocationOptions: [],
            fundSourceOptions: [],
            invoiceStatusOptions: [],

            billTo: {},

        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('togglePopup', false)
        },
        toggleBudgetItemsPopup(bool) {
            this.showBudgetItemsPopup = bool
            if(!bool) { this.getInvoiceById() } 
        },
        receiveAddress(info) {
            console.log("NEW ADDRESS", info)
            this.billTo = info
        },
        openDeleteModal(row) {
            this.openDeletePopup = true
            this.invoiceId = row.id
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
                for(let i=0; i<campuses.length; i++) {
                    arr.push({
                        id: campuses[i].id,
                        label: campuses[i].name
                    })
                }
                arr.unshift({ id: null, label: 'N/A' })
                this.campusOptions = arr
            })
        },
        getTerms() {

            const conf = {
                method: 'GET',
                url: config.getTerms,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('res:', res.data)
                let terms = res.data.terms
                let arr = []
                for(let i=0; i<terms.length; i++) {
                    arr.push({
                        id: terms[i].id,
                        label: terms[i].name
                    })
                }
                this.termsOptions = arr
            })
        },

        deleteItem() {

            this.loading = true

            const conf = {
                method: 'DELETE',
                url: config.deleteBudget + this.invoiceId,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let index = this.data.findIndex( item => item.id == this.invoiceId )
                this.data.splice(index, 1)
                    this.$q.notify({
                        message: 'Deleted!',
                        type: 'positive',
                    })
                    this.openDeletePopup = false
                    this.loading = false
                })
        },
        addInvoice() {
            
            const data = {

                number: this.internalInvoiceData[0].internalInvoice,
                
                invoice_term_id: this.internalInvoiceData[0].terms?.id,
                bill_to_id: this.billTo.id,
                ship_to_id: this.selectedSchool,
                subtotal: this.subtotal,

                due_date: this.internalInvoiceData[0].dueDate,
                date: this.internalInvoiceData[0].date,

                fund_source_id: this.fundSource ? this.fundSource.id : null,
                total_amount: this.total,

                invoice_status_id: this.invoiceStatus?.id,
                allocation_type_id: this.title?.id,

                note: this.note,
                memo: this.invoiceMemo,
                school_id: this.selectedSchool,
                campus_id: this.selectedCampus?.id

            }

            this.isTax ? data.tax = this.tax : null
            this.isCharges ? data.shipping_fee = this.charges : null

            const conf = {
                method: 'POST',
                url: config.addInvoice + this.title.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {

                let invoice = res.data.invoice[0]
                this.$emit('addInvoice', invoice)

                this.$q.notify({
                    message: 'Invoice Added!',
                    type: 'positive',
                })

                this.emitClosePopup()
            })



        },
        editInvoice() {

            const data = {

                number: this.internalInvoiceData[0].internalInvoice,
                
                invoice_term_id: this.internalInvoiceData[0].terms?.id,
                bill_to_id: this.billTo.id,
                ship_to_id: this.selectedSchool,
                subtotal: this.subtotal,

                due_date: this.internalInvoiceData[0].dueDate,
                date: this.internalInvoiceData[0].date,

                fund_source_id: this.fundSource ? this.fundSource.id : null,
                total_amount: this.total,

                invoice_status_id: this.invoiceStatus?.id,
                allocation_type_id: this.title?.id,

                note: this.note,
                memo: this.invoiceMemo,

            }

            this.isTax ? data.tax = this.tax : null
            this.isCharges ? data.shipping_fee = this.charges : null

            const conf = {
                method: 'PUT',
                url: config.editInvoice + this.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {

                let invoice = res.data.invoice[0]
                this.$emit('editInvoice', invoice)

                this.$q.notify({
                    message: 'Invoice Edited!',
                    type: 'positive',
                })

                this.emitClosePopup()

            })


        },
        getInvoiceById() {

            const conf = {
                method: 'GET',
                url: config.getInvoices + '/' + this.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let data = res.data.item[0]
                console.log('Get invoice by id -----', res.data.item[0])

                this.title = {
                    id: data.allocation?.id,
                    label: data.allocation?.name
                }

                this.fundSource = {
                    id: data.fund_source?.id,
                    label: data.fund_source?.name,
                    abbr: data.fund_source?.abbreviation,
                }

                this.invoiceStatus = {
                    id: data.invoice_status?.id,
                    label: data.invoice_status?.name
                }
                 
                this.internalInvoiceData = []
                this.internalInvoiceData.push({
                    internalInvoice: data.number,
                    invoiceDate: data.date,
                    totalDue: data.total_amount,
                    dueDate: data.due_date,
                    terms: {
                        id: data.invoice_term?.id,
                        label: data.invoice_term?.name
                    }
                })

                this.billTo = {
                    id: data.address?.id,
                    address: data.address?.address_line_1,
                    city: data.address?.city,
                    state: data.address?.state?.name,
                    zip: data.address?.postal_code,
                    phone: data.address?.phone,
                }

            
                // this.subtotal = res.data.item[0].subtotal

                if(res.data.item[0].isTaxTurnedOn == 1) {
                    this.isTax = true
                    this.tax = res.data.item[0].tax
                }

                if(res.data.item[0].isShipingTurnedOn == 1) {
                    this.isCharges = true
                    this.charges = res.data.item[0].shipping_fee
                }

                this.note = res.data.item[0].note

                this.invoiceMemo = res.data.item[0].memo

                this.schoolsOptions.push({
                    id: parseInt(res.data.item[0].school_id),
                    label: res.data.item[0].schoolName
                })
                this.selectedSchool = parseInt(res.data.item[0].school_id)

                this.selectedCampus = {
                    id: res.data.item[0]?.campus?.id,
                    label: res.data.item[0]?.campus?.name
                }


                let lineItems = res.data.item[0]?.line_item

               

                let arr = []
                for(let i=0; i<lineItems.length; i++) {
                     console.log('Rate',lineItems[i] )
                    arr.push({
                        id: lineItems[i].budget[0].id,
                        date: `${lineItems[i].budget[0].start_date}-${lineItems[i].budget[0].end_date}`,
                        description: lineItems[i].budget[0].name,
                        type: lineItems[i].budget[0].category?.abbreviation,
                        qty: lineItems[i].budget[0].quantity,
                        cost: lineItems[i].budget[0].unit_cost,
                        amount: lineItems[i].budget[0].unit_total_cost
                    })
                }
                this.data = arr
            })

        },

        showBillToModal() {
            this.isShowBillToModal = true
        },
        toggleBillToModal(bool) {
            this.isShowBillToModal = bool
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
        // Get Fund source
        getFundSource() {

            let id = this.title?.id

            const conf = {
                method: 'GET',
                url: config.getFundSourceByTitleId + id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                console.log('Fund source ===', res.data)

                let funds = res.data.fundSource
                let arr = []
                for(let i=0; i<funds.length; i++) {
                    arr.push({
                        id: funds[i].id,
                        label: funds[i].name,
                        abbr: funds[i].abbreviation
                    })
                }
                this.fundSourceOptions = arr
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
        invoiceStatusIcon(id) {
            
            // id: 1 : Created
            // id: 2 : Billed
            // id: 3 : Paid

            if(id) {
                
                const iconId = id
                let icon = null;

                switch(iconId) {
                    case 1:
                        icon = ICONS.created
                        break;
                    case 2:
                        icon = ICONS.billed
                        break;
                    case 3:
                        icon = ICONS.paid
                        break;
                }

                return icon

            }
        },
        invoiceStatusIconColor(id) {

            if(id) {

                const iconId = id
                let icon = null;

                switch(iconId) {
                    case 1:
                        icon = 'edx-icon-created'
                        break;
                    case 2:
                        icon = 'edx-icon-billed'
                        break;
                    case 3:
                        icon = 'edx-icon-paid'
                        break;
                }

                return icon

            }
        },

        checkType(type) {

            let className = ''
            
            switch(type) {
                case 'I':
                className = 'bg-edx-bg-i';
                break;

                case 'M':
                className = 'bg-edx-bg-m';
                break;

                case 'PD':
                className = 'bg-edx-bg-pd';
                break;

                case 'FE':
                className = 'bg-edx-bg-fe';
                break;

                default:
                className = '';
                break;
            }

            return className
        },

        resetState() {
            this.selectedSchool = null
            this.internalInvoiceData = [
                {
                    internalInvoice: 0,
                    invoiceDate: '',
                    totalDue: 0,
                    dueDate: '',
                    terms: {
                        id: null,
                        label: 'N/A'
                    }
                }
            ]
            this.data = []
            this.selectedCampus = null
            this.title = {
                id: null,
                label: 'N/A'
            }
            this.fundSource = null
            this.invoiceStatus = {
                id: null,
                label: 'N/A'
            }
            this.subTotal =  0
            this.isTax = false
            this.tax = null
            this.charges = null,
            this.isCharges = false
            this.note = '',
            this.invoiceMemo = ''
            this.billTo = {}

        }

    },
    computed: {
        showPopup() {
            return this.show
        },
        edit() {
            return ICONS.edit
        },
        total() {

            let tax = parseFloat(this.tax) 
            let charge = parseFloat(this.charges)

            if (isNaN(tax)) { tax = 0 }
            if (isNaN(charge)) { charge = 0 }



            return ( parseFloat(this.subTotal) + ( this.isTax ? (this.subTotal * tax) / 100  : 0) + ( this.isCharges ? charge : 0)).toFixed(2)
                
        },
        subtotal() {
            let count = 0;
            for(let i=0; i<this.data.length; i++) {
                count += parseFloat(this.data[i].amount)
            }
            this.subTotal = count
            return count.toFixed(2)
        },
        calculatedTax() {
            if(!this.isTax) {
                this.tax = 0
                return 0
            }else {
                return  (( this.subTotal * this.tax ) / 100).toFixed(2)
            }
        }
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)
            if(val && this.isEdit) {
                this.getInvoiceById()
            }else {
                this.resetState()
            }
        },
        selectedSchool(val) {
            if(val) {
                this.getCampusBySchoolId(val)
            }else {
                this.selectedCampus = null
            }
        }
    },
    created() {

        this.getTerms()
        this.getAllocations()
        this.getFundSource()
        this.getInvoiceStatus()
    }
}
</script>


<style scoped>
.w-80px {
    width: 80px;
}
.table-td-w {
    width: 300px; min-width: 300px; max-width: 300px;
}
</style>