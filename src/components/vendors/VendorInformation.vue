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
                        <q-input outlined dense v-model="vendorName" label="Vendor Name" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="vendorAbbriviation" label="Vendor Abbriviation" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="vendorShortName" label="Vendor Shortname" />
                    </div>
                </div>

                <div class="text-subtitle1 row justify-start items-center q-mb-md q-mt-md">
                    <q-icon class="q-mr-sm" name="contact_page"  color="green" style="font-size: 1.5em"/>
                    <b>Primary Address</b>
                </div>

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
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-6 q-pr-sm">
                                <q-input outlined dense v-model="city" label="City" />
                            </div>
                            <div class="col-md-4 q-pr-sm">
                                <q-select outlined dense v-model="state" :options="states" label="State" />
                            </div>
                            <div class="col-md-2">
                                <q-input outlined dense v-model="zip" label="Zip" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3 q-pr-sm">
                                <q-input outlined dense v-model="phone" label="Phone" />
                            </div>
                            <div class="col-md-2">
                                <q-input outlined dense v-model="ext" label="Ext" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-sm">
                    <div class="col-md-12">
                        <div class="row">
                            <div class="col-md-3 q-pr-sm">
                                <q-input outlined dense v-model="fax" label="Fax" />
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row q-mb-md">
                    <div class="col-md-12">
                        <q-input outlined dense v-model="url" label="URL" />
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