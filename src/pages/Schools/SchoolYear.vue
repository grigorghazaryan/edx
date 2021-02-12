<template>
    <q-page class="q-pa-sm">  

        <!-- <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
                <q-breadcrumbs-el label="School Year"/>
            </q-breadcrumbs>
        </div>

        <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
            <q-card>

                <q-tabs
                    v-model="tab"
                    dense
                    class="text-grey"
                    active-color="primary"
                    indicator-color="primary"
                    align="left"
                    narrow-indicator
                >
                    <q-tab name="1" label="Company Information"/>
                    <q-tab name="2" label="Company Year Parameter"/>
                    <q-tab name="3" label="Company Contacts"/>

                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated class="tab-panels-parent">

                <q-tab-panel name="1" class="q-p-sm">
                    <CompanyInformation />
                </q-tab-panel>

                <q-tab-panel name="2" class="q-p-sm">
                    <CompanyYearParameter />
                </q-tab-panel>

                <q-tab-panel name="3" class="q-p-sm">
                    <CompanyContacts />
                </q-tab-panel>


                </q-tab-panels>

            </q-card>

        </div> -->

    </q-page>
</template>

<script>
import CompanyInformation from 'components/schoolYear/CompanyInformation'
import CompanyYearParameter from 'components/schoolYear/CompanyYearParameter'
import CompanyContacts from 'components/schoolYear/CompanyContacts'

export default {
    components: {
        CompanyInformation,
        CompanyYearParameter,
        CompanyContacts
    },
    data() {
        return {
            tab: "1",
        }
    },
    computed: {
        schoolName() {
            return this.$route.query.name
        }
    }
}
</script>

