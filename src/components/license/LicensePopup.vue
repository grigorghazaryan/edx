<template>
    <div>
        <dialog-draggable 
            :width="800" 
            :modelDialog="showPopup" 
            :title="`Licence & Subscription`" 
            :icon="'dvr'"
        > 

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">

                        <div class="col-md-6 q-pr-sm">
                            
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Item name</div>
                                <q-input ref="statusRef" dense outlined v-model="editedData.item_name" />
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Item description</div>
                                <q-input 
                                    type="textarea"
                                    dense
                                    outlined
                                    rows="2"
                                    v-model="editedData.description"
                                />
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Campus</div>
                                <q-select  
                                    dense
                                    outlined
                                    fill-input
                                    input-debounce="0"
                                    v-model="editedData.campus_uni" 
                                    :options="optionsCampus"
                                />
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Provider</div>
                                <q-select  
                                    dense
                                    outlined
                                    use-input
                                    hide-selected
                                    fill-input
                                    input-debounce="0"
                                    v-model="editedData.inventory_supplier_uni" 
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

                            <div class="q-mb-md">
                                <div class="row">
                                    <div class="col-md-4 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Quantity</div>
                                        <q-input type="number" dense outlined v-model="editedData.quantity" />
                                    </div>
                                    <div class="col-md-4 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Item Cost</div>
                                        <q-input type="number" prefix="$" dense outlined v-model="editedData.item_cost" />
                                    </div>
                                    <div class="col-md-4">
                                        <div class="text-subtitle2 q-mb-sm">Total</div>
                                        <q-input prefix="$" dense outlined disable filled readonly 
                                        :value="isNaN(editedData.item_cost * editedData.quantity) ? 0 : (editedData.item_cost * editedData.quantity).toFixed(2)" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-6 q-pl-sm">

                            <div class="q-mb-md">
                                <div class="row">
                                    <div class="col-md-4 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Purchase Date</div>
                                        <q-input v-model="editedData.purchase_date" dense outlined />
                                        <q-popup-proxy>
                                            <q-date color="edx-pagination" v-model="editedData.purchase_date" mask="MM/DD/YYYY">
                                                <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Cancel" color="primary" flat v-close-popup />
                                                <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </div>
                                    <div class="col-md-4">
                                        <div class="text-subtitle2 q-mb-sm">Expiration Date</div>
                                        <q-input v-model="editedData.expiration_date" dense outlined />
                                        <q-popup-proxy>
                                            <q-date color="edx-pagination" v-model="editedData.expiration_date" mask="MM/DD/YYYY">
                                                <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Cancel" color="primary" flat v-close-popup />
                                                <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 q-pr-sm q-mt-md">
                                        <div class="text-subtitle2 q-mb-sm">Renewal Date</div>
                                        <q-input v-model="editedData.renewal_date" dense outlined />
                                        <q-popup-proxy>
                                            <q-date color="edx-pagination" v-model="editedData.renewal_date" mask="MM/DD/YYYY">
                                                <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Cancel" color="primary" flat v-close-popup />
                                                <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-5 q-pr-sm q-mt-md">
                                        <div class="text-subtitle2 q-mb-sm">Type</div>
                                        <q-select dense outlined v-model="editedData.status" :options="statusOptions" />
                                    </div>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-subtitle2 q-mb-sm">Note</div>
                            <q-input cols="5" type="textarea" dense outlined v-model="editedData.note" />
                        </div>
                    </div>

                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                    <q-btn :loading="loading" @click="addLicense" v-if="!isEdit" flat label="Save" color="primary"></q-btn>
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
        isDuplicate: {
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

            statusOptions: [],
            optionsCampus: [],

        }
    },

    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
        },
        addLicense() {

        
            let data = {

                token: localStorage.getItem('access-token'),

                school_id: this.$route.params.id,
                allocation_type_id: parseInt(this.tab),
                quantity: this.editedData.quantity,
                item_name: this.editedData.item_name,
                item_cost: this.editedData.item_cost,
                purchase_date: this.editedData.purchase_date,
                supplier_id: this.editedData.inventory_supplier_uni.id,
                note: this.editedData.note,
                expiration_date: this.editedData.expiration_date,
                renewal_date: this.editedData.renewal_date,
                campus_id: this.editedData.campus_uni.id,
                is_subscription: this.editedData.status.id,
                description: this.editedData.description,

            }


            if(!this.isEdit) {

                // edit

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

                // Add
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
                    // if(i < 30) {
                        let obj = {
                            id: res.data.suppliers[i].id,
                            label: res.data.suppliers[i].company_name || '',
                            value: res.data.suppliers[i].id
                        }
                        supplierArr.push(obj)
                    // }
                }
                this.optionsSupplier = supplierArr
                this.optionsSupplierForFilter = supplierArr

            })
        },
        filterSupplier (val, update, abort) {
            update(() => {
                if(val) {
                    const needle = val.toLowerCase()
                    this.optionsSupplier = this.optionsSupplierForFilter.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },

        getStatus() {

            const conf = {
                method: 'GET',
                url: config.getLicenseStatus,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let status = []
                
                for(let i=0; i<res.data.status.length; i++) {
                    status.push({
                        id: res.data.status[i].id,
                        label: res.data.status[i].name || '',
                    })
                }
                this.statusOptions = status

            })
        },
        getCampueses() {

            const conf = {
                method: 'GET',
                url: config.getCampuses + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }
            axios(conf).then(res => {
                
                const campuses = res.data[0].campus;
                let campusesArr = [{ id: null, label: 'N/A'  }];

                for(let i=0; i<campuses.length; i++) {
                    campusesArr.push({
                        id: campuses[i].id,
                        label: campuses[i].name
                    })
                }

                this.optionsCampus = campusesArr
            });

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
                this.getStatus()
                this.getCampueses()

                if(this.isEdit && !this.isDuplicate) {
                    this.editedData = {
                        quantity: '',
                        item_cost: '',
                        Item_name: '',
                        Supplier: { id: null, label: null },
                        campus_uni: { id: null, label: 'N/A' },
                        purchase_date: '',
                        expiration_date: '',
                        note: ''
                    }
                }else {
                    this.editedData = this.data
                }
                
            }
        }
    },


}

</script>