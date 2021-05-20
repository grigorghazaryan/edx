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
                            <div class="text-right"><b>Total: $ <span>{{ total }}</span> </b></div>
                            <div class="text-right"><b>Total w/Markup: $ <span>{{ totalMarkup }}</span> </b></div>
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
                                            <div>{{ props.row.materialName }}</div>
                                            <q-popup-edit v-model="props.row.materialName" title="Material Name" buttons>
                                                <q-input dense outlined v-model="props.row.materialName" />
                                            </q-popup-edit>
                                        </q-td>
                                        <q-td key="description" :props="props">
                                            <div>{{ props.row.description }}</div>
                                            <q-popup-edit v-model="props.row.materialName" title="Description" buttons>
                                                <q-input type="textarea" dense outlined v-model="props.row.description" />
                                            </q-popup-edit>
                                        </q-td>
                                        <q-td key="inventoryCategory" :props="props">
                                            <div>{{ props.row.inventoryCategory.label }}</div>
                                             <q-popup-edit v-model="props.row.inventoryCategory" title="Inventory Category" buttons>
                                                <q-select dense outlined v-model="props.row.inventoryCategory" :options="inventoryCategories" />
                                            </q-popup-edit>
                                        </q-td>
                                        <q-td key="qty" :props="props" >

                                                <div class="row">
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
                                            $ {{ (parseFloat(props.row.amount) * parseFloat(props.row.qty)) }}
                                        </q-td>
                                        <q-td key="wMarkup" :props="props">
                                            $ {{ (parseFloat(props.row.amount) * parseFloat(props.row.qty)) + ((parseFloat(props.row.amount) * parseFloat(props.row.qty)) / parseFloat(props.row.percentage)) }}
                                        </q-td>
                                        <q-td key="action" :props="props">

                                            <q-fab padding="xs" @click.stop color="edx-action-btn" icon="toc" active-icon="menu_open"  direction="left">
                            
                                                <q-fab-action
                                                    icon="content_copy"
                                                    color="edx-duplicate-btn" 
                                                    size=sm 
                                                    no-caps
                                                    round 
                                                    class="q-mr-sm"
                                                    @click="openDuplicatePopup(props.row)"
                                                >
                                                    <q-tooltip 
                                                        anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                        transition-show="flip-right"
                                                        transition-hide="flip-left"
                                                    >
                                                        <strong>Duplicate</strong>
                                                    </q-tooltip>
                                                </q-fab-action>

                                                <q-fab-action
                                                    icon="delete_forever"
                                                    color="edx-delete-btn" 
                                                    size=sm 
                                                    no-caps
                                                    round
                                                    @click="openDeleteModal(props.row)" 
                                                >
                                                    <q-tooltip 
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
                    <q-btn @click="addItemization" flat label="Save" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure to delete this item?</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteItem" />
                </q-card-actions>
            </q-card>
        </q-dialog>
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
        },
        inventoryCategories: {
            required: true
        },
        id: {
            required: true
        }
    },
    components: {
        dialogDraggable
    },

    data() {
        return {
            loading: false,

            options: [],

            data: [
                // {
                //     materialName: 'Chromebook',
                //     description: 'Chromebook',
                //     inventoryCategory: {
                //         id: 1,
                //         label: 'Technology'
                //     },
                //     qty: '1',
                //     qtyOptions: { id: 1, label: 'Qty'},
                //     amount: '120.00',
                //     total: '120.00',
                //     wMarkup: '134'
                // },
                // {
                //     materialName: 'Chromebook',
                //     description: 'Chromebook',
                //     inventoryCategory: {
                //         id: 1,
                //         label: 'Technology'
                //     },
                //     qty: '1',
                //     qtyOptions: { id: 1, label: 'Qty'},
                //     amount: '120.00',
                //     percentage: 0,
                //     total: '120.00',
                //     wMarkup: '134'
                // },
                // {
                //     materialName: 'Chromebook',
                //     description: 'Chromebook',
                //     inventoryCategory: {
                //         id: 1,
                //         label: 'Technology'
                //     },
                //     qty: '1',
                //     qtyOptions: { id: 1, label: 'Qty'},
                //     amount: '120.00',
                //     percentage: 0,
                //     total: '120.00',
                //     wMarkup: '134',
                //     style: 'max-width: 60px; width: 60px;'
                // },
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
                },
                {
                    name: "action",
                    align: "left",
                    label: "Action",
                    field: "action",
                    sortable: true
                }
            ],

            confirm: false,
            deletedId: null,
        }
    },
    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
        },
        getUnits() {
            
            const conf = {
                method: 'GET',
                url: `${config.getUnits}`,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('get units', res.data)
                let units = res.data.unity
                let unitsArr = []
                for(let i=0; i<units.length; i++) {
                    unitsArr.push({
                        id: units[i].id,
                        label: units[i].abbreviation
                    })
                }
                this.options = unitsArr
            })
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
                amount: 0,
                percentage: 0

            }

            console.log(newItemObj)

            this.data.push(newItemObj)

        },
        getItemizationLists() {

            const conf = {
                method: 'GET',
                url: `${config.getItemizationLists}${this.id}`,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('itemization data = ', res.data)
                let breakdownsArr = []
                let breakdowns = res.data.breakdown
                for(let i=0; i<breakdowns.length; i++) {
                    breakdownsArr.push({
                        id: breakdowns[i].id,
                        materialName: breakdowns[i].name,
                        description: breakdowns[i].description,
                        inventoryCategory: {
                            id: breakdowns[i].inventory_category?.id,
                            label: breakdowns[i].inventory_category?.name
                        },
                        amount: breakdowns[i].unit_cost,
                        qty: breakdowns[i].quantity,
                        qtyOptions: { 
                            id: breakdowns[i].unit?.id, 
                            label: breakdowns[i].unit?.abbreviation
                        },
                        percentage: breakdowns[i].markup_percentage
                    })
                }

                this.data = breakdownsArr
            })
            
        },
        addItemization() {

            console.log('data', this.data)

            let breakdowns = []

            for(let i=0; i<this.data.length; i++) {
                breakdowns.push({
                    name : this.data[i].materialName, 
                    description: this.data[i].description,
                    inventory_category_id: this.data[i].inventoryCategory?.id,
                    quantity: this.data[i].qty,
                    unit_cost : this.data[i].amount,
                    unit_id: this.data[i].qtyOptions?.id,
                    markup_percentage: this.data[i].percentage,
                })
            }



            const conf = {
                method: 'POST',
                url: config.addItemizationItem + this.id,
                headers: {
                    Accept: 'application/json',
                },
                data: {
                    breakdown: breakdowns
                }
            }

            axios(conf)
                .then(res => {
                    console.log('added', res.data)
                    this.closePopup()
                })
        
        },

        openDeleteModal(row) {
            this.confirm = true
            this.deletedId = row.id
        },
        deleteItem() {
            
            const conf = {
                method: 'DELETE',
                url: config.deleteItemizationItem + this.deletedId,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                // const index = this.data.indexOf(this.editedItem)
                // this.data.splice(index, 1)
                    this.$q.notify({
                        message: 'Deleted!',
                        type: 'positive',
                    })

                    this.getItemizationLists()
                })
        },

        openDuplicatePopup(row) {

            delete row.id
            let newData = JSON.stringify(row)
            newData = JSON.parse(newData)
            
            this.data.push(newData)
        }
    },
    computed: {
        showPopup() {
            return this.show
        },
        total() {
            let count = 0
            for(let i=0; i<this.data.length; i++) {

                if (count == '') {
                    count = 0
                }

                count += (parseFloat(this.data[i].amount) * parseFloat(this.data[i].qty))
            }
            return count
        },
        totalMarkup() {

            let count = 0
            for(let i=0; i<this.data.length; i++) {

                

                let uc = (parseFloat(this.data[i].amount) * parseFloat(this.data[i].qty)) + (parseFloat(this.data[i].amount) * parseFloat(this.data[i].qty) / parseFloat(this.data[i].percentage))
                
                if (isNaN(uc)) {
                    uc = 0
                }

                count += uc
            }
            return count
        }   
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)

            if(val) {
                this.getItemizationLists()
                this.getUnits()
            }
        }
    }
}

</script>