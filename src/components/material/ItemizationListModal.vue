<template>
    <div>
        <dialog-draggable 
            :width="900" 
            :modelDialog="showPopup" 
            :title="`Itemization List`" 
            :icon="'money'"
        > 

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">
                        <div class="col-md-8"></div>
                        <div class="col-md-4">
                            <div class="text-right"><b>Total: $ <span>2590.00</span> </b></div>
                            <div class="text-right"><b>Total w/Markup: $ <span>3568.00</span> </b></div>
                        </div>

                        <div class="col-md-12 q-mt-md">
                            <q-table
                                class="overflow-auto"
                                :data="data" 
                                :columns="columns"
                                hide-bottom
                            >
                                <template v-slot:body="props">
                                    <q-tr :props="props" class="cursor-pointer">
                                        <q-td key="materialName" :props="props">
                                            <q-input dense outlined v-model="props.row.materialName" />
                                        </q-td>
                                        <q-td key="description" :props="props">
                                            <q-input dense outlined v-model="props.row.description" />
                                        </q-td>
                                        <q-td key="inventoryCategory" :props="props">
                                            <q-select dense outlined v-model="props.row.inventoryCategory" :options="inventoryCategoryOptions" />
                                        </q-td>
                                        <q-td key="qty"  :props="props" >

                                            <div class="row w-100">
                                                <div>{{props.row.qty ? props.row.qty : 0}}</div>
                                                <div v-if="props.row.qtyOptions " class="q-ml-sm"> {{ props.row.qtyOptions.label }} </div>
                                            </div>

                                            <q-popup-edit v-model="props.row.qty" v-if="props.row.qtyOptions" title="Update Quantity" buttons>

                                                <q-select class="q-mb-sm" v-model="props.row.qtyOptions" :options="options" dense outlined />
                                                <q-input v-if="props.row.qtyOptions.id != 3" type="number" class="q-mb-sm" v-model="props.row.qty" dense autofocus outlined />
                                                
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <q-input prefix="$" type="number" class="q-mb-sm q-pr-sm" v-model="props.row.amount" dense autofocus outlined />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <q-input prefix="%" type="number" class="q-mb-sm" v-model="props.row.percentage" dense autofocus outlined />
                                                    </div>
                                                </div>
                                                
                                            </q-popup-edit>

                                        </q-td>
                                        <q-td key="amount" :props="props">
                                            $ {{props.row.amount}}
                                            <q-popup-edit v-model="props.row.qty" v-if="props.row.qtyOptions" title="Update Quantity" buttons>

                                                <q-select class="q-mb-sm" v-model="props.row.qtyOptions" :options="options" dense outlined />
                                                <q-input v-if="props.row.qtyOptions.id != 3" type="number" class="q-mb-sm" v-model="props.row.qty" dense autofocus outlined />
                                                
                                                <div class="row">
                                                    <div class="col-md-8">
                                                        <q-input prefix="$" type="number" class="q-mb-sm q-pr-sm" v-model="props.row.amount" dense autofocus outlined />
                                                    </div>
                                                    <div class="col-md-4">
                                                        <q-input prefix="%" type="number" class="q-mb-sm" v-model="props.row.percentage" dense autofocus outlined />
                                                    </div>
                                                </div>
                                                
                                            </q-popup-edit>
                                        </q-td>
                                        <q-td key="total" :props="props">
                                            $ {{ (props.row.amount * props.row.qty) }}
                                        </q-td>
                                        <q-td key="wMarkup" :props="props">
                                            $ {{ props.row.wMarkup }}
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                        
                    </div>
                </div>
            </q-card-section>

            <q-card-actions class="row justify-between">
                <div class="q-ml-sm q-mb-sm">
                    <q-btn @click="addItem" icon="add" color="blue" size="md" round/>
                    <span class="q-ml-md">Add Item</span>
                </div>
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                    <q-btn @click="closePopup" flat label="Save" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

    </div>
</template>

<script>

import dialogDraggable from '../../components/DialogDraggable'

import axios from 'axios'
import config from '../../../config'


export default {
    props: {
        show: {
            required: true
        }
    },
    components: {
        dialogDraggable
    },

    data() {
        return {
            loading: false,

            options: [
                { id: 1, label: 'Qty'},
                { id: 2, label: 'Hours'},
                { id: 3, label: 'Cost'}
            ],

            data: [
                {
                    materialName: 'Chromebook',
                    description: 'Chromebook',
                    inventoryCategory: {
                        id: 1,
                        label: 'Technology'
                    },
                    qty: '1',
                    qtyOptions: { id: 1, label: 'hrs'},
                    amount: '120.00',
                    total: '120.00',
                    wMarkup: '134'
                },
                {
                    materialName: 'Chromebook',
                    description: 'Chromebook',
                    inventoryCategory: {
                        id: 1,
                        label: 'Technology'
                    },
                    qty: '1',
                    qtyOptions: { id: 1, label: 'Qty'},
                    amount: '120.00',
                    percentage: 0,
                    total: '120.00',
                    wMarkup: '134'
                },
                {
                    materialName: 'Chromebook',
                    description: 'Chromebook',
                    inventoryCategory: {
                        id: 1,
                        label: 'Technology'
                    },
                    qty: '1',
                    qtyOptions: { id: 1, label: 'Qty'},
                    amount: '120.00',
                    percentage: 0,
                    total: '120.00',
                    wMarkup: '134'
                },
            ],
            columns: [
                {
                    name: "materialName",
                    align: "left",
                    label: "Material Name",
                    field: "materialName",
                    sortable: true
                },
                {
                    name: "description",
                    align: "left",
                    label: "Description",
                    field: "description",
                    sortable: true
                },
                {
                    name: "inventoryCategory",
                    align: "left",
                    label: "Inventory Category",
                    field: "inventoryCategory",
                    sortable: true
                },
                {
                    name: "qty",
                    align: "left",
                    label: "Qty",
                    field: "qty",
                    sortable: true,
                    style: 'max-width: 90px; width: 90px'
                },
                {
                    name: "amount",
                    align: "left",
                    label: "Amount",
                    field: "amount",
                    sortable: true
                },
                {
                    name: "total",
                    align: "left",
                    label: "Total",
                    field: "total",
                    sortable: true
                },
                {
                    name: "wMarkup",
                    align: "left",
                    label: "w/Markup",
                    field: "wMarkup",
                    sortable: true
                }
            ],
            inventoryCategoryOptions: [
                {id: 1, label: 'Technology'},
                {id: 2, label: 'Technology 2'},
                {id: 3, label: 'Technology 3'},
                {id: 4, label: 'Technology 4'}
            ]
        }
    },
    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
        },
        addItem() {
            let newItemObj = {
                materialName: '',
                description: '',
                inventoryCategory: {
                    id: null,
                    label: ''
                },
                qty: 0,
                qtyOptions: { id: 1, label: 'Qty'},
                amount: '0.00',
                percentage: 0,
                total: '0.00',
                wMarkup: '0.00'
            }
            this.data.push(newItemObj)
        }
    },
    computed: {
        showPopup() {
            return this.show
        },
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)
        }
    }
}

</script>