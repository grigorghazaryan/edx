<template>
    <div>
        <q-table
            :data="data" 
            :columns="columns"
            :loading="loading"
            :pagination.sync="pagination"
        >
            <!-- Loading -->
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>

            <!-- Table Body -->
            <template v-slot:body="props">
            
                <q-tr :props="props" class="cursor-pointer" @click="isEdit=true, openTeacherPopup(props.row, props.rowIndex)" >
                    
                    <q-td key="provider" :props="props">
                        <div v-if="props.row.provider">
                            {{ props.row.provider.label }}
                        </div>
                    </q-td>

                    <q-td key="status" :props="props">
                        <span>
                            {{props.row.status_uni.label}}
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{ props.row.status_uni.description }}</strong>
                            </q-tooltip>
                        </span>
                    </q-td>


                    <q-td key="teacherName" :props="props">
                        <span>{{ props.row.teacherName }}</span>
                    </q-td>
                    
                    <q-td key="dateOfActivity" :props="props" > 
                        <span>
                        {{ props.row.activity_date }}
                        </span>
                    </q-td>

                    <q-td key="cost" :props="props">
                        <div>$ {{ props.row.cost }}</div>
                    </q-td>

                    <q-td key="type" :props="props">

                        <q-chip 
                            square class="edx-bg-green"
                            text-color="white">
                            <span>PD</span>
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Professional Development</strong>
                            </q-tooltip>
                        </q-chip>

                    </q-td>

                    <q-td key="grossPD" :props="props">
                        <div>$ {{ (parseFloat(props.row.cost) + parseFloat(((props.row.cost * props.row.percentage) / 100))).toFixed(2) }}</div>
                    </q-td>

                    <q-td key="actions" :props="props" style="min-width: 132px">
                        <q-fab padding="xs" @click.stop color="purple" icon="keyboard_arrow_up" direction="up">
                            
                            <q-fab-action
                                icon="content_copy"
                                color="orange" 
                                size=sm 
                                no-caps
                                round 
                                class="q-mr-sm"
                                @click="openDuplicatePopup(props.row)"
                            >
                                <q-tooltip 
                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                    transition-show="flip-right"
                                    transition-hide="flip-left"
                                >
                                    <strong>Duplicate</strong>
                                </q-tooltip>
                            </q-fab-action>

                            <q-fab-action
                                icon="delete_forever"
                                color="red" 
                                size=sm 
                                no-caps
                                round
                                @click="openDeleteModal(props.row)" 
                            >
                                <q-tooltip 
                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                    transition-show="flip-right"
                                    transition-hide="flip-left"
                                >
                                    <strong>Delete</strong>
                                </q-tooltip>
                            </q-fab-action>

                        </q-fab>
                    </q-td>

                </q-tr>

            </template>

            <!-- Pagination -->
            <!-- <template v-slot:bottom class="justify-end">
                <div class="q-pa-md flex flex-center">
                <q-pagination
                    v-model="current"
                    :max-pages="6"
                    :max="pages"
                    :direction-links="true"
                    @click="changePagination(current)"
                >
                </q-pagination>

                <div class="row justify-center items-center">
                    <span class="q-mr-md">Rows Per page</span>
                    <q-select dense outlined 
                    @input="changeRowsPerPage"
                    v-model="pagination.rowsPerPage" 
                    :options="rowsPerPageArr" 
                    />
                </div>
                
                </div>
            </template> -->

        </q-table>


        <TeacherPopup 
        
            @hidePopup="closeTeacherPopup" 
            :show="showTeacherModal" :id="id" :title="title" 
            :isEdit="isEdit"
        />
 
        

    </div>
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import TeacherPopup from './TeacherPopup'

export default {
    props: {
        title: {
            requred: true
        }
    },
    components: {
        TeacherPopup
    },
    data() {
        return {
            loading: false,
            data: [],
            columns: [
                {
                    name: "provider",
                    align: "left",
                    label: "Provider",
                    field: "provider",
                    sortable: true
                },
                {
                    name: "status",
                    align: "left",
                    label: "Status",
                    field: "status",
                    sortable: true
                },
                { 
                    name: "teacherName", 
                    align: "left",
                    label: "Teacher Name", 
                    sortable: false,
                    field: "teacherName",
                    style: 'width: 300px; min-width: 300px; max-width: 300px'
                },
                {
                    name: "dateOfActivity",
                    align: "left",
                    label: "Date Of Activity",
                    field: "dateOfActivity",
                    sortable: true,
                    style: 'max-width: 300px',
                    headerStyle: 'max-width: 500px',
                },
                {
                    name: "cost",
                    align: "left",
                    label: "Cost",
                    field: "cost"
                },
                {
                    name: "type",
                    align: "left",
                    label: "Type",
                    field: "type"
                },
                {
                    name: "grossPD",
                    align: "left",
                    label: "Charge",
                    field: "grossPD"
                },
                {
                    name: "actions",
                    align: "right",
                    label: "Actions",
                    field: "actions"
                }
            ],
            pagination: { rowsPerPage: 10 },
            rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
            current: 1,
            count: 10,
            pages: 0,

            // #########
            id: null,
            showTeacherModal: false,
            isEdit: true,
        }
    },
    methods: {
        teachersParsing(data) {
            let arr = []
            for(let i=0; i<data.length; i++) {
                let teacherObject = {
                    id: data[i].id,
                    provider: {
                        id: data[i].supplier && data[i].supplier.id,
                        label: data[i].supplier && data[i].supplier.short_name
                    },
                    status_uni: {
                        id: data[i].status ? data[i].status.id : null,
                        label: data[i].status  ?data[i].status.name : 'N/A',
                        description: data[i].status.description
                    },
                    teacherName: data[i].teacher.first_name + ' ' + data[i].teacher.last_name,
                    activity_date: data[i].start_date + '-' + data[i].end_date,
                    cost: data[i].cost,
                    type_uni: {
                        id: data[i].category.id,
                        label: data[i].category.name,
                        name: data[i].category.abbreviation
                    },
                    percentage: parseFloat(data[i].allocation_percentage),
                    teacher_id: data[i].teacher_id,
                    //
                }
                arr.push(teacherObject)
            }
            return arr
        },
        getTeacherBudgetByType(type, id, limit, page) {

            const conf = {
              method: 'GET',
              url: config.getTeacherBudget + type + '/' + id + '?limit=' + limit + '&page=' + page,
              headers: {
                Accept: 'application/json',
              }
            }

            axios(conf).then(res => {

                this.pages = res.data.pagesCount
                let data = res.data.items

                console.log(' kkkkk pppp ', data);

                let finalResult = this.teachersParsing(data)
                console.log('Final result : ', finalResult)
                this.data = finalResult

            })
        },
        openTeacherPopup(data, index) {
            this.isEdit = true
            this.showTeacherModal = true
            this.id = data.teacher_id
        },
        closeTeacherPopup() {
            this.showTeacherModal = false
        },
    },
    created() {
        this.getTeacherBudgetByType(this.title, this.$route.params.id, this.count, this.current)
    }
}
</script>

<style lang="scss" scoped>

.left-col {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
}
.right-col {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 40px;
}

</style>