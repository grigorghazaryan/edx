<template>
        <dialog-draggable
            :width="750" 
            :modelDialog="isShow" 
            :title="'Pay Schedule'" 
            @onHide="hidePopup"
            :icon="'attach_money'"
            :color="'green'"
        >

        <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
            <div class="row q-mr-lg q-ml-lg q-mb-lg q-mt-lg">
                <div class="col-md-6 q-pr-sm q-mb-md">
                    <div class="row items-center q-mb-sm">
                        <div class="text-subtitle2 q-mr-md">Billing Cycle</div>
                        <div class="w-100 row cursor-pointer h-popup">
                            <q-select 
                                class="full-width"
                                outlined
                                dense
                            />
                        </div>
                    </div>
                    <q-checkbox label="Schedule Transactions for billing" />
                </div>
                <div class="col-md-6 q-pr-sm q-mb-md">
                    <div class="row q-mt-lg">
                        <div class="col-md-9 q-pr-md text-right">Per Pay period:</div>
                        <div class="col-md-3"> <b>$ 49701</b> </div>
                    </div>
                    <div class="row">
                        <div class="col-md-9 q-pr-md text-right">Total Charge:</div>
                        <div class="col-md-3"> <b>$ 24850</b> </div>
                    </div>
                </div>

                <div class="col-md-12 q-mt-md">
                                        
                    <q-table
                        :data="data" 
                        :columns="columns"
                        hide-bottom
                    >
                        <!-- Table Body -->
                        <template v-slot:body="props">
                            <q-tr :props="props" class="cursor-pointer">
                                <q-td key="transaction" :props="props">
                                    {{props.row.transaction}}
                                </q-td>
                                <q-td key="date" :props="props">
                                    {{props.row.date}}
                                </q-td>
                                <q-td key="category" :props="props">
                                    
                                    <q-chip 
                                        square class="edx-bg-green"
                                        text-color="white"
                                    >
                                        <span>{{props.row.category}}</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>{{ props.row.category }}</strong>
                                        </q-tooltip>
                                    </q-chip>

                                </q-td>
                                <q-td key="amount" :props="props">
                                    $ {{props.row.amount}}
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>

            </div>
        </q-card-section>


       

        <q-card-actions class="row justify-end">
            <div>
                <q-btn flat @click="hidePopup" label="Cancel" color="primary" v-close-popup></q-btn>
            </div>
        </q-card-actions>

        </dialog-draggable>
</template>

<script>

import DialogDraggable from '../DialogDraggable.vue';

export default {
    name: 'PaySchedule',
    props: {
        show : {
            required : true,
            default: false
        }
    },
    components: {
        DialogDraggable
    },
    data() {
        return {
            data: [
                { 
                    transaction: 'Joe Biden', 
                    date: '10/09/20',
                    category: 'I',
                    amount: 42000
                },
                { 
                    transaction: 'Joe Biden', 
                    date: '10/09/20',
                    category: 'I',
                    amount: 42000
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
                    name: "category",
                    align: "left",
                    label: "Category",
                    field: "category",
                    sortable: true
                },
                {
                    name: "amount",
                    align: "left",
                    label: "Amount",
                    field: "amount",
                    sortable: true
                },
            ]
        }
    },
    methods: {
        hidePopup() {
            this.$emit('hidePaySchedulePopup', false);
        }
    },
    computed: {
        isShow() {
            return this.show
        }
    }
}
</script>