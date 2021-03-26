<template>
    <div>

        <dialog-draggable 
            :width="1000" 
            :modelDialog="showPopup" 
            :title="'Teacher Assignment Details'" 
            @onHide="hidePopup"
            :icon="'group'"
            :color="'green'"
        >
            <div class="q-pa-md scroll" style="max-height: 70vh">
                <div class="row">

                    <div class="col-md-5 q-pr-md">

                        <div class="row">
                            <div class='col-md-6'>
                                <div class="q-mb-md">
                                    <div class="text-subtitle2 q-mb-sm">Employee</div>
                                    <q-select
                                        :disable="isEdit"
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
                            <div class='col-md-6 q-pl-md'>
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
                            <div class="text-subtitle2 q-mb-sm">Employee Detail</div>
                            <div class="bordered-box">
                                <div class="row">
                                    <div class="col-md-4 left-col">
                                        <b>Employment:</b>
                                    </div>
                                    <div class="col-md-6 right-col">
                                        <span> {{editedItem.employement}} </span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 left-col">
                                        <b>Compensation:</b>
                                    </div>
                                    <div v-if="editedItem.compensation" class="col-md-6 right-col">
                                        <span>{{editedItem.compensation.name}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 left-col">
                                        <b>Pay Frequency:</b>
                                    </div>
                                    <div v-if="editedItem.payFrequesncy" class="col-md-6 right-col">
                                    <span>{{editedItem.payFrequesncy.name}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 left-col">
                                        <b>Pay:</b>
                                    </div>
                                    <div class="col-md-6 right-col">
                                    <span>$ <span>{{editedItem.pay}}</span></span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 left-col">
                                        <b>Work Month:</b>
                                    </div>
                                    <div class="col-md-6 right-col">
                                    <span>{{editedItem.workMonth}}</span>
                                    </div>
                                </div>
                                <div class="row">
                                    <div class="col-md-4 left-col">
                                        <b>Benefits:</b>
                                    </div>
                                    <div class="col-md-6 right-col">
                                    <span>{{editedItem.benefits}}</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div class="col-md-7 q-pl-md">

                        <div class="row">
                            <div class="col-6 q-pr-sm q-mb-md">
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
                            <div class="col-6 q-pr-sm q-mb-md">
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

                                    <q-popup-edit v-model="editedItem.subcategory" buttons>
                                        <div class="q-mb-lg q-mt-lg">
                                                <div class="text-subtitle2 q-mb-sm">Allocation Subcategory</div>
                                                <div class="row cursor-pointer h-popup">
                                                    <q-select 
                                                        class="w-100"
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
                        </div>

                        <div class="q-mb-md">
                            <div class="row">
                                <div class="col-md-6">
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

                            <div class="col-md-2 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Base Rate</div>
                                <q-input prefix="$" v-model="baseRate" disable outlined class="q-mb-md" type="number"  dense autofocus />
                            </div>

                            <div class="col-md-2 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm" v-if="editedItem.isHoursWeek">
                                    {{editedItem.isHoursWeek.label}}
                                </div>
                                <div class="cursor-pointer">

                                    <q-input v-if="editedItem.isHoursWeek && editedItem.isHoursWeek.id == 1" readonly outlined class="q-mb-md" type="text" v-model="totalHours" dense autofocus />
                                    <q-input v-else readonly outlined class="q-mb-md" type="text" v-model="editedItem.hoursWM" dense autofocus />

                                </div>
                                
                                <q-popup-edit v-model="editedItem.isHoursWeek" buttons >
                                    <div class="row w-400" >

                                        <div class="col-md-9 q-pr-md">
                                            <div class="text-subtitle2 q-mb-sm">Schedule</div>
                                            <q-select dense outlined 
                                            :options="hoursOption" 
                                            v-model="editedItem.isHoursWeek" />
                                        </div>

                                        <div class="col-md-3" v-if="editedItem.isHoursWeek && editedItem.isHoursWeek.id == 1">
                                            <div class="text-subtitle2 q-mb-sm">Total Hours</div>
                                            <q-input readonly v-model="totalHours" dense outlined />
                                        </div>
                                        <div class="col-md-3" v-else>
                                            <div class="text-subtitle2 q-mb-sm">Total Hours</div>
                                            <q-input v-model="editedItem.hoursWM" dense outlined />
                                        </div>

                                        <div class="col-md-12 q-mt-md" v-if="editedItem.isHoursWeek && editedItem.isHoursWeek.id == 1">
                                            <div class="row justify-between items-center">                        
                                                <div class="text-subtitle2">Work Days and Hours</div>
                                                <q-checkbox label="Full Time" v-model="editedItem.fullTime" />
                                            </div>
                                        </div>
                                        <div class="row w-100 q-mt-md q-mb-md" v-if="editedItem.isHoursWeek && editedItem.isHoursWeek.id == 1">
                                            <div 
                                                v-for="i in scheduleWeekDays" :key="i.id"
                                                class="col q-pr-sm text-center"
                                            >
                                                <q-btn 
                                                    round 
                                                    :color="i.checked ? 'secondary' : 'grey-1' " 
                                                    :text-color="i.checked ? 'white' : 'black'"
                                                    :label="i.name" 
                                                    @click="i.checked = !i.checked; i.checked ? '' : i.hours = null" 
                                                    :disable="editedItem.fullTime"
                                                />
                                                <q-input v-model="i.hours" :disable="!i.checked || editedItem.fullTime" class="q-mt-sm" outlined dense />
                                            </div>
                                        </div>

                                    </div>
                                </q-popup-edit>
                            </div>

                            <div class="col-md-2">
                                <div class="text-subtitle2 q-mb-sm">
                                    Fringe
                                    <span v-if="editedItem.frienge">/{{ editedItem.frienge.label.slice(0, 1) }}</span>
                                </div>

                                <q-input  
                                    readonly
                                    prefix="$" 
                                    outlined  
                                    class="q-mb-md"
                                    dense 
                                    autofocus 
                                    v-model="editedItem.totalAmount"
                                />
                                <q-popup-edit v-model="editedItem.frienge" buttons>
                                    <div class="row w-300" >
                                        <div class="col-md-8 q-pr-md">
                                            <div class="text-subtitle2 q-mb-sm">Fringe Cost</div>
                                            <q-select dense outlined 
                                                :options="optionsFringe" 
                                                v-model="editedItem.frienge" 
                                            />
                                        </div>

                                        <div class="col-md-4">
                                            <div class="text-subtitle2 q-mb-sm">Total Amount</div>
                                            <q-input type="number" v-model="editedItem.totalAmount" dense outlined />
                                        </div>

                                        <div class="col-md-12">
                                            <p class="q-mt-md">Estimated Hourly Fringe : $ <span>{{ calculateHouryFringe }}</span>/h</p>
                                        </div>

                                    </div>
                                </q-popup-edit>
                            </div>
                        </div>

                        <div class="row q-mb-md">
                            <div class="col-md-4 q-pr-sm">
                                <!-- doc -->
                                <div class="text-subtitle2 q-mb-sm">Assignment type</div>
                                <div> 
                                    <!-- editedItem.isHoursWeek && editedItem.isHoursWeek.id == 1 WEEK hoursWM -->
                                    <!-- editedItem.isHoursWeek && editedItem.isHoursWeek.id == 0 MONTH totalHours-->
                                    <div v-if="editedItem.isHoursWeek && editedItem.isHoursWeek.id == 1">

                                        <div 
                                            v-if="totalHours >= 40">
                                            <q-icon style="font-size: 1.8em; color: green" name="circle"/>
                                            Full Time
                                        </div>
                                        <div v-else>
                                            <q-icon style="font-size: 1.8em; color: orange" name="timelapse"/>
                                            Part Time
                                        </div>

                                    </div>

                                    <div v-else>

                                        <div 
                                            v-if="editedItem.hoursWM >= 8">
                                            <q-icon style="font-size: 1.8em; color: green" name="circle"/>
                                            Full Time
                                        </div>
                                        <div v-else>
                                            <q-icon style="font-size: 1.8em; color: orange" name="timelapse"/>
                                            Part Time
                                        </div>

                                    </div>

                                </div>
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

                        <!-- <div class="row q-mb-md">
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
                        </div> -->

                    </div>

                    <div class="col-md-12 q-mt-lg q-mb-lg" v-if="monthlyDetails">
                        <div class="text-subtitle2 q-mb-sm">
                            Calculated Assignment Details
                        </div>

                        <q-table
                            class="q-mt-md q-mb-md border"
                            :data="monthlyDetails"
                            :columns="teacherSubColumns"
                            hide-bottom
                        >
                            <template v-slot:body="props">
                                <q-tr :props="props">

                                    
                                    <q-td key="hourlyFringe" :props="props">
                                        {{calculateHouryFringe}}
                                    </q-td>

                                    <q-td key="chargeRate" :props="props">
                                        {{chargeRate}}
                                    </q-td>

                                    <q-td key="workDays" :props="props">
                                        {{ workDays }}
                                    </q-td>

                                    <q-td key="workHours" :props="props">
                                            {{ workHours }}
                                    </q-td>

                                    <q-td key="billingCycles" :props="props">
                                        {{ billingCycles }}
                                    </q-td>

                                    
                                    <q-td key="assignmentTotal" :props="props">
                                        {{ assTotal }}
                                    </q-td>

                                    
                                    <q-td key="hourlyOverride" :props="props">
                                        <div class="row justify-end">
                                            <q-checkbox v-model="props.row.isHourlyOverride" />
                                            <q-input
                                            :disable="!props.row.isHourlyOverride" 
                                            :filled="!props.row.isHourlyOverride" 
                                            outlined
                                            class="w-80px" prefix="$"  dense v-model="props.row.hourlyOverride"/>
                                        </div>
                                    </q-td>

                                </q-tr>
                            </template>
                        </q-table>
                    </div>

                    <q-separator class="q-mt-lg q-mb-lg" />

                    <div class="col-md-3 q-pl-md">
                        <q-btn @click="paySchedule" color="primary q-mt-lg">
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
                <q-btn flat label="Cancel" color="primary" @click="hidePopup" />
                <q-btn v-if="isEdit" :loading="btnLoading" @click="editTeacher" flat label="Save" color="primary" />
                <q-btn v-else :loading="btnLoading" @click="addTeacher" flat label="Add" color="primary" />
            </q-card-actions>
            
        </dialog-draggable>

        <PaySchedule 

            @hidePaySchedulePopup="closePaySchedulePopup" 
            :show="showPaySchedule" 
            :icon="'attach_money'"

            :startDate="editedItem.startDate" 
            :endDate="editedItem.endDate"
            :hourlyFringe="chargeRate"
            :selectedWeekDays="scheduleWeekDays"

            :category="editedItem.category"
            :employee="editedItem.teacher"

        />

            <!-- :chargeRate="chargeRate"
            :employeeType="totalHours >= 40 ? 1 : 0"
            :weekHours="totalHours"
            :billingCicle="1" -->

        <!-- :startDate="1" 
            :endDate="2"
            :chargeRate="3"
            :employeeType="4"
            :weekHours="5"
            :billingCicle="1" -->

         <!-- 
            :startDate="editedItem.startDate" 
            :endDate="editedItem.endDate"
            :chargeRate="chargeRate"
            :employeeType="totalHours >= 40 ? 1 : 0"
            :weekHours="totalHours"
            :billingCicle="1"
            
             -->

    </div>
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import DialogDraggable from '../DialogDraggable'
import PaySchedule from './PaySchedule'
var moment = require('moment-business-days');


export default {
    name: 'TeacherPopup',
    components: {
        DialogDraggable,
        PaySchedule
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
        isEdit: {
            required: true
        }
    },
    data() {
        return {
            showPaySchedule: false,
            btnLoading: false,
            teacherSubColumns: [
              { 
                name: "hourlyFringe", 
                align: "left",
                label: "Hourly Fringe", 
                field: "hourlyFringe"
              },
              { 
                name: "chargeRate", 
                align: "left",
                label: "Charge Rate", 
                field: "chargeRate"
              },
               { 
                name: "workDays", 
                align: "left",
                label: "Work Days", 
                field: "workDays"
              },
              { 
                name: "workHours", 
                align: "left",
                label: "Work Hours", 
                field: "workHours"
              },
              { 
                name: "billingCycles", 
                align: "left",
                label: "Billing Cycles", 
                field: "billingCycles"
              },
              { 
                name: "assignmentTotal", 
                align: "left",
                label: "Assignment Total", 
                field: "assignmentTotal"
              },
              { 
                name: "hourlyOverride", 
                align: "right",
                label: "Hourly Override", 
                field: "hourlyOverride"
              },
            ],
            monthlyDetails: [{
                hourlyFringe: 0,
                chargeRate: 90,
                workDays: 12,
                workHours: 34,
                billingCycles: 3,
                assignmentTotal: 900,
                isHourlyOverride: true,
                hourlyOverride: 60,
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
            optionsFringe: [],
            hoursOption: [
                { id: 0, label: 'Hours/Day'},
                { id: 1, label: 'Hours/Week'}
            ],
            scheduleWeekDays: [
                { id: 1, name: 'M', hours: null, checked: false },
                { id: 2, name: 'T', hours: null, checked: false },
                { id: 3, name: 'W', hours: null, checked: false },
                { id: 4, name: 'T', hours: null, checked: false },
                { id: 5, name: 'F', hours: null, checked: false },
                { id: 6, name: 'S', hours: null, checked: false },
                { id: 7, name: 'S', hours: null, checked: false }
            ],
            workDays: 0,
            workHours: 0,
            totalH: 0,
            bRate: 0,
            hFringe: 0,
            billingCycles: 0,
            chRate: 0,
        }
    },
    methods: {
        paySchedule() {
            this.showPaySchedule = true
        },
        closePaySchedulePopup() {
            this.showPaySchedule = false
        },
        hidePopup() {
            this.$emit('hidePopup', true);
        },
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
                console.log('Techer info', teacherInfo)

                this.editedItem = {
                    teacher: {
                        id: teacherInfo.teacher.id,
                        label: teacherInfo.teacher.first_name + ' ' + teacherInfo.teacher.last_name,
                    },
                    role: {
                        id: teacherInfo.teacher.role_type.id,
                        label: teacherInfo.teacher.role_type.name
                    },

                    // hourly: teacherInfo.hourly_pay,
                    // fringe: teacherInfo.fringe,
                    // workMonth: teacherInfo.work_month,
                    // benefits: teacherInfo.has_benefits == '0' ? false : true,
                    
                    assignmentType: {
                        id: teacherInfo.compensation_type.id,
                        label: teacherInfo.compensation_type.name,
                    },
                    category: {
                        id: teacherInfo.teacher.assignment_compensation.category.id,
                        label: teacherInfo.teacher.assignment_compensation.category.name,
                        name: teacherInfo.teacher.assignment_compensation.category.abbreviation
                    },
                    subcategory: {
                        id: teacherInfo.teacher.assignment_compensation.sub_category ? teacherInfo.teacher.assignment_compensation.sub_category.id : 0,
                        label: teacherInfo.teacher.assignment_compensation.sub_category ? teacherInfo.teacher.assignment_compensation.sub_category.name : '',
                        name: teacherInfo.teacher.assignment_compensation.sub_category ? teacherInfo.teacher.assignment_compensation.sub_category.abbreviation : ''
                    },
                    trackingCategory: {
                        id: teacherInfo.teacher.assignment_compensation.category_tracking ? teacherInfo.teacher.assignment_compensation.category_tracking.id : 0,
                        label: teacherInfo.teacher.assignment_compensation.category_tracking ? teacherInfo.teacher.assignment_compensation.category_tracking.name : 0
                    },

                    employement: teacherInfo.teacher.teacher_type.name,
                    compensation: teacherInfo.compensation_type,
                    payFrequesncy: teacherInfo.pay_frequency,
                    pay: teacherInfo.payInfo,
                    workMonth: teacherInfo.work_month,
                    benefits: teacherInfo.has_benefits == '1' ? 'Y' : 'N',

                    startDate: teacherInfo.teacher.assignment_compensation.start_date,
                    endDate: teacherInfo.teacher.assignment_compensation.end_date,
                    // hoursWeek: teacherInfo.teacher.assignment_compensation.hours_per_week,
                    isHoursWeek: { id: 1, label: 'Hours/Week'},
                    hoursWM: 0,
                    frienge: { id: 5, label: "Monthly" },
                    hourlyFrienge: 100,
                    totalAmount: 0,
                    assignmentStatus: {
                        id: teacherInfo.teacher.assignment_compensation.status.id,
                        label: teacherInfo.teacher.assignment_compensation.status.name,
                    },
                    assignmentType: {
                        id: teacherInfo.teacher.assignment_compensation.status.id,
                        label: teacherInfo.teacher.assignment_compensation.status.name,
                    },
                    // billingStatus: {
                    //     id: teacherInfo.teacher.assignment_compensation.billing_status.id,
                    //     label: teacherInfo.teacher.assignment_compensation.billing_status.name,
                    // },
                    note: teacherInfo.teacher.assignment_compensation.note,
                    salary_pay: teacherInfo.salary_pay,

                    adminMarkupFee: res.data.admin_markup_fee,
                    allocationPercentage: parseFloat(teacherInfo.teacher.assignment_compensation.allocation_percentage),
                    markupFee: res.data.markup_fee,
                    //
                    fullTime: false,

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
                url: config.fringeTypes,
                headers: {
                    Accept: 'application/json',
                }
            }
            axios(conf).then(res => {

                console.log('fringe 99999', res)

                
                const fringe = res.data.fringType;
                let fringeArr = [];

                for(let i=0; i<fringe.length; i++) {
                    fringeArr.push({
                        id: fringe[i].id,
                        label: fringe[i].name
                    })
                }

                this.optionsFringe = fringeArr
            });

        },
        getFringeTypes() {

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
                console.log('optionsEmployementTypes', res)
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

        // MONTH CALCULATION METHODS
        monthDiff(start, end) {
            

            let startArr = start.split('/')
            let endArr = end.split('/')

            if(parseInt(startArr[0]) == parseInt(endArr[0])) {

                let count = (parseInt(endArr[1]) - parseInt(startArr[1])) + 1
                if (isNaN(count)) {
                    count = 0
                }
                this.billingCycles = count


            }else {

                let years = parseInt(endArr[0]) - parseInt(startArr[0])
                if(years >= 2) {
                    this.editedItem.endDate = this.editedItem.startDate
                    alert('You can choose maximum 1 year.')
                }else {

                    let count = (parseInt(endArr[1]) - parseInt(startArr[1])) + 13
                    if (isNaN(count)) {
                        count = 0
                    }
                    console.log('count end = ', count)
                    this.billingCycles = count
                }
            }


        },
        calculateBusinessDays() {

            const start = this.editedItem.startDate.substring(0, 10);
            const end = this.editedItem.endDate.substring(0, 10);

            let isWorkingDay = moment(end, 'YYYY-MM-DD').isBusinessDay()

            this.monthDiff(start, end)
            
            let diff = moment(start, 'YYYY-MM-DD').businessDiff(moment(end,'YYYY-MM-DD'));
            
            if(isWorkingDay) {
                diff = diff + 1
            }

            this.workDays = diff

            console.log('this.totalHours', this.totalH)

            if(this.editedItem.isHoursWeek && this.editedItem.isHoursWeek.id == 1) {
                // console.log('if', diff * this.totalH)
                this.workHours = diff * this.totalH
                // this.workHours = 900
            }else {
                // console.log('else', diff * this.editedItem.hoursWM)
                this.workHours = diff * this.editedItem.hoursWM
                // this.workHours = 500
            }
        
        },
        // =========================
        addTeacher() {

        },
        editTeacher() {

        },
    },
    watch: {
        editedItem(val) {
            console.log('edited item', val)
        },
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
        'editedItem.fullTime'(val) {
            if(val) {
                this.scheduleWeekDays = [
                    { id: 1, name: 'M', hours: 8, checked: true },
                    { id: 2, name: 'T', hours: 8, checked: true },
                    { id: 3, name: 'W', hours: 8, checked: true },
                    { id: 4, name: 'T', hours: 8, checked: true },
                    { id: 5, name: 'F', hours: 8, checked: true },
                    { id: 6, name: 'S', hours: null, checked: false },
                    { id: 7, name: 'S', hours: null, checked: false }
                ]
            }else {
                this.scheduleWeekDays = [
                    { id: 1, name: 'M', hours: null, checked: false },
                    { id: 2, name: 'T', hours: null, checked: false },
                    { id: 3, name: 'W', hours: null, checked: false },
                    { id: 4, name: 'T', hours: null, checked: false },
                    { id: 5, name: 'F', hours: null, checked: false },
                    { id: 6, name: 'S', hours: null, checked: false },
                    { id: 7, name: 'S', hours: null, checked: false }
                ]
            }
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
        this.getFringeTypes()

        // ----



    },
    computed: {
        showPopup() {
            return this.show
        },
        totalHours() {
            
            const days = this.scheduleWeekDays;
            let count = 0;
            for(let i=0; i<days.length; i++) {
                if(days[i].hours != null && days[i].hours != '') {
                    count += parseFloat(days[i].hours)
                }
            }
            this.totalH = count
            return count
        },
        calculateHouryFringe() {

            let fringe = this.editedItem.frienge,
            calculateHouryFringe = 0;

            // WEEKLY
            if(this.editedItem.isHoursWeek && this.editedItem.isHoursWeek.id == 1) {
                if(fringe) {
                    if(fringe.id == 1) {
                        // Hourly
                        calculateHouryFringe = this.editedItem.totalAmount
                    }else if(fringe.id == 2) { 
                        // Weekly
                        if(this.editedItem.fullTime) {
                            calculateHouryFringe = this.editedItem.totalAmount / 40
                        }else {
                            calculateHouryFringe = this.editedItem.totalAmount / this.totalH
                        }
                    }else if(fringe.id == 3) { 
                        // Bi Weekly
                        if(this.editedItem.fullTime) {
                            calculateHouryFringe = this.editedItem.totalAmount / 80
                        }else {
                            calculateHouryFringe = this.editedItem.totalAmount / (this.totalH * 2)
                        }
                    }else if(fringe.id == 4) { 
                        // Semi Monthly
                        if(this.editedItem.fullTime) {
                            calculateHouryFringe = this.editedItem.totalAmount / 80
                        }else {
                            calculateHouryFringe = this.editedItem.totalAmount / (this.totalH * 2)
                        }
                    }else {
                        // Monthly
                        if(this.editedItem.fullTime) {
                            calculateHouryFringe = this.editedItem.totalAmount / 160
                        }else {
                            calculateHouryFringe = this.editedItem.totalAmount / (this.totalH * 4)
                        }
                    }
                }
            }else {
                if(fringe) {
                    if(fringe.id == 1) {
                        // Hourly
                        calculateHouryFringe = this.editedItem.totalAmount
                    }else if(fringe.id == 2) { 
                        // Weekly
                        calculateHouryFringe = this.editedItem.totalAmount / 40
                    }else if(fringe.id == 3) { 
                        // Bi Weekly
                        calculateHouryFringe = this.editedItem.totalAmount / 80
                    }else if(fringe.id == 4) { 
                        // Semi Monthly
                        calculateHouryFringe = this.editedItem.totalAmount / 80
                    }else {
                        // Monthly
                        calculateHouryFringe = this.editedItem.totalAmount / 160
                    }
                }
            }

            // if(typeof calculateHouryFringe != Number ) {
            //     calculateHouryFringe = 0
            // }

            if (isNaN(calculateHouryFringe)) {
                calculateHouryFringe = 0
            }

            console.log('calculateHouryFringe', calculateHouryFringe)
            this.hFringe = calculateHouryFringe
            return calculateHouryFringe.toFixed(2)


            // {"id":1,"name":"Hourly","descripion":"Hourly Fringe"},
            // {"id":2,"name":"Weekly","descripion":"Weekly Fringe"},
            // {"id":3,"name":"Bi Weekly","descripion":"Bi Weekly Fringe"},
            // {"id":4,"name":"Semi Monthly","descripion":"Semi Monthly Fringe"},
            // {"id":5,"name":"Monthly","descripion":"Monthly Fringe"}]

        },
        baseRate() {

            let baseR = 0;

            // 1 - weekly
            // 2 - bi weekly
            // 3 - semi monthly
            // 4 - monthly

            // Hours Week
            if(this.editedItem.compensation && this.editedItem.compensation.id == 2) {
                    // salary
                    baseR = this.editedItem.pay
            }else {
                if(this.editedItem.payFrequesncy){
                    if(this.editedItem.payFrequesncy.id == 1) {
                        baseR = this.editedItem.pay / 40
                    }else if(this.editedItem.payFrequesncy.id == 2) {
                        baseR = this.editedItem.pay / 80
                    }else if(this.editedItem.payFrequesncy.id == 3) {
                        baseR = this.editedItem.pay / 80
                    } else {
                        baseR = this.editedItem.pay / 160 // x 170
                    }
                }
            }



            if (isNaN(baseR)) {
                baseR = 0
            }

            console.log('Base rate = ', baseR)
            this.bRate= baseR
            return baseR.toFixed(2)

        },
        chargeRate() {
            // ((Base rate x markup fee) + hourly fringe) x admin fee   
            

            let markupFee = 1 + this.editedItem.markupFee / 100
            let adminMarkupFee = 1 + this.editedItem.adminMarkupFee / 100
            let rate = (( this.bRate  *  markupFee ) + this.hFringe )  *  adminMarkupFee 
            
            if (isNaN(rate)) {
                rate = 0
            }

            this.chRate = rate.toFixed(2)
            return rate.toFixed(2)
        },
        assTotal() {
            if(this.monthlyDetails[0].isHourlyOverride) {

                let total = (this.monthlyDetails[0].hourlyOverride * this.workHours)
                if (isNaN(total)) {
                    total = 0
                }
                return total.toFixed(2)
                
            }else {
                
                let total = (parseFloat(this.chRate) * this.workHours)
                if (isNaN(total)) {
                    total = 0
                }
               return total.toFixed(2)
                
            }
        }
    }
}
</script>

<style lang="scss" scoped>

.left-col {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
}
.right-col {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    height: 30px;
}

.w-80px {
    width: 80px;
}

.w-400 {
    width: 400px !important;
}
.w-300 {
    width: 300px !important;
}

</style>