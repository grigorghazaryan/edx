<template>
    <div>
        <dialog-draggable 
            :width="800" 
            :modelDialog="showPopup" 
            :title="`Licence`" 
            :icon="'dvr'"
        > 

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">

                        <div class="col-md-6 q-pr-sm">

                            <div class="row">
                                <div class="col-md-4">
                                    <div class="q-mb-md q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Qty</div>
                                        <q-input type="number" dense outlined v-model="editedData.quantity" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="q-mb-md q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Cost per License</div>
                                        <q-input type="number" prefix="$" dense outlined v-model="editedData.item_cost" />
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="q-mb-md">
                                        <div class="text-subtitle2 q-mb-sm">Total cost</div>
                                        <q-input prefix="$" dense standout="bg-teal text-white" disabled readonly 
                                        :value="isNaN(parseFloat(editedData.quantity * editedData.item_cost)) ? 0 : parseFloat(editedData.quantity * editedData.item_cost)" />
                                    </div>
                                </div>
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Name</div>
                                <q-input dense outlined v-model="editedData.Item_name" />
                            </div>


                        </div>

                        <div class="col-md-6 q-pl-sm">
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Supplier</div>
                                <q-select  
                                    dense
                                    outlined
                                    use-input
                                    hide-selected
                                    fill-input
                                    input-debounce="0"
                                    v-model="editedData.suplier_uni" 
                                    :options="optionsSupplier"
                                    @filter="filterSupplier"
                                >
                                    <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                        No results
                                        </q-item-section>
                                    </q-item>
                                    </template>

                                </q-select>
                            </div>

                            <div class="row">
                                <div class="col-md-6 q-pr-sm">
                                    <div class="q-mb-md">
                                        <div class="text-subtitle2 q-mb-sm">Date of Purchase</div>
                                        <q-input class="q-mr-md" outlined dense v-model="editedData.purchase_date">
                                            <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-date color="edx-pagination" v-model="editedData.purchase_date" mask="MM/DD/YYYY">
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
                                <div class="col-md-6 q-pl-sm">
                                    <div class="q-mb-md">
                                        <div class="text-subtitle2 q-mb-sm">Expiration Date</div>
                                        <q-input class="q-mr-md" outlined dense v-model="editedData.expiration_date">
                                            <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-date color="edx-pagination" v-model="editedData.expiration_date" mask="MM/DD/YYYY">
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

                        <div class="col-md-12">
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Note</div>
                                <q-input
                                    dense 
                                    outlined 
                                    type="textarea"
                                    v-model="editedData.note"
                                />
                            </div>
                        </div>

                    </div>

                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                    <q-btn :loading="loading" @click="addLicense" v-if="isEdit" flat label="Save" color="primary"></q-btn>
                    <q-btn :loading="loading" @click="addLicense" v-else flat label="Add" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

    </div>
</template>

<script>

import dialogDraggable from '../../components/DialogDraggable'

import axios from 'axios'
import config from '../../../config'

let oldObject = {}

export default {
    props: {
        show: {
            required: true
        },
        isEdit: {
            required: true
        },
        data: {
            required: true
        },
        tab: {
            required: true
        },
    },
    components: {
        dialogDraggable
    },

    data() {
        return {

            loading: false,
            editedData: {},

            optionsSupplier: [],
            optionsSupplierForFilter: [],

        }
    },
    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
        },
        addLicense() {

            let data = {
                school_id: this.$route.params.id,
                allocation_type_id: this.tab,
                quantity: this.editedData.quantity,
                item_name: this.editedData.Item_name,
                item_cost: this.editedData.item_cost,
                purchase_date: this.editedData.purchase_date,
                supplier_id: this.editedData.suplier_uni?.id,
                note: this.editedData.note,
                expiration_date: this.editedData.purchase_date
            }

            console.log(this.editedData)


            if(this.isEdit) {

                let id = this.editedData.id

                const conf = {
                    method: 'PUT',
                    url: config.getLicense + '/' + id,
                    headers: {
                    Accept: 'application/json',
                    },
                    data: data
                }

                axios(conf).then(res => {

                    this.$q.notify({
                        message: 'License updated successfully!',
                        type: 'positive',
                    })

                    this.$emit('updateTableList', true)
                    this.closePopup()

                })



            }else {

                const conf = {
                    method: 'POST',
                    url: config.getLicense,
                    headers: {
                        Accept: 'application/json',
                    },
                    data: data
                }

                axios(conf)
                .then(res => {

                    this.$q.notify({
                        message: 'License Added successfully!',
                        type: 'positive',
                    })

                    this.$emit('updateTableList', true)
                    this.closePopup()

                })


            }

        },
        getAdditionalInfo(type) {
            const conf = {
                method: 'GET',
                url: config.getAdditionalInfoForInventory + '/' + type,
                headers: {
                    Accept: 'application/json',
                }
            }
            axios(conf).then(res => {

                // Supplier
                let supplierArr = []
                for(let i=0; i<res.data.suppliers.length; i++) {
                    if(i < 30) {
                    let obj = {
                        id: res.data.suppliers[i].id,
                        label: res.data.suppliers[i].company_name,
                        value: res.data.suppliers[i].id
                    }
                    supplierArr.push(obj)
                    }
                }
                this.optionsSupplier = supplierArr
                this.optionsSupplierForFilter = supplierArr

            })
        },
        filterSupplier (val, update, abort) {
            update(() => {
                if(val) {
                    const needle = val.toLowerCase()
                    this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },
    },
    computed: {
        showPopup() {
            return this.show
        },
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)

            if(val) {
                this.getAdditionalInfo(this.tab)
            }
        }
    }
}

</script>