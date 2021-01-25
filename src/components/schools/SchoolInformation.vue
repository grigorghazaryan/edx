<template>
    <div class="q-pa-lg q-mt-md">

        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="schoolName" label="School Name" />
            </div>
        </div>
        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="schoolAbbriviation" label="School Abbriviation" />
            </div>
        </div>
        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="schoolAbbriviation" label="School Shortname" />
            </div>
        </div>

        

        <div class="row q-mb-md q-mt-md">
            <div class="text-subtitle2">Primary Address</div>
        </div>

        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="address1" label="Address Line 1" />
            </div>
        </div>
        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="address2" label="Address Line 2" />
            </div>
        </div>
        <div class="row q-mb-sm">
            <div class="col-md-4">
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
            <div class="col-md-4">
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
            <div class="col-md-4">
                <div class="row">
                    <div class="col-md-3 q-pr-sm">
                        <q-input outlined dense v-model="fax" label="Fax" />
                    </div>
                </div>
            </div>
        </div>

        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="url" label="URL" />
            </div>
        </div>

        <div class="row q-mt-lg q-mb-lg" v-if="additionalAddresses != null">
            <div class="col-md-12 q-mb-md">
                <div class="text-subtitle2">Additional addresses</div>
            </div>
            <div class="col-md-12">
                <SchoolsTable
                 :addressData="additionalAddresses"
                />
            </div>
        </div>

    </div>
</template>

<script>
import SchoolsTable from './SchoolsTable';

import axios from 'axios'
import config from '../../../config'

export default {
    components: {
        SchoolsTable
    },
    data() {
        return {
            schoolName: '',
            schoolAbbriviation: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            states: [],
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
        getSchoolInformation() {

            const conf = {
                method: 'GET',
                url: config.getSchoolInformationById + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                    let schoolInfo = res.data.school[0]

                    this.additionalAddresses = schoolInfo.address

                    this.schoolName = schoolInfo.school_name
                    this.schoolAbbriviation = schoolInfo.abbreviation
                    this.address1 = schoolInfo.primary_address.address.address_line_1
                    this.address2 = schoolInfo.primary_address.address.address_line_2
                    this.city = schoolInfo.primary_address.address.city
                    this.state = {
                        id: schoolInfo.primary_address.address.state.id,
                        label: schoolInfo.primary_address.address.state.name
                    }
                    this.zip = schoolInfo.primary_address.address.postal_code
                    this.phone = schoolInfo.primary_address.address.phone
                    this.ext = schoolInfo.primary_address.address.extension
                    this.fax = schoolInfo.primary_address.address.fax
                    this.url = schoolInfo.url

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
        }
    },
    created() {
        this.getSchoolInformation()
        this.getStates()
    }
}
</script>