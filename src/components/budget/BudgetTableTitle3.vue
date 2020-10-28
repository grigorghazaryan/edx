<template>
    <q-table
        :data="data" 
        :columns="columns"
        :loading="loading"
        :filter="filter"
        class="no-shadow"
        row-key="provider"
    >

        <!-- Loading -->
        <template v-slot:loading>
        <q-inner-loading showing color="primary" />
        </template>

        <!-- Table Header -->
        <template v-slot:top-right="props">
        
        <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" dense outlines clearable v-model="schoolYear" :options="schoolYears" label="School year"/>


        <q-input class="q-mr-md" outlines dense v-model="filter" placeholder="Search">
            <template v-slot:append>
            <q-icon name="search"/>
            </template>
        </q-input>

        <q-select class="q-mr-md" style="min-width: 250px; max-width: 250px" dense outlines clearable 
        v-model="typeModel" :options="options" label="Type" @input="filterType"/>



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

            <q-dialog v-model="show_dialog">
            <q-card>

                <q-card-section style="width: 500px">
                <div class="text-h6">Date of activity</div>
                </q-card-section>

                <q-card-section class="q-pt-none q-pb-none q-pr-none q-pl-none">

                <div class="row">

                    <div class="col-12">
                    <div class="q-mt-sm q-mb-md">

                        <div class="row">
                        <div class="col-3 q-pr-md row items-center justify-end"><b>Duration: </b></div>
                        <div class="col-9">
                            {{timeTotal}} Hour(s) {{totalMinute}} Minute(s)
                            <span class="q-ml-sm"><q-checkbox v-model="allDayEvent" label="All day event" /></span>
                        </div> 
                        </div>

                        <div class="row">
                        <div class="col-3 text-right q-pr-md"><b>Starts:</b></div>
                        <div class="col-9">
                            <span>{{ startdate }}</span>, <span>{{time1}}</span>
                        </div>
                        </div>
                        <div class="row">
                        <div class="col-3 text-right q-pr-md"><b>Ends:</b></div>
                        <div class="col-9">
                            <span>{{ endDate }}</span>, <span>{{time2}}</span>
                        </div>
                        </div>

                        <q-separator class="q-mt-md q-mb-md"/>

                        <div class="row q-mt-lg">

                            <div class="col-3 q-pr-md row items-center justify-end">Start date:</div>
                            <div class="col-3">
                            <q-input outlined dense v-model="startdate">
                                <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date v-model="startdate" mask="YYYY-MM-DD">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                            </div>

                            <div class="col-2 q-pr-md row items-center justify-end">End date:</div>
                            <div class="col-3">
                            <q-input outlined dense v-model="endDate">
                                <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date v-model="endDate" mask="YYYY-MM-DD">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                            </div>

                        </div>

                        <div class="row q-mt-md q-mt-md">

                            <div class="col-3 q-pr-md row items-center justify-end">Start time:</div>
                            <div class="col-3">
                            <q-input outlined dense v-model="time1">
                                <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time v-model="time1">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                            </div>

                            <div class="col-2 q-pr-md row items-center justify-end">End time:</div>
                            <div class="col-3">
                            <q-input outlined dense v-model="time2">
                                <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time v-model="time2">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-time>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                            </div>

                        </div>

                        <q-separator class="q-mt-md q-mb-md"/>

                        <div class="row">
                        <div class="col-3 text-right q-pr-md">
                            <q-checkbox v-model="editedItem.repeat" label="Repeat" />
                        </div>
                        </div>

                        <div v-if="editedItem.repeat">

                        <div class="row q-mt-md">
                            <div class="col-3 q-pr-md row items-center justify-end">
                            Repeats:
                            </div>
                            <div class="col-3">
                            <q-select dense outlined v-model="selectDayWeekMonth" :options="selectOptionsDayWeekMonth"  />
                            </div>
                        </div>

                        <div class="row q-mt-md">
                            <div class="col-3 q-pr-md row items-center justify-end">Every:</div>
                            <div class="col-2">
                            <q-input outlined v-model="selectWeekDay" dense/>
                            </div>
                            <div class="col-2 row items-center justify-start q-pl-sm"><span>week(s)</span></div>
                        </div>

                        <div class="row q-mt-md">
                            <div class="col-3 q-pr-md row items-center justify-end">On:</div>
                            <div class="col-9">
                            <q-btn-group push>
                                <q-btn color="yellow" glossy text-color="black" push label="S"/>
                                <q-btn color="yellow" glossy text-color="black" push label="M" />
                                <q-btn color="yellow" glossy text-color="black" push label="T"/>
                                <q-btn color="amber" glossy text-color="black" push label="W" />
                                <q-btn color="yellow" glossy text-color="black" push label="T"/>
                                <q-btn color="yellow" glossy text-color="black" push label="F" />
                                <q-btn color="yellow" glossy text-color="black" push label="S"/>
                            </q-btn-group>
                            </div>
                        </div>

                        </div>
                    </div> 
                    </div>
                
                </div>
                </q-card-section>
            
                <q-card-actions class="row justify-between">
                <q-btn flat label="Remove recurrence" style="color: red"></q-btn>
                <div>
                    <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                    <q-btn flat label="Confirm" color="primary" v-close-popup  @click="confirmDateOfActivity"></q-btn>
                </div>
                </q-card-actions>

            </q-card>
            </q-dialog>

            <q-dialog v-model="show_attending_dialog">
            <q-card>
                <q-card-section style="width: 500px">
                <div class="text-h6">No attending</div>
                </q-card-section>
                <q-card-section>

                <div class="row q-mt-md">
                    <div class="col-4 q-pr-md row items-center justify-end">
                    Number of attendees:
                    </div>
                    <div class="col-2">
                    <q-select dense outlined v-model="attendees" :options="numbersOfAttendees"  />
                    </div>
                </div>
                <div class="row q-mt-md">
                    <div class="col-12 text-left">
                    <span class="q-ml-sm"><q-checkbox v-model="splitActivity" label="Split activity and attendees:"/></span>
                    </div>
                </div>

                <!-- <q-separator v-if="splitActivity" class="q-mt-md q-mb-md"/> -->

                <div class="q-mt-md" v-if="splitActivity">
                    <div class="q-pa-md">
                        <q-table
                        :data="attendeesData"
                        :columns="attendeesColumn"
                        row-key="attendees"
                        hide-bottom
                        />
                    </div>
                </div>

                </q-card-section>
                
                <q-card-actions class="row justify-end">
                    <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                    <q-btn flat label="Confirm" color="primary" v-close-popup @click="alert()"></q-btn>
                </q-card-actions>

            </q-card>
            </q-dialog>

        </div>
        </template>

        <!-- Table Body -->
        <template v-slot:body="props">
        
            <q-tr :props="props">

            <q-td key="provider" :props="props">
                {{ props.row.provider }}
            </q-td>

            <q-td key="status" :props="props">
                <q-icon v-if="props.row.status" name="done" color="green" style="font-size: 1.5em"/>
                <q-icon v-else name="clear" color="red" style="font-size: 2em"/>
            </q-td>

            <q-td key="PDActivity" :props="props">
                {{ props.row.PDActivity }}
            </q-td>
            
            <q-td key="dateOfActivity" :props="props" 
                :style="{width: '300px', whiteSpace: 'normal'}"
            > 
                <span @click="editItem(props.row)" >{{ props.row.dateOfActivity }}</span>
                <span class="q-ml-sm">
                    <q-icon name="autorenew" color="green" style="font-size: 1.5em" v-if="props.row.repeat" />
                </span>
            </q-td>

            <q-td key="noAttending" :props="props">
                <div @click="editAttendingitem(props.row)">{{ props.row.noAttending }} %</div>
            </q-td>

            <q-td key="amount" :props="props">
                <div>$ {{ props.row.amount }}</div>
            </q-td>

            <q-td key="type" :props="props">
                <!-- <div></div> -->

                <q-chip square color="green" text-color="white" v-if="props.row.typeTest">{{ props.row.type }}</q-chip>
                <q-chip square color="purple" text-color="white" v-else>{{ props.row.type }}</q-chip>

            </q-td>

            <q-td key="grossPD" :props="props">
                <div>$ {{ props.row.grossPD }}</div>
            </q-td>

            </q-tr>

        </template>

        <!-- Pagination -->
        <template v-slot:bottom class="justify-end">
        <div class="q-pa-md flex flex-center">
            <q-pagination
            v-model="pagination.page"
            :max="pages"
            :max-pages="6"
            ellipsess
            :direction-links="true"
            >
            </q-pagination>
        </div>
        </template>

    </q-table>
