<template>
    <div class="q-mt-md">

        <div class="row justify-between align-center q-pr-lg q-pl-lg">
            <div class="text-subtitle1">Contact List</div>
            <q-btn class="bg-blue" color="white" label="Add contact" />
        </div>

        <q-separator class="q-mt-sm q-mb-lg"/>

        <q-table
            :data="data"
            :columns="columns"
            row-key="id"
            hide-bottom
            class="no-shadow overflow-auto my-sticky-column-table"
        >
            <template v-slot:body="props">

                <q-tr :props="props" @click="openEditContactPopup">

                    <q-td key="firstName" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.firstName }}
                        </div>
                    </q-td>

                    <q-td key="lastName" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.lastName }}
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

        <dialog-draggable :modelDialog="isShowPopup" :title="'Edit contact'" @onHide="isShowPopup=false">
        
            <div class="q-pa-md">
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="address1" label="Address Line 1" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="address2" label="Address Line 2" />
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
                        <q-input outlined dense v-model="zip1" label="Zip Code" />
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-4">
                        <q-input outlined dense v-model="phone" label="Phone 1" />
                    </div>
                    <div class="col-md-4 q-pl-sm">
                        <q-input outlined dense v-model="phone" label="Phone 2" />
                    </div>
                    <div class="col-md-4 q-pl-sm">
                        <q-input outlined dense v-model="fax" label="Fax" />
                    </div>
                </div>
            </div>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn flat label="Save" color="primary" v-close-popup/>
            </q-card-actions>

        </dialog-draggable>

    </div>
</template>

<script>
import dialogDraggable from '../../components/DialogDraggable'

export default {
    components: {
        dialogDraggable
    },
    data() {
        return {
            data: [
                {
                    id: 1,
                    firstName: 'Anakin',
                    lastName: 'Skywalker',
                    title: 'School Dean',
                    department: 'Administration',
                    phone: '(414) 234-5566',
                    email: 'hansolo@skywalker.com'
                }
            ],
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
            isShowPopup: false,
            //
            address1: '',
            address2: '',
            city: '',
            state: '',
            states: ['State 1', 'State 2'],
            zip1: '',
            zip2: '',
            phone: '',
            fax: '',
        }
    },
    methods: {
        openEditContactPopup() {
            this.isShowPopup = true
        }
    }
}
</script>