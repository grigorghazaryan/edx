<template>
    <q-page class="q-pa-sm edx-background">  

        <div class="q-pa-md q-gutter-sm">
            <q-breadcrumbs>
                <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
                <q-breadcrumbs-el label="Management"/>
                <q-breadcrumbs-el label="Vendors"/>
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
                    <q-tab name="1" label="Vendor Information"/>
                    <q-tab name="2" label="Vendor Contacts"/>

                </q-tabs>

                <q-separator />

                <q-tab-panels v-model="tab" animated class="tab-panels-parent">

                    <q-tab-panel name="1" class="q-p-sm">
                        <VendorInformation />
                    </q-tab-panel>

                    <q-tab-panel name="2" class="q-p-sm">
                        <VendorContacts />
                    </q-tab-panel>


                </q-tab-panels>

            </q-card>

        </div>
    </q-page>
</template>

<script>
import VendorInformation from 'components/vendors/VendorInformation'
import VendorContacts from 'components/vendors/VendorContacts'

export default {
    components: {
        VendorInformation,
        VendorContacts
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

