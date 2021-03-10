<template>
    <dialog-draggable 
        :width="900" 
        :modelDialog="show" 
        :title="'Teacher Assignment Details'" 
        @onHide="show=false"
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
                                <q-td key="hourlyRateI" :props="props">
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
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import DialogDraggable from '../DialogDraggable'

export default {
    name: 'TeacherPopup',
    components: {
        DialogDraggable
    },
    props: {
        show : {
            required: true,
            default: false,
        },
        id: {
            required: true
        }
    },
    data() {
        return {
            isEdit: false,
            btnLoading: false,
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
                name: "hourlyRateI", 
                align: "left",
                label: "Hourly", 
                field: "hourlyRateI"
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
            }],
            editedItem: {},
            optionsTeachers: [],
            optionsCategoryTracking: [],
            optionsCampus: [],
            optionsCategory: [],
            optionsSubcategory: [],
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

                console.log('getTeacherBudgetById', res.data)

                // this.pages = res.data.pagesCount
                // let data = res.data.items

                // let finalResult = this.teachersParsing(data)
                // console.log('Final result : ', finalResult)
                // this.data = finalResult

            })

        },
        addTeacher() {

        },
        editTeacher() {

        },
    },
    watch: {
        show(val) {
            if(val) {
                this.getTeacherBudgetById()
            }
        }
    }
}
</script>