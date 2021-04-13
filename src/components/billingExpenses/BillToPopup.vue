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
                                <div class="col-md-4">
                                    <div class="text-subtitle2 q-mb-sm">Send bill to</div>
                                    <q-select outlined dense 
                                        v-model="bill" 
                                        :options="bills"
                                    />
                                </div>
                                <div class="col-md-5">

                                </div>
                                <div class="col-md-3">
                                    <div class="text-subtitle2 q-mb-sm">Billing address</div>
                                    <div>Mukake Public school</div>
                                    <div>1505 North 6th Street</div>
                                    <div>Mukake WI 45890</div>
                                    <div>414-505-8899</div>
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
                                        <q-checkbox v-model="props.row.select" />
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
                    <q-btn flat label="Set" class="edx-add-btn q-ml-sm"></q-btn>
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

    },
    data() {
        return {
            bill: null,
            bills: [],

            data: [
                {
                    address: '1505 North 6th Street',
                    city: 'Milwaukee',
                    state: 'WI',
                    zipcode: '06003',
                    phone: '+37494511116',
                    select: false,
                },
                {
                    address: '1505 North 6th Street',
                    city: 'Milwaukee',
                    state: 'WI',
                    zipcode: '06003',
                    phone: '+37494511116',
                    select: false,
                },
                {
                    address: '1505 North 6th Street',
                    city: 'Milwaukee',
                    state: 'WI',
                    zipcode: '06003',
                    phone: '+37494511116',
                    select: false,
                },
            ],
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
        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('toggleBillToModal', false)
        },
    },
    components: {
        dialogDraggable
    },
    computed: {
        showPopup() {
            return this.show
        },
    },
    watch: {
        show(val) {
            this.$emit('toggleBillToModal', val)
        }
    }
}
</script>