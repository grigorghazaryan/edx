<template>
    <div>
        <div class="q-mt-lg">
            <q-table
                class="overflow-auto"
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

                <div class="row filter-parent">
                    <div class="filter-child">
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Allocation</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 130px; max-width: 130px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Category</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 130px; max-width: 130px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Subcategory</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 130px; max-width: 130px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Fund Source</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 130px; max-width: 130px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Stard date</div>
                            <q-input class="q-mr-md" dense outlined style="min-width: 100px; max-width: 100px"/>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">End date</div>
                            <q-input class="q-mr-md" dense outlined style="min-width: 100px; max-width: 100px"/>
                        </div>
                    </div>
                    <div class="filter-child">
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Approval</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 170px; max-width: 170px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">School</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 200px; max-width: 200px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Provider</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 200px; max-width: 200px"></q-select>
                        </div>
                        <div>
                            <div class="text-subtitle2 edx-label  q-mb-sm">Status</div>
                            <q-select class="q-mr-md" dense outlined style="min-width: 180px; max-width: 180px"></q-select>
                        </div>
                    </div>
                </div>

                <q-btn 
                    square
                    size="13px"
                    class="q-mr-md edx-add-btn" text-color="white"
                    icon="search" 
                    no-caps
                >
                    Search
                </q-btn>

                <q-btn
                    icon-right="archive"
                    label="Export to Excel"
                    class="edx-excel-btn" text-color="white"
                    no-caps
                />

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
                            <span>PD</span>
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Professional Development</strong>
                            </q-tooltip>
                        </q-chip>
                    </q-td>
                    <q-td key="approval" :props="props">

                        <q-icon 
                            name="approval" 
                            class="edx-green"
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>
                                    Approved
                                </strong>
                            </q-tooltip>
                        </q-icon>

                        <q-icon 
                            name="psychology" 
                            class="edx-blue" 
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Needs Assessment</strong>
                            </q-tooltip>
                        </q-icon>
                    </q-td>
                    <q-td key="trackingList" class="row" :props="props">
                        <div v-for="i in 4" :key="i" class="tracking-icon-parent">
                            <q-icon 
                                name="description" 
                                class="edx-blue" 
                            ></q-icon>
                            <div class="w-100">S/E</div>
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
                        <span> {{ props.row.status }} </span>
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
            </template>

            </q-table>
        </div>
    </div>
</template>

<script>

import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)


export default {
    data() {
        return {

            data: [
                {
                    provider: 'LEX',
                    activity: 'Techniques and Principles for Remote Instruction',
                    dateOfActivity: '09/01/2020 - 09/30/2020',
                    school: 'Atlas Preparaty Academy',
                    allocation: 
                        // { name: 'TI' }, { name: 'PD' }
                        'TI, PD'
                    ,
                    approval: 'icon1, icon2',
                    trackingList: 'S/E W9 STP'
                        // {  name: 'S/E'  },
                        // {  name: 'W9'  },
                        // {  name: 'STP'  },
                    ,
                    note: 'Note',
                    status: 'Budgeted'
                },
                {
                    provider: 'LEX',
                    activity: 'Techniques and Principles for Remote Instruction',
                    dateOfActivity: '09/01/2020 - 09/30/2020',
                    school: 'Atlas Preparaty Academy',
                    allocation: 
                        // { name: 'TI' }, { name: 'PD' }
                        'TI, PD'
                    ,
                    approval: 'icon1, icon2',
                    trackingList: 'S/E W9 STP'
                        // {  name: 'S/E'  },
                        // {  name: 'W9'  },
                        // {  name: 'STP'  },
                    ,
                    note: 'Note',
                    status: 'Budgeted'
                },
            ],
            columns: [
                {
                    name: "provider",
                    align: "left",
                    label: "Provider",
                    field: "provider",
                    sortable: true,
                    style: 'width: 120px; min-width: 120px; max-width: 120px'
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
                    sortable: true
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

        }
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
        changeRowsPerPage() {

        },

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
    width: 85%;
}

.filter-child {
    width: 100%;
    display: flex;
    justify-content: flex-end;
}

</style>