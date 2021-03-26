<template>
    <q-page class="q-pa-sm edx-background">  

        <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
                <q-breadcrumbs-el label="Schools"/>
                <q-breadcrumbs-el :label="schoolName" />
            </q-breadcrumbs>
        </div>

        <div class="q-pa-sm q-mt-sm q-gutter-sm">
      
            <div class="edx-header-parent">
                <span class="edx-header-text">{{ schoolName }}</span>
            </div>

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
                    <q-tab name="1" label="School Information"/>
                    <q-tab name="2" label="Campuses"/>
                    <q-tab name="3" label="School Year Parameter"/>
                    <q-tab name="4" label="School Contacts"/>

                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated class="tab-panels-parent">

                <q-tab-panel name="1" class="q-p-sm">
                    <SchoolInformation />
                </q-tab-panel>

                <q-tab-panel name="2" class="q-p-sm">
                    <Campuses />
                </q-tab-panel>

                <q-tab-panel name="3" class="q-p-sm">
                    <SchoolYearParameter />
                </q-tab-panel>

                <q-tab-panel name="4" class="q-p-sm">
                    <SchoolContacts />
                </q-tab-panel>


                </q-tab-panels>

            </q-card>

        </div>
    </q-page>
</template>

<script>

import SchoolInformation from 'components/schools/SchoolInformation'
import Campuses from 'components/schools/Campuses'
import SchoolYearParameter from 'components/schools/SchoolYearParameter'
import SchoolContacts from 'components/schools/SchoolContacts'

export default {
    components: {
        SchoolInformation,
        Campuses,
        SchoolYearParameter,
        SchoolContacts
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
    },
    created() {
        console.log('nested', this.$route.params.id)
    }
}
</script>

