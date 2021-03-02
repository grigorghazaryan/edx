<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Budget"/>
        <q-breadcrumbs-el label="Teacher Costs"/>
      </q-breadcrumbs>
    </div>

    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="school" color="orange" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocations</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ total }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
          
          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="blue" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Salaries</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 0.00</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="pink" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Hourly</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">% 0.00</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>

    <div class="q-pa-sm q-mt-sm q-gutter-sm">
      <q-card>

        <q-tabs
          v-model="tab"
          dense
          class="text-grey"
          active-color="primary"
          indicator-color="primary"
          align="left"
          narrow-indicator
        >
          <q-tab name="Salaried" label="Salaried" />
          <q-tab name="Hourly" label="Hourly" />
          <q-tab name="Supervisor" label="Supervisor" />
          <q-tab name="UtilityPersonnel" label="Utility Personnel" />
        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="Salaried" class="q-p-sm">
            <SalariedTable />
          </q-tab-panel>

          <q-tab-panel name="Hourly" class="q-p-sm">

            <q-table
              :data="hourlyData" 
              :columns="hourlyColumns"
              :loading="loading"
              class="no-shadow"
              row-key="teacher"
            >

              <!-- Loading -->
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>

              <!-- Table Header -->
              <template v-slot:top-right="props">

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
                                    <q-date v-model="editedItem.date" mask="YYYY-MM-DD">
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
          
              </template>

              <!-- Table Body -->
              <template v-slot:body="props">
                
                  <q-tr :props="props">

                    <q-td auto-width>
                      <q-btn size="sm" flat
                        color="black"
                        @click="props.expand = !props.expand" 
                        :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'">
                      </q-btn>
                    </q-td>

                    <q-td key="teacher" :props="props">
                      {{ props.row.teacher }}
                    </q-td>

                    <q-td key="benefits" :props="props">
                      <q-toggle v-model="props.row.benefits" color="blue" />
                    </q-td>

                    <q-td key="hoursWeek" :props="props">
                      <div>{{ props.row.hoursWeek }}</div>
                      <q-popup-edit v-model="props.row.hoursWeek" title="Update Hours Week" buttons>
                        <q-input type="number" v-model="props.row.hoursWeek" dense autofocus />
                      </q-popup-edit>
                    </q-td>
                    
                    <q-td key="workMonth" :props="props">
                      <div>{{ props.row.workMonth }}</div>
                      <q-popup-edit v-model="props.row.workMonth" title="Update Work Month" buttons>
                        <q-input type="number" v-model="props.row.workMonth" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="increase" :props="props">
                      <div>{{ props.row.increase }} %</div>
                      <q-popup-edit v-model="props.row.increase" title="Update increase" buttons>
                        <q-input type="number" v-model="props.row.increase" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="hourlyRate" :props="props">
                      <div>$ {{ props.row.hourlyRate }}</div>
                      <q-popup-edit v-model="props.row.hourlyRate" title="Update Hourly Rate" buttons>
                        <q-input type="number" v-model="props.row.hourlyRate" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="fringe" :props="props">
                      <div>$ {{ props.row.fringe }}</div>
                      <q-popup-edit v-model="props.row.fringe" title="Update Fringe" buttons>
                        <q-input type="number" v-model="props.row.fringe" dense autofocus />
                      </q-popup-edit>
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

                  <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%" class="q-td--no-hover">
                      <div class="q-mt-md">
                        <div class="row">

                          <div class="col-9">
                            <div class="text-subtitle2">Monthly Breakdown</div>
                            <q-table
                              class="q-mt-md q-mb-md no-shadow border"
                              :data="teacherHourlySubData"
                              :columns="teacherHourlySubColumns"
                              row-key="id"
                              hide-bottom
                            >
                              <template v-slot:body="props">
                                <q-tr :props="props">
                                  <q-td key="workMonths" :props="props">
                                    {{ props.row.workMonths }}
                                  </q-td>
                                  <q-td key="payPeriod" :props="props">
                                    {{ props.row.payPeriod }}
                                  </q-td>
                                  <q-td key="charge" :props="props">
                                    {{ props.row.charge }}
                                  </q-td>
                                  <q-td key="gross" :props="props">
                                    {{ props.row.gross }}
                                  </q-td>
                                  <q-td key="totalAdmin" :props="props">
                                    {{ props.row.totalAdmin }}
                                  </q-td>
                                  <q-td key="hourlyRate" :props="props">
                                    {{ props.row.hourlyRate }}
                                  </q-td>
                                  <q-td key="hourlyOverride" :props="props">
                                    {{ props.row.hourlyOverride }}
                                    <q-popup-edit v-model="props.row.hourlyOverride" title="Update Hourly Override" buttons>
                                      <q-input type="number" v-model="props.row.hourlyOverride" dense autofocus />
                                    </q-popup-edit>
                                  </q-td>
                                  <q-td key="notes" :props="props">
                                    {{ props.row.notes }}
                                    <q-popup-edit v-model="props.row.notes" title="Notes" buttons>
                                      <q-input type="textarea" v-model="props.row.notes" dense autofocus />
                                    </q-popup-edit>
                                  </q-td>
                                </q-tr>
                              </template>

                            </q-table>
                          </div>

                          <div class="col-4">
                            <q-expansion-item
                              expand-separator
                              label="Salary History"
                              class="text-subtitle2"
                            >
                                <q-table
                                  class="q-mt-md q-mb-md no-shadow border" 
                                  hide-bottom
                                  :data="salaryHistoryData"
                                  :columns="salaryHistoryColumns"
                                  row-key="year"
                                  separator="cell"
                                />
                            </q-expansion-item>
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
            
          </q-tab-panel>

          <q-tab-panel name="Supervisor" class="q-p-sm">

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
              <template v-slot:top-right="props">

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
                                    <q-date v-model="editedItem.date" mask="YYYY-MM-DD">
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
          
              </template>

              <!-- Table Body -->
              <template v-slot:body="props">
                
                  <q-tr :props="props">

                    <q-td auto-width>
                      <q-btn size="sm" flat
                        color="black"
                        @click="props.expand = !props.expand" 
                        :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'">
                      </q-btn>
                    </q-td>

                    <q-td key="teacher" :props="props">
                      {{ props.row.teacher }}
                    </q-td>

                    <q-td key="benefits" :props="props">
                      <q-toggle v-model="props.row.benefits" color="blue" />
                    </q-td>
                    
                    <q-td key="workMonth" :props="props">
                      <div>{{ props.row.workMonth }}</div>

                      <q-popup-edit v-model="props.row.workMonth" title="Update Work Month" buttons>
                        <q-input type="number" v-model="props.row.workMonth" dense autofocus />
                      </q-popup-edit>

                    </q-td>

                    <q-td key="allocation" :props="props">
                      <div>{{ props.row.allocation }} %</div>
                      <q-popup-edit v-model="props.row.allocation" title="Update allocation" buttons>
                        <q-input type="number" v-model="props.row.allocation" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="increase" :props="props">
                      <div>{{ props.row.increase }} %</div>
                      <q-popup-edit v-model="props.row.increase" title="Update increase" buttons>
                        <q-input type="number" v-model="props.row.increase" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="currentSalary" :props="props">
                      <div>$ {{ props.row.currentSalary }}</div>
                      <q-popup-edit v-model="props.row.currentSalary" title="Update Current Salary" buttons>
                        <q-input type="number" v-model="props.row.currentSalary" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="fringe" :props="props">
                      <div>$ {{ props.row.fringe }}</div>
                      <q-popup-edit v-model="props.row.fringe" title="Update Fringe" buttons>
                        <q-input type="number" v-model="props.row.fringe" dense autofocus />
                      </q-popup-edit>
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

                  <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%" class="q-td--no-hover">
                      <div class="q-mt-md">
                        <div class="row">

                          <div class="col-9">
                            <div class="text-subtitle2">Monthly Breakdown</div>
                            <q-table
                              class="q-mt-md q-mb-md no-shadow border"
                              :data="teacherSubData"
                              :columns="teacherSubColumns"
                              row-key="id"
                              hide-bottom
                            >
                              <template v-slot:body="props">
                                <q-tr :props="props">
                                  <q-td key="workMonths" :props="props">
                                    {{ props.row.workMonths }}
                                  </q-td>
                                  <q-td key="payPeriod" :props="props">
                                    {{ props.row.payPeriod }}
                                  </q-td>
                                  <q-td key="charge" :props="props">
                                    {{ props.row.charge }}
                                  </q-td>
                                  <q-td key="gross" :props="props">
                                    {{ props.row.gross }}
                                  </q-td>
                                  <q-td key="totalAdmin" :props="props">
                                    {{ props.row.totalAdmin }}
                                  </q-td>
                                  <q-td key="hourlyRate" :props="props">
                                    {{ props.row.hourlyRate }}
                                  </q-td>
                                  <q-td key="notes" :props="props">
                                    {{ props.row.notes }}
                                    <q-popup-edit v-model="props.row.notes" title="Notes" buttons>
                                      <q-input type="textarea" v-model="props.row.notes" dense autofocus />
                                    </q-popup-edit>
                                  </q-td>
                                </q-tr>
                              </template>

                            </q-table>
                          </div>

                          <div class="col-4">
                            <q-expansion-item
                              expand-separator
                              label="Salary History"
                              class="text-subtitle2"
                            >
                                <q-table
                                  class="q-mt-md q-mb-md no-shadow border" 
                                  hide-bottom
                                  :data="salaryHistoryData"
                                  :columns="salaryHistoryColumns"
                                  row-key="year"
                                  separator="cell"
                                />
                            </q-expansion-item>
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
            
          </q-tab-panel>

          <q-tab-panel name="UtilityPersonnel" class="q-p-sm">

            <q-table
              :data="utilityPersonnelData" 
              :columns="utilityPersonnelColumns"
              :loading="loading"
              class="no-shadow"
              row-key="teacher"
            >

              <!-- Loading -->
              <template v-slot:loading>
                <q-inner-loading showing color="primary" />
              </template>

              <!-- Table Header -->
              <template v-slot:top-right="props">

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
                                    <q-date v-model="editedItem.date" mask="YYYY-MM-DD">
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
          
              </template>

              <!-- Table Body -->
              <template v-slot:body="props">
                
                  <q-tr :props="props">

                    <q-td auto-width>
                      <q-btn size="sm" flat
                        color="black"
                        @click="props.expand = !props.expand" 
                        :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'">
                      </q-btn>
                    </q-td>

                    <q-td key="teacher" :props="props">
                      {{ props.row.teacher }}
                    </q-td>

                    <q-td key="benefits" :props="props">
                      <q-toggle v-model="props.row.benefits" color="blue" />
                    </q-td>
                    
                    <q-td key="workMonth" :props="props">
                      <div>{{ props.row.workMonth }}</div>

                      <q-popup-edit v-model="props.row.workMonth" title="Update Work Month" buttons>
                        <q-input type="number" v-model="props.row.workMonth" dense autofocus />
                      </q-popup-edit>

                    </q-td>

                    <q-td key="increase" :props="props">
                      <div>{{ props.row.increase }} %</div>
                      <q-popup-edit v-model="props.row.increase" title="Update increase" buttons>
                        <q-input type="number" v-model="props.row.increase" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="currentSalary" :props="props">
                      <div>$ {{ props.row.currentSalary }}</div>
                      <q-popup-edit v-model="props.row.currentSalary" title="Update Current Salary" buttons>
                        <q-input type="number" v-model="props.row.currentSalary" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="fringe" :props="props">
                      <div>$ {{ props.row.fringe }}</div>
                      <q-popup-edit v-model="props.row.fringe" title="Update Fringe" buttons>
                        <q-input type="number" v-model="props.row.fringe" dense autofocus />
                      </q-popup-edit>
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

                  <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%" class="q-td--no-hover">
                      <div class="q-mt-md">
                        <div class="row">

                          <div class="col-9">
                            <div class="text-subtitle2">Monthly Breakdown</div>
                            <q-table
                              class="q-mt-md q-mb-md no-shadow border"
                              :data="utilityPersonnelSubData"
                              :columns="utilityPersonnelSubColumns"
                              row-key="id"
                              hide-bottom
                            >
                              <template v-slot:body="props">
                                <q-tr :props="props">
                                  <q-td key="workMonths" :props="props">
                                    {{ props.row.workMonths }}
                                  </q-td>
                                  <q-td key="payPeriod" :props="props">
                                    {{ props.row.payPeriod }}
                                  </q-td>
                                  <q-td key="gross" :props="props">
                                    {{ props.row.gross }}
                                  </q-td>
                                  <q-td key="hourlyRate" :props="props">
                                    {{ props.row.hourlyRate }}
                                  </q-td>
                                  <q-td key="notes" :props="props">
                                    {{ props.row.notes }}
                                    <q-popup-edit v-model="props.row.notes" title="Notes" buttons>
                                      <q-input type="textarea" v-model="props.row.notes" dense autofocus />
                                    </q-popup-edit>
                                  </q-td>
                                </q-tr>
                              </template>

                            </q-table>
                          </div>

                          <div class="col-4">
                            <q-expansion-item
                              expand-separator
                              label="Salary History"
                              class="text-subtitle2"
                            >
                                <q-table
                                  class="q-mt-md q-mb-md no-shadow border" 
                                  hide-bottom
                                  :data="salaryHistoryData"
                                  :columns="salaryHistoryColumns"
                                  row-key="year"
                                  separator="cell"
                                />
                            </q-expansion-item>
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
            
          </q-tab-panel>

        </q-tab-panels>
      </q-card>
    </div>
  

  </q-page>