</template>

<script>
import {exportFile} from 'quasar'
import router from 'src/router'

function wrapCsvValue(val, formatFn) {
    let formatted = formatFn !== void 0
        ? formatFn(val)
        : val

    formatted = formatted === void 0 || formatted === null
        ? ''
        : String(formatted)

    formatted = formatted.split('"').join('""')
    /**
     * Excel accepts \n and \r in strings, but some other CSV parsers do not
     * Uncomment the next two lines to escape new lines
     */
    // .split('\n').join('\\n')
    // .split('\r').join('\\r')

    return `"${formatted}"`
}
const adminFee = 12;

export default {
    data() {
        return {
        tab: 'Title1',
        mode: 'list',
        startdate: '2019-02-01',
        endDate: '2019-02-01',
        model: { from: '2020/07/08', to: '2020/07/17' },
        select: "",
        selectOptions: ['Kansas', 'New York', 'Yerevan'],
        selectWeekDay: "",
        selectOptionsWeekDays: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
        numbersX: '',
        selectOptionsNumbersX: ['1x', '2x', '3x', '31x'],
        selectDayWeekMonth: "",
        selectOptionsDayWeekMonth: ['Daily', 'Weekly', 'Monthly'],
        time1: '00:00',
        time2: '00:00',
        allDayEvent: false,
        show_dialog: false,
        show_attending_dialog: false,
        splitActivity: false,
        attendees: '',
        numbersOfAttendees: [1, 2, 3],
        attendeesColumn: [
            {
            name: "attendees",
            align: "left",
            label: "Attendees",
            field: "attendees",
            sortable: true
            },
            {
            name: "allocation",
            align: "left",
            label: "Allocation",
            field: "allocation",
            sortable: true
            },
            {
            name: "attendeeList",
            align: "left",
            label: "Attendee List",
            field: "attendeeList",
            sortable: true
            },
        ],
        attendeesData: [
            {
            attendees: 8,
            allocation: 'Title 1',
            attendeeList: 'View'
            },
            {
            attendees: 12,
            allocation: 'Title 6',
            attendeeList: 'View'
            }
        ],



        loading: false,
        pages: 10,
        currentPage: 1,
        pagination: {
            sortBy: 'name',
            page: 1,
            rowsPerPage: 10,
            // rowsNumber: 10
        },
        
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
            name: "PDActivity", 
            align: "left",
            label: "Activity", 
            field: "PDActivity",
            sortable: true
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
            name: "noAttending",
            align: "left",
            label: "No. Attending",
            field: "noAttending"
            },
            {
            name: "amount",
            align: "left",
            label: "Amount",
            field: "amount"
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
            }
        ],
        data: [],
        tempData: [],

        editedIndex: null,
        editedItem: {
            provider: '',
            PDActivity: '',
            dateOfActivity: '',
            noAttending: '',
            amount:'',
            pdHub:'',
            grossPD: '',
            repeat: ''
        },

        schoolYear: null,
        schoolYears: [
            'School Year 20-21',
            'School Year 19-20',
            'School Year 18-19'
        ],
        filter: "",
        options: [
            'Professional Development', 
            'Instructions'
        ],
        typeModel: '',
        };
    },
    methods: {
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
        editItem(item) {
            
            this.editedIndex = this.data.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.show_dialog = true;

        },
        confirmDateOfActivity() {

        if (this.editedIndex > -1) {
            Object.assign(this.data[this.editedIndex], this.editedItem);
        } 
        // Comment for now
        // else {
        //   this.data.unshift(obj);
        // }
        this.close()

        },
        editAttendingitem(item) {
        console.log('editAttendingitem', item)
        this.show_attending_dialog = true;
        },
        close () {
        this.show_dialog = false
        },
        filterType() {
        console.log(this.typeModel)
        if(this.typeModel) {
            if(this.typeModel == 'Professional Development') {
            this.data = this.tempData.filter(a => a.typeTest == true);
            }else {
            this.data = this.tempData.filter(a => a.typeTest == false);
            }
        }else {
            this.data = this.tempData
        }
        }
        
    },
    created() {

        let dataTest = []

        for(let i=0; i<5; i++) {

            let r = Math.floor(Math.random() * 10), 
                pd = Math.floor(Math.random() * 10);

            if(r % 2) r = true 
            else r = false

            if(pd % 2) pd = true 
            else pd = false

            let amount = Math.floor(Math.random() * 600),
                pdHub = Math.floor(Math.random() * 1400),
                charge = amount + ((amount * adminFee) / 100);

            let obj = {
                // toggle: '',
                provider: 'WEI ' + i+1,
                status: r,
                PDActivity: 'Balanced Literacy for Readers, #2-133 with Chris VB',
                dateOfActivity: 'August, 2019 - May 2020 on Mondays',
                noAttending: '12 TI teachers and 30 TII Teachers',
                amount: amount,
                type: pd ? 'PD' : 'I',
                typeTest: pd,
                grossPD: charge.toFixed(2),
                repeat: r
            }

            dataTest.push(obj)
        }

        this.data = dataTest
        this.tempData = dataTest
    },
    computed: {
        timeTotal() {
        let t1 = parseInt(this.time1.substring(0,2))
        let t2 = parseInt(this.time2.substring(0,2))

        let result = t2 - t1
        return result
        },
        totalMinute() {
        let m1 = parseInt(this.time1.substring(3,5));
        let m2= parseInt(this.time2.substring(3,5));

        console.log(m1)
        console.log(m2)

        let m1res = 0, m2res = 0;

        if(m1 != 0) {
            m1res = 60 - m1
        }         

        if(m2 != 0) {
            m2res = 60 - m2
        }  

        let result =   m1res - m2res

        return result
        },
        totalPD() {
        let pd = 0;
        for(let i=0; i<this.data.length; i++) {
            let amount = parseFloat( this.data[i].amount )
            pd += amount
        }
        return pd.toFixed(2)
        },
        totalFE() {
        return Math.floor(Math.random() * 1000).toFixed(2)
        },
        usedPD() {
        return Math.floor(Math.random() * 1000).toFixed(2)
        },
        usedPE() {
        return Math.floor(Math.random() * 1000).toFixed(2)
        },
        remainingPD() {
        return Math.floor(Math.random() * 1000).toFixed(2)
        },
        remainingFE() {
        return Math.floor(Math.random() * 1000).toFixed(2)
        },

    }
}
</script>