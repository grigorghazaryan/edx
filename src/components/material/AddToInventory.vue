<template>
    <div>
        <dialog-draggable 
            :width="850" 
            :modelDialog="showPopup" 
            :title="`Add to inventory`" 
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
                                            {{props.row.materialName}}
                                        </q-td>
                                        <q-td key="description" :props="props">
                                            {{props.row.description}}
                                        </q-td>
                                        <q-td key="inventoryCategory" :props="props">
                                            {{props.row.inventoryCategory.label}}
                                        </q-td>
                                        <q-td key="qty" :props="props">
                                            {{props.row.qty}}
                                        </q-td>
                                        <q-td key="amount" :props="props">
                                            $ {{props.row.amount}}
                                        </q-td>
                                        <q-td key="total" :props="props">
                                            $ {{ parseInt(props.row.qty) * parseInt(props.row.amount) }}
                                        </q-td>
                                        <q-td key="checked" :props="props">
                                            <q-checkbox v-model="props.row.checked" />
                                        </q-td>
                                    </q-tr>
                                </template>
                            </q-table>
                        </div>
                        
                    </div>
                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                    <q-btn @click="addToInventory" flat label="Add Selected" color="primary"></q-btn>
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

            data: [
                {
                    materialName: 'Chromebook',
                    description: 'Chromebook',
                    inventoryCategory: {
                        id: 1,
                        label: 'Technology'
                    },
                    qty: '1',
                    amount: '120.00',
                    total: '120.00',
                    checked: false
                },
                {
                    materialName: 'Chromebook',
                    description: 'Chromebook',
                    inventoryCategory: {
                        id: 1,
                        label: 'Technology'
                    },
                    qty: '1',
                    amount: '120.00',
                    total: '120.00',
                    checked: false
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
                    name: "total",
                    align: "left",
                    label: "Total",
                    field: "total",
                    sortable: true
                },
                {
                    name: "checked",
                    align: "left",
                    label: "",
                    field: "checked",
                    sortable: true
                }
            ]
        }
    },
    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
        },
        getItemizationLists() {

            const conf = {
                method: 'GET',
                url: `${config.getItemizationListsForInventory}${this.id}`,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let breakdownsArr = []
                let breakdowns = res.data.inventoryItems
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
                        percentage: breakdowns[i].markup_percentage,
                        checked: breakdowns[i].inventory == null ? false : true
                    })
                }

                this.data = breakdownsArr
            })
            
        },
        addToInventory() {

            let breakdowns = []

            for(let i=0; i<this.data.length; i++) {
                console.log(this.data)
                if(this.data[i].checked) {
                    breakdowns.push(this.data[i].id)
                }
            }

            const conf = {
                method: 'POST',
                url: config.addItemToInventory + this.id,
                headers: {
                    Accept: 'application/json',
                },
                data: {
                    breakdown: breakdowns,
                    token: localStorage.getItem('access-token'),
                }
            }

            axios(conf)
                .then(res => {

                    this.$q.notify({
                        message: 'Added!',
                        type: 'positive',
                    })

                    this.closePopup()
                })
        }
    },
    computed: {
        showPopup() {
            return this.show
        },
        total() {
            let count = 0
            for(let i=0; i<this.data.length; i++) {
                if(this.data[i].checked) {

                    if (count == '') {
                        count = 0
                    }

                    count += (parseFloat(this.data[i].amount) * parseFloat(this.data[i].qty))

                }

            }
            return count
        },
        totalMarkup() {

            let count = 0
            for(let i=0; i<this.data.length; i++) {

                if(this.data[i].checked) {
                    let uc = (parseFloat(this.data[i].amount) * parseFloat(this.data[i].qty)) + (parseFloat(this.data[i].amount) * parseFloat(this.data[i].qty) / parseFloat(this.data[i].percentage))
                    
                    if (isNaN(uc)) {
                        uc = 0
                    }

                    count += uc
                }
            
            }
            return count
        }  
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)

            if(val) {
                this.getItemizationLists()
            }
        }
    }
}

</script>