<template>
    <div>
        <dialog-draggable 
            :width="900" 
            :modelDialog="showPopup" 
            :title="'New Invoice'" 
            :icon="'description'"
        >  
            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">

                    <div class="row">
                        <div class="col-md-4">
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Bill to</div>
                                <q-select
                                    class="q-mr-md w-100"
                                    outlined 
                                    dense 
                                    v-model="billTo" 
                                    :options="billToOptions" 
                                />
                            </div>
                        </div>
                        <div class="col-md-4"></div>
                        <div class="col-md-4">
                            <div class="row justify-end">
                                <div class="text-center q-mr-md"> 
                                    <div class="text-subtitle2 q-mb-sm">Allocation</div>
                                    <q-chip square color="edx-bg-pd">
                                        <span>Title I</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>Title I</strong>
                                        </q-tooltip>
                                    </q-chip>
                                </div>
                                <div class="text-center">
                                    <div class="text-subtitle2 q-mb-sm">Founding source</div>
                                    <q-chip square class="bg-edx-bg-wr">
                                        <span>WR</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>Well Rounded</strong>
                                        </q-tooltip>
                                    </q-chip>
                                </div>
                            </div>
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
                                <div>
                                    <q-icon :name="edit" class="edx-icon-edit cursor-pointer"/>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-10">
                            <div class="q-mt-lg">
                                    <q-table hide-bottom class="overflow-auto" :data="internalInvoiceData" :columns="internalInvoiceColumns">
                                        <!-- Table Body -->
                                        <template v-slot:body="props">
                                            <q-tr :props="props">
                                                <q-td key="internalInvoice" :props="props">
                                                    <q-input dense outlined v-model="props.row.internalInvoice" />
                                                </q-td>
                                                <q-td key="invoiceDate" :props="props">
                                                    {{props.row.invoiceDate}}
                                                </q-td>
                                                <q-td key="totalDue" :props="props">
                                                    {{props.row.totalDue}}
                                                </q-td>
                                                <q-td key="dueDate" :props="props">
                                                    {{props.row.dueDate}}
                                                </q-td>
                                                <q-td key="terms" :props="props">
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
                                            <q-td key="description" :props="props">
                                                {{props.row.description}}
                                            </q-td>
                                            <q-td key="type" :props="props">
                                                {{props.row.type}}
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
                                                <q-btn icon="delete" class="bg-edx-delete-btn" size="sm" round>
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
                                <div> <b> $ 24.850.43</b></div>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="q-mt-lg">
                                <div class="text-subtitle2 q-mb-sm">Note</div>
                                <q-input type="textarea" outlined v-model="note" />
                            </div>
                        </div>
                    </div>

                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn flat label="Cancel" color="primary" @click="emitClosePopup"></q-btn>
                    <!-- <q-btn v-if="!isEditSchedule" flat label="Confirm" color="primary"></q-btn>
                    <q-btn v-else flat label="Save" color="primary"></q-btn> -->
                    <q-btn flat label="Save" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

        <BudgetItemsPopup 
            @closeBudgetitemsPopup="closeBudgetItemsPopup" 
            :show="showBudgetItemsPopup"
        />
    </div>
</template>

<script>

import ICONS from '../../../icons'
import dialogDraggable from '../../components/DialogDraggable'
import BudgetItemsPopup from './BudgetItemsPopup';

export default {
    
    props: {
        show: {
            required: true
        }
    },
    components: {
        dialogDraggable,
        BudgetItemsPopup
    },
    data() {
        return {
            billTo: '',
            billToOptions: ['Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'],

            internalInvoiceData: [
                {
                    internalInvoice: 'APA THUG KID 2-657',
                    invoiceDate: '14/06/1965',
                    totalDue: '80.000.000',
                    dueDate: '14/06/1965',
                    terms: {
                        id: 1,
                        label: 'Net 30'
                    }
                },
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

            data: [
                {
                    date: '14/06/1965',
                    description: 'Teaching with Google Classrom, #2-197',
                    type: 'PD',
                    qty: 1,
                    rate: 4200,
                    amount: 42000
                },
                {
                    date: '14/06/1965',
                    description: 'Teaching with Google Classrom, #2-197',
                    type: 'PD',
                    qty: 1,
                    rate: 4200,
                    amount: 42000
                },
            ],
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
                    sortable: false
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

            termsOptions: [
                { id: 3, label: 'JoJo' },
                { id: 44, label: 'MoMo' },
                { id: 1, label: 'Net 30' },
            ],

            subtotal: '24.567.89',
            isTax: false,
            tax: '24.567.89',
            charges: '24.567.89',
            isCharges: false,
            note: '',

            showBudgetItemsPopup: false,

        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('togglePopup', false)
        },
        closeBudgetitemsPopup(bool) {
            this.showBudgetItemsPopup = bool
        }
    },
    computed: {
        showPopup() {
            return this.show
        },
        edit() {
            return ICONS.edit
        },
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)
        }
    }
}
</script>