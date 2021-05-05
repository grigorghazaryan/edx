<template>
    <div class="q-pa-lg">
        
        <div class="row justify-between align-center">
            <div class="text-subtitle1 row justify-start items-center">
                <q-icon class="q-mr-sm" name="people_alt"  color="green" style="font-size: 1.5em"/>
                Campus Name
            </div>
            <q-btn @click="isAddCampusOpened=true" class="edx-add-btn" text-color="white" label="Add Campus" />
        </div>

        <q-separator class="q-mt-sm q-mb-lg"/>

        <q-table
            :data="data" 
            :columns="columns"
            :loading="loading"
            class="no-shadow overflow-auto my-sticky-column-table"
            row-key="id"
            hide-bottom
            :pagination.sync="pagination"
        >
            <!-- Table Body -->
            <template v-slot:body="props">
    
                <q-tr :props="props">

                    <q-td auto-width>
                        <q-btn 
                            size="sm" flat color="black"
                            @click="props.expand = !props.expand, openBottomSection(props.row, props.rowIndex)" 
                            :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
                        >
                        </q-btn>
                    </q-td>

                    <q-td key="name" :props="props">
                        <div>
                            {{ props.row.name }}
                        </div>
                    </q-td>

                </q-tr>

                <q-tr :props="props" v-show="props.expand">
                    <q-td colspan="100%">
                        <div class="q-mt-md">
                            <div class="row">
                                <div v-if="props.row.address != null && states != null" class="col-md-12">
                                    <SchoolsTable 
                                        :addressData="props.row.address"
                                        :statesData="states"
                                        :type="2"
                                        :id="props.row.id"
                                    />
                                </div>
                            </div>
                        </div>
                    </q-td>
                </q-tr>

            </template>
        </q-table>

        <dialog-draggable :width="500" :modelDialog="isAddCampusOpened" :title=" 'Add Campus' " @onHide="isAddCampusOpened=false">
            
            <div class="q-pa-md"> 
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <div class="text-subtitle2">Name</div>
                        <q-input dense outlined v-model="campus.name" />
                    </div>
                </div>
                <div class="row q-mb-sm">
                    <div class="col-md-12 q-mb-sm">
                        <div class="text-subtitle2">Description</div>
                        <q-input dense outlined v-model="campus.description"/>
                    </div>
                </div>
            </div>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn flat label="Add" color="primary" @click="addCampus"/>
            </q-card-actions>

        </dialog-draggable>
        
    </div>
</template>

<script>
import SchoolsTable from './SchoolsTable';
import axios from 'axios'
import config from '../../../config'
import dialogDraggable from '../../components/DialogDraggable'


export default {
    components: {
        SchoolsTable,
        dialogDraggable
    },
    data() {
        return {
            loading: false,
            data: [],
            columns: [
                {
                    name: "toggle",
                    style: 'width: 20px'
                },
                {
                    name: "name",
                    align: "left",
                    label: "Name",
                    field: "name",
                    sortable: true
                },
            ],
            pagination: { rowsPerPage: 1000 },
            states: null,
            campus: {
                name: '',
                description: ''
            },
            isAddCampusOpened: false,
        }
    },
    methods: {
        getCampuses() {
            
            const conf = {
                method: 'GET',
                url: config.getSchoolCompuses + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let campuses = res.data.campuses;
                let cArr = []
                for(let i=0; i<campuses.length; i++) {
                    cArr.push( campuses[i] )
                }
                this.data = cArr
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
        addCampus() {

            let data = {
                name: this.campus.name,
                description: this.campus.description
            }

            const conf = {
                method: 'POST',
                url: config.addCampus + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {
                this.data.push(res.data.campus)

                this.$q.notify({
                    message: 'Campus addes successfully!',
                    type: 'positive',
                })

                this.isAddCampusOpened = false
            })

        }
    },
    created() {
        this.getStates()
        this.getCampuses()
    }
}
</script>