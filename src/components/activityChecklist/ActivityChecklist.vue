<template>
    <div>
        <div class="q-mt-lg">
            <q-table
                class="overflow-auto my-sticky-column-table"
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

                <div v-show="filter" class="row filter-parent">
                    <div class="filter-child">
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Allocation</div>
                            <q-select :options="allocationOptions" v-model="selectedAllocation" class="q-mr-md" dense outlined style="min-width: 160px; max-width: 160px"></q-select>
                        </div>
                        <div>

                            <div class="text-subtitle2 edx-label  q-mb-sm">Category</div>
                            <q-select :disable="!selectedAllocation" :options="catagoryOptions" v-model="selectedCategory" class="q-mr-md" dense outlined style="min-width: 160px; max-width: 160px"></q-select>
                        
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Subcategory</div>
                            <q-select :disable="!selectedCategory" :options="subcatagoryOptions" v-model="selectedSubcategories" class="q-mr-md" dense outlined style="min-width: 160px; max-width: 160px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Fund Source</div>
                            <q-select :disable="!selectedAllocation" :options="optionsFundSource" v-model="selectedFunds" class="q-mr-md" dense outlined style="min-width: 250px; max-width: 250px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Stard date</div>
                            <q-input style="min-width: 130px; max-width: 130px" class="q-mr-md" outlined dense v-model="startDate">
                                <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date color="edx-pagination" v-model="startDate">
                                        <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                        </div>
                                    </q-date>
                                    </q-popup-proxy>
                                </q-icon>
                                </template>
                            </q-input>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">End date</div>
                            <q-input style="min-width: 130px; max-width: 130px" class="q-mr-md" outlined dense v-model="endDate">
                                <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date color="edx-pagination" v-model="endDate">
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
                    <div class="filter-child">
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Approval</div>
                            <q-select class="q-mr-md" :options="optionsApproval" v-model="selectedApproval" dense outlined style="min-width: 280px; max-width: 280px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">School</div>
                            
                            <q-select
                            style="min-width: 280px; max-width: 280px"
                            class="q-mr-md"
                                outlined
                                dense
                                v-model="selectedSchool"
                                use-input
                                @filter="filterFn"
                                :options="schoolsOptions"
                                option-value="id"
                                option-label="label"
                                input-debounce="0"
                                map-options
                                emit-value
                                stack-label
                            >
                            </q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Provider</div>
                            <q-select
                                style="min-width: 280px; max-width: 280px"
                                class="q-mr-md"
                                outlined
                                dense
                                v-model="selectedProvider"
                                use-input
                                @filter="filterFnProvider"
                                :options="providerOptions"
                                option-value="id"
                                option-label="label"
                                input-debounce="0"
                                map-options
                                emit-value
                                stack-label
                            >
                            </q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Status</div>
                            <q-select :options="statusOptions" v-model="selectedStatuses" class="q-mr-md" dense outlined style="min-width: 180px; max-width: 180px"></q-select>
                        </div>
                    </div>
                </div>

                <!-- RTS BEGIN Test -->
                <q-btn-dropdown
                icon="search"
                class="bg-edx-pagination q-mr-sm"
                label="Search"
                dropdown-icon="tune"
                square
                >
                    <!-- <q-form class="q-gutter-md"> -->
                        <div class="q-pa-md" style="width: 850px">
                            <div class="row">
                                <div class="col-md-12 bordered-box">

                                <div class="row q-mb-sm">
                                    <div class="col-md-2 q-mr-sm">
                                        <div class="text-subtitle2 edx-label  q-mb-sm">Stard date</div>
                                        <q-input style="min-width: 130px; max-width: 130px" class="q-mr-md" outlined dense v-model="startDate">
                                            <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-date color="edx-pagination" v-model="startDate">
                                                    <div class="row items-center justify-end">
                                                    <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                </q-date>
                                                </q-popup-proxy>
                                            </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                    <div class="col-md-2 q-mr-sm">
                                        <div class="text-subtitle2 edx-label  q-mb-sm">End date</div>
                                        <q-input style="min-width: 130px; max-width: 130px" class="q-mr-md" outlined dense v-model="endDate">
                                            <template v-slot:append>
                                            <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                <q-date color="edx-pagination" v-model="endDate">
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

                                <div class="row q-mb-sm">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-3 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">Allocation</div>
                                                <q-select :options="allocationOptions" v-model="selectedAllocation" class="q-mr-md" dense outlined ></q-select>
                                            </div>
                                            <div class="col-md-3 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">Category</div>
                                                <q-select :disable="!selectedAllocation" :options="catagoryOptions" v-model="selectedCategory" class="q-mr-md" dense outlined ></q-select>
                                            </div>
                                            <div class="col-md-3 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">Subcategory</div>
                                                <q-select :disable="!selectedCategory" :options="subcatagoryOptions" v-model="selectedSubcategories" class="q-mr-md" dense outlined></q-select>
                                            </div>
                                            <div class="col-md-3 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">Fund Source</div>
                                                <q-select :disable="!selectedAllocation" :options="optionsFundSource" v-model="selectedFunds" class="q-mr-md" dense outlined></q-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div class="row q-mb-sm">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-5 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">School</div>
                                                <q-select
                                                    class="q-mr-md"
                                                    outlined
                                                    dense
                                                    v-model="selectedSchool"
                                                    use-input
                                                    @filter="filterFn"
                                                    :options="schoolsOptions"
                                                    option-value="id"
                                                    option-label="label"
                                                    input-debounce="0"
                                                    map-options
                                                    emit-value
                                                    stack-label
                                                >
                                                </q-select>
                                            </div>
                                            <div class="col-md-5 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">Provider</div>
                                                <q-select
                                                    style="min-width: 280px; max-width: 280px"
                                                    class="q-mr-md"
                                                    outlined
                                                    dense
                                                    v-model="selectedProvider"
                                                    use-input
                                                    @filter="filterFnProvider"
                                                    :options="providerOptions"
                                                    option-value="id"
                                                    option-label="label"
                                                    input-debounce="0"
                                                    map-options
                                                    emit-value
                                                    stack-label
                                                >
                                                </q-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="row q-mb-sm">
                                    <div class="col-md-12">
                                        <div class="row">
                                            <div class="col-md-3 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">Approval</div>
                                                <q-select class="q-mr-md" :options="optionsApproval" v-model="selectedApproval" dense outlined></q-select>
                                            </div>
                                            <div class="col-md-3 q-pr-sm">
                                                <div class="text-subtitle2 edx-label  q-mb-sm">Status</div>
                                                <q-select :options="statusOptions" v-model="selectedStatuses" class="q-mr-md" dense outlined></q-select>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                </div>
                            </div>
                        </div>
                        <q-card-actions align="right">
                            <q-btn flat label="Search" class="edx-calendar" @click="search"/>
                        </q-card-actions>
                    <!-- </q-form> -->
                </q-btn-dropdown>
                <!-- RTS END TEST -->


                <!-- <q-btn 
                    square
                    size="13px"
                    class="q-mr-md edx-add-btn" text-color="white"
                    icon="tune" 
                    no-caps
                    @click="filter=!filter"
                >
                    Filter
                </q-btn> -->

                <!-- <q-btn 
                    square
                    size="13px"
                    class="q-mr-md edx-add-btn" text-color="white"
                    icon="search" 
                    no-caps
                    @click="search"
                >
                    Search
                </q-btn> -->

                <q-btn
                    round 
                    icon="mdi-file-excel-box"
                    size="10px"
                    class="edx-excel-btn" text-color="white"
                    no-caps
                    @click="exportTable"
                >
                    <q-tooltip content-class="edx-tooltip">Export to Excel</q-tooltip>
                </q-btn>

                <q-btn
                    flat
                    round
                    dense
                    :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
                    @click="props.toggleFullscreen"
                    v-if="mode === 'list'" 
                    class="q-ml-md"
                >
                    <q-tooltip content-class="edx-tooltip" :disable="$q.platform.is.mobile">
                        {{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
                    </q-tooltip>
                </q-btn>

            </template>

            <!-- Table Body -->
            <template v-slot:body="props">
                <q-tr :props="props" class="cursor-pointer">
                    <q-td key="provider" :props="props">
                        <span class="inline-span table-text"> {{ props.row.provider }} </span>
                    </q-td>
                    <q-td key="activity" :props="props">
                        <span class="inline-span table-text">{{ props.row.activity }}</span>
                    </q-td>
                    <q-td key="dateOfActivity" :props="props">
                        <span> {{ props.row.dateOfActivity }} </span>
                    </q-td>
                    <q-td key="school" :props="props">
                        <span> {{ props.row.school }} </span>
                    </q-td>
                    <q-td key="allocation" :props="props">
                        <q-chip 
                            square 
                            color="edx-bg-pd"
                        >
                            <span>{{ props.row.allocation.abbr }}</span>
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{ props.row.allocation.label }}</strong>
                            </q-tooltip>
                        </q-chip>
                    </q-td>
                    <q-td key="approval" :props="props">

                        <q-icon 
                            :name="approvalStatusIcon(props.row.approval.status.id)" 
                            :class="approvalStatusIconColor(props.row.approval.status.id)"
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>
                                    {{props.row.approval.status.label}}
                                </strong>
                            </q-tooltip>
                        </q-icon>

                        <q-icon 
                            :name="approvalTypeIcon(props.row.approval.type.id)" 
                            :class="approvalTypeIconColor(props.row.approval.type.id)" 
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{props.row.approval.type.label}}</strong>
                            </q-tooltip>
                        </q-icon>

                    </q-td>
                    <q-td key="trackingList" class="p-0" :props="props">

                        <div class="row">
                            <div v-for="tracking in props.row.trackingList" :key="tracking.id" class="tracking-icon-parent">
                                <q-icon 
                                    :name="tracking.icon" 
                                    :class="tracking.status === 1 ? 'edx-blue' : 'edx-red' "
                                >
                                   
                                </q-icon>
                                <div class="w-100">
                                    <q-chip square size="sm" :class="tracking.status === 1 ? 'edx-bg-blue' : 'edx-bg-red' " class="m-0 small-chip text-white">
                                        <b>{{ tracking.abbreviation }}</b>
                                    </q-chip>
                                </div>

                                 <q-tooltip>{{ tracking.note }}</q-tooltip>
                                
                            </div>
                        </div>

                    </q-td>
                    <q-td key="note" :props="props">
                        <q-icon 
                            name="sticky_note_2" 
                            color="orange" 
                            style="font-size: 2em;" 
                            class="cursor-pointer"
                            v-tooltip="{
                                content: props.row.note,
                                placement: 'top-center',
                                classes: ['info'],
                                targetClasses: ['it-has-a-tooltip'],
                                offset: 19,
                            }"
                        >
                        </q-icon>
                    </q-td>
                    <q-td key="status" :props="props">

                        <q-icon
                            :name="activityStatusIcon(props.row.status.id)" 
                            :class="activityStatusIconColor(props.row.status.id)"
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{ props.row.status.name }}</strong>
                            </q-tooltip>
                        </q-icon>

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
                    color="edx-pagination"
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
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import ICONS from '../../../icons'
import axios from 'axios'
import config from '../../../config'


