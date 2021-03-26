<template>
    <div>

        <q-table
            :data="data"
            :columns="columns"
            row-key="id"
            hide-bottom
            class="no-shadow"
            :pagination.sync="pagination"
        >
            <template v-slot:body="props">

                <q-tr :props="props">

                    <q-td key="address1" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.address1 }}
                        </div>
                    </q-td>

                    <q-td key="address2" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.address2 }}
                        </div>
                    </q-td>

                    <q-td key="city" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.city }}
                        </div>
                    </q-td>

                    <q-td key="state" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.state.label }}
                        </div>
                    </q-td>

                    <q-td key="zip" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.zip }}
                        </div>
                    </q-td>

                    <q-td key="phone" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.phone }}
                        </div>
                    </q-td>

                    <q-td key="fax" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.fax }}
                        </div>
                    </q-td>

                    <q-td key="type" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.type.label }}
                        </div>
                    </q-td>

                    <q-td key="action" :props="props">
                        <q-fab padding="xs" color="edx-action-btn" icon="keyboard_arrow_up" direction="up">
                            
                            <q-fab-action
                                icon="edit"
                                color="edx-edit-btn" 
                                size=sm 
                                no-caps
                                round 
                                class="q-mr-sm"
                                @click="openEditAddressPopup(props.row, props.rowIndex)"
                            >
                                <q-tooltip 
                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                    transition-show="flip-right"
                                    transition-hide="flip-left"
                                >
                                    <strong>Edit</strong>
                                </q-tooltip>
                            </q-fab-action>

                            <q-fab-action
                                icon="delete_forever"
                                color="edx-delete-btn" 
                                size=sm 
                                no-caps
                                round 
                                @click="isDeleteAddressOpened=true, address=props.row"
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

        <div class="q-mt-md q-mb-sm q-ml-md">
            <q-btn @click="isAddAddressOpened = true" icon="add" class="edx-add-btn" text-color="white" round/>
        </div>

        <dialog-draggable 
            :width="600" 
            :modelDialog="isAddAddressOpened" 
            :title="edit ? 'Edit Address' : 'Add Address'" 
            @onHide="isAddAddressOpened=false"
        >
             <div class="q-pa-md"> 
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <div class="text-subtitle2">Address Line 1</div>
                        <q-input outlined dense v-model="address.address1"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <div class="text-subtitle2">Address Line 2</div>
                        <q-input outlined dense v-model="address.address2"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-5 q-mb-sm q-pr-sm">
                        <div class="text-subtitle2">City</div>
                        <q-input outlined dense v-model="address.city"/>
                    </div>
                    <div class="col-md-5 q-mb-sm q-pr-sm">
                        <div class="text-subtitle2">State</div>
                        <q-select outlined dense v-model="address.state" :options="states" label="State" />
                    </div>
                    <div class="col-md-2 q-mb-sm">
                        <div class="text-subtitle2">Zip</div>
                        <q-input outlined dense v-model="address.zip"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <div class="text-subtitle2">Phone</div>
                        <q-input outlined dense v-model="address.phone"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <div class="text-subtitle2">Fax</div>
                        <q-input outlined dense v-model="address.fax"/>
                    </div>
                </div>
                <div class="row">
                    <div class="col-md-12">
                        
                        <div class="text-subtitle2">Type</div>
                        <q-select outlined dense v-model="address.type" :options="types" label="Type" />
                    </div>
                </div>
            </div>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup @click="edit=false"/>
                <q-btn v-if="edit" flat label="Save" color="primary" @click="editAddress"/>
                <q-btn v-else flat label="Add" color="primary" @click="addAddress"/>
            </q-card-actions>

        </dialog-draggable>

        <q-dialog v-model="isDeleteAddressOpened" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <span class="q-ml-sm">Are you sure to delete this Address?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="No, thanks" color="edx-delete-btn" v-close-popup />
                    <q-btn label="Yes" color="red" @click="removeAddress" />
                </q-card-actions>
            </q-card>
        </q-dialog>
        
    </div>
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import dialogDraggable from '../../components/DialogDraggable'

