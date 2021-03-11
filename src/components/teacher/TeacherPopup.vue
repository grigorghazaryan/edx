<template>
    <dialog-draggable 
        :width="1000" 
        :modelDialog="show" 
        :title="'Teacher Assignment Details'" 
        @onHide="show=false"
        :icon="'group'"
        :color="'green'"
    >
        <div class="q-pa-md scroll" style="max-height: 70vh">
            <div class="row">

                <div class="col-md-5 q-pr-md">

                    <div class="row">
                        <div class='col-md-7'>
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Employee</div>
                                <q-select
                                    outlined
                                    dense
                                    v-model="editedItem.teacher"
                                    use-input
                                    input-debounce="0"
                                    :options="optionsTeachers"
                                    @filter="filterTeachers"
                                />
                            </div>
                        </div>
                        <div class='col-md-5 q-pl-md'>
                                <div class="text-subtitle2 q-mb-sm">Role</div>
                                <q-select  
                                    outlined
                                    dense
                                    input-debounce="0"
                                    v-model="editedItem.role" 
                                    :options="optionsRoleTypes"
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
                                $ <span>{{ editedItem.hourly }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 left-col">
                                <b>Fringe</b>
                            </div>
                            <div class="col-md-6 right-col">
                                $ <span>{{ editedItem.fringe }}</span>
                            </div>
                        </div>
                        <div class="row">
                            <div class="col-md-4 left-col">
                                <b>Work Month</b>
                            </div>
                            <div class="col-md-6 right-col">
                                <span>{{ editedItem.workMonth }}</span>
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
                            <div> 
                                <div v-if="editedItem.assignmentType" class="cursor-pointer">{{ editedItem.assignmentType.label }}</div>
                                <q-popup-edit buttons v-model="editedItem.assignmentType">
                                    <q-select 
                                        v-model="editedItem.assignmentType" 
                                        :options="optionsEmployementTypes"
                                        outlined
                                        dense
                                    />
                                </q-popup-edit>
                                <!-- optionsEmployementTypes -->
                            </div>
                        </div>
                    </div>

                </div>

                <div class="col-md-7 q-pl-md">

                    <div class="row">
                        <div class="col-4 q-pr-sm q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Allocation Category</div>
                            <div class="row cursor-pointer h-popup">

                                <div v-if="editedItem.category">
                                    <q-chip 
                                        square color="green" 
                                        text-color="white" 
                                    >
                                        <span>{{ editedItem.category.name }}</span>
                                    </q-chip>
                                    <span>{{ editedItem.category.label  }}</span>
                                </div>


                                <q-popup-edit v-model="editedItem.category" buttons>
                                    <div class="q-mb-lg q-mt-lg">
                                            <div class="text-subtitle2 q-mb-sm">Allocation Category</div>
                                            <div class="cursor-pointer h-popup">
                                                <q-select 
                                                    v-model="editedItem.category" 
                                                    :options="typeArr"
                                                    outlined
                                                    dense
                                                />
                                            </div>
                                    </div>
                                </q-popup-edit>  

                            </div>
                        </div>
                        <div class="col-4 q-pr-sm q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Allocation Subcategory</div>
                            <div class="row cursor-pointer h-popup">

                                <div v-if="editedItem.subcategory">
                                     <q-chip 
                                        square color="purple" 
                                        text-color="white" 
                                    >
                                        <span>{{ editedItem.subcategory.name }}</span>
                                    </q-chip>
                                    <span>{{ editedItem.subcategory.label  }}</span>
                                </div>

                                <q-popup-edit v-model="editedItem.category" buttons>
                                    <div class="q-mb-lg q-mt-lg">
                                            <div class="text-subtitle2 q-mb-sm">Allocation Subcategory</div>
                                            <div class="row cursor-pointer h-popup">
                                                <q-select 
                                                    v-model="editedItem.subcategory" 
                                                    :options="optionsSubcategory"
                                                    outlined
                                                    dense
                                                />
                                        </div>
                                    </div>
                                </q-popup-edit>  

                            </div>
                        </div>
                        <div class="col-4 q-pr-sm q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Founding Source</div>
                            <div class="row cursor-pointer h-popup">

                                <div v-if="editedItem.category">
                                    <q-chip 
                                        square color="green" 
                                        text-color="white" 
                                    >
                                        <span>{{ editedItem.category.name }}</span>
                                    </q-chip>
                                    <span>{{ editedItem.category.label  }}</span>
                                </div>

                                <q-popup-edit v-model="editedItem.category" buttons>
                                    <div class="q-mb-lg q-mt-lg">
                                            <div class="text-subtitle2 q-mb-sm">Allocation Category</div>
                                            <div class="row cursor-pointer h-popup">
                                                <q-select 
                                                    v-model="editedItem.category" 
                                                    :options="typeArr"
                                                    outlined
                                                    dense
                                                />
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
                                    v-model="editedItem.trackingCategory" 
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
                            <q-input outlined dense v-model="editedItem.startDate" 
                            >
                                <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date v-model="editedItem.startDate">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-md-3 q-pr-sm">
                            <div class="text-subtitle2 q-mb-sm">End Date</div>
                            <q-input outlined dense v-model="editedItem.endDate">
                                <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date v-model="editedItem.endDate">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div class="col-md-3 q-pr-sm">
                            <div class="text-subtitle2 q-mb-sm">Hours/Week</div>
                            <q-input outlined class="q-mb-md" type="text" v-model="editedItem.hoursWeek" dense autofocus />
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

                    <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Assignment Status</div>
                            <div class="row">
                                <div class="col-md-4">

                                    <div v-if="editedItem.assignmentStatus" class="h-popup cursor-pointer">
                                        <span>{{ editedItem.assignmentStatus.label }}</span>
                                    </div>

                                    <q-popup-edit v-model="editedItem.assignmentStatus" title="Assignment Status" buttons >
                                        <q-select  
                                            outlined
                                            dense
                                            input-debounce="0"
                                            v-model="editedItem.assignmentStatus" 
                                            :options="optionsStatus"
                                        >
                                            <template v-slot:no-option>
                                                <q-item>
                                                    <q-item-section class="text-grey">
                                                    No results
                                                    </q-item-section>
                                                </q-item>
                                            </template>
                                        </q-select>
                                    </q-popup-edit>
                                    
                                </div>
                            </div>
                        </div>

                    <div class="row q-mb-md">
                        <div class="col-md-4 q-pr-sm">
                           <div class="text-subtitle2 q-mb-sm">Billing Status</div>
                            <div class="h-popup">
                                <div v-if="editedItem.billingStatus" class="cursor-pointer">
                                    {{ editedItem.billingStatus.label }}
                                    </div>
                                <q-popup-edit v-model="editedItem.billingStatus" title="Billing Status" buttons >
                                    <q-select  
                                        outlined
                                        dense
                                        input-debounce="0"
                                        v-model="editedItem.billingStatus" 
                                        :options="optionsBilling"
                                    >
                                        <template v-slot:no-option>
                                            <q-item>
                                                <q-item-section class="text-grey">
                                                No results
                                                </q-item-section>
                                            </q-item>
                                        </template>
                                    </q-select>
                                </q-popup-edit>
                            </div>
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

                                
                                <q-td key="workDays" :props="props">
                                    {{ props.row.payMonth }}
                                </q-td>

                                <!-- Work month – 0.5 -->
                                <q-td key="payMonth" :props="props">
                                    {{ props.row.payMonth }}
                                </q-td>


                                <q-td key="payPeriod" :props="props">
                                    <span>
                                        {{ props.row.payMonth }}
                                    </span>
                                </q-td>

                                <!-- Charge = (teacher pay for (monthly, week, bi week, semi-month) * Markup fee) 
                                * allocation percentage -->
                                <q-td key="charge" :props="props">
                                    {{ semiMonthly() }}
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

                                <q-td key="hourlyRateI" :props="props">
                                    <q-input outlined dense v-model="props.row.hourlyRate"/>
                                </q-td>

                            </q-tr>
                        </template>

                    </q-table>
                </div>

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
                        v-model="editedItem.note" 
                    />
                </div>

            </div>
        </div>

        <q-card-actions align="right">
            <q-btn flat label="Cancel" color="primary" @click="show=false" />
            <q-btn v-if="isEdit" :loading="btnLoading" @click="editTeacher" flat label="Save" color="primary" />
            <q-btn v-else :loading="btnLoading" @click="addTeacher" flat label="Add" color="primary" />
        </q-card-actions>
        
    </dialog-draggable>
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import DialogDraggable from '../DialogDraggable'
var moment = require('moment-business-days');


export default {
    name: 'TeacherPopup',
    components: {
        DialogDraggable
    },
    props: {
        show: {
            required: true,
        },
        id: {
            required: true
        },
        title: {
            required: true
        },
    },
    data() {
        return {
            isEdit: false,
            btnLoading: false,
            teacherSubColumns: [
              { 
                name: "workDays", 
                align: "left",
                label: "Work Days", 
                field: "workDays"
              },
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
                name: "hourlyRateI", 
                align: "left",
                label: "Hourly", 
                field: "hourlyRateI"
              },
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
                payMonth: null,
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
            }],
            editedItem: {},
            optionsTeachers: [],
            optionsTeachersForFilter: [],
            optionsCategoryTracking: [],
            optionsCampus: [],
            optionsSubcategory: [],
            typeArr: [],
            optionsRoleTypes: [],
            optionsEmployementTypes: [],
            optionsStatus: [],
            optionsBilling: [],
        }
    },
    methods: {
        getTeacherBudgetById() {

            const conf = {
              method: 'GET',
              url: config.getTeacherBudgetById + this.id,
              headers: {
                Accept: 'application/json',
              }
            }

            axios(conf).then(res => {

                
                let teacherInfo = res.data.teachersCompensation[0]
                console.log('getTeacherBudgetById ==== 90909090909090 ===== ', teacherInfo )

                this.editedItem = {
                    teacher: {
                        id: teacherInfo.teacher.id,
                        label: teacherInfo.teacher.first_name + ' ' + teacherInfo.teacher.last_name,
                    },
                    role: {
                        id: teacherInfo.teacher.role_type.id,
                        label: teacherInfo.teacher.role_type.name
                    },
                    hourly: teacherInfo.hourly_pay,
                    fringe: teacherInfo.fringe,
                    workMonth: teacherInfo.work_month,
                    benefits: teacherInfo.has_benefits == '0' ? false : true,
                    assignmentType: {
                        id: teacherInfo.employement_type.id,
                        label: teacherInfo.employement_type.name,
                    },
                    category: {
                        id: teacherInfo.teacher.assignment_compensation.category.id,
                        label: teacherInfo.teacher.assignment_compensation.category.name,
                        name: teacherInfo.teacher.assignment_compensation.category.abbreviation
                    },
                    subcategory: {
                        id: teacherInfo.teacher.assignment_compensation.sub_category.id,
                        label: teacherInfo.teacher.assignment_compensation.sub_category.name,
                        name: teacherInfo.teacher.assignment_compensation.sub_category.abbreviation
                    },
                    trackingCategory: {
                        id: teacherInfo.teacher.assignment_compensation.category_tracking.id,
                        label: teacherInfo.teacher.assignment_compensation.category_tracking.name
                    },

                    startDate: teacherInfo.teacher.assignment_compensation.start_date,
                    endDate: teacherInfo.teacher.assignment_compensation.end_date,
                    hoursWeek: teacherInfo.teacher.assignment_compensation.hours_per_week,
                    mFrienge: teacherInfo.teacher.assignment_compensation.fringe,
                    assignmentStatus: {
                        id: teacherInfo.teacher.assignment_compensation.status.id,
                        label: teacherInfo.teacher.assignment_compensation.status.name,
                    },
                    billingStatus: {
                        id: teacherInfo.teacher.assignment_compensation.billing_status.id,
                        label: teacherInfo.teacher.assignment_compensation.billing_status.name,
                    },
                    note: teacherInfo.teacher.assignment_compensation.note,
                    salary_pay: teacherInfo.salary_pay,

                    adminMarkupFee: res.data.admin_markup_fee,
                    allocationPercentage: parseFloat(teacherInfo.teacher.assignment_compensation.allocation_percentage),
                    markupFee: res.data.markup_fee,

                }

                this.monthlyDetails.override = teacherInfo.teacher.assignment_compensation.is_override == '0' ? false : true
                this.monthlyDetails.hourlyRate = teacherInfo.teacher.assignment_compensation.hourly_rate
                // this.pages = res.data.pagesCount
                // let data = res.data.items

                // let finalResult = this.teachersParsing(data)
                // console.log('Final result : ', finalResult)
                // this.data = finalResult

            })

        },
        getEmployees() {

            const conf = {
              method: 'GET',
              url: config.getTeachersData + '?pagination=0',
              headers: {
                Accept: 'application/json',
              }
            }

            axios(conf).then(res => {

                let data = res.data.teachers, arr = [];

                for(let i=0; i<data.length; i++) {
                    arr.push({
                        id: data[i].teacherId,
                        value: data[i].teacherId,
                        label: data[i].teacherName
                    })
                } 

                this.optionsTeachers = arr;
                this.optionsTeachersForFilter = arr;

            })
        },
        getCampueses() {

            const conf = {
                method: 'GET',
                url: config.getCampuses + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }
            axios(conf).then(res => {
                console.log('get campuses',  res.data[0].campus)
                
                const campuses = res.data[0].campus;
                let campusesArr = [];

                for(let i=0; i<campuses.length; i++) {
                    campusesArr.push({
                        id: campuses[i].id,
                        label: campuses[i].name
                    })
                }

                this.optionsCampus = campusesArr
            });

        },
        getCategoryTypes(id) {

            const conf = {
                method: 'GET',
                url: config.getCategoryTypes + id + '/6', // 6 is teacher id in budget list
                headers: {
                Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

            let types = res.data.typesCategories;
            let typesArray = []

            for(let i=0; i<types.length; i++) {
            let obj = {
                id: types[i].id,
                label: types[i].name,
                name: types[i].abbreviation
            }
            typesArray.push(obj)
            }

            this.typeArr = typesArray

        })
        },
        getSubcategories(id) {
            const conf = {
                method: 'GET',
                url: config.getSubcategories + id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('res subcategories', res)
                const subcategoriesArr = []
                const subcategories = res.data.typesCategories
                for(let i=0; i<subcategories.length; i++) {
                    let obj = {
                        id: subcategories[i].id,
                        name: subcategories[i].abbreviation,
                        label: subcategories[i].name
                    }
                    subcategoriesArr.push(obj)
                }
                this.optionsSubcategory = subcategoriesArr
            })
        },
        getTrackingCategories() {
            const conf = {
                method: 'GET',
                url: config.getTrackingCategories,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                const categoryTracking = res.data.categoryTracking
                let categoryTrackingArr = [];

                for(let i=0; i<categoryTracking.length; i++) {
                    categoryTrackingArr.push({
                        id: categoryTracking[i].id,
                        label: categoryTracking[i].name
                    })
                }
                this.optionsCategoryTracking = categoryTrackingArr
            })
        },
        getRoletypes() {

            const conf = {
                method: 'GET',
                url: config.getRoleTypes,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                const teacherRoleTypes = res.data.teacherRoleTypes
                let teacherRoleTypesArr = [];

                for(let i=0; i<teacherRoleTypes.length; i++) {
                    teacherRoleTypesArr.push({
                        id: teacherRoleTypes[i].id,
                        label: teacherRoleTypes[i].name
                    })
                }
                this.optionsRoleTypes = teacherRoleTypesArr
            })
        },
        getEmployementTypes() {

            const conf = {
                method: 'GET',
                url: config.getEmployementTypes,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                const teacherEmpTypes = res.data.teacherEmpTypes
                let teacherEmpTypesArr = [];

                for(let i=0; i<teacherEmpTypes.length; i++) {
                    teacherEmpTypesArr.push({
                        id: teacherEmpTypes[i].id,
                        label: teacherEmpTypes[i].name
                    })
                }
                this.optionsEmployementTypes = teacherEmpTypesArr
            })
        },
        getStatus(id) {

            const conf = {
                method: 'GET',
                url: config.getActivityStatus + id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('get status',  res.data)

                // billingStatus - optionsBilling
                // itemStatus - optionsStatus
                
                const billingStatus = res.data.billingStatus;
                let billingStatusArr = [];

                for(let i=0; i<billingStatus.length; i++) {
                    billingStatusArr.push({
                        id: billingStatus[i].id,
                        label: billingStatus[i].name
                    })
                }
                this.optionsBilling = billingStatusArr

                // **********************************************

                const itemStatus = res.data.itemStatus;
                let itemStatusArr = [];

                for(let i=0; i<itemStatus.length; i++) {
                    itemStatusArr.push({
                        id: itemStatus[i].id,
                        label: itemStatus[i].name
                    })
                }
                this.optionsStatus = itemStatusArr
            });

        },
        filterTeachers (val, update, abort) {
            update(() => {
                const needle = val.toLowerCase()
                this.optionsTeachers = this.optionsTeachersForFilter.filter(v => v.label.toLowerCase().indexOf(needle) > -1)
            })
        },
        calculateBusinessDays() {

            const start = this.editedItem.startDate.substring(0, 10);
            const end = this.editedItem.endDate.substring(0, 10);
            
            let diff = moment(start, 'YYYY-MM-DD').businessDiff(moment(end,'YYYY-MM-DD'));
            this.monthlyDetails[0].payMonth = (parseFloat(diff) + 1)
        
        },
        addTeacher() {

        },
        editTeacher() {

        },
        semiMonthly() {
          return this.editedItem.salary_pay
        },
    },
    watch: {
        show(val) {
            if(val) {
                this.getTeacherBudgetById()
            }
        },
        'editedItem.startDate'(){
            //to work with changes in "myArray"
            this.calculateBusinessDays()
        },
        'editedItem.endDate'(){
            //to work with changes in "myArray"
            this.calculateBusinessDays()
        },
        
    },
    created() {

        this.getEmployees()
        this.getCampueses()
        this.getCategoryTypes(this.title)
        this.getSubcategories(this.title)
        this.getTrackingCategories()
        this.getRoletypes()
        this.getEmployementTypes()
        this.getStatus(this.title)

        // ----



    }
}
</script>