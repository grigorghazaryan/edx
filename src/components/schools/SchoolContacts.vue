<template>
    <div class="q-mt-md">

        <div class="row justify-between align-center q-pr-lg q-pl-lg">

           <div class="text-subtitle1 row justify-start items-center">
                <q-icon class="q-mr-sm" name="contact_phone"  color="green" style="font-size: 1.5em"/>
                <b>School Contacts</b>
            </div>

            <q-btn @click="isShowAddContactPopup=true" class="edx-add-btn" text-color="white" label="Add contact" />

        </div>

        <q-separator class="q-mt-sm"/>

        <div class="row">
            <div class="col-md-10">
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

                            <q-td key="firstName" :props="props">
                                <div  class="cursor-pointer">
                                    {{ props.row.first_name }}
                                </div>
                            </q-td>

                            <q-td key="lastName" :props="props">
                                <div  class="cursor-pointer">
                                    {{ props.row.last_name }}
                                </div>
                            </q-td>

                            <q-td key="title" :props="props">
                                <div  class="cursor-pointer">
                                    {{ props.row.title }}
                                </div>
                            </q-td>

                            <q-td key="department" :props="props">
                                <div  class="cursor-pointer">
                                    {{ props.row.department }}
                                </div>
                            </q-td>

                            <q-td key="phone" :props="props">
                                <div  class="cursor-pointer">
                                    {{ props.row.phone }}
                                </div>
                            </q-td>

                            <q-td key="email" :props="props">
                                <div  class="cursor-pointer">
                                    {{ props.row.email }}
                                </div>
                            </q-td>

                            <q-td key="action" :props="props">
                                <q-fab padding="xs" color="purple" icon="keyboard_arrow_up" direction="up">
                                    <q-fab-action
                                        icon="edit"
                                        color="blue" 
                                        size=sm 
                                        no-caps
                                        round 
                                        class="q-mr-sm"
                                        @click="openEditContactPopup(props.row)"
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
                                        color="red" 
                                        size=sm 
                                        no-caps
                                        round
                                        @click="isDeleteContactPopup=true, contacts=props.row"
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

        <dialog-draggable :modelDialog="isShowAddContactPopup" :title="'Contact Info'" @onHide="isShowAddContactPopup=false">
        
            <div class="q-pa-md">
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">First Name</div>
                        <q-input outlined dense v-model="contacts.first_name"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Last Name</div>
                        <q-input outlined dense v-model="contacts.last_name"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Title</div>
                        <q-input outlined dense v-model="contacts.title"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Department</div>
                        <q-input outlined dense v-model="contacts.department"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Address Line 1</div>
                        <q-input outlined dense v-model="contacts.address_line_1"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Address Line 2</div>
                        <q-input outlined dense v-model="contacts.address_line_2"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-7 q-pr-sm">
                        <div class="text-subtitle2">City</div>
                        <q-input outlined dense v-model="contacts.city"/>
                    </div>
                    <div class="col-md-3 q-pr-sm">
                        <div class="text-subtitle2">State</div>
                        <q-select outlined dense v-model="contacts.state" :options="states"/>
                    </div>
                    <div class="col-md-2 q-pr-sm">
                        <div class="text-subtitle2">Zip</div>
                        <q-input outlined dense v-model="contacts.postal_code"/>
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-4">
                        <div class="text-subtitle2">Phone</div>
                        <q-input outlined dense v-model="contacts.phone"/>
                    </div>
                    <div class="col-md-4 q-pl-sm">
                        <div class="text-subtitle2">Ext</div>
                        <q-input outlined dense v-model="contacts.extension"/>
                    </div>
                    <div class="col-md-4 q-pl-sm">
                        <div class="text-subtitle2">Fax</div>
                        <q-input outlined dense v-model="contacts.fax"/>
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Email</div>
                        <q-input outlined dense v-model="contacts.email"/>
                    </div>
                </div>
            </div>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn v-if="edit" flat label="Save" color="primary"  @click="editContact"/>
                <q-btn v-else flat label="Add" color="primary"  @click="addContact"/>
            </q-card-actions>

        </dialog-draggable>

        <q-dialog v-model="isDeleteContactPopup" persistent>
            <q-card>
                <q-card-section class="row items-center">
                    <span class="q-ml-sm">Are you sure to delete this Contact?</span>
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="No, thanks" color="primary" v-close-popup />
                    <q-btn label="Yes" color="red" @click="removeContact" />
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
    data() {
        return {
            data: [],
            columns: [
                {
                    name: "firstName",
                    align: "left",
                    label: "First Name",
                    field: "firstName",
                    sortable: true
                },
                {
                    name: "lastName",
                    align: "left",
                    label: "Last Name",
                    field: "lastName",
                    sortable: true
                },
                {
                    name: "title",
                    align: "left",
                    label: "Title",
                    field: "title",
                    sortable: true
                },
                {
                    name: "department",
                    align: "left",
                    label: "Department",
                    field: "department",
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
                    name: "email",
                    align: "left",
                    label: "Email",
                    field: "email",
                    sortable: true
                },
                {
                    name: "action",
                    align: "right",
                    label: "Actions",
                    field: "action",
                    sortable: true,
                    style: 'width: 30px',
                }
            ],
            pagination: { rowsPerPage: 1000 },
            isShowAddContactPopup: false,
            isDeleteContactPopup: false,
            edit: false,
            states: [],

            contacts: {
                first_name: '',
                last_name: '',
                title: '',
                department: '',
                address_line_1: '',
                address_line_2: '',
                city: '',
                state: '',
                postal_code: '',
                phone: '',
                extension: '',
                fax: '',
                email: ''
            }
        }
    },
    methods: {
        openEditContactPopup(contact) {
            console.log('contact', contact)
            this.isShowAddContactPopup = true
            this.contacts = {...contact}
            this.edit = true
        },
        getSchoolContacts() {

            const conf = {
                method: 'GET',
                url: config.getSchoolContacts + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let contacts = res.data.contactsInfo

                let contactsArr = []
                for(let i=0; i<contacts.length; i++) {
                    contacts[i].state = {
                        id: contacts[i].state?.id,
                        label: contacts[i].state?.name
                    }
                    contactsArr.push(contacts[i])
                }
                this.data = contactsArr
                
            })

        },
        addContact() {

            let data = {
                first_name: this.contacts.first_name,
                last_name: this.contacts.last_name,
                title: this.contacts.title,
                department: this.contacts.department,
                phone: this.contacts.phone,
                extension: this.contacts.extension,
                fax: this.contacts.fax,
                address_line_1: this.contacts.address_line_1, 
                address_line_2: this.contacts.address_line_2,
                city: this.contacts.city,
                state_id: this.contacts.state.id,
                postal_code: this.contacts.postal_code,
                email: this.contacts.email
            }
            
            const conf = {
                method: 'POST',
                url: config.addSchoolContact + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {

                let contact = res.data.contact
                contact.state = {
                        id: contact.state.id,
                        label: contact.state.name
                    }

                this.data.push(contact)
                

                this.$q.notify({
                    message: 'Contact addes successfully!',
                    type: 'positive',
                })

                this.isShowAddContactPopup = false

            })
        },
        editContact() {

            let data = {
                first_name: this.contacts.first_name,
                last_name: this.contacts.last_name,
                title: this.contacts.title,
                department: this.contacts.department,
                phone: this.contacts.phone,
                extension: this.contacts.extension,
                fax: this.contacts.fax,
                address_line_1: this.contacts.address_line_1, 
                address_line_2: this.contacts.address_line_2,
                city: this.contacts.city,
                state_id: this.contacts.state.id,
                postal_code: this.contacts.postal_code,
                email: this.contacts.email
            }
            
            const conf = {
                method: 'PUT',
                url: config.editSchoolContact + this.contacts.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {
                
                this.getSchoolContacts()

                this.$q.notify({
                    message: 'Contact Edited successfully!',
                    type: 'positive',
                })

                this.isShowAddContactPopup = false

            })

        },
        getStates() {
            const conf = {
                method: 'GET',
                url: config.getStates,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let states = res.data.states
                let statesFinalArray = []

                for(let i=0; i<states.length; i++) {
                    statesFinalArray.push({
                        id: states[i].id,
                        label: states[i].name
                    })
                }

                this.states = statesFinalArray
            })
        },
        removeContact() {
            
            const conf = {
                method: 'DELETE',
                url: config.deleteSchoolContact + this.contacts.id + '/' + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                const index = this.data.indexOf(this.contacts)
                this.data.splice(index, 1)

                this.$q.notify({
                    message: 'Contact Deleted!',
                    type: 'positive',
                })

                this.isDeleteContactPopup = false

            })

        }
    },
    created() {
        this.getSchoolContacts()
        this.getStates()
    },
    watch: {
        isShowAddContactPopup(val) {
            if(!val) {
                this.contacts = {
                    first_name: '',
                    last_name: '',
                    title: '',
                    department: '',
                    address_line_1: '',
                    address_line_2: '',
                    city: '',
                    state: '',
                    states: [],
                    zip: '',
                    phone: '',
                    extension: '',
                    fax: '',
                    email: ''
                }
                this.edit = false
            }
        }
    }
}
</script>