export default {  
    components: {
      dialogDraggable
    },
    props: {
        addressData: {
            required: true
        },
        statesData: { 
            required: true
        },
        type: {
            required: true
        },
        id: {
            required: false
        }
    },
    data() {
        return {
            data: [],
            columns: [
                {
                    name: "address1",
                    align: "left",
                    label: "Address Line 1",
                    field: "address1",
                    sortable: true
                },
                {
                    name: "address2",
                    align: "left",
                    label: "Address Line 2",
                    field: "address2",
                    sortable: true
                },
                {
                    name: "city",
                    align: "left",
                    label: "City",
                    field: "city",
                    sortable: true
                },
                {
                    name: "state",
                    align: "left",
                    label: "State",
                    field: "state",
                    sortable: true
                },
                {
                    name: "zip",
                    align: "left",
                    label: "Zip Code",
                    field: "zip",
                    sortable: true
                },
                {
                    name: "phone",
                    align: "left",
                    label: "Phone",
                    field: "phone",
                    sortable: true
                },
                {
                    name: "fax",
                    align: "left",
                    label: "Fax",
                    field: "fax",
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
                    name: "action",
                    align: "left",
                    label: "Actions",
                    field: "action",
                    sortable: true
                }
            ],
            pagination: { rowsPerPage: 1000 },
            isAddAddressOpened: false,
            isDeleteAddressOpened: false,
            states: [],
            types: [],
            address: {
                address1: '',
                address2: '',
                city: '',
                state: null,
                zip: '',
                phone: '',
                fax: '',
                type:  null
            },
            edit: false,
        }
    },
    methods: {
        getAddressTypes() {

            console.log('get addressses types')

            const conf = {
                method: 'GET',
                url: config.getAddressTypes,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let types = res.data.types, typesArr = [];

                for(let i=0; i<types.length; i++) {
                    typesArr.push({
                        id: types[i].id,
                        label: types[i].name
                    })
                }

                this.types = typesArr
            })

            console.log('asdasdasdasd', this.types)
        },
        openEditAddressPopup(address, index) {
            this.edit = true
            this.isAddAddressOpened = true
            this.address = {...address}
            this.index = index
        },
        addAddress() {

            let endPoint;
            if(this.type == 1) {
                endPoint = config.addSchoolAddress + this.$route.params.id
            }
            if(this.type == 2) {
                endPoint = config.addCampusAddress + this.id
            }
            if(this.type == 3) {
                endPoint = config.addVendorAddress + this.$route.params.id
            }

            let data = {
                address_line_1: this.address.address1,
                address_line_2: this.address.address2,
                city: this.address.city,
                state_id: this.address.state.id,
                postal_code: this.address.zip,
                phone: this.address.phone,
                fax: this.address.fax,
                address_type_id: this.address.type.id,
            }

            const conf = {
                method: 'POST',
                url: endPoint,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {

                let address = res.data.address

                this.data.push({
                    id: address.id,
                    address1: address.address_line_1,
                    address2: address.address_line_2,
                    city: address.city,
                    state: {
                        id: address.state.id,
                        label: address.state.name
                    },
                    zip: address.postal_code,
                    phone: address.phone,
                    fax: address.fax,
                    type: {
                        id: address.type.id,
                        label: address.type.name
                    }
                })
                
                this.$q.notify({
                    message: 'Address addes successfully!',
                    type: 'positive',
                })

                this.isAddAddressOpened = false

            })

        },
        editAddress() {

            let endPoint;
            if(this.type == 3) {
                endPoint = config.editVendorAddress + this.address.id
            }else {
                endPoint = config.editAddress + this.address.id
            }
            
            let data = {
                address_line_1: this.address.address1,
                address_line_2: this.address.address2,
                city: this.address.city,
                state_id: this.address.state.id,
                postal_code: this.address.zip,
                phone: this.address.phone,
                fax: this.address.fax,
                address_type_id: this.address.type.id,
            }

            const conf = {
                method: 'PUT',
                url: endPoint,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {

                let address = res.data.address

                let editedAddress = {
                    id: address.id,
                    address1: address.address_line_1,
                    address2: address.address_line_2,
                    city: address.city,
                    state: {
                        id: address.state.id,
                        label: address.state.name
                    },
                    zip: address.postal_code,
                    phone: address.phone,
                    fax: address.fax,
                    type: {
                        id: address.type.id,
                        label: address.type.name
                    }
                }

                this.data = Object.assign( [], this.data, { [this.index]: editedAddress } ) 

                this.$q.notify({
                    message: 'Address edited successfully!',
                    type: 'positive',
                })

                this.isAddAddressOpened = false
            })
        },
        removeAddress() {

            let endPoint;
            if(this.type == 1) {
                endPoint = config.removeAddress + this.address.id + '/' + this.$route.params.id
            }
            if(this.type == 2) {
                endPoint = config.removeCampusAddress + this.address.id + '/' + this.id
            }
            if(this.type == 3) {
                endPoint = config.removeVendorAddress + this.address.id + '/' + this.$route.params.id
            }

            const conf = {
                method: 'DELETE',
                url: endPoint,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                const index = this.data.indexOf(this.address)
                this.data.splice(index, 1)

                this.$q.notify({
                    message: 'Address Deleted!',
                    type: 'positive',
                })

                this.isDeleteAddressOpened = false

            })
        },
        clearInputValues() {
            this.address = {
                address1: '',
                address2: '',
                city: '',
                state: null,
                zip: '',
                phone: '',
                fax: '',
                type:  null
            }
        }
    },
    created() {

        this.states = this.statesData
        let data = this.addressData, dataArr = [];

        for(let i=0; i<data.length; i++) {
            dataArr.push({
                id: data[i].address.id,
                address1: data[i].address.address_line_1,
                address2: data[i].address.address_line_2,
                city: data[i].address.city,
                state: {
                    id: data[i].address.state && data[i].address.state.id,
                    label: data[i].address.state && data[i].address.state.name
                },
                zip: data[i].address.postal_code,
                phone: data[i].address.phone,
                fax: data[i].address.fax,
                type: {
                    id: data[i].address.type.id,
                    label: data[i].address.type.name
                }
            })
        }
        this.data = dataArr

        this.getAddressTypes()
    },
    watch: {
        isAddAddressOpened(val) {
            if(!val) {
                this.clearInputValues()
            }
        }
    }
}
</script>