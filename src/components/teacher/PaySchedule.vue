<template>
        <dialog-draggable
            :width="750" 
            :modelDialog="isShow" 
            :title="'Pay Schedule'" 
            @onHide="hidePopup"
            :icon="'attach_money'"
            :color="'green'"
        >

        <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
            <div class="row q-mr-lg q-ml-lg q-mb-lg q-mt-lg">

                <div class="col-md-6 q-pr-sm q-mb-md">
                    <div class="row items-center q-mb-sm">
                        <div class="text-subtitle2 q-mr-md q-mb-sm">Billing Cycle</div>
                        <div class="w-100 row cursor-pointer h-popup">
                            <q-select 
                                class="full-width"
                                outlined
                                dense
                                :options="options"
                                v-model="selectedOption"
                            />
                        </div>
                    </div>
                    <q-checkbox v-model="schedule" label="Schedule Transactions for billing" />
                </div>
                <div class="col-md-6 q-pr-sm q-mb-md">
                    <!-- <div class="row q-mt-lg">
                        <div class="col-md-9 q-pr-md text-right">Per Pay period:</div>
                        <div class="col-md-3"> <b>$ 49701</b> </div>
                    </div>
                    <div class="row">
                        <div class="col-md-9 q-pr-md text-right">Total Charge:</div>
                        <div class="col-md-3"> <b>$ 24850</b> </div>
                    </div> -->
                </div>

                <div class="col-md-12 q-mt-md">
                                        
                    <q-table
                        :data="data" 
                        :columns="columns"
                        hide-bottom
                        :pagination.sync="pagination"
                    >
                        <!-- Table Body -->
                        <template v-slot:body="props">
                            <q-tr :props="props" class="cursor-pointer">
                                <q-td key="transaction" :props="props">
                                    {{props.row.transaction}}
                                </q-td>
                                <q-td key="date" :props="props">
                                    {{props.row.date}}
                                </q-td>
                                <q-td key="category" :props="props">
                                    
                                    <q-chip 
                                        square class="bg-edx-bg-i"
                                    >
                                        <span>{{props.row.category}}</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>{{ props.row.category }}</strong>
                                        </q-tooltip>
                                    </q-chip>

                                </q-td>
                                <q-td key="amount" :props="props">
                                    $ {{props.row.amount}}
                                </q-td>
                            </q-tr>
                        </template>
                    </q-table>
                </div>

            </div>
        </q-card-section>    

        <q-card-actions class="row justify-end">
            <div>
                <q-btn flat @click="hidePopup" label="Cancel" color="primary" v-close-popup></q-btn>
                <q-btn flat v-if="schedule" @click="savePaySchedule" label="Save" color="primary"></q-btn>
            </div>
        </q-card-actions>

        </dialog-draggable>
</template>

<script>

import axios from 'axios'
import config from '../../../config'
import DialogDraggable from '../DialogDraggable.vue';

