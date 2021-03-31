<template>
    <div class="q-pa-sm edx-background">

      <!-- <div class="q-pa-md q-gutter-sm">
        <q-breadcrumbs>
          <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
          <q-breadcrumbs-el label="Activities" />
          <q-breadcrumbs-el label="Activity Processes" />
        </q-breadcrumbs>
      </div> -->

          <div class="q-pa-sm q-mt-sm q-gutter-sm">

      <div class="edx-header-parent">
        <span class="edx-header-text">September 2020 Tracker</span>
      </div>

      <q-table
        :data="data"
        :columns="columns"
        row-key="id" 
        :loading="loading"
        binary-state-sort
        :pagination.sync="pagination"
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
                v-model="filter"
                placeholder="Search"
                style="min-width: 250px; max-width: 250px"
            >
                <template v-slot:append>
                <q-icon name="search" />
                </template>
            </q-input>
      
              <!-- :options="schoolYears"  -->
              <!-- @input="filterActivity" -->
            <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
                dense outlines 
                v-model="schoolYear" 
                label="School year" 
            >
                <template v-if="schoolYear" v-slot:append>
                <q-icon name="cancel" @click.stop="schoolYear = '' " class="cursor-pointer" />
                </template>

            </q-select>

            <q-select
                class="q-mr-md"
                style="min-width: 250px; max-width: 250px"
                dense
                outlines
                label="Status"
                v-model="typeModel"
            >
                <template v-if="typeModel" v-slot:append>
                <q-icon name="cancel" @click.stop="typeModel = ''" class="cursor-pointer" />
                </template>
                
            </q-select>


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
        </template>

        <!-- Table Body -->
        <template v-slot:body="props">

            <q-tr :props="props">

                <q-td auto-width>
                    <q-btn size="sm" 
                    flat
                    color="black"
                    @click="props.expand = !props.expand" 
                    :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
                    >
                    </q-btn>
                </q-td>

                <q-td key="provider" :props="props">
                    {{ props.row.provider }}
                </q-td>

                <q-td key="activity" :props="props" style="white-space: initial;width: 350px; max-width: 350px;">
                    <span class="inline-span">{{ props.row.activity }}</span>
                </q-td>

                <q-td key="activityDate" :props="props">
                    {{ props.row.activityDate }}
                </q-td>

                <q-td key="school" :props="props">
                    {{ props.row.school }}
                </q-td>

                <q-td key="allocation" :props="props">
                    <span>
                        <q-chip 
                            square color="green" 
                            text-color="white" 
                            v-if="props.row.allocation == 'PD'"
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
                    </span>
                </q-td>

                <q-td key="approval" :props="props">
                    <q-icon name="done" color="green" style="font-size: 1.5em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>Approved</strong>
                        </q-tooltip>
                    </q-icon>
                    <q-icon name="psychology" color="blue" style="font-size: 1.5em">
                        <q-tooltip 
                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                            transition-show="flip-right"
                            transition-hide="flip-left"
                        >
                            <strong>Needs Assessment</strong>
                        </q-tooltip>
                    </q-icon>
                </q-td>

                <q-td key="requiredDocuments" :props="props">
                    <q-icon name="description" color="green" style="font-size: 2em" />
                    <q-icon name="description" color="red" style="font-size: 2em" />
                    <q-icon name="description" color="blue" style="font-size: 2em" />
                </q-td>

                <q-td key="background" :props="props">
                    <q-icon name="search" color="green" style="font-size: 2em" />
                </q-td>

                <q-td key="attendence" :props="props">
                    <q-icon name="airplanemode_active" color="blue" style="font-size: 2em" />
                </q-td>

                <q-td key="calendar" :props="props">
                    <q-icon name="calendar_today" color="green" style="font-size: 2em" />
                </q-td>

            </q-tr>

            <q-tr v-show="props.expand" :props="props">
                <q-td colspan="100%">
                    <div class="q-mt-md q-mb-lg">
                        <div class="row">
                            <div class="col-md-12">
                                <UploadedDocuments />
                            </div>
                            <div class="col-md-12">
                                <br>
                            </div>
                            <div class="col-md-5">
                                <div class="text-subtitle2">Notes</div>
                                <q-input class="q-mt-md" dense outlined type="textarea" v-model="props.row.note" readonly />
                                <q-popup-edit v-model="props.row.note" title="Update notes" buttons>
                                    <q-input type="textarea" v-model="props.row.note" @input="detectChange(props.rowIndex)"
                                    dense autofocus />
                                </q-popup-edit>   
                            </div>
                        </div>
                    </div>
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

      </div>
    </div>
