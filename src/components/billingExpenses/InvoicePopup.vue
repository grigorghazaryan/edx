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
                            <div class="row justify-between">
                                <div class="text-center q-mr-md"> 
                                    <div class="text-subtitle2 q-mb-sm">Allocation</div>
                                    <q-chip v-if="title" square color="edx-bg-pd">
                                        <span>{{ title.label }}</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>{{ title.label }}</strong>
                                        </q-tooltip>
                                    </q-chip>
                                </div>
                                <div class="text-center q-mr-md">
                                    <div class="text-subtitle2 q-mb-sm">Invoice Status</div>
                                    <div v-if="invoiceStatus">
                                        <q-chip square color="edx-bg-pd">
                                            <span>{{ invoiceStatus.label }}</span>
                                            <q-tooltip 
                                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                transition-show="flip-right"
                                                transition-hide="flip-left"
                                            >
                                                <strong>{{ invoiceStatus.label }}</strong>
                                            </q-tooltip>
                                        </q-chip>
                                    </div>
                                </div>
                                <div class="text-center">
                                    <div class="text-subtitle2 q-mb-sm">Founding source</div>
                                    <q-chip v-if="fundSource" square class="bg-edx-bg-wr">
                                        <span>{{ fundSource.abbr }}</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>{{ fundSource.label }}</strong>
                                        </q-tooltip>
                                    </q-chip>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="q-mb-lg">
                                <div class="text-subtitle2 q-mb-sm">Campus</div>
                                <q-select
                                    :disable="!selectedSchool"
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
                             <!-- <div class="row justify-start">
                                <div class="q-mr-md"> 
                                    <div class="text-subtitle2 q-mb-sm">Invoice Status</div>
                                    <div v-if="invoiceStatus">
                                        <q-chip square color="edx-bg-pd">
                                            <span>{{ invoiceStatus.label }}</span>
                                            <q-tooltip 
                                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                transition-show="flip-right"
                                                transition-hide="flip-left"
                                            >
                                                <strong>{{ invoiceStatus.label }}</strong>
                                            </q-tooltip>
                                        </q-chip>
                                    </div>
                                </div>
                            </div> -->
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4">
                            <div class="text-subtitle2 q-mb-sm">Bill to</div>
                            <div class="row justify-between">
                                <div>
                                    <div>1505 North 5th Street</div>
                                    <div>Milwaukee WI 53202</div>
                                    <div>414-805-8899</div>
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
                                                                <q-date v-model="props.row.invoiceDate">
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
                                                                <q-date v-model="props.row.dueDate">
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
                                                    <q-select outlined dense :options="termsOptions" v-model="props.row.terms.label" />
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
                                <q-table hide-bottom class="overflow-auto" :data="data" :columns="columns">
                                    <!-- Table Body -->
                                    <template v-slot:body="props">
                                        <q-tr :props="props">
                                            <q-td key="date" :props="props">
                                                {{props.row.date}}
                                            </q-td>
                                            <q-td key="description" 
                                            :style="{maxWidth: '350px', width: '350px'}" :props="props">
                                               <span class="inline-span">
                                                    {{props.row.description}}
                                               </span>
                                            </q-td>
                                            <q-td key="type" :props="props">
                                                <q-chip square class="bg-edx-bg-wr">
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
                                            <q-td key="rate" :props="props">
                                                {{props.row.rate}}
                                            </q-td>
                                            <q-td key="amount" :props="props">
                                                {{props.row.amount}}
                                            </q-td>
                                            <q-td>
                                                <q-btn @click="openDeleteModal" icon="delete" class="bg-edx-delete-btn" size="sm" round>
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
                                    <q-input prefix="$" outlined dense v-model="subtotal" />
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
                                    <q-input prefix="$" outlined dense v-model="tax" />
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
                                    <q-input prefix="$" outlined dense v-model="charges" />
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
                <q-btn label="Yes" color="edx-delete-btn" @click="deleteItem" />
                </q-card-actions>
            </q-card>
        </q-dialog>

        
        <BudgetItemsPopup
            @toggleBudgetItemsPopup="toggleBudgetItemsPopup" 
            :show="showBudgetItemsPopup"
            :categoryId="title"
            :invoiceId="showBudgetItemsPopup ? id : null"
        />

        <BillToModal 
            @toggleBillToModal="toggleBillToModal" 
            :show="isShowBillToModal" 
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
            selectedSchool: '',
            schoolsOptions: [],

            internalInvoiceData: [],
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
                    name: "rate",
                    align: "left",
                    label: "Rate",
                    field: "rate",
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
            campusOptions: [ ],

            title: null,
            fundSource: null,
            invoiceStatus: null,

            subtotal: null,
            isTax: false,
            tax: null,
            charges: null,
            isCharges: false,
            note: '',
            invoiceMemo: '',

            showBudgetItemsPopup: false,
            openDeletePopup: false,

            invoiceId: 0,

            isShowBillToModal: false

        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('togglePopup', false)
        },
        toggleBudgetItemsPopup(bool) {
            console.log(bool, 'Hello')
            this.showBudgetItemsPopup = bool
        },
        openDeleteModal() {
            this.openDeletePopup = true
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
            alert('Delete')
        },
        addInvoice() {
            alert('Add Invoice')
        },
        editInvoice() {
            alert('Edit Invoice')
        },
        getInvoiceById() {

            this.internalInvoiceData = []

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

                this.subtotal = res.data.item[0].subtotal

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


                let lineItems = res.data.item[0]?.line_item

                let arr = []
                for(let i=0; i<lineItems.length; i++) {
                    arr.push({
                        date: lineItems[i].budget[0].completed_date,
                        description: lineItems[i].budget[0].description,
                        type: lineItems[i].budget[0].category?.abbreviation,
                        qty: lineItems[i].budget[0].quantity,
                        rate: 4200,
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

            return parseFloat(this.subtotal) + 
                ( this.isTax ? tax : 0) + 
                ( this.isCharges ? charge : 0)
                
        }
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)
            if(val) {
                this.getInvoiceById()
            }
        },
        selectedSchool(val) {
            if(val) {
                this.getCampusBySchoolId(val.id)
            }else {
                this.selectedCampus = null
            }
        }
    },
    created() {
        this.invoiceId = this.id
        console.log('this.invoiceId', this.invoiceId)
        console.log('this.id', this.id)
        this.getTerms()
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