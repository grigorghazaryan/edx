<template>
    <div class="q-pa-lg q-mt-md">

        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="vendorName" label="Vendor Name" />
            </div>
        </div>
        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="vendorAbbriviation" label="Vendor Abbriviation" />
            </div>
        </div>
        <div class="row q-mb-sm">
            <div class="col-md-4">
                <q-input outlined dense v-model="vendorAbbriviation" label="Vendor Shortname" />
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

        <div class="row q-mt-lg q-mb-lg">
            <div class="col-md-12 q-mb-md">
                <div class="text-subtitle2">Additional addresses</div>
            </div>
            <div class="col-md-12">
                <SchoolsTable />
            </div>
        </div>

    </div>
</template>

<script>
import SchoolsTable from '../schools/SchoolsTable';

export default {
    components: {
        SchoolsTable
    },
    data() {
        return {
            vendorName: '',
            vendorAbbriviation: '',
            address1: '',
            address2: '',
            city: '',
            state: '',
            states: ['State 1', 'State 2'],
            zip: '',
            phone: '',
            ext: '',
            fax: '',
            url: '',
        }
    }
}
</script>