<template>
    <div class="q-pa-lg">
        
        <div class="row justify-between align-center">
            <div class="text-subtitle1">Campus Name</div>
            <q-btn class="bg-blue" color="white" label="Add Campus" />
        </div>

        <q-separator class="q-mt-sm q-mb-lg"/>

        <!-- <q-list bordered class="rounded-borders">
            <q-expansion-item
                switch-toggle-side
                expand-separator
                label="El Puente North"
            >
                <q-card>
                    <q-card-section> -->
                        <SchoolsTable />
                    <!-- </q-card-section>
                </q-card>
            </q-expansion-item>
        </q-list> -->
    </div>
</template>

<script>
import SchoolsTable from './SchoolsTable';

export default {
    components: {
        SchoolsTable
    },
    data() {
        return {
        }
    }
}
</script>