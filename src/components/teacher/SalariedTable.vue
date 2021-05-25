<template>
<div>
    
    <q-table
        :data="data" 
        :columns="columns"
        :loading="loading"
        class="no-shadow"
        row-key="teacher"
    >

        <!-- Loading -->
        <template v-slot:loading>
            <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Header -->
        <!-- <template v-slot:top-right="props">

        <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="schoolYear" :options="schoolYears" label="School year"/>

        <q-btn square class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" @click="show_dialog = true" no-caps>Assign Teacher</q-btn>
        <q-btn
            icon-right="archive"
            label="Export to Excel"
            color="teal" 
            text-color="white"
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

        <div class="q-pa-sm q-gutter-sm">
            
            <q-dialog v-model="show_dialog" >
            <q-card>
                <q-card-section>
                <div class="text-h6">Add Teacher</div>
                </q-card-section>

                <q-card-section>
                <div class="row">

                    <div class="col-md-6 q-pr-sm q-pb-md">
                    <q-input outlined v-model="editedItem.employee" label="Employee" />
                    </div>

                    <div class="col-md-6 q-pb-md">
                    <q-input outlined v-model="editedItem.date">
                        
                        <template v-slot:prepend>
                        <q-icon name="event" class="cursor-pointer">
                            <q-popup-proxy transition-show="scale" transition-hide="scale">
                            <q-date color="edx-pagination" v-model="editedItem.date" mask="MM-DD-YYYY">
                                <div class="row items-center justify-end">
                                <q-btn v-close-popup label="Close" color="primary" flat />
                                </div>
                            </q-date>
                            </q-popup-proxy>
                        </q-icon>
                        </template>

                    </q-input>
                    </div>

                    <div class="col-md-6 q-pr-sm q-pb-md">
                    <q-input outlined v-model="editedItem.firstName" label="First Name" />
                    </div>

                    <div class="col-md-6 q-pr-sm q-pb-md">
                    <q-input outlined v-model="editedItem.lastName" label="Last Name" />
                    </div>

                    <div class="col-md-12">
                    <q-input type="textarea" v-model="editedItem.notes" outlined label="Notes" />
                    </div>
                
                </div>
                </q-card-section>
            
                <q-card-actions align="right">
                <q-btn flat label="Confirm" color="primary" v-close-popup @click="addRow"></q-btn>
                </q-card-actions>

            </q-card>
            </q-dialog>
            
            <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure to delete this item?</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                <q-btn label="Yes" color="red" v-close-popup @click="deleteItem" />
                </q-card-actions>
            </q-card>
            </q-dialog>

        </div>
    
        </template> -->

        <!-- Table Body -->
        <template v-slot:body="props">
        
            <q-tr :props="props" class="cursor-pointer" @click="openTeacherPopup(props.row, props.rowIndex)">

                <q-td key="teacher" :props="props">
                    {{ props.row.teacher }}
                </q-td>

                <q-td key="benefits" :props="props">
                    <q-toggle v-model="props.row.benefits" color="blue" />
                </q-td>
                
                <q-td key="workMonth" :props="props">
                    <div>{{ props.row.workMonth }}</div>
                </q-td>

                <q-td key="allocation" :props="props">
                    <div>{{ props.row.allocation }} %</div>
                </q-td>

                <q-td key="increase" :props="props">
                    <div>{{ props.row.increase }} %</div>
                </q-td>

                <q-td key="currentSalary" :props="props">
                    <div>$ {{ props.row.currentSalary }}</div>
                </q-td>

                <q-td key="fringe" :props="props">
                    <div>$ {{ props.row.fringe }}</div>
                </q-td>

                <q-td key="semiMonthly" :props="props">
                    <div>$ {{ props.row.semiMonthly }}</div>
                </q-td>

                <q-td key="annualCharge" :props="props">
                    <div>$ {{ props.row.annualCharge }}</div>
                </q-td>
                
                <q-td key="actions" :props="props">
                    <q-btn 
                    icon="delete_forever"
                    color="red" 
                    @click="openDeleteModal(props.row)" 
                    size=sm 
                    no-caps
                    >
                    </q-btn>
                </q-td>

            </q-tr>

        </template>

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

                    <div class="q-mb-md">
                        <div class="text-subtitle2 q-mb-sm">Teacher</div>
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

                    <div class="row">
                        <div class="col-md-4 q-pr-sm">
                            <div class="text-subtitle2 q-mb-sm">Work Month</div>
                            <q-input readonly class="q-mb-md" outlined type="text" v-model="editedItem.workMonth" dense autofocus />
                        </div>
                        <div class="col-md-4">
                            <!-- Fringe = Fringe * allocation percentage -->
                            <div class="text-subtitle2 q-mb-sm">Fringe</div>
                            <q-input  readonly prefix="$" outlined  class="q-mb-md" type="text" 
                                v-model="editedItem.fringe"
                                dense autofocus />
                        </div>
                        <div class="col-md-4 h-popup-checkbox">
                            <q-checkbox v-model="editedItem.benefits" label="Has benefits" />
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-md-4 q-pr-sm">
                            <div class="text-subtitle2 q-mb-sm">Salary</div>
                            <q-input prefix="$" readonly class="q-mb-md" outlined type="text" v-model="editedItem.currentSalary" dense autofocus />
                        </div>
                        <div class="col-md-4">
                            <!-- ((Current Salary / number of working month)/2 )* work allocation percentage -->
                            <div class="text-subtitle2 q-mb-sm">Semi-Monthly</div>
                            <q-input prefix="$" outlined readonly  class="q-mb-md" type="text" 
                                v-model="editedItem.semiMonthly"
                                dense autofocus />
                                <!-- :value="((( ( editedItem.currentSalary / (editedItem.workMonth - 0.5) ) / 2 ) * editedItem.allocation) / 100).toFixed(2)" -->
                            
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
                            <div class="text-subtitle2 q-mb-sm">Allocation %</div>
                            <q-input outlined   class="q-mb-md" type="text" v-model="editedItem.allocation" dense autofocus />
                        </div>
                        <div class="col-md-3">
                            <div class="text-subtitle2 q-mb-sm">Monthly Fringe</div>
                            <q-input  
                                prefix="$" outlined  class="q-mb-md" type="text" 
                                :value="editedItem.mFrienge == null ? ((editedItem.fringe * editedItem.allocation) / 100) : editedItem.mFrienge "
                                dense autofocus />
                                <q-popup-edit v-model="editedItem.mFrienge" title="Update Monthly Fringe" buttons>
                                    <q-input v-model="editedItem.mFrienge" dense autofocus counter />
                                </q-popup-edit>
                        </div>
                    </div>

                </div>

                <div class="col-md-12 q-mt-lg q-mb-lg" v-if="editedItem.monthlyDetails">
                    <div class="text-subtitle2 q-mb-sm">
                        Calculated Monthly Details and Pay Rate
                    </div>
                    <q-table
                        class="q-mt-md q-mb-md border overflow-auto my-sticky-column-table"
                        :data="editedItem.monthlyDetails"
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
                            </q-tr>
                        </template>

                    </q-table>
                </div>

                <div class="col-md-6 q-pr-md">
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
                </div>

                <div class="col-md-6 q-pl-md">
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
    name: 'SalariedTable',
    components: {
        DialogDraggable
    },
    data() {
        return {
            data: [],
            columns: [
              {
                name: "teacher",
                align: "left",
                label: "Teacher",
                field: "teacher",
                sortable: true
              },
              { 
                name: "benefits", 
                align: "left",
                label: "Benefits", 
                field: "benefits",
                sortable: true
              },
              {
                name: "workMonth",
                align: "left",
                label: "Work Month",
                field: "workMonth",
                sortable: true
              },
              {
                name: "allocation",
                align: "left",
                label: "Allocation",
                field: "allocation"
              },
              {
                name: "increase",
                align: "left",
                label: "Increase",
                field: "increase"
              },
              {
                name: "currentSalary",
                align: "left",
                label: "Current Salary",
                field: "currentSalary"
              },
              {
                name: "fringe",
                align: "left",
                label: "Fringe",
                field: "fringe"
              },
              {
                name: "semiMonthly",
                align: "left",
                label: "Semi Monthly",
                field: "semiMonthly"
              },
              {
                name: "annualCharge",
                align: "left",
                label: "Annual Charge",
                field: "annualCharge"
              },
              {
                name: "actions",
                align: "left",
                label: "Actions",
                field: "actions"
              },
            ],
            editedItem: {},
            index: 0,
            // Teacher Sub
            teacherSubData: [],
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
                label: "Semi Monthly", 
                field: "semiMonthly"
              },
              { 
                name: "anual", 
                align: "left",
                label: "Anual", 
                field: "anual"
              },
            ],
            //
            loading: false,
            btnLoading: false,
            isEdit: false,
            // modals
            showTeacherModal: false,
            // options
            optionsTeachers: [],
            optionsCampus: [],
            optionsCategoryTracking: [],
            optionsCategory: [],
            optionsSubcategory: [],

        }
    },
    methods: {
        getTeachers() {
            
            let teacherArr = [], teacherSubData = [];

            for(let i=0; i<10; i++) {

                let obj = {
                    teacher: 'Obi Wan Kenobi ' + i,
                    benefits: true,
                    workMonth: 6,
                    allocation: 10,
                    increase: 'increase',
                    currentSalary: 100000,
                    fringe: 300,
                    mFrienge: null,
                    // ((Current Salary / number of working month)/2 )* work allocation percentage
                    semiMonthly: 1200,
                    annualCharge: '4555',
                    startDate: '14/06/20',
                    endDate: '14/06/21',
                    markupFee: 1.67,
                    adminMarkupFee: 1.12,
                    //
                    hourlyRate: 25,
                    hourInMonth: 16,

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
                        anual: 'Text 10'
                    }]


                }
                teacherArr.push(obj)

            }

                let obj = {
                    payMonth: 'Text',
                    payPeriod: 'Text',
                    charge: 'Text',
                    gross: 'Text',
                    totalAdmin: 'Text',
                    hourlyRate: 'Text',
                    weeklyRate: 'Text',
                    biWeekly: 'Text',
                    semiMonthly: 'Text',
                    anual: 'Text'
                }
                teacherSubData.push(obj)
            

            this.data = teacherArr
            this.teacherSubData = teacherSubData
        },
        openTeacherPopup(data, index) {

            this.isEdit = true
            this.showTeacherModal = true
            this.editedItem = {...data}
            this.index = index

        },
        addTeacher() {

        },
        editTeacher() {

        },

    },
    created() {
        this.getTeachers()
    }
}
</script>

<style lang="scss" scoped>

.h-popup-checkbox {
    height: 70px;
    padding-top: 26px;
    align-items: center;
    display: flex;
}

</style>