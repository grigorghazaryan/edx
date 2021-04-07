<template>
    
    <div>

        <dialog-draggable 
            :width="750" 
            :modelDialog="showPopup" 
            :title="'Budget Items'" 
            :icon="'attach_money'"
            :pagination.sync="pagination"
        >  

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="row">
                                <div class="col-md-6">
                                    <div class="q-mb-md">
                                        <div class="text-subtitle2 q-mb-sm">Start Date</div>
                                        <q-input outlined class="q-mr-md" dense v-model="start">
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
                                    </div>
                                </div>
                                <div class="col-md-6">
                                    <div class="q-mb-md">
                                        <div class="text-subtitle2 q-mb-sm">End Date</div>
                                        <q-input outlined class="q-mr-md" dense v-model="end">
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
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7 row justify-end items-center">
                                <b>Total selected: $ <span>24.765.78</span> </b>
                        </div>
                    </div>
                    <div class="row q-mt-md">
                        <q-table
                            class="overflow-auto"
                            :data="data" 
                            :columns="columns"
                            hide-bottom
                        >
                            <!-- Table Body -->
                            <template v-slot:body="props">
                                <q-tr :props="props" class="cursor-pointer">
                                    <q-td key="transaction" :props="props" style="white-space: initial;width: 350px; max-width: 350px;">
                                        <div class="inline-span">
                                            {{props.row.transaction}}
                                        </div>
                                    </q-td>
                                    <q-td key="date" :props="props">
                                        {{props.row.date}}
                                    </q-td>
                                    <q-td key="allocation" :props="props">
                                        {{props.row.allocation}}
                                    </q-td>
                                    <q-td key="type" :props="props">
                                        <q-chip square class="bg-edx-bg-wr">
                                            <span>{{props.row.type}}</span>
                                            <q-tooltip 
                                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                transition-show="flip-right"
                                                transition-hide="flip-left"
                                            >
                                                <strong>{{props.row.type}}</strong>
                                            </q-tooltip>
                                        </q-chip>
                                    </q-td>
                                    <q-td key="qty" :props="props">
                                        {{props.row.qty}}
                                    </q-td>
                                    <q-td key="balance" :props="props">
                                        {{props.row.balance}}
                                    </q-td>
                                    <q-td key="select" :props="props">
                                        <q-checkbox v-model="props.row.select" />
                                    </q-td>
                                </q-tr>
                            </template>

                        </q-table>
                    </div>
                </div>
            </q-card-section>


            <q-card-actions class="row justify-end">
                <div>
                    <q-btn flat label="Cancel" color="primary" @click="emitClosePopup"></q-btn>
                    <q-btn flat label="Add Selected" class="edx-add-btn q-ml-sm"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

    </div>

</template>

<script>
import dialogDraggable from '../../components/DialogDraggable'

export default {
    props: {
        show: {
            required: true
        }
    },
    data() {
        return {
            data: [
                {
                    transaction: "Teaching with Google Classroom, #2-197",
                    date: "10/09/2021",
                    type: "PD",
                    qty: 1,
                    balance: 42000,
                    select: true
                },
                {
                    transaction: "Teaching with Google Classroom, #2-197",
                    date: "09/11/2021",
                    type: "FE",
                    qty: 1,
                    balance: 89000,
                    select: false
                },
                {
                    transaction: "Teaching with Google Classroom, #2-197",
                    date: "10/09/2021",
                    type: "PD",
                    qty: 1,
                    balance: 42000,
                    select: true
                },
                {
                    transaction: "Teaching with Google Classroom, #2-197",
                    date: "09/11/2021",
                    type: "FE",
                    qty: 1,
                    balance: 89000,
                    select: false
                },
            ],
            columns: [
                {
                    name: "transaction",
                    align: "left",
                    label: "Transaction",
                    field: "transaction",
                    sortable: true
                },
                {
                    name: "date",
                    align: "left",
                    label: "Date",
                    field: "date",
                    sortable: true
                },
                {
                    name: "type",
                    align: "left",
                    label: "Type",
                    field: "type",
                    sortable: true
                },
                {
                    name: "qty",
                    align: "left",
                    label: "Qty",
                    field: "qty",
                    sortable: true
                },
                {
                    name: "balance",
                    align: "left",
                    label: "Balance",
                    field: "balance",
                    sortable: true
                },
                {
                    name: "select",
                    align: "left",
                    label: "Select",
                    field: "select",
                    sortable: true
                },
            ],
            pagination: { rowsPerPage: 999 },
            start: '',
            end: '',
        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('toggleBudgetItemsPopup', false)
        }
    },
    components: {
        dialogDraggable
    },
    computed: {
        showPopup() {
            return this.show
        }
    },
    watch: {
        show(val) {
            this.$emit('toggleBudgetItemsPopup', val)
        }
    }
}
</script>