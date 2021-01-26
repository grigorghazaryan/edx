<template>
    <div class="q-mt-md">

        <div class="row justify-between align-center q-pr-lg q-pl-lg">
            <div class="text-subtitle1">Contact List</div>
            <q-btn @click="isShowAddContactPopup=true" class="bg-blue" color="white" label="Add contact" />
        </div>

        <q-separator class="q-mt-sm q-mb-lg"/>

        <q-table
            :data="data"
            :columns="columns"
            row-key="id"
            hide-bottom
            class="no-shadow"
            :pagination.sync="pagination"
        >
            <template v-slot:body="props">

                <q-tr :props="props" @click="openEditContactPopup">

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

                </q-tr>

                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="q-mt-md">
                            <div class="row">
                                <p>
                                    Lorem, ipsum dolor.
                                </p>
                            </div>
                        </div>
                    </q-td>
                </q-tr>

            </template>

        </q-table>

        <dialog-draggable :modelDialog="isShowAddContactPopup" :title="'Contact Info'" @onHide="isShowAddContactPopup=false">
        
            <div class="q-pa-md">
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="first_name" label="First Name" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="last_name" label="Last Name" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="title" label="Title" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="department" label="Department" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="address_line_1" label="Address Line 1" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="address_line_2" label="Address Line 2" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-8 q-pr-sm">
                        <q-input outlined dense v-model="city" label="City" />
                    </div>
                    <div class="col-md-2 q-pr-sm">
                        <q-select outlined dense v-model="state" :options="states" label="State" />
                    </div>
                    <div class="col-md-2">
                        <q-input outlined dense v-model="zip" label="Zip" />
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-4">
                        <q-input outlined dense v-model="phone" label="Phone" />
                    </div>
                    <div class="col-md-4 q-pl-sm">
                        <q-input outlined dense v-model="extension" label="Ext" />
                    </div>
                    <div class="col-md-4 q-pl-sm">
                        <q-input outlined dense v-model="fax" label="Fax" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="email" label="Email" />
                    </div>
                </div>
            </div>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn flat label="Add" color="primary"  @click="addContact"/>
            </q-card-actions>

        </dialog-draggable>

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
            ],
            pagination: { rowsPerPage: 1000 },
            isShowAddContactPopup: false,

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
    },
    methods: {
        openEditContactPopup() {
            this.isShowAddContactPopup = true
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
                console.log('axios(conf).then(res => {', )
                let contacts = res.data.contactsInfo

                let contactsArr = []
                for(let i=0; i<contacts.length; i++) {
                    contactsArr.push({
                        id: contacts[i].id,
                        first_name: contacts[i].first_name,
                        last_name: contacts[i].last_name,
                        title: contacts[i].title,
                        department: contacts[i].department,
                        phone: contacts[i].phone,
                        email: contacts[i].email,
                    })
                }
                this.data = contactsArr
                
            })

        },
        addContact() {
            let data = {
                first_name: this.first_name,
                last_name: this.last_name,
                title: this.title,
                department: this.department,
                phone: this.phone,
                extension: this.extension,
                address_line_1: this.address1, 
                address_line_2: this.address2,
                city: this.city,
                state_id: this.state.id,
                postal_code: this.zip,
                email: this.email
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

                this.data.push(res.data.contact)

                this.$q.notify({
                    message: 'Contact addes successfully!',
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
    },
    created() {
        this.getSchoolContacts()
        this.getStates()
    }
}
</script>