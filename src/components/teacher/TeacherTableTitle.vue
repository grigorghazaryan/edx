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

            <!-- Table Header -->
            <template v-slot:top-right="props">

                <q-input
                    :disable="showRemainingBalance"
                    class="q-mr-md"
                    outlines
                    dense
                    v-model="filter"
                    placeholder="Search"
                    @keyup="keyUpFilter" 
                    @keydown="keyDownFilter"
                    style="min-width: 250px; max-width: 250px"
                >
                    <template v-slot:append>
                    <q-icon name="search" />
                    </template>
                </q-input>
       
                <!-- <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
                    dense outlines 
                    v-model="schoolYear" 
                    :options="schoolYears" 
                    label="School year" 
                    @input="filterTeachers"
                    :disable="showRemainingBalance"
                >
                    <template v-if="schoolYear" v-slot:append>
                    <q-icon name="cancel" @click.stop="schoolYear = '', filterTeachers()" class="cursor-pointer" />
                    </template>

                </q-select> -->

            

                <q-btn 
                    square
                    class="q-mr-md edx-add-btn" text-color="white"
                    icon="add" 
                    no-caps
                    @click="openNewTeacherPopup"
                >
                    Add
                </q-btn>

                <q-btn
                    icon-right="archive"
                    label="Export to Excel"
                    class="edx-excel-btn" text-color="white"
                    no-caps
                    @click="exportTable"
                />

                <q-btn
                    flat
                    round
                    dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    v-if="mode === 'list'" class="q-px-sm"
                >
                    <q-tooltip
                    :disable="$q.platform.is.mobile"
                    v-close-popup
                    >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
                    </q-tooltip>
                </q-btn>

                <q-checkbox v-model="showRemainingBalance" label="Show remaining balance" />

                <div class="q-pa-sm q-gutter-sm">

                    <q-dialog v-model="confirm" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this item?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                            <q-btn flat label="No, thanks" color="primary" v-close-popup />
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteItem" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>
                    
                </div>
                <!-- <div class="q-pa-sm q-gutter-sm">

                    <q-dialog v-model="confirm" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this item?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                            <q-btn flat label="No, thanks" color="primary" v-close-popup />
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteItem" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>

                    <q-dialog v-model="confirmAttendeeModal" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                            <q-btn flat label="No, thanks" color="primary" v-close-popup />
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteAttendee" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>

                    <q-dialog v-model="addParticipantModal">
                        <q-card style="width: 550px; max-width: 80vw;">

                        <q-card-section class="row" style="width: 500px; display: flex; align-items: center;">
                            <q-icon name="perm_identity" class="text-blue q-mr-sm" style="font-size: 2em"/>
                            <span class="text-h6" style="line-height: 2.5rem">Create New Attendee</span>
                        </q-card-section>

                    
                        <q-card-section
                            style="max-height: 60vh"
                            class="scroll q-pt-none q-pb-none"
                        >
                            <div class="row">

                            <div class="col-12">
                                <q-input outlined v-model="addNewAttendee.firstName" label="First Name" />
                            </div>

                            <div class="col-12 q-mt-sm">
                                <q-input outlined v-model="addNewAttendee.lastName" label="Last Name" />
                            </div>

                            <div class="col-12 q-mt-sm">
                                <q-input outlined v-model="addNewAttendee.email" label="Email" />
                            </div>
                            
                            </div>
                        </q-card-section>

                        <q-card-actions class="row justify-end">
                            <div>
                            <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                            <q-btn flat label="Add" color="primary" @click="addParticipant"></q-btn>
                            </div>
                        </q-card-actions>
                    

                        </q-card>
                    </q-dialog>

                    <q-dialog v-model="confirmTeacherModal" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this item?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                            <q-btn flat label="No, thanks" color="primary" v-close-popup />
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteTeacherItem" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>

                    <q-dialog v-model="confirmDate" persistent>
                        <q-card>
                        <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this item?</span>
                        </q-card-section>

                        <q-card-actions align="right">
                            <q-btn flat label="No, thanks" color="primary" v-close-popup />
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteDate" />
                        </q-card-actions>
                        </q-card>
                    </q-dialog>

                </div> -->

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
                            square 
                            color="edx-bg-i"
                        >
                            <span>{{props.row.type_uni.name}}</span>
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{ props.row.type_uni.name }}</strong>
                            </q-tooltip>
                        </q-chip>

                    </q-td>

                    <q-td key="grossPD" :props="props">
                        <div>$ {{ (parseFloat(props.row.cost) + parseFloat(((props.row.cost * props.row.percentage) / 100))).toFixed(2) }}</div>
                    </q-td>

                    <q-td key="actions" :props="props" style="min-width: 132px">
                        <q-fab padding="xs" @click.stop color="edx-action-btn" icon="keyboard_arrow_left" direction="left">
                            
                            <q-fab-action
                                icon="content_copy"
                                color="edx-duplicate-btn" 
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
                                color="edx-delete-btn" 
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
            <template v-slot:bottom class="justify-end">
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
            </template>

        </q-table>


        <TeacherPopup 
        
            @hidePopup="closeTeacherPopup" 
            :show="showTeacherModal" :id="id" 
            :title="title" 
            :isEdit="isEdit"
            :isDuplicate="isDuplicate"

        />
 
        

    </div>
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import TeacherPopup from './TeacherPopup'

