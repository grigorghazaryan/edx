<template>
    <div>
        <q-table
            :data="data" 
            :columns="columns"
            :loading="loading"
        >
            <!-- Loading -->
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>

            <!-- Table Header -->
            <template v-slot:top-right="props">

                <q-input
                    class="q-mr-md"
                    outlines
                    dense
                    placeholder="Search"
                    style="min-width: 250px; max-width: 250px"
                >
                    <template v-slot:append>
                    <q-icon name="search" />
                    </template>
                </q-input>
      
                <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
                    dense outlines 
                    label="School year" 
                >
                    <template v-slot:append>
                    <q-icon name="cancel" class="cursor-pointer" />
                    </template>

                </q-select>

                <q-select
                    class="q-mr-md"
                    style="min-width: 250px; max-width: 250px"
                    dense
                    outlines
                    label="Status"
                >
                    <template v-slot:append>
                    <q-icon name="cancel" class="cursor-pointer" />
                    </template>
                    
                </q-select>

                <q-btn 
                    square
                    class="q-mr-md" 
                    style="background-color: #546bfa" 
                    text-color="white" 
                    icon="add" 
                    no-caps>
                    Add
                </q-btn>

                <q-btn
                    icon-right="archive"
                    label="Export to Excel"
                    color="teal" 
                    text-color="white"
                    no-caps
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

                <q-checkbox label="Show remaining balance" />

            </template>

            <!-- Table Body -->
            <template v-slot:body="props">
            
                <q-tr :props="props" class="cursor-pointer" @click="isShowActivityPopup=true">
                    
                    <q-td key="online" :props="props">
                        <span 
                            class="material-icons cursor-pointer" 
                            style="font-size: 1.7em; color: #4daf4f"
                            v-if="props.row.online_uni.id == 1 "
                        >
                            laptop_mac
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Online</strong>
                            </q-tooltip>
                        </span> 
                        <span 
                            class="material-icons cursor-pointer" 
                            style="font-size: 1.7em; color: #2196f3"
                            v-else
                        >
                            emoji_transportation
                                <q-tooltip 
                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                    transition-show="flip-right"
                                    transition-hide="flip-left"
                                >
                                    <strong>On Site</strong>
                                </q-tooltip>
                        </span>
                    </q-td>

                    <q-td key="provider" :props="props">
                        <div v-if="props.row.provider">
                            {{ props.row.provider.label }}
                        </div>
                    </q-td>

                    <q-td key="status" :props="props">

                        <q-icon v-if="props.row.status_uni.id == 1 " name="done" color="green" style="font-size: 1.5em">
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Active</strong>
                            </q-tooltip>
                        </q-icon>

                        <q-icon v-else name="cancel" color="red" style="font-size: 2em">
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Canceled</strong>
                            </q-tooltip>
                        </q-icon>

                    </q-td>

                    <q-td key="approvals" :props="props"  @click="copyRowData(props.rowIndex)">

                        <q-icon v-if="props.row.approval_status_uni.label == 'Approved'" 
                        name="done" color="green" style="font-size: 1.5em">
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Approved</strong>
                            </q-tooltip>
                        </q-icon>

                        <q-icon v-else-if="props.row.approval_status_uni.label == 'Pending'" 
                        name="access_time" color="amber-7" style="font-size: 1.5em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>Pending</strong>
                        </q-tooltip>
                        </q-icon>

                        <q-icon v-else name="unpublished" color="red" style="font-size: 2em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>Declined</strong>
                        </q-tooltip>
                        </q-icon>

                        <q-icon v-if="props.row.approval_type_uni.label == 'Needs Assessment'"
                        name="psychology" color="blue" style="font-size: 1.5em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>{{props.row.approval_type_uni.label}}</strong>
                        </q-tooltip>
                        </q-icon>

                        <q-icon v-else-if="props.row.approval_type_uni.label == 'Catalog'" name="category" color="blue" style="font-size: 1.5em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>{{props.row.approval_type_uni.label}}</strong>
                        </q-tooltip>
                        </q-icon>

                        <q-icon v-else-if="props.row.approval_type_uni.label == 'Blanket Approval'" name="touch_app" color="blue" style="font-size: 1.5em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>{{props.row.approval_type_uni.label}}</strong>
                        </q-tooltip>
                        </q-icon>

                        <q-icon v-else-if="props.row.approval_type_uni.label == 'Pre Approval'" name="how_to_reg" color="blue" style="font-size: 1.5em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>{{props.row.approval_type_uni.label}}</strong>
                        </q-tooltip>
                        </q-icon>

                    </q-td>

                    <q-td 
                        style="white-space: initial;width: 350px; max-width: 350px;"
                        key="PDActivity" :props="props"
                    >
                        <span class="inline-span">{{ props.row.activity }}</span>
                    </q-td>
                    
                    <q-td 
                        key="dateOfActivity" :props="props" 
                        :style="{maxWidth: '200px', width: '200px'}"
                    > 
                        <span>
                        {{ props.row.activity_date }}
                        </span>

                        <span class="q-ml-sm">
                            <q-icon 
                                name="autorenew" 
                                color="green" 
                                style="font-size: 1.5em" 
                                v-if="props.row.repeat" 
                            />
                            <q-icon 
                                name="all_inclusive" 
                                color="blue" 
                                style="font-size: 1.5em" 
                                v-if="props.row.multi" 
                            />
                        </span>

                    </q-td>

                    <q-td key="noAttending" :props="props">
                        
                        <div>

                            {{ props.row.no_attending }}
                            <span class="q-ml-sm">
                                <q-icon name="people_alt" color="green" style="font-size: 1.5em"/>
                            </span>

                        </div>
                    </q-td>

                    <q-td key="amount" :props="props">
                        <div>$ {{ props.row.amount }}</div>
                    </q-td>

                    <q-td key="type" :props="props">

                        <q-chip 
                            square color="green" 
                            text-color="white" 
                            v-if="props.row.type_uni.name == 'PD'"
                        >
                            <span>PD</span>
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Professional Development</strong>
                            </q-tooltip>
                        </q-chip>

                        <q-chip v-else square color="purple" text-color="white" >
                            <span>FE</span>
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Family Engagement</strong>
                            </q-tooltip>
                        </q-chip>

                    </q-td>

                    <q-td key="grossPD" :props="props">
                        <div>$ {{ (parseFloat(props.row.amount) + parseFloat(((props.row.amount * props.row.percentage) / 100))).toFixed(2) }}</div>
                    </q-td>

                    <q-td key="RemainingBalance" :props="props">
                        <div>
                        $ <span :class=" props.row.remainingBalance > 0 ? 'text-positive' : 'text-negative' ">{{ (props.row.remainingBalance).toFixed(2) }}</span>
                        </div>
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

        </q-table>

        <dialog-draggable 
            :width="950" 
            :modelDialog="isShowActivityPopup" 
            :title="'Activity Details'" 
            @onHide="isShowActivityPopup=false"
            :icon="'calendar_today'"
            :color="'orange'"
        >
            <div class="q-pa-md">
                <div class="row">

                    <div class="col-md-4 q-pr-lg">

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Activity Name</div>
                            <q-input
                                outlined
                                v-model="data[0].activity" 
                                dense 
                                autofocus
                                readonly
                            />
                            <q-popup-edit v-model="data[0].activity" title="Activity Name" buttons>
                                <q-input
                                    type="textarea" 
                                    v-model="data[0].activity" 
                                    dense 
                                    autofocus 
                                    
                                />
                            </q-popup-edit>
                        </div>

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Provider</div>
                            <q-select  
                                use-input
                                hide-selected
                                outlined
                                dense
                                input-debounce="0"
                                v-model="data[0].provider" 
                                :options="optionsSupplier"
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
                            <div class="col-md-6 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Amount</div>
                                <q-input prefix="$" readonly class="q-mb-md" outlined type="text" v-model="data[0].amount" dense autofocus />
                                <q-popup-edit v-model="data[0].amount" title="Update amount" buttons>
                                    <q-input prefix="$" type="text" v-model="data[0].amount" dense autofocus />
                                    <q-input prefix="%" v-model="data[0].percentage"  type="number"  :label="data[0].type_uni.label + ' Percentage' " dense autofocus/>
                                </q-popup-edit>
                            </div>
                            <div class="col-md-6">
                                <div class="text-subtitle2 q-mb-sm">Charge</div>
                                <q-input prefix="$" standout readonly  class="q-mb-md" type="text" 
                                v-model="(parseFloat(data[0].amount) + parseFloat(((data[0].amount * data[0].percentage) / 100))).toFixed(2)" dense autofocus />
                            </div>
                        </div>

                    </div>

                    <div class="col-md-8 q-pl-md">
                        <div class="row">
                            <div class="col-md-9 q-pr-sm">
                                <div class="text-subtitle2 q-mb-sm">Allocation Category</div>
                                <div class="row h-popup">
                                    <div v-if="data[0].type_uni.name == 'PD'">
                                        <q-chip 
                                            square color="green" 
                                            text-color="white" 
                                        >
                                            <span>PD</span>
                                        </q-chip>
                                        <span>Professional Development</span>
                                    </div>
                                    <div class='q-ml-md'>
                                        <q-chip 
                                            square color="purple" 
                                            text-color="white" 
                                        >
                                            <span>WR</span>
                                        </q-chip>
                                        <span>Well Rounded Education</span>
                                    </div>

                                    <q-popup-edit v-model="data[0].type_uni" title="Update type" buttons>
                                        <q-select 
                                            v-model="data[0].type_uni" 
                                            :options="typeArr"
                                        />
                                    </q-popup-edit>  
                                </div>
                            </div>
                            <div class="col-md-2">
                                <div class="q-mb-md">
                                    <div class="text-subtitle2 q-mb-sm">Activity Status</div>
                                    <div v-if="data[0].status_uni.id == 1 " class="h-popup">
                                        <q-icon name="done" color="green" style="font-size: 1.5em"></q-icon>
                                        <span>Active</span>
                                    </div>
                                    <q-popup-edit  v-model="data[0].status_uni" title="Status" buttons>
                                        <q-select
                                            dense 
                                            outlined 
                                            v-model="data[0].status_uni" 
                                            :options="status"
                                        />
                                    </q-popup-edit>
                                </div>
                            </div>
                        </div>
                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Approval Status</div>

                            <div class="row h-popup">

                                <div v-if="data[0].approval_status_uni.label == 'Approved'" class="q-mr-md">
                                    <q-icon name="done" color="green" style="font-size: 1.5em"></q-icon>
                                    <span>Approved</span>
                                </div>

                                <div v-if="data[0].approval_type_uni.label == 'Blanket Approval'">
                                    <q-icon  name="touch_app" color="blue" style="font-size: 1.5em"></q-icon>
                                    <span>Blanket Approval</span>
                                </div>

                                <q-popup-edit v-model="data[0].approval_status_uni" title="Approvals" buttons >
                                    <div style="width: 450px !important;max-width: 450px !important;">

                                        <div class="row">
                                            <div class="col-md-4">
                                                <q-select 
                                                dense outlined v-model="data[0].approval_status_uni" 
                                                :options="approval"/>
                                            </div>
                                            <div class="col-md-7 q-ml-md">
                                                
                                                <q-option-group
                                                    :options="optionsApp"
                                                    label="Notifications"
                                                    type="radio"
                                                    v-model="data[0].approval_type_uni.label"
                                                />

                                                <q-input 
                                                :disable="data[0].approval_type_uni.label !== 'Pre Approval'" 
                                                class="q-mt-md q-mb-lg" dense outlined v-model="data[0].approver" 
                                                label="Approved Name" 
                                                />
                                        
                                            </div>
                                        <q-separator />
                                        </div>
                                    
                                    </div>
                                </q-popup-edit>

                            </div>
                        </div>
                        <div class="q-md-mb">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="text-subtitle2 q-mb-sm">Activity Type</div>

                                    <div v-if="data[0].online_uni.id == 1 " class="h-popup">
                                        <span 
                                            class="material-icons cursor-pointer" 
                                            style="font-size: 1.7em; color: #4daf4f"
                                            
                                        >
                                            laptop_mac
                                        </span> 
                                        <span>Online</span>
                                    </div>

                                    <q-popup-edit 
                                        v-model="data[0].online_uni" 
                                        title="Online" buttons>
                                        <q-select
                                        dense 
                                        outlined 
                                        v-model="data[0].online_uni" 
                                        :options="online"
                                    />
                                    </q-popup-edit>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 q-mt-lg">
                        <DateOfActivityTable
                            :dateOfActivity="dateOfActivityTableData" 
                        />
                        <div class="q-ml-md q-mt-md q-mb-md">
                            <q-btn icon="add" color="blue" round/>
                        </div>
                    </div>

                    <div class="col-md-12 q-mt-md">
                        <div class="row">
                            <div class="col-md-3">

                                <div class="text-subtitle1 row justify-start items-center">
                                    <q-icon class="q-mr-sm" name="people_alt"  color="green" style="font-size: 1.5em"/>
                                    Attendee Summary:
                                </div>
                                
                                <div 
                                    v-if="data[0].noAttendingArr.attendeesData.length"
                                    class="cursor-pointer q-mt-md"
                                >
                                    <div v-for="(attendee, i) in data[0].noAttendingArr.attendeesData" :key="i">
                                    <div>
                                        <span v-if="attendee.all">All</span>
                                        <span v-else>{{ attendee.no }}</span>
                                        <span class="q-ml-sm">{{ attendee.type.label }}</span>
                                    </div>
                                    </div>
                                </div>
                                <div v-else>No Attendees found.</div>

                            </div>
                            <div class="col-md-9 q-pl-md">

                                <div class="text-subtitle2 q-mb-sm">Note</div>
                                <q-input dense outlined type="textarea" v-model="data[0].note" readonly />
                                <q-popup-edit v-model="data[0].note" title="Update notes" buttons>
                                    <q-input type="textarea" v-model="data[0].note" dense autofocus />
                                </q-popup-edit>   

                            </div>
                        </div>
                    </div>


                </div>
            </div>
            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn flat label="Save" color="primary" />
            </q-card-actions>
        </dialog-draggable>

    </div>
