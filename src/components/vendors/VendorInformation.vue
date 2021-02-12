<template>
    <div class="q-pa-lg q-mt-md">

        <div class="row">
            <div class="col-md-4 bordered-box">

                <div class="text-subtitle1 row justify-start items-center q-mb-md">
                    <q-icon class="q-mr-sm" name="contact_page"  color="green" style="font-size: 1.5em"/>
                    <b>Vendor Names</b>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Vendor Name</div>
                        <q-input
                            outlined
                            v-model="vendorName" 
                            dense 
                            autofocus
                        />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Vendor Abbriviation</div>
                        <q-input
                            outlined
                            v-model="vendorAbbriviation" 
                            dense 
                            autofocus
                        />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Vendor Shortname</div>
                        <q-input
                            outlined
                            v-model="vendorShortName" 
                            dense 
                            autofocus
                        />
                    </div>
                </div>

                <div class="text-subtitle1 row justify-start items-center q-mb-md q-mt-md">
                    <q-icon class="q-mr-sm" name="contact_page"  color="green" style="font-size: 1.5em"/>
                    <b>Primary Address</b>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Address Line 1</div>
                        <q-input
                            outlined
                            v-model="address1" 
                            dense 
                            autofocus
                        />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="text-subtitle2">Address Line 2</div>
                        <q-input
                            outlined
                            v-model="address2" 
                            dense 
                            autofocus
                        />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6 q-pr-sm">
                                <div class="text-subtitle2">City</div>
                                <q-input
                                    outlined
                                    v-model="city" 
                                    dense 
                                    autofocus
                                />
                            </div>
                            <div class="col-md-4 q-pr-sm">
                                <div class="text-subtitle2">State</div>
                                <q-select outlined dense v-model="state" :options="states" />
                            </div>
                            <div class="col-md-2">
                                <div class="text-subtitle2">Zip</div>
                                <q-input outlined dense v-model="zip" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3 q-pr-sm">
                                <div class="text-subtitle2">Phone</div>
                                <q-input outlined dense v-model="phone"/>
                            </div>
                            <div class="col-md-2">
                                <div class="text-subtitle2">Ext</div>
                                <q-input outlined dense v-model="ext"/>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3 q-pr-sm">
                                <div class="text-subtitle2">Fax</div>
                                <q-input outlined dense v-model="fax" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-md">
                    <div class="col-md-12">
                        <div class="text-subtitle2">URL</div>
                        <q-input outlined dense v-model="url" />
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-12 text-right">
                        <q-btn @click="editVendorInfo" color="primary" label="Save" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row q-mt-lg q-mb-lg " v-if="additionalAddresses != null && states != null">            
            <div class="col-md-9 bordered-box">
                
                <div class="text-subtitle1 row justify-start items-center q-mb-md">
                    <q-icon class="q-mr-sm" name="location_on"  color="green" style="font-size: 1.5em"/>
                    <b>Additional addresses</b>
                </div>

                <SchoolsTable
                    :addressData="additionalAddresses"
                    :statesData="states"
                    :type="3"
                />
            </div>
        </div>

    </div>
</template>

<script>
import SchoolsTable from '../schools/SchoolsTable';

import axios from 'axios'
import config from '../../../config'

export default {
    components: {
        SchoolsTable
    },
    data() {
        return {
            vendorName: '',
            vendorAbbriviation: '',
            vendorShortName: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            states: null,
            zip: '',
            phone: '',
            ext: '',
            fax: '',
            url: '',
            //
            additionalAddresses: null,

        }
    },
    methods: {
        getVendorInformation() {

            const conf = {
                method: 'GET',
                url: config.getVendorInformationById + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                    let vendorInfo = res.data.supplier[0]

                    this.additionalAddresses = vendorInfo.address

                    this.vendorName = vendorInfo.company_name
                    this.vendorAbbriviation = vendorInfo.abbreviation
                    this.vendorShortName = vendorInfo.short_name
                    this.address1 = vendorInfo.primary_address.address.address_line_1
                    this.address2 = vendorInfo.primary_address.address.address_line_2
                    this.city = vendorInfo.primary_address.address.city
                    this.state = {
                        id: vendorInfo.primary_address.address.state.id,
                        label: vendorInfo.primary_address.address.state.name
                    }
                    this.zip = vendorInfo.primary_address.address.postal_code
                    this.phone = vendorInfo.primary_address.address.phone
                    this.ext = vendorInfo.primary_address.address.extension
                    this.fax = vendorInfo.primary_address.address.fax
                    this.url = vendorInfo.url

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
        editVendorInfo() {

            let data = {

                name: this.vendorName,
                abbreviation: this.vendorAbbriviation,
                short_name: this.vendorShortName,

                primaryAddress: {
                    address_line_1: this.address1,
                    address_line_2: this.address2,
                    city: this.city,
                    state_id: this.state.id,
                    postal_code: this.zip,
                    phone: this.phone,
                    extension: this.ext,
                    fax: this.fax,
                },
                url: this.url,
            }

            const conf = {
                method: 'PUT',
                url: config.editVendor + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {
                this.getVendorInformation()
            })

            console.log(data)
        }
    },
    created() {
        this.getVendorInformation()
        this.getStates()
    }
}
</script>