</template>


<script>

import axios from 'axios'
import config from '../../../config'
import UploadedDocuments from '../../components/activity/UploadedDocuments'

export default {
    components: {
        UploadedDocuments
    },
  data () {
    return {
        loading: false,
        pagination: { rowsPerPage: 10 },
        current: 1,
        pages: 1,
        count: 10,
        rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
        filter: '',
        schoolYear: '',
        typeModel: '',
        addNew: false,
        typeModel: '',
        mode: 'list',
        columns: [
            {
                name: "toggle",
                style: 'width: 30px'
            },
            {
                name: "provider",
                align: "left",
                label: "Provider",
                field: "provider",
                sortable: true
            },
            {
                name: "activity",
                align: "left",
                label: "Activity",
                field: "activity",
                sortable: true
            },
            {
                name: "activityDate",
                align: "left",
                label: "Date of Activity",
                field: "activityDate",
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
                sortable: true
            },
            {
                name: "approval",
                align: "left",
                label: "Approval",
                field: "approval",
                sortable: true
            },
            {
                name: "requiredDocuments",
                align: "left",
                label: "Required Documents",
                field: "requiredDocuments",
                sortable: true
            },
            {
                name: "background",
                align: "left",
                label: "Background",
                field: "background",
                sortable: true
            },
            {
                name: "attendence",
                align: "left",
                label: "Attendence",
                field: "attendence",
                sortable: true
            },
            {
                name: "calendar",
                align: "left",
                label: "Calendar",
                field: "calendar",
                sortable: true
            },
        ],
        data: [
            {
                id: 1,
                provider: 'WEI',
                activity: 'Effective Instructional Strategies for Urban Classrooms, #2-066 with Chris FE',
                activityDate: '09/10/20 - 09/10/21',
                school: 'Atlas Preparatory Academy',
                allocation: 'PD',
                approval: 'approval',
                requiredDocuments: 'requiredDocuments',
                background: 'background',
                attendence: 'attendence',
                calendar: 'calendar',
                note: 'Note'
            },
            {
                id: 2,
                provider: 'WEI',
                activity: 'Effective Instructional Strategies for Urban Classrooms, #2-066 with Chris FE',
                activityDate: '09/10/20 - 09/10/21',
                school: 'Atlas Preparatory Academy',
                allocation: 'PD',
                approval: 'approval',
                requiredDocuments: 'requiredDocuments',
                background: 'background',
                attendence: 'attendence',
                calendar: 'calendar',
                note: 'Note'
            },
            {
                id: 3,
                provider: 'WEI',
                activity: 'Effective Instructional Strategies for Urban Classrooms, #2-066 with Chris FE',
                activityDate: '09/10/20 - 09/10/21',
                school: 'Atlas Preparatory Academy',
                allocation: 'PD',
                approval: 'approval',
                requiredDocuments: 'requiredDocuments',
                background: 'background',
                attendence: 'attendence',
                calendar: 'calendar',
                note: 'Note'
            },
        ]
    }
  },
  methods: {
    // getSchools() {

    //   const conf = {
    //     method: 'GET',
    //     url: config.getSchools,
    //     headers: {
    //       Accept: 'application/json',
    //     }
    //   }

    //   axios(conf).then(res => {
    //   })
    // }
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
    changePagination(current) {
        console.log(current)
    },
    changeRowsPerPage() {
        console.log('changeRowsPerPage')
    },
    detectChange(index) {
        console.log(index)
    },
    addNewRow() {

    },
  }
}
</script>