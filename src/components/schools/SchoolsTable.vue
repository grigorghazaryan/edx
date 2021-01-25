<template>
    <div>

        <q-table
            :data="data"
            :columns="columns"
            row-key="id"
            hide-bottom
            class="no-shadow"
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
                            {{ props.row.state.lable }}
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

                        <q-fab padding="xs" color="purple" icon="keyboard_arrow_up" direction="up">
                            <!-- <q-fab-action color="primary" icon="mail" />
                            <q-fab-action color="secondary" icon="alarm" /> -->
                            <q-fab-action
                                icon="edit"
                                color="blue" 
                                size=sm 
                                no-caps
                                round 
                                class="q-mr-sm"
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
            <q-btn icon="add" color="blue" round/>
        </div>
        
    </div>
</template>

<script>
export default {
    props: {
        addressData: {
            required: true
        }
    },
    data() {
        return {
            data: [
                {
                    address1: '2065 S Moorland Rd',
                    address2: 'Suit 200',
                    city: 'Brookfield',
                    state: 'WI',
                    zip: '53045',
                    phone: '(414) 234-5566',
                    fax: '(414) 234-5566',
                    type: 'Billing'
                },
                {
                    address1: '2065 S Moorland Rd',
                    address2: 'Suit 200',
                    city: 'Brookfield',
                    state: 'WI',
                    zip: '53045',
                    phone: '(414) 234-5566',
                    fax: '(414) 234-5566',
                    type: 'Billing'
                },
            ],
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
        }
    },
    created() {
        console.log('kkklllllkkklll', this.addressData )
        let data = this.addressData, dataArr = []
        for(let i=0; i<data.length; i++) {
            dataArr.push({
                id: data[i].id,
                address1: data[i].address.address_line_1,
                address2: data[i].address.address_line_2,
                city: data[i].address.city,
                state: {
                    id: data[i].address.state.id,
                    label: data[i].address.state.name
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
    }
}
</script>