let typingTimer
let doneTypingInterval = 500

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
            isRemainingPopupOpen: false,
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
            //
            mode: 'list',
            tab: '1',
            //
            pages: 1,
            current: 1,
            count: 10,
            pagination: { rowsPerPage: 10 },
            rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
            //
            

            // #########
            id: null,
            showTeacherModal: false,
            isEdit: true,
            isDuplicate: false,
            showRemainingBalance: false,
            //
            filter: '',
            schoolYear: null,
            schoolYears: [],
            //
            confirm: false,
            editedItem: {},
        }
    },
    methods: {
        //
        openDeleteModal(row) {
            this.editedItem = row
            this.confirm = true
        },
        deleteItem() {
            
            const conf = {
                method: 'DELETE',
                url: config.deleteTeacher + this.editedItem.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                const index = this.data.indexOf(this.editedItem)
                this.data.splice(index, 1)
                    this.$q.notify({
                        message: 'Teacher deleted!',
                        type: 'positive',
                    })
                })
        },
        exportTable() {
            // naive encoding to csv format
            const content = [this.columns.map(col => wrapCsvValue(col.label))].concat(
                this.data.map(row => this.columns.map(col => wrapCsvValue(
                    typeof col.field === 'function'
                        ? col.field(row)
                        : row[col.field === void 0 ? col.name : col.field],
                    col.format
                )).join(','))
            ).join('\r\n')

            const status = exportFile(
                'table-export.csv',
                content,
                'text/csv'
            )

            if (status !== true) {
                this.$q.notify({
                    message: 'Browser denied file download...',
                    color: 'negative',
                    icon: 'warning'
                })
            }
        },
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
        //
        // Pagination
        changePagination (val) {
            this.current = val
            this.getTeacherBudgetByType( parseInt(this.tab), this.$route.params.id, this.count, val )
        },
        changeRowsPerPage() {
            this.count = this.pagination.rowsPerPage
            this.current = 1
            this.getTeacherBudgetByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
        },
        //
        // Filter key events
        keyUpFilter() {
            clearTimeout(typingTimer);
            typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
        },
        keyDownFilter() {
            clearTimeout(typingTimer);
        },
        doneTyping() {
            if(this.filter.length > 1 || this.filter.length == 0) {
                this.filterTeachers()
            }
        },
        //
        filterTeachers() {

            this.loading = true
            
            let uri = '';

            if(this.filter != '') {
                uri += '&search=' + this.filter
            }

            if(this.schoolYear) {
                uri += '&year=' + this.schoolYear.id
            }

            const conf = {
                method: 'GET',
                url: config.filterTeacher + this.tab + '/' + this.$route.params.id + '?' + uri,
                headers: {
                Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                this.pages = res.data.pagesCount
                let data = res.data.teachers
                
                let filteredData = this.teachersParsing(data)

                this.data = filteredData

                this.loading = false

            });
        },
        // Get School Years
        getSchoolYears() {
            const conf = {
                method: 'GET',
                url: config.getSchoolYears,
                headers: {
                Accept: 'application/json',
                }
            }
            axios(conf).then(res => {
                console.log('getSchoolYears',  res)

                let data = res.data, schoolsArr = []
                for(let i=0; i<data.length; i++) {
                let obj = {
                    id: data[i].id,
                    label: data[i].year_name,
                    value: data[i].year_name
                }
                schoolsArr.push(obj)
                }
                this.schoolYears = schoolsArr
            })
        },
        openNewTeacherPopup() {

            this.isEdit = false
            this.showTeacherModal = true

        },
        openDuplicatePopup(row) {
            
            this.showTeacherModal = true
            this.isDuplicate = true
            this.isEdit = false

        }
        
    },
    created() {
        this.tab = this.title.toString()
        let tab = parseInt(this.tab)

        this.getTeacherBudgetByType(this.title, this.$route.params.id, this.count, this.current)
        this.getSchoolYears()
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