export default {
    name: 'PaySchedule',
    props: {
        show : {
            required : true,
            default: false
        },

        title: { required: true },

        startDate : { required : false, default: '01/01/2020' },
        endDate : { required : false, default: '01/01/2020' },
        hourlyFringe: { required: false, default: 0 },
        

        selectedWeekDays: { required: false, default: [] },

        category: { required : false, default: null},
        employee: { required : false, default: null},

    },
    components: {
        DialogDraggable
    },
    data() {
        return {
            pagination: { rowsPerPage: 48 },
            data: [],
            columns: [
                {
                    name: "transaction",
                    align: "left",
                    label: "Transaction",
                    field: "transaction",
                    sortable: true
                },
                {
                    name: "date",
                    align: "left",
                    label: "Date",
                    field: "date",
                    sortable: true
                },
                {
                    name: "category",
                    align: "left",
                    label: "Category",
                    field: "category",
                    sortable: true
                },
                {
                    name: "amount",
                    align: "left",
                    label: "Amount",
                    field: "amount",
                    sortable: true
                },
            ],
            schedule: false,
            options: [{ id: 1, label: 'Monthly' }],
            selectedOption: { id: 1, label: 'Monthly' },
        }
    },
    created() {
        this.getPayScheduleInfo()
    },
    watch: {
        show(val) {
            if(val) {
                this.getPayScheduleInfo()
            }
        }
    },
    methods: {
        hidePopup() {
            this.$emit('hidePaySchedulePopup', false);
        },
        getPayScheduleInfo() {
            
                let arr = []
                // let schedule = res.data.payShedule
                // for(let i=0; i<schedule.length; i++) {
                //     arr.push({ 
                //         transaction: this.employee.label, 
                //         date: schedule[i].currentDate,
                //         category: this.category.name,
                //         amount: schedule[i].pay
                //     })
                // }
                // this.data = arr

                let dates = this.dateRange(this.startDate, this.endDate)
                let selectedWeekDays = this.selectedWeekDays
                console.log('selectedWeekDays', selectedWeekDays)
                console.log('dates', dates)

                for(let i=0; i<dates.length; i++) {

                    let splittedDate = dates[i].split('-')
                    
                    let date1 = splittedDate[0].split('/')
                    let date2 = splittedDate[1].split('/')
                    
                    let month = date1[1]
                    let startDay = parseInt(date1[2])
                    let endDay = parseInt(date2[2])
                    
                    let count = 0;
                    
                    console.log('#######################')
                    
                    for(let j=startDay; j<=endDay; j++) {
                    
                        let fullMonth = date1[0] + '/' + month + '/' + j
                        let nd = new Date(fullMonth).getDay()
                        
                        for(let t=0; t<=selectedWeekDays.length; t++) {
                            if(selectedWeekDays[t]) {
                                if(selectedWeekDays[t].checked && selectedWeekDays[t].id == nd) {
                                    
                                    console.log('selectedWeekDays[t].hours', selectedWeekDays[t].hours)
                                    count += parseFloat(selectedWeekDays[t].hours)

                                    break
                                }
                            }
                        }
                    } 

                    console.log('count=', count)
                    console.log('hourlyFringe= ', this.hourlyFringe * count)

                    arr.push({ 
                        transaction: this.employee ? this.employee.label : '', 
                        date: splittedDate[0] + ' - ' +splittedDate[1],
                        category: this.category ? this.category.name : '',
                        amount: (count * this.hourlyFringe).toFixed(2)
                    })

                    this.data = arr
                }

        },
        dateRange(startDate, endDate) {

            var start      = startDate.split('/');
            var end        = endDate.split('/');
            var startYear  = parseInt(start[0]);
            var endYear    = parseInt(end[0]);
            var dates      = [];
            
            for(var i = startYear; i <= endYear; i++) {
            
                var endMonth = i != endYear ? 11 : parseInt(end[1]) - 1;
                var startMon = i === startYear ? parseInt(start[1])-1 : 0;
                
                let startDay;  
                
                for(var j = startMon; j <= endMonth; j = j > 12 ? j % 12 || 11 : j+1) {
                    
                startDay = j+1;
                var month = j+1;
                var displayMonth = month < 10 ? '0' + month : month;
                
                if(parseInt(start[1]) == startDay  && i == parseInt(start[0])) {
                    startDay = parseInt(start[2]) < 10 ? '0' + parseInt(start[2])  : parseInt(start[2]);
                }else {
                    startDay = '01'
                }
                
                let monthLastDay;
                
                if(j+1 ==  parseInt(end[1]) && i == parseInt(end[0])) { 
                
                    if(parseInt(end[1]) == this.daysInMonth(displayMonth, i)) {
                    monthLastDay = this.daysInMonth(displayMonth, i)
                    }else {
                    monthLastDay = end[2];
                    }
                    
                }else {
                    monthLastDay = this.daysInMonth(displayMonth, i)
                }
                
                dates.push( 
                    [i, displayMonth, startDay].join('/')
                    + '-' +
                    [i, displayMonth, monthLastDay].join('/') 
                );
                
                }
                
            }
            return dates;

        },

        // daysInMonth(01, 2021)
        daysInMonth (month, year) {
            return new Date(year, month, 0).getDate();
        },
        savePaySchedule() {

            let payScheduleArray = []

            for(let i=0; i<this.data.length; i++) {

                payScheduleArray.push({
                    name: this.data[i].transaction,
                    start_date: this.data[i].date.split('-')[0].substring(0, 10),
                    end_date: this.data[i].date.split('-')[1].substring(0, 10),
                    unit_cost: this.data[i].amount,
                })
            }

            console.log(payScheduleArray)

            const conf = {
                method: 'POST',
                url: config.addTeacherBudget + this.title,
                headers: {
                    Accept: 'application/json',
                },
                data: payScheduleArray
            }

            axios(conf)
                .then(res => {
                    console.log('res data ', res.data)
                    this.$q.notify({
                        message: 'Success!',
                        type: 'positive',
                    })
                })
                .catch(err => {
                    this.$q.notify({
                        message: 'Error! Please try again later.',
                        type: 'negative',
                    })
                })
        }
    },
    computed: {
        isShow() {
            return this.show
        }
    }
}
</script>