<template>
    <div class="q-pa-lg">
        
        <div class="row justify-between align-center">
            <div class="text-subtitle1">Campus Name</div>
            <q-btn class="bg-blue" color="white" label="Add Campus" />
        </div>

        <q-separator class="q-mt-sm q-mb-lg"/>

            <q-table
                :data="data" 
                :columns="columns"
                :loading="loading"
                class="no-shadow"
                row-key="id"
                hide-bottom
                :pagination.sync="pagination"
            >
                <!-- Table Body -->
                <template v-slot:body="props">
      
                    <q-tr :props="props">
                        <q-td key="name" :props="props">
                            <div>
                                {{ props.row.name }}
                            </div>
                        </q-td>
                    </q-tr>

                    <q-tr :props="props">
                        <q-td colspan="100%">
                            <div class="q-mt-md">
                                <div class="row">
                                    <div class="col-md-12">
                                        <p>
                                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores, excepturi!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </q-td>
                    </q-tr>

                </template>
            </q-table>
        
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
            loading: false,
            data: [
                {
                    name: 'Grigor'
                },
                {
                    name: 'Grigor'
                }
            ],
            columns: [
                {
                    name: "name",
                    align: "left",
                    label: "Name",
                    field: "name",
                    sortable: true
                },
            ],
            pagination: { rowsPerPage: 1000 },
        }
    },
    methods: {
        getCompuses() {
            const conf = {
                method: 'GET',
                url: config.getStates,
                headers: {
                    Accept: 'application/json',
                }
            }
        }
    }
}
</script>