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
            
                <q-tr :props="props" class="cursor-pointer" @click="openTeacherPopup(props.row, props.rowIndex)" >
                    
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
                        <span class="inline-span table-text">{{ props.row.teacherName }}</span>
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

        <dialog-draggable 
            :width="900" 
            :modelDialog="showTeacherModal" 
            :title="'Teacher Assignment Details'" 
            @onHide="showTeacherModal=false"
            :icon="'group'"
            :color="'green'"
        >
            <div class="q-pa-md scroll" style="max-height: 70vh">
                <div class="row">

                    <div class="col-md-6 q-pr-md">

                        <div class="row">
                            <div class='col-md-7'>
                                <div class="q-mb-md">
                                    <div class="text-subtitle2 q-mb-sm">Employee</div>
                                    <q-select  
                                        outlined
                                        dense
                                        input-debounce="0"
                                        v-model="editedItem.teacher" 
                                        :options="optionsTeachers"
                                    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                No results
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </div>
                            </div>
                            <div class='col-md-5 q-pl-md'>
                                    <div class="text-subtitle2 q-mb-sm">Role</div>
                                    <q-select  
                                        outlined
                                        dense
                                        input-debounce="0"
                                        v-model="editedItem.teacher" 
                                        :options="optionsTeachers"
                                    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                No results
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select> 
                            </div>
                        </div>

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Campus</div>
                            <q-select  
                                outlined
                                dense
                                input-debounce="0"
                                v-model="editedItem.campus" 
                                :options="optionsCampus"
                            >
                                <template v-slot:no-option>
                                    <q-item>
                                        <q-item-section class="text-grey">
                                        No results
                                        </q-item-section>
                                    </q-item>
                                </template>
                            </q-select>
                        </div>

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Compensation Detail</div>
                            <div class="row">
                                <div class="col-md-4 left-col">
                                    <b>Hourly</b>
                                </div>
                                <div class="col-md-6 right-col">
                                    $ <span>23.46</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 left-col">
                                    <b>Fringe</b>
                                </div>
                                <div class="col-md-6 right-col">
                                    $ <span>23.46</span>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 left-col">
                                    <b>Work Month</b>
                                </div>
                                <div class="col-md-6 right-col">
                                    10
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-md-4 left-col">
                                    <b>Benefits</b>
                                </div>
                                <div class="col-md-6 right-col">
                                    <q-checkbox v-model="editedItem.benefits" />
                                </div>
                            </div>
                        </div>



                        <div class="row q-mb-md">
                            <div class="col-md-4 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Assignment type</div>
                                <div> <q-icon color="green" name="watch" class="q-mr-md" style="font-size: 1.5em"/> Part time</div>
                            </div>
                        </div>

                        

                    </div>

                    <div class="col-md-6 q-pl-md">

                        <div class="row">
                            <div class="col-md-10 q-pr-sm q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Allocation Category</div>
                                <div class="row cursor-pointer h-popup">

                                    <div v-if="editedItem.type_uni && editedItem.type_uni.name == 'PD'">
                                        <q-chip 
                                            square color="green" 
                                            text-color="white" 
                                        >
                                            <span>PD</span>
                                        </q-chip>
                                        <span>Professional Development</span>
                                    </div>

                                    <div v-else>
                                        <q-chip square color="purple" text-color="white" >
                                            <span>FE</span>
                                        </q-chip>
                                        <span>Family Engagement</span>
                                    </div>

                                    <q-popup-edit v-model="editedItem.type_uni" buttons>
                                        <div class="row q-mb-lg q-mt-lg">
                                            <div class="col-md-6 q-pr-sm q-mb-md">
                                                <div class="text-subtitle2 q-mb-sm">Allocation Category</div>
                                                <div class="row cursor-pointer h-popup">
                                                    <q-select 
                                                        v-model="editedItem.type_uni" 
                                                        :options="optionsCategory"
                                                        outlined
                                                        dense
                                                    />
                                                </div>
                                            </div>
                                            <div class="col-md-6 q-pr-sm q-mb-md">
                                                <div class="text-subtitle2 q-mb-sm">Allocation Subcategory</div>
                                                <div class="row cursor-pointer h-popup">
                                                    <q-select 
                                                        v-model="editedItem.subcategory_uni" 
                                                        :options="optionsSubcategory"
                                                        outlined
                                                        dense
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </q-popup-edit>  

                                </div>
                            </div>
                        </div>

                        <div class="q-mb-md">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-subtitle2 q-mb-sm">Tracking Category</div>
                                    <q-select  
                                        outlined
                                        dense
                                        input-debounce="0"
                                        v-model="editedItem.tracking_category_uni" 
                                        :options="optionsCategoryTracking"
                                    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                No results
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </div>
                            </div>
                        </div>

                        <div class="row">
                            <div class="col-md-12">
                                <div class="text-subtitle2 q-mb-sm">Assignment Information</div>
                            </div>
                            <div class="col-md-3 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Start Date</div>
                                <q-input outlined   class="q-mb-md" type="text" v-model="editedItem.startDate" dense autofocus />
                            </div>
                            <div class="col-md-3 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">End Date</div>
                                <q-input outlined   class="q-mb-md" type="text" v-model="editedItem.endDate" dense autofocus />
                            </div>
                            <div class="col-md-3 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Hours/Week</div>
                                <q-input outlined class="q-mb-md" type="text" v-model="editedItem.allocation" dense autofocus />
                            </div>
                            <div class="col-md-3">
                                <div class="text-subtitle2 q-mb-sm">Fringe</div>
                                <q-input  
                                    prefix="$" outlined  class="q-mb-md" type="text" 
                                    :value="editedItem.mFrienge == null ? ((editedItem.fringe * editedItem.allocation) / 100) : editedItem.mFrienge "
                                    dense autofocus />
                                    <q-popup-edit v-model="editedItem.mFrienge" title="Update Monthly Fringe" buttons>
                                        <q-input v-model="editedItem.mFrienge" dense autofocus counter />
                                    </q-popup-edit>
                            </div>
                        </div>

                        <div class="row q-mb-md">
                            <div class="col-md-4 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Assignment status</div>
                                <div> <q-icon color="green" name="watch" class="q-mr-md" style="font-size: 1.5em"/> Active</div>
                            </div>
                        </div>

                        <div class="row q-mb-md">
                            <div class="col-md-4 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Billing status</div>
                                <div> <q-icon color="green" name="watch" class="q-mr-md" style="font-size: 1.5em"/> None</div>
                            </div>
                        </div>

                    </div>

                    <div class="col-md-12 q-mt-lg q-mb-lg" v-if="monthlyDetails">
                        <div class="text-subtitle2 q-mb-sm">
                            Calculated Monthly Details and Pay Rate
                        </div>
                        <q-table
                            class="q-mt-md q-mb-md border"
                            :data="monthlyDetails"
                            :columns="teacherSubColumns"
                            hide-bottom
                        >
                            <template v-slot:body="props">
                                <q-tr :props="props">
                                    <!-- Work month – 0.5 -->
                                    <q-td key="payMonth" :props="props">
                                    {{ editedItem.workMonth - 0.5 }}
                                    </q-td>
                                    <q-td key="payPeriod" :props="props">
                                        <span v-if="(editedItem.workMonth - 0.5) % 1 == 0">
                                            {{editedItem.workMonth - 0.5}}
                                        </span>
                                        <span v-else>
                                            {{(editedItem.workMonth - 0.5) * 2}}
                                        </span>
                                    </q-td>
                                    <!-- Charge = (teacher pay for (monthly, week, bi week, semi-month) * Markup fee) 
                                    * allocation percentage -->
                                    <q-td key="charge" :props="props">
                                        {{ ((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100).toFixed(2) }}
                                    </q-td>
                                    <!-- Gross = (calculated Charge amount * allocation percentage) + Fringe -->
                                    <q-td key="gross" :props="props">
                                        {{ (((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100 ) + (editedItem.fringe * editedItem.allocation) / 100).toFixed(2) }}
                                    </q-td>
                                    <!-- Total w/Admin = Gross * admin markup -->
                                    <q-td key="totalAdmin" :props="props">
                                    {{ ((((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100 ) + ((editedItem.fringe * editedItem.allocation) / 100) ) * editedItem.adminMarkupFee).toFixed(2)}}
                                    </q-td>
                                    <!-- Hourly rate = total w/admin / work hours in a month -->
                                    <q-td key="hourlyRate" :props="props">
                                    {{ (((((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100 ) + ((editedItem.fringe * editedItem.allocation) / 100) ) * editedItem.adminMarkupFee) / editedItem.hourInMonth).toFixed(2) }}
                                    </q-td>
                                    <!-- <q-td key="weeklyRate" :props="props">
                                    {{ props.row.weeklyRate }}
                                    </q-td>
                                    <q-td key="biWeekly" :props="props">
                                    {{ props.row.biWeekly }}
                                    </q-td> -->
                                    <q-td key="semiMonthly" :props="props">
                                    {{ (((((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100 ) + ((editedItem.fringe * editedItem.allocation) / 100) ) * editedItem.adminMarkupFee) / 2).toFixed(2) }}
                                    </q-td>
                                    <q-td key="anual" :props="props">
                                    {{ (((((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100 ) + ((editedItem.fringe * editedItem.allocation) / 100) ) * editedItem.adminMarkupFee) * (editedItem.workMonth - 0.5)).toFixed(2) }}
                                    </q-td>
                                    <q-td key="override" :props="props">
                                        <div>
                                            <q-checkbox v-model="props.row.override" />
                                        </div>
                                    </q-td>
                                    <q-td key="hourlyRate" :props="props">
                                        <q-input outlined dense v-model="props.row.hourlyRate"/>
                                    </q-td>
                                </q-tr>
                            </template>

                        </q-table>
                    </div>

                    <!-- <div class="col-md-6 q-pr-md">
                        <div class="row">
                            <div class="col-md-12">
                                <div class="text-subtitle2 q-mb-sm">Rate override</div>
                            </div>
                            <div class="col-md-4 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Hourly</div>
                                <q-input outlined   class="q-mb-md" type="text" v-model="editedItem.hourlyRate" dense autofocus />
                            </div>
                            <div class="col-md-4 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Semi-Monthly</div>
                                <q-input outlined class="q-mb-md" type="text" :value="(((((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100 ) + ((editedItem.fringe * editedItem.allocation) / 100) ) * editedItem.adminMarkupFee) / 2).toFixed(2)" dense autofocus />
                            </div>
                            <div class="col-md-4">
                                <div class="text-subtitle2 q-mb-sm">Anual</div>
                                <q-input outlined class="q-mb-md" type="text" :value="(((((( (editedItem.semiMonthly * 2) * editedItem.markupFee ) * editedItem.allocation) / 100 ) + ((editedItem.fringe * editedItem.allocation) / 100) ) * editedItem.adminMarkupFee) * (editedItem.workMonth - 0.5)).toFixed(2)" dense autofocus />
                            </div>
                        </div>
                    </div> -->

                    <q-separator class="q-mt-lg q-mb-lg" />

                    <div class="col-md-3 q-pl-md">
                        <q-btn color="primary q-mt-lg">
                                View pay schedule
                        </q-btn>
                    </div>
                    <div class="col-md-9 q-pl-md">
                        <div class="text-subtitle2 q-mb-sm">Note</div>
                        <q-input 
                            dense 
                            outlined
                            type="textarea"
                            v-model="editedItem.teacher" 
                        />
                    </div>

                </div>
            </div>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn v-if="isEdit" :loading="btnLoading" @click="editTeacher" flat label="Save" color="primary" />
                <q-btn v-else :loading="btnLoading" @click="addTeacher" flat label="Add" color="primary" />
            </q-card-actions>
            
        </dialog-draggable>

    </div>
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import DialogDraggable from '../DialogDraggable'

export default {
    props: {
        title: {
            requred: true
        }
    },
    components: {
        DialogDraggable
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

            isEdit: false,
            showTeacherModal: false,
            editedItem: {},
            index: null,
            //
            teacherSubColumns: [
              { 
                name: "payMonth", 
                align: "left",
                label: "Pay Month", 
                field: "payMonth"
              },
              { 
                name: "payPeriod", 
                align: "left",
                label: "Pay Period", 
                field: "payPeriod"
              },
              { 
                name: "charge", 
                align: "left",
                label: "Charge", 
                field: "charge"
              },
              { 
                name: "gross", 
                align: "left",
                label: "Gross Pay", 
                field: "gross"
              },
              { 
                name: "totalAdmin", 
                align: "left",
                label: "w/Admin", 
                field: "totalAdmin"
              },
              { 
                name: "hourlyRate", 
                align: "left",
                label: "Hourly", 
                field: "hourlyRate"
              },
            //   { 
            //     name: "weeklyRate", 
            //     align: "left",
            //     label: "Weekly", 
            //     field: "weeklyRate"
            //   },
            //   { 
            //     name: "biWeekly", 
            //     align: "left",
            //     label: "bi-Weekly", 
            //     field: "biWeekly"
            //   },
              { 
                name: "semiMonthly", 
                align: "left",
                label: "Monthly", 
                field: "semiMonthly"
              },
              { 
                name: "anual", 
                align: "left",
                label: "Anual", 
                field: "anual"
              },
              { 
                name: "override", 
                align: "left",
                label: "Override", 
                field: "override"
              },
              { 
                name: "hourlyRate", 
                align: "left",
                label: "Hourly Rate", 
                field: "hourlyRate"
              },
            ],
            monthlyDetails: [{
                payMonth: 'Text 1',
                payPeriod: 'Text 2',
                charge: 'Text 3',
                gross: 'Text 4',
                totalAdmin: 'Text 5',
                hourlyRate: 'Text 6',
                weeklyRate: 'Text 7',
                biWeekly: 'Text 8',
                semiMonthly: 'Text 9',
                anual: 'Text 10',
                override: true,
                hourlyRate: '',
            }]
        }
    },
    methods: {
        teachersParsing(data) {
            let arr = []
            for(let i=0; i<data.length; i++) {
                let teacherObject = {
                    id: data[i].id,
                    provider: {
                        id: data[i].teacher_supplier && data[i].teacher_supplier.id,
                        label: data[i].teacher_supplier && data[i].teacher_supplier.short_name
                    },
                    status_uni: {
                        id: data[i].status ? data[i].status.id : null,
                        label: data[i].status  ?data[i].status.name : 'N/A',
                        description: data[i].status.description
                    },
                    teacherName: data[i].name,
                    activity_date: data[i].start_date + '-' + data[i].end_date,
                    cost: data[i].cost,
                    type_uni: {
                        id: data[i].category.id,
                        label: data[i].category.name,
                        name: data[i].category.abbreviation
                    },
                    percentage: data[i].markup_percentage,
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

                let finalResult = this.teachersParsing(data)
                console.log('Final result : ', finalResult)
                this.data = finalResult

            })
        },
        openTeacherPopup(data, index) {

            this.isEdit = true
            this.showTeacherModal = true
            this.editedItem = {...data}
            this.index = index

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