</template>

<script>
    import {exportFile} from 'quasar'
    import router from 'src/router'
    import SalariedTable from '../../components/teacher/SalariedTable';

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

    export default {
        components: {
          SalariedTable,
        },
        data() {
          return {
            tab: 'Salaried',
            confirm: false,
            loading: false,
            pages: 10,
            currentPage: 1,
            pagination: {
              sortBy: 'name',
              page: 1,
              rowsPerPage: 10,
              // rowsNumber: 10
            },
            schoolYear: null,
            schoolYears: [
              'School Year 20-21',
              'School Year 19-20',
              'School Year 18-19'
            ],
            mode: 'list',
            isFinal: false,
            show_dialog: false,
            editedIndex: -1,
            editedItem: {
              date: "",
              school: "",
              previousYear: "",
              difference: "",
              status: false,
              notes: ""
            },
            defaultItem: {
              date: "",
              school: "",
              previousYear: "",
              difference: "",
              status: false,
              notes: ""
            },
            
            columns: [
              {
                name: "toggle",
                field: row => row.name,
              },
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
            data: [],

            hourlyColumns: [
              {
                name: "toggle",
                field: row => row.name,
              },
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
                name: "hoursWeek",
                align: "left",
                label: "Hours/Week",
                field: "hoursWeek",
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
                name: "increase",
                align: "left",
                label: "Increase",
                field: "increase"
              },
              {
                name: "hourlyRate",
                align: "left",
                label: "Hourly Rate",
                field: "hourlyRate"
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
            hourlyData: [
            ],

            utilityPersonnelColumns: [
              {
                name: "toggle",
                field: row => row.name,
              },
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
            utilityPersonnelData: [],

            utilityPersonnelSubColumns: [
              { 
                name: "workMonths", 
                align: "left",
                label: "Work months", 
                field: "workMonths"
              },
              { 
                name: "payPeriod", 
                align: "left",
                label: "Pay Period", 
                field: "payPeriod"
              },
              { 
                name: "gross", 
                align: "left",
                label: "Gross", 
                field: "gross"
              },
              { 
                name: "hourlyRate", 
                align: "left",
                label: "Hourly Rate", 
                field: "hourlyRate"
              },
              { 
                name: "notes", 
                align: "left",
                label: "Notes", 
                field: "notes"
              },
            ],
            utilityPersonnelSubData: [],

            teacherSubColumns: [
              { 
                name: "workMonths", 
                align: "left",
                label: "Work months", 
                field: "workMonths"
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
                label: "Gross", 
                field: "gross"
              },
              { 
                name: "totalAdmin", 
                align: "left",
                label: "Total w/Admin", 
                field: "totalAdmin"
              },
              { 
                name: "hourlyRate", 
                align: "left",
                label: "Hourly Rate", 
                field: "hourlyRate"
              },
              { 
                name: "notes", 
                align: "left",
                label: "Notes", 
                field: "notes"
              },
            ],
            teacherSubData: [],

            teacherHourlySubColumns: [
              { 
                name: "workMonths", 
                align: "left",
                label: "Work months", 
                field: "workMonths"
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
                label: "Gross", 
                field: "gross"
              },
              { 
                name: "totalAdmin", 
                align: "left",
                label: "Total w/Admin", 
                field: "totalAdmin"
              },
              { 
                name: "hourlyRate", 
                align: "left",
                label: "Hourly Rate", 
                field: "hourlyRate"
              },
              { 
                name: "hourlyOverride", 
                align: "left",
                label: "Hourly Ovverride", 
                field: "hourlyOverride"
              },
              { 
                name: "notes", 
                align: "left",
                label: "Notes", 
                field: "notes"
              },
            ],
            teacherHourlySubData: [],
            
            salaryHistoryColumns: [
              { 
                name: "year", 
                align: "left",
                label: "Year", 
                field: "year"
              },
              { 
                name: "increase", 
                align: "left",
                label: "Increase %", 
                field: "increase"
              },
              { 
                name: "finalSalary", 
                align: "left",
                label: "Final Salary", 
                field: "finalSalary"
              },
            ],
            salaryHistoryData: [
              {
                year: 2019,
                increase: 16.5,
                finalSalary: 597895
              },
              {
                year: 2020,
                increase: 45.5,
                finalSalary: 12589
              },
              {
                year: 2021,
                increase: 78.22,
                finalSalary: 78631
              },
            ],
            
            tempData: [],
            schools: [],
          };
        },
        methods: {
          addRow() {
            this.close()
          },
          openDeleteModal(item) {
            this.confirm = true
            this.item = item
          },
          deleteItem() {
            let item = this.item
            const index = this.data.indexOf(item)
            this.data.splice(index, 1)
          },
          editItem(item) {
              this.editedIndex = this.data.indexOf(item);
              this.editedItem = Object.assign({}, item);
              this.show_dialog = true;
          },
          close () {
            this.show_dialog = false
            setTimeout(() => {
              this.editedItem = Object.assign({}, this.defaultItem)
              this.editedIndex = -1
            }, 300)
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
         
        },
        created() {

            let dataTest = []
            let hourlyDataSet = []
            let teacherSubData = []
            let teacherHourlySubDataSet = []
            let utilityPersonnelDataSet = []
            let utilityPersonnelSubDataSet = []

            const schoolUpcharge = 1.67;
            const adminPercentage = 12;

            for(let i=0; i<5; i++) {

              let r = Math.floor(Math.random() * 10)
              if(r % 2) r = true 
              else r = false

              let workMonth = Math.floor(Math.random() * 12),
                  allocation = Math.floor(Math.random() * 100),
                  pr = allocation / 100,
                  increase = Math.floor(Math.random() * 2),
                  previousSalary =  Math.floor(Math.random() * 4000),
                  fringe = Math.floor(Math.random() * 350),
                  currentSalary = (previousSalary * increase ),
                  semiMonthly = (currentSalary / (workMonth - 0.5) / 2) * pr,
                  
                  
                  calculateCharge = ((currentSalary * schoolUpcharge) / (workMonth - 0.5)) * pr,
                  calculateGross = calculateCharge + fringe * pr,
                  calculateTotalCharge = calculateGross + calculateGross * (adminPercentage / 100) * pr,
                  annualCharge = calculateTotalCharge * (workMonth - 0.5),
                  hourlyRate = (calculateTotalCharge / (160 * pr));

              let hoursWeek = Math.floor(Math.random() * 40),
                  currentHourlyRate =  Math.floor(Math.random() * 70),

                  
                  hourlySemiMonthly = currentHourlyRate * hoursWeek * 2,
                  annualChargeH = 0,
                  hourlyOverride = 0,
                  
                  calculateHourlyCharge = currentHourlyRate * schoolUpcharge * hoursWeek * 4,
                  calculateHourlyGross =  calculateHourlyCharge + fringe,
                  calculateHourlyTotalCharge = calculateHourlyGross + calculateHourlyGross * (adminPercentage / 100),
                  hourlyRateH = calculateHourlyTotalCharge / (hoursWeek * 4),
                  hourlyOverrideRate = hourlyRateH - hourlyOverride;
            

                  if (hourlyOverrideRate != 0) {
                    annualChargeH =  hoursWeek * workMonth * 4 * hourlyOverrideRate
                  } else {
                    annualChargeH = calculateHourlyTotalCharge * workMonth
                  }

              let calculateUtilityPersonnelGross = ( currentSalary / workMonth ) + fringe,
                  hourlyRateUtilityPersonnel = calculateUtilityPersonnelGross / 160,
                  annualChargeUtilityPersonnel = currentSalary + (fringe * workMonth),
                  semiMonthlyUtilityPersonnel = (currentSalary / workMonth / 2);

              let obj = {
                  teacher: 'Name Surname ' + i+1,
                  benefits: r,
                  workMonth: workMonth,
                  allocation: allocation,
                  increase: increase,
                  currentSalary: currentSalary,
                  fringe: fringe,
                  semiMonthly: semiMonthly.toFixed(2),
                  annualCharge: annualCharge.toFixed(2)
              }

              let subObj = {
                workMonths: workMonth - 0.5,
                payPeriod: workMonth * 2,
                charge: calculateCharge.toFixed(2),
                gross: calculateGross.toFixed(2),
                totalAdmin: calculateTotalCharge.toFixed(2),
                hourlyRate: hourlyRate.toFixed(2),
                notes: "Notes example."
              }

              let hourlyObj = {
                  teacher: 'Frank Hall' + i,
                  benefits: r,
                  hoursWeek: hoursWeek,
                  workMonth: workMonth,
                  increase: increase,
                  hourlyRate: currentHourlyRate,
                  fringe: fringe,
                  semiMonthly: hourlySemiMonthly,
                  annualCharge: annualChargeH.toFixed(2)
              }

              let subHourlyObj = {
                workMonths: workMonth,
                payPeriod: hoursWeek * 2,
                charge: calculateHourlyCharge.toFixed(2),
                gross: calculateHourlyGross.toFixed(2),
                totalAdmin: calculateHourlyTotalCharge.toFixed(2),
                hourlyRate: hourlyRateH.toFixed(2),
                hourlyOverride: hourlyOverride,
                notes: "Notes example."
              }

              let utilityPersonnelObj = {
                  teacher: 'Name Surname ' + i+1,
                  benefits: r,
                  workMonth: workMonth,
                  increase: increase,
                  currentSalary: currentSalary,
                  fringe: fringe,
                  semiMonthly: semiMonthlyUtilityPersonnel.toFixed(2),
                  annualCharge: annualChargeUtilityPersonnel.toFixed(2)
              }

              let utilityPersonnelSubObj = {
                workMonths: workMonth,
                payPeriod: hoursWeek * 2,
                gross: calculateUtilityPersonnelGross.toFixed(2),
                hourlyRate: hourlyRateUtilityPersonnel.toFixed(2),
                notes: "Notes example."
              }
              
              dataTest.push(obj)
              hourlyDataSet.push(hourlyObj)
              utilityPersonnelDataSet.push(utilityPersonnelObj)
              
              
              if(i == 0) {
                teacherSubData.push(subObj)
                teacherHourlySubDataSet.push(subHourlyObj)
                utilityPersonnelSubDataSet.push( utilityPersonnelSubObj )
              } 

            }

            this.data = dataTest
            this.hourlyData = hourlyDataSet
            this.teacherSubData = teacherSubData
            this.teacherHourlySubData = teacherHourlySubDataSet
            this.utilityPersonnelData = utilityPersonnelDataSet
            this.utilityPersonnelSubData = utilityPersonnelSubDataSet

            let schoolArr = []
            for(let j=0; j<this.data.length; j++) {
              schoolArr.push('School N'+j+1)
            }
            this.schools = schoolArr
        },
        computed: {
          total() {
            let total = 0;
            for(let i=0; i<this.data.length; i++) {

              let allocation
              if(this.data[i].status) {
                allocation = parseFloat( this.data[i].finalAllocation )
              }else {
                allocation = parseFloat( this.data[i].allocation )
              }
              total += allocation

            }
            return total.toFixed(2)
        }
      }
    }

</script>

<style lang="scss" scoped>

.border {
  border: 1px solid #e0e0e0;
}
</style>