export default {
    data() {
        return {

            filter: false,

            data: [],
            columns: [
                {
                    name: "provider",
                    align: "left",
                    label: "Provider",
                    field: "provider",
                    sortable: true,
                    style: 'width: 200px; min-width: 200px; max-width: 200px'
                },
                {
                    name: "activity",
                    align: "left",
                    label: "Activity",
                    field: "activity",
                    sortable: true,
                    style: 'width: 160px; min-width: 160px; max-width: 160px'
                },
                {
                    name: "dateOfActivity",
                    align: "left",
                    label: "Date Of Activity",
                    field: "dateOfActivity",
                    sortable: true
                },
                {
                    name: "school",
                    align: "left",
                    label: "School",
                    field: "school",
                    sortable: true
                },
                {
                    name: "allocation",
                    align: "left",
                    label: "Allocation",
                    field: "allocation",
                    sortable: true,
                    style: 'width: 50px; min-width: 50px; max-width: 50px'
                },
                {
                    name: "approval",
                    align: "left",
                    label: "Approval",
                    field: "approval",
                    sortable: true
                },
                {
                    name: "trackingList",
                    align: "left",
                    label: "Tracking List",
                    field: "trackingList",
                    sortable: true,
                    style: 'width: 200px; min-width: 200px; max-width: 400px'
                },
                {
                    name: "note",
                    align: "left",
                    label: "Note",
                    field: "note",
                    sortable: true,
                    style: 'width: 50px; min-width: 50px; max-width: 50px'
                },
                {
                    name: "status",
                    align: "left",
                    label: "Status",
                    field: "status",
                    sortable: true
                },
            ],
            loading: false,
            mode: 'list',
            
            pages: 1,
            current: 1,
            count: 10,
            pagination: { rowsPerPage: 10 },
            rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 

            // search fields
            allocationOptions: [],
            selectedAllocation: null,

            // categories
            catagoryOptions: [],
            selectedCategory: null, 

            // subcategories
            subcatagoryOptions: [],
            selectedSubcategories: null,

            // funds
            optionsFundSource: [],
            selectedFunds: null,

            // dates
            startDate: null,
            endDate: null,

            // approvals
            optionsApproval: [],
            selectedApproval: null,

            // school
            schoolsOptions: [],
            selectedSchool: null,

            // provider
            providerOptions: [],
            selectedProvider: null,

            //status
            statusOptions: [],
            selectedStatuses: null,


        }
    },
    methods: {
        changePagination() {
            this.current = val
            this.getLicense( this.$route.params.id, this.count, val )
        },
        changeRowsPerPage() {

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
        search() {

            // this.loading = true
            
            let uri = '';

            if(this.selectedAllocation != null) {
                uri += 'allocation=' + this.selectedAllocation.id + '&'
            }
            if(this.selectedSchool != null) {
                uri += 'school=' + this.selectedSchool.id+ '&'
            }
            if(this.selectedCategory != null) {
                uri += 'category=' + this.selectedCategory.id+ '&'
            }
            if(this.selectedSubcategories != null) {
                uri += 'subcategory=' + this.selectedSubcategories.id+ '&'
            }
            if(this.selectedFunds != null) {
                uri += 'fundSource=' + this.selectedFunds.id+ '&'
            }
            if(this.selectedApproval != null) {
                uri += 'approvalStatus=' + this.selectedApproval.id+ '&'
            }
            if(this.selectedProvider != null) {
                uri += 'supplier=' + this.selectedProvider.id+ '&'
            }
            if(this.selectedStatuses != null) {
                uri += 'status=' + this.selectedStatuses.id+ '&'
            }
            if(this.startDate != null) {
                uri += 'start_date=' + this.startDate+ '&'
            }
            if(this.endDate != null) {
                uri += 'end_date=' + this.endDate+ '&'
            }

            console.log(uri, 'askdjlnaslkdjhasdjkhasd')


            const conf = {
                method: 'GET',
                url: config.getActivityTrackings + uri,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                this.pages = res.data.pagesCount
                let activities = res.data.activity
                let arr = []

                for(let i=0; i<activities.length; i++) {

                    let start = activities[i].start_date, end = activities[i].end_date;

                    start == null ? start = 'TBD' : start
                    end == null ? end = 'TBD' : end

                    arr.push({
                        provider: activities[i].supplier?.company_name,
                        activity: activities[i].name,
                        dateOfActivity: `${start} - ${end}`,
                        school: activities[i].school?.name,
                        allocation: {
                            id: activities[i].category?.id,
                            label: activities[i].category?.name,
                            abbr: activities[i].category?.abbreviation,
                        },
                        approval: {
                            status: {
                                id: activities[i].approval_status?.id,
                                label: activities[i].approval_status?.name
                            },
                            type: {
                                id: activities[i].approval_types?.id,
                                label: activities[i].approval_types?.name
                            }
                        },
                        trackingList: activities[i].fields,
                        note: activities[i].note,
                        status: activities[i].status
                    })
                }

                this.data = arr

            })




            // getActivityTrackings

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
        changeRowsPerPage() {

        },
        ///////////////////////////////////////////////
        approvalStatusIcon(id) {

            // id: 1 : Approved
            // id: 2 : Declined
            // id: 3 : Pending

            if(id) {
                
                const iconId = id
                let icon = null;

                switch(iconId) {
                    case 1:
                        icon = ICONS.approved
                        break;
                    case 2:
                        icon = ICONS.declined
                        break;
                    case 3:
                        icon = ICONS.pending
                        break;
                }

                return icon

            }
        },
        approvalStatusIconColor(id) {

            if(id) {

                const iconId = id
                let icon = null;

                switch(iconId) {
                    case 1:
                        icon = 'edx-icon-approved'
                        break;
                    case 2:
                        icon = 'edx-icon-declined'
                        break;
                    case 3:
                        icon = 'edx-icon-pending'
                        break;
                }

                return icon

            }
        },
        ///////////////////////////////////////////////
        approvalTypeIcon(id) {

            // id: 1 : Needs assassment
            // id: 2 : Catalog
            // id: 3 : Blanket approval
            // id: 4 : Pre approval

            if(id) {
                
                const iconId = id
                let icon = null;

                switch(iconId) {
                    case 1:
                        icon = ICONS.needsAssessment
                        break;
                    case 2:
                        icon = ICONS.catalog
                        break;
                    case 3:
                        icon = ICONS.blanketApproval
                        break;
                    case 4:
                        icon = ICONS.preApproval
                        break;
                }

                return icon

            }
        },
        approvalTypeIconColor(id) {

            // id: 1 : Needs assassment
            // id: 2 : Catalog
            // id: 3 : Blanket approval
            // id: 4 : Pre approval

            if(id) {
                
                const iconId = id
                let color = null;

                switch(iconId) {
                    case 1:
                        color = 'edx-icon-needs-assassment'
                        break;
                    case 2:
                        color = 'edx-icon-catalog'
                        break;
                    case 3:
                        color = 'edx-icon-blanket-approval'
                        break;
                    case 4:
                        color = 'edx-icon-pre-approval'
                        break;
                }

                return color

            }

        },
        /////////////
        activityStatusIcon(id) {

            // id: 1 : Canceled
            // id: 2 : Budgeted
            // id: 3 : Gathering Documents
            // id: 4 : Ready for billing

            const iconId = id
            let icon = null;

            switch(iconId) {
                case 1:
                    icon = ICONS.canceled
                    break;
                case 2:
                    icon = ICONS.budgeted
                    break;
                case 3:
                    icon = ICONS.gatheringDocuments
                    break;
                case 4:
                    icon = ICONS.eeadyForBilling
                    break;
                case null:
                    icon = ICONS.noAnswer
                    break;
            }

            return icon
        },
        activityStatusIconColor(id) {

            const iconId = id
            let color = null;

            switch(iconId) {
                case 1:
                    color = 'edx-icon-canceled'
                    break;
                case 2:
                    color = 'edx-icon-budgeted'
                    break;
                case 3:
                    color = 'edx-icon-gathering-documents'
                    break;
                case 4:
                    color = 'edx-icon-ready-for-billing'
                    break;
                case null:
                    color = 'edx-icon-no-answer'
                    break
            }

            return color
        },
        //////////////////////////////////////////////////

        getActivityTrackings(limit, page) {

            const conf = {
                method: 'GET',
                url: `${config.getActivityTrackings}?limit=${limit}&page=${page}`,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                this.pages = res.data.pagesCount
                let activities = res.data.activity
                let arr = []

                for(let i=0; i<activities.length; i++) {

                    let start = activities[i].start_date, end = activities[i].end_date;

                    start == null ? start = 'TBD' : start
                    end == null ? end = 'TBD' : end

                    arr.push({
                        provider: activities[i].supplier?.company_name,
                        activity: activities[i].name,
                        dateOfActivity: `${start} - ${end}`,
                        school: activities[i].school?.name,
                        allocation: {
                            id: activities[i].category?.id,
                            label: activities[i].category?.name,
                            abbr: activities[i].category?.abbreviation,
                        },
                        approval: {
                            status: {
                                id: activities[i].approval_status?.id,
                                label: activities[i].approval_status?.name
                            },
                            type: {
                                id: activities[i].approval_types?.id,
                                label: activities[i].approval_types?.name
                            }
                        },
                        trackingList: activities[i].fields,
                        note: activities[i].note,
                        status: activities[i].status
                    })
                }

                this.data = arr

            })
        },
        //
        
        // Get titles
        getAllocations() {

            const conf = {
                method: 'GET',
                url: config.getAllocations,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let allocations = res.data.allocationTypes
                let arr = []
                for(let i=0; i<allocations.length; i++) {
                    arr.push({
                        id: allocations[i].id,
                        label: allocations[i].name
                    })
                }
                this.allocationOptions = arr
            })

        },
        // Get categories
        getCategoryTypes(id) {

            const conf = {
                method: 'GET',
                url: config.getCategoryTypes + id + '/1',
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

            this.catagoryOptions = typesArray

        })
        },
        // Get subcategories
        getSubcategoryTypes(id) {

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
                this.subcatagoryOptions = subcategoriesArr
            })
        },

        // Get funds
        getFunds(title) {

            const conf = {
                method: 'GET',
                url: config.getFunds + title,
                headers: {
                Accept: 'application/json',
                }
            }
            
            axios(conf).then(res => {

                console.log('funds ======', res.data)

                let fundSource = res.data.fundSource;
                let fundSourceArr = [];

                for(let i=0; i<fundSource.length; i++) {
                    
                    let obj = {
                        id: fundSource[i].id,
                        label: fundSource[i].name,
                        abbr: fundSource[i].abbreviation
                    }
                    fundSourceArr.push(obj)
                }

                this.optionsFundSource = fundSourceArr;
            })
        },

        // Approvals
        getApprovals() {
      
            const conf = {
                method: 'GET',
                url: config.getApprovals,
                headers: {
                Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let approvalStatus = res.data.activityApprovalStatus
                let approvalTypes = res.data.activityApprovalTypes
                
                let statusArr = [], typesArr = [];

                for(let i=0; i<approvalStatus.length; i++) {
                    let obj = {
                        id: approvalStatus[i].id,
                        label: approvalStatus[i].name
                    }
                    statusArr.push(obj)
                }
                
                this.optionsApproval = statusArr

            })
        },

        // school
        filterFn(val, update, abort) {

            if (val.length < 1) {
                abort()
                return
            }

            update(() => {
                console.log('Update...')
                let arr = []
                const conf = {
                    method: 'GET',
                    url: config.filterSchool + val + '&limit=1000&offset=1',
                    headers: {
                        Accept: 'application/json',
                    }
                }

                axios(conf).then(res => {
                    for(let i=0; i<res.data.schools.length; i++) {
                        arr.push({
                            id: res.data.schools[i].id,
                            label: res.data.schools[i].name
                        })
                    }
                    this.schoolsOptions = arr
                })
            })
        },

        // Provider
        filterFnProvider(val, update, abort) {
            if (val.length < 1) {
                abort()
                return
            }

            update(() => {
                let arr = []
                const conf = {
                    method: 'GET',
                    url: config.filterVendor + val + '&limit=1000&offset=1',
                    headers: {
                        Accept: 'application/json',
                    }
                }

                axios(conf).then(res => {
                    console.log('res lll', res.data)
                    for(let i=0; i<res.data.supplier.length; i++) {
                        arr.push({
                            id: res.data.supplier[i].id,
                            label: res.data.supplier[i].company_name
                        })
                    }

                    this.providerOptions = arr
                })
            })
        },

        // Statuses
        getStatuses() {

            const conf = {
                method: 'GET',
                url: config.getStatuses,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('res', res.data)
                let statuses = res.data.status
                let arr = []

                for(let i=0; i<statuses.length; i++) {
                    arr.push({
                        id: statuses[i].id,
                        label: statuses[i].name
                    })
                }

                this.statusOptions = arr
            })
        },

    },
    created() {
        this.getActivityTrackings(this.count, this.current)
        this.getAllocations()
        this.getApprovals()
        this.getStatuses()
    },
    watch: {
        selectedAllocation(val) {
            this.getCategoryTypes(val.id)
            this.getFunds(val.id)
        },
        selectedCategory(val) {
            console.log(val.id)
            this.getSubcategoryTypes(val.id)
        }
    }
}
</script>

<style lang="scss">



.tooltip {


  &.info {
    $color: rgba(#004499, .9);

    .tooltip-inner {
      background: $color;
      color: white;
      padding: 24px;
      border-radius: 5px;
      box-shadow: 0 5px 30px rgba(black, .1);
      max-width: 250px;
    }

    .tooltip-arrow {
      border-color: $color;
    }
  }
}

.filter-parent {
    flex-wrap: wrap;
    height: 155px;
    width: 78%;
}

.filter-child {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

.small-chip {
    padding: 2px;
}

</style>