</template>

<script>
import dialogDraggable from '../../components/DialogDraggable'
import DateOfActivityTable from './DateOfActivityTable';
export default {
    
    name: 'ActivityTable',
    components: {
        dialogDraggable,
        DateOfActivityTable
    },
    data() {
        return {
            mode: 'list',
            data: [
                {
                    remainingBalance: 100,
                    id:  1,
                    online_uni: {
                        id: 1,
                        label: 'Online'
                    },
                    provider: {
                        id: 1,
                        label: "Provider"
                    },
                    status_uni: {
                        id: 1,
                        label: 'Active'
                    },
                    approval_status_uni: {
                        id: 1,
                        label: 'Approved'
                    },
                    approval_type_uni: {
                        id: 1,
                        label: "Blanket Approval"
                    },
                    activity: "Material icons are delightful, beautifully crafted symbols for common actions and items. Download...",
                    activity_date: '14.06.91',
                    no_attending: 900,
                    amount: 4000,
                    percentage: 10,
                    type_uni: {
                        id: 1,
                        label: "Type",
                        name: "PD"
                    },
                    note: 'Note',
                    approver: '',
                    charge: 9870,
                    repeat: false,
                    multi: false,
                    attendies: false,
          

                    dateOfActivityArr: [
                    ],

                    noAttendingArr: {
                        attendees: '',
                        amount: 0,
                        split: false,
                        attendeesData: [
                            {
                                all: false,
                                attendeeList: "View",
                                id: 58,
                                no: 12,
                                type: {
                                    disable: true,
                                    id: 1,
                                    label: "Teacher",
                                    value: "Teacher",
                                },
                                disable: true,
                                id: 1,
                                label: "Teacher",
                                value: "Teacher",
                            },
                            {
                                all: false,
                                attendeeList: "View",
                                id: 58,
                                no: 15,
                                type: {
                                    disable: true,
                                    id: 1,
                                    label: "Student",
                                    value: "Student",
                                },
                                disable: true,
                                id: 1,
                                label: "Student",
                                value: "Student",
                            },
                        ],
                    }
                },
            ],
            columns: [
                {
                    name: "online",
                    align: "left",
                    label: "",
                    field: "online",
                    sortable: true
                },
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
                    name: "approvals",
                    align: "left",
                    label: "Approval",
                    field: "approvals",
                    sortable: true
                },
                { 
                    name: "PDActivity", 
                    align: "left",
                    label: "Activity", 
                    sortable: false
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
                    label: "Attendee Summary",
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
                },
                {
                    name: 'RemainingBalance',
                    align: 'left',
                    label: 'Remaining Balance',
                    field: 'RemainingBalance'
                },
                {
                    name: "actions",
                    align: "right",
                    label: "Actions",
                    field: "actions"
                }
            ],
            //
            dateOfActivityTableData: [
                {
                    id: 1,
                    attendies: false,
                    child: false,
                    endDate: "2020-06-24",
                    is_full_day: false,
                    location: "Location...",
                    note: "Note...",
                    repeat: true,
                    repeatEvery: "23",
                    repeats: {
                        id: 1,
                        label: "Daily"
                    },
                    repeatsId: [5, 6],
                    repeatsOn: "F, S",
                    startdate: "2020-06-14",
                    time1: "00:00:00",
                    time2: "00:00:00",
                },
                {
                    id: 2,
                    attendies: false,
                    child: false,
                    endDate: "2020-06-24",
                    is_full_day: false,
                    location: "Location...",
                    note: "Note...",
                    repeat: true,
                    repeatEvery: "23",
                    repeats: {
                        id: 1,
                        label: "Daily"
                    },
                    repeatsId: [5, 6],
                    repeatsOn: "F, S",
                    startdate: "2020-06-14",
                    time1: "00:00:00",
                    time2: "00:00:00",
                },
                {
                    id: 3,
                    attendies: false,
                    child: false,
                    endDate: "2020-06-24",
                    is_full_day: false,
                    location: "Location...",
                    note: "Note...",
                    repeat: true,
                    repeatEvery: "23",
                    repeats: {
                        id: 1,
                        label: "Daily"
                    },
                    repeatsId: [5, 6],
                    repeatsOn: "F, S",
                    startdate: "2020-06-14",
                    time1: "00:00:00",
                    time2: "00:00:00",
                },
            ],
            //
            loading: false,
            isShowActivityPopup: false,

            //
            online: [
                {
                    id: 1,
                    label: "Online"
                }, 
                {
                    id: 2,
                    label: "On Site"
                }
            ],
            optionsSupplier: [
                {
                    id: 1,
                    label: "Provider"
                },
                {
                    id: 2,
                    label: "Provider 2"
                },
            ],
            status: ['Active'],
            approval: ['Approval', 'Approval'],
            optionsApp: [
                {id: 1, label: 'Needs Assessment'}, 
                {id: 2, label: 'Catalog'},
                {id: 3, label: 'Blanket Approval'},
                {id: 4, label: 'Pre Approval'}
            ],
            typeArr: [
                { id: 1, label: 'Hello' }
            ]
        }
    }

}
</script>

<style lang="scss" scoped>

.h-popup {
    height: 40px;
    align-items: center;
    display: flex;
}

</style>