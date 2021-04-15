<template>
    <div>

        <dialog-draggable 
            :width="850" 
            :modelDialog="showPopup" 
            :title="'Bill to'" 
            :icon="'attach_money'"
        > 

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">
                        <div class="col-md-12">
                            <div class="row">
                                <div class="col-md-3">
                                    
                                </div>
                                <div class="col-md-5">
                                </div>
                                <div class="col-md-4 bordered-box">
                                    <div class="text-subtitle2 q-mb-sm">Billing address</div>
                                    <div>{{ schoolInfo.address }}</div>
                                    <div>{{ schoolInfo.state }} {{ schoolInfo.city }} {{ schoolInfo.zip }}</div>
                                    <div>{{ schoolInfo.phone }}</div>
                                </div>
                                
                            </div>
                        </div>
                    </div>

                    <div class="row q-mt-md">
                        <q-table
                            class="overflow-auto"
                            :data="data" 
                            :columns="columns"
                            hide-bottom
                            :pagination.sync="pagination"
                        >
                            <!-- Table Body -->
                            <template v-slot:body="props">
                                <q-tr :props="props" class="cursor-pointer">
                                    <q-td key="address" :props="props" 
                                        style="white-space: initial;width: 350px; max-width: 350px;">
                                        <div class="inline-span">
                                            {{props.row.address}}
                                        </div>
                                    </q-td>
                                    <q-td key="city" :props="props" >
                                        {{props.row.city}}
                                    </q-td>
                                    <q-td key="state" :props="props" >
                                        {{props.row.state}}
                                    </q-td>
                                    <q-td key="zipcode" :props="props" >
                                        {{props.row.zipcode}}
                                    </q-td>
                                    <q-td key="phone" :props="props" >
                                        {{props.row.phone}}
                                    </q-td>
                                    <q-td key="select" :props="props" >
                                        <q-radio @input="selectAddress" dense v-model="selectedAddress" :val="props.row.id" />
                                    </q-td>
                                </q-tr>
                            </template>
                        </q-table>
                    </div>
                </div>
            </q-card-section>


            <q-card-actions class="row justify-end">
                <div>
                    <q-btn flat label="Cancel" @click="emitClosePopup" color="primary"></q-btn>
                    <q-btn flat label="Set" @click="sendNewAddressToParent" class="edx-add-btn q-ml-sm"></q-btn>
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
        schoolId: { 
            required: true
        }

    },
    data() {
        return {
            selectedAddress: null,

            data: [],
            columns: [
                {
                    name: "address",
                    align: "left",
                    label: "Address",
                    field: "address",
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
                    name: "zipcode",
                    align: "left",
                    label: "Zipcode",
                    field: "zipcode",
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
                    name: "select",
                    align: "left",
                    label: "Select",
                    field: "select",
                    sortable: true
                },
            ],
            // Table footer
            pagination: { rowsPerPage: 999 },

            schoolInfo: {
                id: '',
                address: '',
                city: '',
                state: '',
                zip: '',
                phone: '',
            }
        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('toggleBillToModal', false)
        },
        sendNewAddressToParent() {
            this.$emit('receiveAddress', this.schoolInfo)
            this.emitClosePopup()
        },
        // 
        // Filter
        filterFn (val, update, abort) {

            if (val.length < 1) {
                abort()
                return
            }

            update(() => {
                
                let arr = []
                const conf = {
                    method: 'GET',
                    url: config.filterSchool + val + '&limit=1000&offset=1',
                    headers: {
                        Accept: 'application/json',
                    }
                }

                axios(conf).then(res => {
                    for(let i=0; i<res.data.schools.length; i++) {
                        arr.push({
                            id: res.data.schools[i].id,
                            label: res.data.schools[i].name
                        })
                    }
                    this.schoolsOptions = arr
                })
            })
        },
        getSchoolAddresses(schooliId) {

            const conf = {
                method: 'GET',
                url: config.getSchoolInformationById + schooliId,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('res.asdasdkasdhbasd', res.data)
                let address = res.data.school[0].address
                let arr = []
                if(address.length) {
                    for(let i=0; i<address.length; i++) {
                        console.log(address[i])
                        arr.push({
                            id: address[i].address.id,
                            address: address[i].address.address_line_1,
                            city: address[i].address.city,
                            state: address[i].address.state?.name,
                            zipcode: address[i].address.postal_code,
                            phone: address[i].address.phone,
                            select: false
                        })
                    }
                    this.data = arr
                }
            })

        },
        selectAddress() {

            let index = this.data.findIndex( item => item.id == this.selectedAddress )
            this.schoolInfo.id = this.data[index].id
            this.schoolInfo.address = this.data[index].address
            this.schoolInfo.state = this.data[index].state
            this.schoolInfo.city = this.data[index].city
            this.schoolInfo.zip = this.data[index].zipcode
            this.schoolInfo.phone = this.data[index].phone

        }
    },
    components: {
        dialogDraggable
    },
    computed: {
        showPopup() {
            return this.show
        }
    },
    watch: {
        show(val) {
            this.$emit('toggleBillToModal', val)

            if(val) {
                this.getSchoolAddresses(this.schoolId)
            }
        }
    }
}
</script>