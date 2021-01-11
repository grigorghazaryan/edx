<template>
    <q-table
      :title="school" 
      :data="data" 
      :columns="columns"
      :loading="loading"
      class="no-shadow"
      row-key="id"
      :pagination.sync="pagination"
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

      <q-btn square class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" @click="addEmptyRow" no-caps>Add</q-btn>


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

              <q-card-section class="row" style="width: 500px; display: flex; align-items: center;">
                <q-icon name="calendar_today" class="text-orange q-mr-sm" style="font-size: 2em"/>
                <span class="text-h6" style="line-height: 2.5rem">Schedule Activity</span>
              </q-card-section>

        
              <q-card-section class="q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="row">

                  <div class="col-12">
                    <div class="q-mt-sm q-mb-md">

                      <q-separator class="q-mt-md q-mb-md"/>

                        <div class="row q-mt-lg">

                          <div class="col-3 q-pr-md row items-center justify-end">Start date:</div>
                          
                          <div class="col-3">
                            <q-input :readonly="allDayEvent" outlined dense v-model="editedItem.dateOfActivityArr[0].startdate">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date :disabled="allDayEvent" :readonly="allDayEvent" v-model="editedItem.dateOfActivityArr[0].startdate" mask="MM/DD/YYYY">
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
                            <q-input :readonly="allDayEvent" outlined dense v-model="editedItem.dateOfActivityArr[0].endDate">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date :disabled="allDayEvent" :readonly="allDayEvent" v-model="editedItem.dateOfActivityArr[0].endDate" mask="MM/DD/YYYY">
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
                            <q-input  :readonly="allDayEvent" outlined dense v-model="editedItem.dateOfActivityArr[0].time1">
                              <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time  :disabled="allDayEvent" :readonly="allDayEvent" v-model="editedItem.dateOfActivityArr[0].time1">
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
                            <q-input  :readonly="allDayEvent" outlined dense v-model="editedItem.dateOfActivityArr[0].time2">
                              <template v-slot:append>
                                <q-icon name="access_time" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-time  :disabled="allDayEvent" :readonly="allDayEvent" v-model="editedItem.dateOfActivityArr[0].time2">
                                      <div class="row items-center justify-end">
                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                      </div>
                                    </q-time>
                                  </q-popup-proxy>
                                </q-icon>
                              </template>
                            </q-input>
                          </div>

                          <div class="col-4 q-pl-lg q-mt-md">
                            <span class="q-ml-md"><q-checkbox v-model="allDayEvent" label="All day event" /></span>
                          </div>

                        </div>

                      <q-separator class="q-mt-md q-mb-md"/>

                        <div class="row q-pr-lg q-pl-lg">

                          <div class="col-md-12 q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Location: </div>
                            <q-input outlined v-model="editedItem.dateOfActivityArr[0].location" dense/>
                          </div>

                          <div class="col-md-12">
                            <div class="text-subtitle2 q-mb-sm">Note: </div>
                            <q-input outlined type="textarea" dense v-model="editedItem.dateOfActivityArr[0].note"/>
                          </div>

                        </div>

                      <q-separator class="q-mt-md q-mb-md"/>

                      <div class="row">
                        <div class="col-3 text-right q-pr-md">
                          <q-checkbox :disable="editedItem.multi" v-model="editedItem.repeat" label="Repeat" />
                        </div>
                      </div>

                      <div v-if="editedItem.repeat">

                        <div class="row q-mt-md">
                          <div class="col-3 q-pr-md row items-center justify-end">
                            Repeats:
                          </div>
                          <div class="col-3">
                            <q-select dense outlined v-model="editedItem.dateOfActivityArr[0].repeats" :options="selectOptionsDayWeekMonth"  />
                          </div>
                        </div>

                        <div class="row q-mt-md">
                          <div class="col-3 q-pr-md row items-center justify-end">Every:</div>
                          <div class="col-2">
                            <q-input outlined v-model="editedItem.dateOfActivityArr[0].repeatEvery" dense/>
                          </div>
                          <div class="col-2 row items-center justify-start q-pl-sm">
                            <span>{{ editedItem.dateOfActivityArr[0].repeats.clean }}(s)</span>
                          </div>
                        </div>

                        <div class="row q-mt-md">
                          <div class="col-3 q-pr-md row items-center justify-end">On:</div>
                          <div class="col-9">
                            <q-btn-group push>
                              <q-btn 
                                v-for="(week, i) in weekDays" :key="week.label"
                                :color=" week.checked ? 'amber' : 'yellow' " 
                                glossy
                                text-color="black" 
                                push 
                                :label="week.label.charAt(0)"
                                @click="repeatOnWeekDay(week, i)"
                              />
                            </q-btn-group>
                          </div>
                        </div>

                      </div>

                      <q-separator class="q-mt-md"></q-separator>

                      <div class="row q-pr-lg q-pl-lg q-mt-lg">

                        <div class="col-md-12 q-mb-md">
                          <div class="text-subtitle2 q-mb-sm">Attendees:</div>
                            <q-btn  :icon="editedItem.attendies ? 'remove' : 'add'" 
                            color="blue" 
                            round 
                            @click="editedItem.attendies = !editedItem.attendies"/>
                        </div>

                      </div>

                      <!-- <div class="row q-pr-lg q-pl-lg q-mt-lg">

                        <div class="col-md-12 q-mb-md">
                          <div class="text-subtitle2 q-mb-sm">Attendees:</div>
                            <q-btn  :icon="editedItem.attendies ? 'remove' : 'add'" color="blue" round @click="editedItem.attendies = !editedItem.attendies"/>
                        </div>

                      </div> -->

                      <div v-if="editedItem.attendies" class="row q-mt-md q-pr-lg q-pl-lg">
                        <div class="col-4 q-pr-md row items-center justify-end">
                          Number of attendees:
                        </div>
                        <div class="col-2">
                          <q-input dense outlined v-model="editedItem.noAttendingArr.attendees"/>
                        </div>
                      </div>

                      <div v-if="editedItem.attendies" class="q-mt-md q-pr-lg q-pl-lg">
                        <div>

                          <q-table
                            :data="editedItem.noAttendingArr.attendeesData"
                            :columns="attendeesColumn"
                            row-key="no"
                            hide-bottom
                            class="no-scroll"
                          >
                          
                            <template v-slot:body="props">

                              <q-tr :props="props">

                                <q-td key="no" :props="props">
                                  <q-input 
                                    type="number" 
                                    dense 
                                    outlined 
                                    v-model="props.row.no"
                                    @input="selfTitleTeacherCount(props.row.no)"
                                    :readonly="props.row.all"
                                  />
                                </q-td>

                                <q-td key="type" :props="props" style="width: 200px">
                                  <q-select 
                                    dense 
                                    outlined 
                                    v-model="props.row.type" 
                                    :options="teachersTypeArr"  
                                    @input="changeType(props.row.type)"
                                  />
                                </q-td>
                                
                                <q-td key="all" :props="props">
                                  <q-checkbox v-model="props.row.all" />
                                </q-td>

                                <q-td key="attendeeList" :props="props" class="row">

                                  <div @click="props.expand = !props.expand" class="cursor-pointer" >
                                    <q-btn color="blue"  round dense icon="perm_identity"/>
                                  </div>

                                  <q-btn
                                      icon="delete_forever"
                                      color="red" 
                                      @click="openAttendeDeleteModal(props.row)" 
                                      round dense
                                    >
                                  </q-btn>

                                </q-td>

                              </q-tr>

                              <q-tr v-show="props.expand" :props="props">
                                <q-td colspan="100%" class="q-td--no-hover">

                                    <q-input 
                                      outlined 
                                      dense 
                                      v-on:keyup.enter="searchEnter"
                                      v-model="attendingSearch"
                                      label="Search" 
                                      class="q-mt-lg q-mb-sm">

                                      <template v-slot:prepend>
                                        <q-icon name="search" />
                                      </template>

                                    </q-input>

                                    <q-list bordered separator class="q-mb-lg" style="height: 195px; overflow-y: scroll;">

                                      <q-item v-for="teacher in filteredList" :key="teacher.id">
                                        <q-item-section>
                                          <div class="w-100 row justify-between items-center">
                                            <div class="text-subtitle2">{{ teacher.name }}</div>
                                            <q-btn 
                                              icon="delete_forever"
                                              color="red" 
                                              size=sm 
                                              no-caps
                                              @click="openDeleteTeacherModal(teacher)"
                                            ></q-btn>
                                          </div>
                                        </q-item-section>
                                      </q-item>

                                                                      
                                      <div v-if="teachersSearchLength == 0">
                                          <p class="q-mt-md q-ml-md">
                                            <q-icon name="warning" style="font-size: 1.5em"/>
                                            No matching records found 
                                          </p>
                                      </div>
                                    
                                    </q-list>

                                </q-td>
                              </q-tr>

                            </template>

                          </q-table>

                          <q-btn v-if="editedItem.noAttendingArr.attendeesData.length < 5" round dense color="secondary" icon="add" class="q-mt-md"  @click="addAttRow"/>

                        </div>
                      </div>

                      <q-separator class="q-mt-md q-mb-lg"></q-separator>

                    </div> 
                  </div>
                
                </div>
              </q-card-section>

              <q-card-actions class="row justify-end">
                <div>
                  <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                  <q-btn flat label="Confirm" color="primary" v-close-popup  @click="confirmDateOfActivity"></q-btn>
                </div>
              </q-card-actions>
        

            </q-card>
          </q-dialog>

          <q-dialog v-model="show_dialog_child">
            <q-card>

              <q-card-section class="row" style="width: 500px; display: flex; align-items: center;">
                <q-icon name="calendar_today" class="text-orange q-mr-sm" style="font-size: 2em"/>
                <span class="text-h6" style="line-height: 2.5rem">Schedule Activity (2)</span>
              </q-card-section>

        
              <q-card-section class="q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="row">

                  <div class="col-12">
                    <div class="q-mt-sm q-mb-md">

                      <q-separator class="q-mt-md q-mb-md"/>

                      <div class="row q-mt-lg">

                        <div class="col-3 q-pr-md row items-center justify-end">Start date:</div>
                        <div class="col-3">
                          <q-input :readonly="allDayEvent" outlined dense v-model="tempDateOfActivity.startdate">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-date :disabled="allDayEvent" :readonly="allDayEvent" v-model="tempDateOfActivity.startdate" :options="optionsFn">
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
                          <q-input :readonly="allDayEvent" outlined dense v-model="tempDateOfActivity.endDate">
                            <template v-slot:append>
                              <q-icon name="event" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-date :disabled="allDayEvent" :readonly="allDayEvent" v-model="tempDateOfActivity.endDate" :options="optionsFn">
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
                          <q-input :readonly="allDayEvent"  outlined dense v-model="tempDateOfActivity.time1">
                            <template v-slot:append>
                              <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-time :disabled="allDayEvent" :readonly="allDayEvent" v-model="tempDateOfActivity.time1">
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
                          <q-input :readonly="allDayEvent"  outlined dense v-model="tempDateOfActivity.time2">
                            <template v-slot:append>
                              <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-time :disabled="allDayEvent" :readonly="allDayEvent" v-model="tempDateOfActivity.time2">
                                    <div class="row items-center justify-end">
                                      <q-btn v-close-popup label="Close" color="primary" flat />
                                    </div>
                                  </q-time>
                                </q-popup-proxy>
                              </q-icon>
                            </template>
                          </q-input>
                        </div>

                        <div class="col-4 q-pl-lg q-mt-md">
                          <span class="q-ml-md"><q-checkbox v-model="allDayEvent" label="All day event" /></span>
                        </div>

                      </div>

                      <q-separator class="q-mt-md q-mb-md"/>

                      <div class="row q-pr-lg q-pl-lg">

                        <div class="col-md-12 q-mb-md">
                          <div class="text-subtitle2 q-mb-sm">Location: </div>
                          <q-input outlined v-model="tempDateOfActivity.location" dense/>
                        </div>

                        <div class="col-md-12">
                          <div class="text-subtitle2 q-mb-sm">Note: </div>
                          <q-input outlined type="textarea" dense v-model="tempDateOfActivity.note"/>
                        </div>

                      </div>
                  
                      <q-separator class="q-mt-md q-mb-md"/>

                      <div class="row">
                        <div class="col-3 text-right q-pr-md">
                          <q-checkbox v-model="tempDateOfActivity.repeat" label="Repeat" />
                        </div>
                      </div>

                      <div v-if="tempDateOfActivity.repeat">

                        <div class="row q-mt-md">
                          <div class="col-3 q-pr-md row items-center justify-end">
                            Repeats:
                          </div>
                          <div class="col-3">
                            <q-select dense outlined v-model="tempDateOfActivity.repeats" :options="selectOptionsDayWeekMonth"  />
                          </div>
                        </div>

                        <div class="row q-mt-md">
                          <div class="col-3 q-pr-md row items-center justify-end">Every:</div>
                          <div class="col-2">
                            <q-input outlined v-model="tempDateOfActivity.repeatEvery" dense/>
                          </div>
                          <div class="col-2 row items-center justify-start q-pl-sm">
                            <span>{{ tempDateOfActivity.repeats.clean }}(s)</span>
                          </div>
                        </div>

                        <div class="row q-mt-md">
                          <div class="col-3 q-pr-md row items-center justify-end">On:</div>
                          <div class="col-9">
                            <q-btn-group push>
                              <q-btn 
                                v-for="(week, i) in weekDays" :key="week.label"
                                :color=" week.checked ? 'amber' : 'yellow' " 
                                glossy
                                text-color="black" 
                                push 
                                :label="week.label.charAt(0)"
                                @click="repeatOnWeekDayChild(week, i)"
                              />
                            </q-btn-group>
                          </div>
                        </div>

                      </div>

                      <q-separator class="q-mt-md"></q-separator>

                      <div class="row q-pr-lg q-pl-lg q-mt-lg">

                        <div class="col-md-12 q-mb-md">
                          <!-- <div class="text-subtitle2 q-mb-sm">Attendees: 4</div> -->
                            <q-btn :icon="editedItem.attendies ? 'remove' : 'add'" color="blue" round @click="editedItem.attendies = !editedItem.attendies"/>
                        </div>

                      </div>

                      <div v-if="editedItem.attendies" class="row q-mt-md q-pr-lg q-pl-lg">
                        <div class="col-4 q-pr-md row items-center justify-end">
                          Number of attendees:
                        </div>
                        <div class="col-2">
                          <q-input dense outlined v-model="editedItem.noAttendingArr.attendees"/>
                        </div>
                      </div>

                      <div v-if="editedItem.attendies" class="q-mt-md q-pr-lg q-pl-lg">
                        <div>

                          <q-table
                            :data="editedItem.noAttendingArr.attendeesData"
                            :columns="attendeesColumn"
                            row-key="no"
                            hide-bottom
                            class="no-scroll"
                          >
                          
                            <template v-slot:body="props">

                              <q-tr :props="props">

                                <q-td key="no" :props="props">
                                  <q-input 
                                    type="number" 
                                    dense 
                                    outlined 
                                    v-model="props.row.no"
                                    @input="selfTitleTeacherCount(props.row.no)"
                                    :readonly="props.row.all"
                                  />
                                </q-td>

                                <q-td key="type" :props="props" style="width: 200px">
                                  <q-select 
                                    dense 
                                    outlined 
                                    v-model="props.row.type" 
                                    :options="teachersTypeArr"  
                                    @input="changeType(props.row.type)"
                                  />
                                </q-td>
                                
                                <q-td key="all" :props="props">
                                  <q-checkbox v-model="props.row.all" />
                                </q-td>

                                <q-td key="attendeeList" :props="props" class="row">

                                  <div @click="props.expand = !props.expand" class="cursor-pointer" >
                                    <q-btn color="blue"  round dense icon="perm_identity"/>
                                  </div>

                                  <q-btn
                                      icon="delete_forever"
                                      color="red" 
                                      @click="openAttendeDeleteModal(props.row)" 
                                      round dense
                                    >
                                  </q-btn>

                                </q-td>

                              </q-tr>

                              <q-tr v-show="props.expand" :props="props">
                                <q-td colspan="100%" class="q-td--no-hover">

                                    <q-input 
                                      outlined 
                                      dense 
                                      v-on:keyup.enter="searchEnter"
                                      v-model="attendingSearch"
                                      label="Search" 
                                      class="q-mt-lg q-mb-sm">

                                      <template v-slot:prepend>
                                        <q-icon name="search" />
                                      </template>

                                    </q-input>

                                    <q-list bordered separator class="q-mb-lg" style="height: 195px; overflow-y: scroll;">

                                      <q-item v-for="teacher in filteredList" :key="teacher.id">
                                        <q-item-section>
                                          <div class="w-100 row justify-between items-center">
                                            <div class="text-subtitle2">{{ teacher.name }}</div>
                                            <q-btn 
                                              icon="delete_forever"
                                              color="red" 
                                              size=sm 
                                              no-caps
                                              @click="openDeleteTeacherModal(teacher)"
                                            ></q-btn>
                                          </div>
                                        </q-item-section>
                                      </q-item>

                                                                      
                                      <div v-if="teachersSearchLength == 0">
                                          <p class="q-mt-md q-ml-md">
                                            <q-icon name="warning" style="font-size: 1.5em"/>
                                            No matching records found 
                                          </p>
                                      </div>
                                    
                                    </q-list>

                                </q-td>
                              </q-tr>

                            </template>

                          </q-table>

                          <q-btn v-if="editedItem.noAttendingArr.attendeesData.length < 5" round dense color="secondary" icon="add" class="q-mt-md"  @click="addAttRow"/>

                        </div>
                      </div>

                      <q-separator class="q-mt-md q-mb-lg"></q-separator>

                    </div> 
                  </div>
                
                </div>
              </q-card-section>

              <q-card-actions class="row justify-end">
                <div>
                  <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                  <q-btn flat label="Confirm" color="primary" v-close-popup  @click="confirmNewDate()"></q-btn>
                </div>
              </q-card-actions>
        

            </q-card>
          </q-dialog>

          <q-dialog v-model="show_attending_dialog">
          <q-card>

              <q-card-section class="row justify-start items-center" style="width: 500px">
                <q-icon class="q-mr-sm" name="people_alt"  color="green" style="font-size: 1.5em"/>
                <div class="text-h6">Activity Attendees</div>
              </q-card-section>

              <q-card-section>
                <div>

                  <q-table
                    :data="editedItem.noAttendingArr.attendeesData"
                    :columns="attendeesColumn"
                    row-key="no"
                    hide-bottom
                    class="no-scroll"
                  >
                  
                    <template v-slot:body="props">

                      <q-tr :props="props">

                        <q-td key="no" :props="props">
                          <q-input 
                            type="number" 
                            dense 
                            outlined 
                            v-model="props.row.no"
                            @input="selfTitleTeacherCount(props.row.no)"
                            :readonly="props.row.all"
                          />
                        </q-td>

                        <q-td key="type" :props="props" style="width: 200px">
                          <q-select 
                            dense 
                            outlined 
                            v-model="props.row.type" 
                            :options="teachersTypeArr"  
                            @input="changeType(props.row.type)"
                          />
                        </q-td>
                        
                        <q-td key="all" :props="props">
                          <q-checkbox v-model="props.row.all" />
                        </q-td>

                        <q-td key="attendeeList" :props="props" class="row">

                          <div @click="props.expand = !props.expand" class="cursor-pointer" >
                            <q-btn color="blue"  round dense icon="perm_identity"/>
                          </div>

                          <q-btn
                              icon="delete_forever"
                              color="red" 
                              @click="openAttendeDeleteModal(props.row)" 
                              round dense
                            >
                          </q-btn>

                        </q-td>

                      </q-tr>

                      <q-tr v-show="props.expand" :props="props">
                        <q-td colspan="100%" class="q-td--no-hover">

                            <q-input 
                              outlined 
                              dense 
                              v-on:keyup.enter="searchEnter"
                              v-model="attendingSearch"
                              label="Search" 
                              class="q-mt-lg q-mb-sm">

                              <template v-slot:prepend>
                                <q-icon name="search" />
                              </template>

                            </q-input>

                            <q-list bordered separator class="q-mb-lg" style="height: 195px; overflow-y: scroll;">

                              <q-item v-for="teacher in filteredList" :key="teacher.id">
                                <q-item-section>
                                  <div class="w-100 row justify-between items-center">
                                    <div class="text-subtitle2">{{ teacher.name }}</div>
                                    <q-btn 
                                      icon="delete_forever"
                                      color="red" 
                                      size=sm 
                                      no-caps
                                      @click="openDeleteTeacherModal(teacher)"
                                    ></q-btn>
                                  </div>
                                </q-item-section>
                              </q-item>

                                                              
                              <div v-if="teachersSearchLength == 0">
                                  <p class="q-mt-md q-ml-md">
                                    <q-icon name="warning" style="font-size: 1.5em"/>
                                    No matching records found 
                                  </p>
                              </div>
                            
                            </q-list>

                        </q-td>
                      </q-tr>

                    </template>

                  </q-table>

                  <q-btn v-if="editedItem.noAttendingArr.attendeesData.length < 5" round dense color="secondary" icon="add" class="q-mt-md"  @click="addAttRow"/>

                </div>
              </q-card-section>
              
              <q-card-actions class="row justify-end">
                  <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                  <q-btn flat label="Confirm" color="primary" @click="confirmNoAttending" ></q-btn>
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

          <q-dialog v-model="confirmTeacherModal" persistent>
          <q-card>
              <q-card-section class="row items-center">
              <span class="q-ml-sm">Are you sure to delete this item?</span>
              </q-card-section>

              <q-card-actions align="right">
              <q-btn flat label="No, thanks" color="primary" v-close-popup />
              <q-btn label="Yes" color="red" v-close-popup @click="deleteTeacherItem" />
              </q-card-actions>
          </q-card>
          </q-dialog>

          <q-dialog v-model="confirmAttendeeModal" persistent>
          <q-card>
              <q-card-section class="row items-center">
              <span class="q-ml-sm">Are you sure to delete this?</span>
              </q-card-section>

              <q-card-actions align="right">
              <q-btn flat label="No, thanks" color="primary" v-close-popup />
              <q-btn label="Yes" color="red" v-close-popup @click="deleteAttendee" />
              </q-card-actions>
          </q-card>
          </q-dialog>

          <q-dialog v-model="confirmDate" persistent>
            <q-card>
              <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure to delete this item?</span>
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                <q-btn label="Yes" color="red" v-close-popup @click="deleteDate" />
              </q-card-actions>
            </q-card>
          </q-dialog>

      </div>

      </template>

      <!-- Table Body -->
      <template v-slot:body="props">
      
          <q-tr 
            :props="props" 
            :class="{ 'bg-red-2' : props.row.changed }" 
          >

          <q-td auto-width>
              <q-btn size="sm" flat
              color="black"
              @click="props.expand = !props.expand" 
              :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'">
              </q-btn>
          </q-td>

          <q-td
            key="provider"
            :props="props"
            @click="copyRowData(props.rowIndex)"
          >
            <div  class="cursor-pointer" v-if="props.row.provider">
              {{ props.row.provider.label }}
            </div>

              <q-popup-edit 
                v-model="props.row.provider"
                title="Provider" buttons>

                <q-select  
                    use-input
                    hide-selected
                    fill-input
                    input-debounce="0"
                    @input="detectChange(props.rowIndex)"
                    v-model="props.row.provider" 
                    :options="optionsSupplier"
                    @filter="filterSupplier"
                    style="width: 350px; max-width: 350px; padding-bottom: 32px"
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

          </q-td>

          <q-td key="status" :props="props" @click="copyRowData(props.rowIndex)">

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
              
              <q-popup-edit  v-model="props.row.status_uni" title="Status" buttons>
                <q-select 
                  @input="detectChange(props.rowIndex)" 
                  dense 
                  outlined 
                  v-model="props.row.status_uni" 
                  :options="status"
                />
              </q-popup-edit>

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

              <q-icon v-else-if="props.row.approval_type_uni.label == 'Pre-Approved'" name="how_to_reg" color="blue" style="font-size: 1.5em">
                <q-tooltip 
                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                    transition-show="flip-right"
                    transition-hide="flip-left"
                >
                    <strong>{{props.row.approval_type_uni.label}}</strong>
                </q-tooltip>
              </q-icon>

              <q-popup-edit v-model="props.row.approval_status_uni" title="Approvals" buttons >
                <div style="width: 450px !important;max-width: 450px !important;">

                    <div class="row">
                      <div class="col-md-4">
                          <q-select @input="detectChange(props.rowIndex)" 
                          dense outlined v-model="props.row.approval_status_uni" 
                          :options="approval"/>
                      </div>
                      <div class="col-md-7 q-ml-md">
                          
                          <q-option-group
                              @input="detectChange(props.rowIndex)"
                              :options="optionsApp"
                              label="Notifications"
                              type="radio"
                              v-model="props.row.approval_type_uni.label"
                          />

                          <q-input 
                            :disable="props.row.approval_type_uni.label !== 'Pre-Approved'" 
                            class="q-mt-md q-mb-lg" dense outlined v-model="approvedName" 
                            label="Approved Name" 
                          />
                  
                      </div>
                    <q-separator />
                    </div>
                
                </div>
              </q-popup-edit>

          </q-td>

          <q-td 
            style="white-space: initial;width: 350px; max-width: 350px;"
            key="PDActivity" :props="props" 
            @click="copyRowData(props.rowIndex)"
          >
              <span class="inline-span">{{ props.row.activity }}</span>

              <q-popup-edit v-model="props.row.activity" title="Update activity" buttons>
                <q-input 
                  @input="detectChange(props.rowIndex)" 
                  type="textarea" 
                  v-model="props.row.activity" 
                  dense 
                  autofocus 
                />
              </q-popup-edit>
          </q-td>
          
          <q-td key="dateOfActivity" :props="props" @click="copyRowData(props.rowIndex)"
              :style="{maxWidth: '200px', width: '200px'}"
          > 
              <span @click="editDateOfActivity(props.row)" >
                {{ props.row.activity_date }}
              </span>
              <span class="q-ml-sm">
                <q-icon name="autorenew" color="green" style="font-size: 1.5em" 
                v-if="props.row.repeat" />
              </span>

          </q-td>

          <q-td key="noAttending" :props="props" @click="copyRowData(props.rowIndex)">
              <div @click="editAttendingitem(props.row)">
              <!-- {{ props.row.noAttendingArr.attendees }}  -->
              {{ props.row.no_attending }}
              <span class="q-ml-sm">
                  <q-icon name="people_alt" color="green" style="font-size: 1.5em"/>
                  <!-- v-if="props.row.noAttendingArr.split"  -->
              </span>

              </div>
          </q-td>

          <q-td key="amount" :props="props" 
          @click="copyRowData(props.rowIndex)">
              <div>$ {{ props.row.amount }}</div>
              <q-popup-edit v-model="props.row.amount" title="Update amount" buttons>
                <q-input @input="detectChange(props.rowIndex)" type="text" 
                v-model="props.row.amount" dense autofocus />
              </q-popup-edit>
          </q-td>

          <q-td key="type" :props="props" @click="copyRowData(props.rowIndex)">

              <q-chip 
                square color="green" 
                text-color="white" 
                v-if="props.row.type_uni.label == 'PD'"
              >
                  <!-- {{props.row.type_uni.label}} -->
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
                  <!-- {{props.row.type_uni.label}} -->
                  <span>FE</span>
                  <q-tooltip 
                      anchor="top middle" self="bottom middle" :offset="[10, 10]"
                      transition-show="flip-right"
                      transition-hide="flip-left"
                  >
                      <strong>Family Engagement</strong>
                  </q-tooltip>
              </q-chip>

              <q-popup-edit v-model="props.row.type_uni" title="Update type" buttons>
                <q-select 
                  @input="detectChange(props.rowIndex)" 
                  v-model="props.row.type_uni" 
                  :options="typeArr"
                />
              </q-popup-edit>  

          </q-td>

          <q-td key="grossPD" :props="props">
              <div>$ {{ (parseFloat(props.row.amount) + parseFloat(((props.row.amount * 12) / 100))).toFixed(2) }}</div>
          </q-td>

          <q-td key="actions" :props="props">
              <q-btn 
              v-if="props.row.changed"
              @click="props.row.changed = false"
              class="q-mr-sm"
              icon="save"
              color="green" 
              size=sm 
              no-caps
              round 
              >
              <q-tooltip 
                  anchor="top middle" self="bottom middle" :offset="[10, 10]"
                  transition-show="flip-right"
                  transition-hide="flip-left"
              >
                  <strong>Save</strong>
              </q-tooltip>
              </q-btn>
              <q-btn 
              v-show="props.row.showEditButton && !props.row.changed"
              class="q-mr-sm"
              icon="content_copy"
              color="orange" 
              @click="copyRow(props.row, props.rowIndex)"
              size=sm 
              no-caps
              round 
              >
              <q-tooltip 
                  anchor="top middle" self="bottom middle" :offset="[10, 10]"
                  transition-show="flip-right"
                  transition-hide="flip-left"
              >
                  <strong>Duplicate</strong>
              </q-tooltip>
              </q-btn>
              <q-btn 
              icon="delete_forever"
              color="red" 
              @click="openDeleteModal(props.row)" 
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
              </q-btn>
          </q-td>

          </q-tr>

          <q-tr v-show="props.expand" :props="props">
            <q-td colspan="100%">
                <div class="q-mt-md">
                <div class="row">
                    <div class="col-10 q-mr-lg">

                      <div class="text-subtitle2">Date of activity:</div>

                      <q-table
                        class="q-mt-md q-mb-md no-shadow border"
                        :data="props.row.dateOfActivityArr"
                        :columns="dateOfActivityColumns"
                        row-key="id"
                        hide-bottom
                      >
                        <template v-slot:body="props">
                          <q-tr :props="props">
                            <q-td key="startdate" :props="props">
                              {{ props.row.startdate }}
                            </q-td>
                            <q-td key="endDate" :props="props">
                              {{ props.row.endDate }}
                            </q-td>
                            <q-td key="time1" :props="props">
                              {{ props.row.time1 }}
                            </q-td>
                            <q-td key="time2" :props="props">
                              {{ props.row.time2 }}
                            </q-td>
                            <q-td key="location" :props="props">
                              {{ props.row.location }}
                            </q-td>
                            <q-td key="repeats" :props="props">
                              {{ props.row.repeats.label }}
                            </q-td>
                            <q-td key="repeatEvery" :props="props">
                              {{ props.row.repeatEvery }}
                            </q-td>
                            <q-td key="repeatOn" :props="props">
                              <span v-for="weekday in props.row.repeatOn" :key="weekday.label">
                                <span v-if="weekday.checked" class="q-mr-sm">{{ weekday.label }}</span>
                              </span>
                            </q-td>
                            <q-td key="note" :props="props">
                              {{ props.row.note }}
                            </q-td>
                            <q-td key="actions" :props="props">
                              <q-btn
                                v-if="props.row.child"
                                @click="openDeleteDate(props.row)" 
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
                              </q-btn>
                            </q-td>
                          </q-tr>
                        </template>

                      </q-table>

                      <div class="q-mt-md q-mb-md">
                        <q-btn icon="add" color="blue" round @click="addDate(props.pageIndex)"/>
                      </div>

                    </div>

                    <div class="col-3">
                      <div class="text-subtitle2">Attendees:</div>
                      
                      <div 
                        v-if="editedItem.noAttendingArr.attendeesData.length"
                        @click="editAttendingitem(props.row)"
                        class="cursor-pointer"
                      >
                        <div v-for="(attendee, i) in editedItem.noAttendingArr.attendeesData" :key="i">
                          <div>
                            <span v-if="attendee.all">All</span>
                            <span v-else>{{ attendee.no }}</span>
                            <span class="q-ml-sm">{{ attendee.type.label }}</span>
                          </div>
                        </div>
                      </div>
                      <div v-else>No Attendees found.</div>

                    </div>

                    <div class="col-md-3">
                      <div class="text-subtitle2">Notes</div>
                      <q-input class="q-mt-md" dense outlined type="textarea" v-model="props.row.activity_note" readonly />
                      <!-- <q-input type="textarea" outlined v-model="props.row.notes" class="q-mb-md"/>   -->
                      <q-popup-edit v-model="props.row.activity_note" title="Update notes" buttons>
                          <q-input type="textarea" v-model="props.row.activity_note" 
                          dense autofocus />
                      </q-popup-edit>    
                    </div>

                    



                    <div class="col-md-12 q-mt-md q-mb-md">
                    <q-btn icon="calendar_today" color="blue" label="Add to Google calendar" />
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
</template>

<script>
import {exportFile} from 'quasar'
import router from 'src/router'
import lodash from 'lodash'
import axios from 'axios'
import config from '../../../config'

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
let oldObject = {}

export default {
data() {
  return {
    detectChangeOldData: {},
    tab: '1',
    pages: 1,
    pagination: { rowsPerPage: 10 },
    current: 1,
    count: 10,
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
    selectOptionsDayWeekMonth: [
      { id: 1, label: 'Daily', value: 'Daily', clean: 'Day' },
      { id: 1, label: 'Weekly', value: 'Weekly', clean: 'Week' },
      { id: 1, label: 'Monthly', value: 'Monthly', clean: 'Month'},
    ],
    time1: '00:00',
    time2: '00:00',
    allDayEvent: false,
    show_dialog: false,
    show_dialog_child: false,
    show_attending_dialog: false,
    splitActivity: false,
    confirmAttendeeModal: false,

    approval : ['Approved', 'Declined', 'Pending'],
    status : [ 
    {
      id: 1,
      label: "Active"
    }, 
    {
      id: 2,
      label: "Canceled"
    }],

    optionsApp: [
      { label: 'Needs Assessment', value: 'Needs Assessment' },
      { label: 'Catalog', value: 'Catalog', color: 'green' },
      { label: 'Blanket Approval', value: 'Blanket Approval', color: 'red' },
      { label: 'Pre Approval', value: 'Pre-Approved', color: 'green' },
      { label: 'None', value: 'None'}
    ],
    approvedName: '',
    
    numbersOfAttendees: [1, 2, 3],
    attendeesColumn: [
      {
        name: "no",
        align: "left",
        label: "No",
        field: "no",
        sortable: true
      },
      {
        name: "type",
        align: "center",
        label: "Type",
        field: "type",
        sortable: true
      },
      {
        name: "all",
        align: "left",
        label: "All",
        field: "type",
        sortable: true
      },
      {
        name: "attendeeList",
        align: "left",
        label: "Attendees",
        field: "attendeeList",
        sortable: true
      },
    ],
    attendeesData: [
    ],

    dateOfActivityColumns: [
      {
        name: "startdate",
        align: "left",
        label: "Start Date",
        field: "startdate"
      },
      {
        name: "endDate",
        align: "left",
        label: "End Date",
        field: "endDate"
      },
      {
        name: "time1",
        align: "left",
        label: "Start Time",
        field: "time1"
      },
      {
        name: "time2",
        align: "left",
        label: "End Time",
        field: "time2"
      },
      {
        name: "location",
        align: "left",
        label: "Location",
        field: "location"
      },
      {
        name: "repeats",
        align: "left",
        label: "Repeats",
        field: "repeats"
      },
      {
        name: "repeatEvery",
        align: "left",
        label: "Repeat every",
        field: "repeatEvery"
      },
      {
        name: "repeatOn",
        align: "left",
        label: "Repeat on",
        field: "repeatOn"
      },
      {
        name: "note",
        align: "left",
        label: "Note",
        field: "note"
      },
      {
        name: "actions",
        align: "left",
        label: "Actions",
        field: "actions"
      }
    ],

    loading: false,
    // pages: 10,
    // currentPage: 1,
    
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
        name: "actions",
        align: "left",
        label: "Actions",
        field: "actions"
      }
    ],
    data: [],
    tempDataX: [],


    editedIndex: null,
    editedItem: {
      provider: '',
      PDActivity: '',
      dateOfActivity: '',
      noAttending: '',
      amount:'',
      pdHub:'',
      grossPD: '',
      repeat: '',
      multi: false,
      attendies: false,
      dateOfActivityArr: [{
        id: 109098788,
        startdate: '2019-02-01',
        endDate: '2019-02-01',
        time1: '00:00',
        time2: '00:00',
        selectDayWeekMonth: '',
        selectWeekDay: '',
      }],
      noAttendingArr: {
        attendees: '',
        amount: 0,
        split: false,
        attendeesData: [
        ],
      },
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
      'Materials'
    ],
    typeModel: '',

    attendingTeacherList: [
      // {id: 1, name: 'Luke Skywalker'},
      // {id: 2, name: 'Han Solo'},
      // {id: 3, name: 'Jar Jar Binks'},
      // {id: 4, name: 'R2-D2'},
      // {id: 5, name: 'Yoda'}
    ],
    attendingSearch: '',
    teachersSearchLength: 0,

    optionsSupplier: [],
    optionsSupplierForFilter: [],

    item: '',
    confirm: false,
    confirmDate: false,
    confirmTeacherModal: false,
    titlesArr: [
      {
        label: 'Title I',
        value: 'Title I',
        disable: false
      },
      {
        label: 'Title II',
        value: 'Title II',
        disable: false
      },
      {
        label: 'Title III',
        value: 'Title III',
        disable: false
      },
      {
        label: 'Title IV',
        value: 'Title IV',
        disable: false
      },
      {
        label: 'ESSER',
        value: 'ESSER',
        disable: false
      },
    ],
    teachersTypeArr: [
    {
      label: 'Teachers',
      value: 'teachers',
      disable: false
    },
    {
      label: 'Students',
      value: 'students',
      disable: false
    },
    {
      label: 'Parents',
      value: 'parents',
      disable: false
    },
    {
      label: 'Staff',
      value: 'staff',
      disable: false
    },
    {
      label: 'Admin',
      value: 'admin',
      disable: false
    }
  ],
    // typeArr: ['PD', 'FE'],
    typeArr2: ['PD', 'M'],
    typeArr3: ['PD', 'I'],
    typeArr4: ['WR', 'SH', 'PD', 'TI'],
    typeEssr: ['PD', 'M', 'S'],
    typeArr: [
      {
        label: 'PD',
        value: true
      },
      {
        label: 'FE',
        value: false
      },
    ],
    rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
    weekDays: [
      { label: 'Sunday', checked: false }, 
      { label: 'Monday', checked: false}, 
      { label: 'Tuesday', checked: false}, 
      { label: 'Wednesday', checked: false}, 
      { label: 'Thursday', checked: false}, 
      { label: 'Friday', checked: false}, 
      { label: 'Saturday', checked: false}
    ],
    tempDateOfActivity: {
      startdate: '2020/06/14',
      endDate: '2020/06/24',
      time1: '00:00',
      time2: '00:00',
      location: 'Location...',
      selectDayWeekMonth: '',
      selectWeekDay: '',
      note: 'Note...',
      selectDayWeekMonth: '',
      selectWeekDay: '',
      repeats: { id: 1, label: 'Daily', value: 'Daily', clean: 'Day' },
      repeatOn: [],
      repeat: false,
      multi: false,
      child: true,
      attendies: false,
    },
    key: null,
  };
  },
  methods: {
    optionsFn (date) {
      // let start = this.editedItem.dateOfActivityArr[0].startdate
      // let end = this.editedItem.dateOfActivityArr[0].endDate
      return date >= '2020/06/14' && date <= '2020/06/25'
    },
    detectChange(index) {
      
      let d = JSON.parse(oldObject)
      // let d = oldObject
      let f = JSON.stringify(this.data[index])
          f = JSON.parse(f)

      console.log('OLD OBJECT', d)
      console.log('NEW OBJECT', f)

      let status = _.isEqual(d, f)


      // console.log('status', status)
      if(status) {
        this.data[index].changed = false
      }else {
        this.data[index].changed = true
      }

    },
    copyRowData(index) {
      
      oldObject = JSON.stringify(this.tempDataX[index])
      console.log('Copy Row Data', oldObject)

    },
    copyRow(row, index) {

      console.log('tempDataX', JSON.stringify(this.data[index]))
      let old = JSON.stringify(this.data[index])

      let newData = this.data[index]
      newData.id =  Math.floor(Math.random() * 50)
      newData.changed = true
      let ddd = JSON.stringify(newData)
      console.log('new data', JSON.stringify(newData))

      let i = index+1
      
      this.data.splice(i, 0, JSON.parse(ddd));
      
      Object.assign(this.data[index], JSON.parse(old));

    },
    addEmptyRow() {
      let obj = {
            // toggle: '',
            provider: '',
            status: '',
            approvals: '',
            PDActivity: '',
            dateOfActivity: '',
            noAttending: 's',
            amount: 0,
            type: 0,
            typeTest: 0,
            grossPD: 0,
            repeat: false,
            notes: '',
            dateOfActivityArr: {
              startdate: '06-14-1995',
              endDate: '06-14-1998',
              time1: '00:00',
              time2: '00:00',
              selectDayWeekMonth: '',
              selectWeekDay: '',
            },
            noAttendingArr: {
              attendees: 0,
              split: false,
              attendeesData: [],
              teacherCount: 0,
            },
        }
      this.data.unshift(obj)
    },
    selfTitleTeacherCount(count) {
      console.log('selfTitleTeacherCount...', count )
      this.editedItem.noAttendingArr.teacherCount = count
      console.log(this.editedItem.noAttendingArr.attendeesData.no)

    },
    changeType(val) {
      const index = this.teachersTypeArr.indexOf(val)
      this.teachersTypeArr[index].disable = true
    },
    searchEnter() {
      if(this.teachersSearchLength == 0) {
        let obj = {
          id: Math.floor(Math.random() * 1000),
          name: this.attendingSearch
        }
        this.attendingTeacherList.push(obj)
        this.attendingSearch = ''
      }
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
    editDateOfActivity(item) {
        
        this.editedIndex = this.data.indexOf(item);
        this.editedItem = Object.assign({}, item);
        this.show_dialog = true;

        console.log('editDateOfActivity', this.editedItem)

    },
    confirmDateOfActivity() {

      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } 

      this.close()

    },
    editAttendingitem(item) {
      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_attending_dialog = true;
    },
    confirmNoAttending() {
      console.log('ok', this.editedItem)
      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } 
      this.close()
    },
    close () {
      this.show_dialog = false
      this.show_attending_dialog = false
      this.confirmAttendeeModal = false
    },
    filterType() {
      if(this.typeModel) {
        if(this.typeModel == 'Professional Development') {
          this.data = this.tempDataX.filter(a => a.typeTest == true);
        }else {
          this.data = this.tempDataX.filter(a => a.typeTest == false);
        }
      }else {
        this.data = this.tempData
      }
    },
    openDeleteModal(item) {
      this.item = item
      this.confirm = true
    },
    openDeleteDate(item) {
      this.item = item
      this.confirmDate = true
    },
    deleteDate() {
      let item = this.item
      const index = this.data[this.key].dateOfActivityArr.indexOf(item)
      this.data[this.key].dateOfActivityArr.splice(index, 1)
    },
    deleteItem() {
      let item = this.item
      const index = this.data.indexOf(item)
      this.data.splice(index, 1)
    },
    openDeleteTeacherModal(item) {
      this.item = item
      this.confirmTeacherModal = true
    },
    openAttendeDeleteModal(item) {
      this.item = item
      this.confirmAttendeeModal = true
    },
    deleteAttendee() {
      let item = this.item
      const index = this.editedItem.noAttendingArr.attendeesData.indexOf(item)
      
      console.log(item)
      console.log(index)

      // Return Type to Enabled
      const typeIndex = this.teachersTypeArr.indexOf(item.type)
      this.teachersTypeArr[typeIndex].disable = false

      this.editedItem.noAttendingArr.attendeesData.splice(index, 1)
    },
    deleteTeacherItem() {
      let item = this.item
      const index = this.filteredList.indexOf(item)
      this.filteredList.splice(index, 1)
      console.log('787878', this.filteredList)
    },
    addAttRow() {
      let obj = {   
        no: '',
        type: '',
        all: false,
        attendeeList: 'View'
      }
      this.editedItem.noAttendingArr.attendeesData.push(obj)
    },
    addDate(key) {
      this.show_dialog_child = true
      this.key = key
    },
    // Parsing activity
    parsineActivity() {

    },
    changePagination (val) {

      console.log('change pagination')
      this.current = val
      this.getActivityByType( parseInt(this.tab), this.$route.params.id, this.count, val )
    },
    changeRowsPerPage() {

      
      this.count = this.pagination.rowsPerPage
      this.current = 1

      this.getActivityByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )

    },
    filterSupplier (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
      })
    },

    // Requests
    getAdditionalInfo(type) {
        const conf = {
            method: 'GET',
            url: config.getAdditionalInfoForInventory + '/' + type,
            headers: {
                Accept: 'application/json',
            }
        }
        axios(conf).then(res => {

            // Supplier
            let supplierArr = []
            for(let i=0; i<res.data.suppliers.length; i++) {
                let obj = {
                    id: res.data.suppliers[i].id,
                    label: res.data.suppliers[i].short_name,
                    value: res.data.suppliers[i].id
                }
                supplierArr.push(obj)
            }
            this.optionsSupplier = supplierArr
            this.optionsSupplierForFilter = supplierArr


        })
    },
    getActivityByType(type, id, limit, page) {
        this.loading = true

        const conf = {
            method: 'GET',
            url: config.getActivity + type + '/' + id + '?limit=' + limit + '&page=' + page,
            headers: {
              Accept: 'application/json',
            }
        }

        axios(conf).then(res => {

            console.log('======', res)
            let data = res.data.activity
            this.pages = res.data.pagesCount

            let arr = []
            for(let i=0; i<data.length; i++) {

          
            let activityObj = {
                id: data[i].id,
                provider: {
                  id: data[i].supplier.id,
                  label: data[i].supplier.short_name
                },
                status_uni: {
                  id: data[i].status.id,
                  label: data[i].status.name
                },
                approval_status_uni: {
                  id: data[i].approval_status.id,
                  label: data[i].approval_status.name
                },
                approval_type_uni: {
                  id: data[i].approval_types.id,
                  label: data[i].approval_types.name
                },
                activity: data[i].activity_name, // TBD If date  == null
                activity_date: data[i].start_date + ' - ' + data[i].end_date,
                no_attending: data[i].total_attendee_count + ' ' + data[i].allocation.name + ' ' + data[i].attendee_type.type,
                amount: data[i].cost != null ? data[i].cost : 0,
                type_uni: {
                  id: data[i].type.id,
                  label: data[i].type.abbreviation
                },
                charge: data[i].total_cost,
                repeat: data[i].has_recurring != null ? data[i].has_recurring : false,

                changed: false,
                showEditButton: true,
                attendies: false,

                dateOfActivityArr: [{
                  id: 109098788,
                  startdate: data[i].start_date,
                  endDate: data[i].end_date,
                  time1: data[i].start_time,
                  time2: data[i].end_time,
                  location: data[i].location,

                  selectDayWeekMonth: 'selectDayWeekMonth',
                  repeatEvery: 1,
                  note: 'Note...))))',
                  selectDayWeekMonth: 'selectDayWeekMonth',
                  selectWeekDay: 'selectWeekDay',

                  repeats: { id: 1, label: 'Daily', value: 'Daily', clean: 'Day' },
                  repeatOn: [],
                  attendies: false,
                }],
                noAttendingArr: {
                  attendees: '',
                  amount: 0,
                  split: false,
                  attendeesData: [
                  ],
                },


                
              }
              arr.push(activityObj)
            }

            console.log('arr ===== ', arr)

            // // Allocation parsing function here
            // let finalResult = this.allocationParsing(data)
            
            this.data = arr
            this.tempDataX = arr

            this.loading = false
        });
    },
    repeatOnWeekDay(week, index) {

      if(this.weekDays[index].checked) {
        this.weekDays[index].checked = false
      }else {
        this.weekDays[index].checked = true
        this.data[this.editedIndex].dateOfActivityArr[0].repeatOn = [...this.weekDays]
      }
      
    },
    repeatOnWeekDayChild(week, index) {

      if(this.weekDays[index].checked) {
        this.weekDays[index].checked = false
      }else {
        this.weekDays[index].checked = true
        this.tempDateOfActivity.repeatOn = [...this.weekDays]
      }
      
    },
    confirmNewDate() {

      const newObj = this.tempDateOfActivity
      newObj.id = Math.floor(Math.random() * 100)


      this.data[this.key].dateOfActivityArr.push(newObj)
      console.log(this.data[this.key].dateOfActivityArr)

      this.tempDateOfActivity = {
        startdate: '2020/06/14',
        endDate: '2020/06/24',
        time1: '00:00',
        time2: '00:00',
        location: 'Location...',
        selectDayWeekMonth: '',
        selectWeekDay: '',
        note: 'Note...',
        selectDayWeekMonth: '',
        selectWeekDay: '',
        repeats: { id: 1, label: 'Daily', value: 'Daily', clean: 'Day' },
        repeatOn: [],
        repeat: false,
        multi: false,
        child: true,
        attendies: false,
      }

    },
  },
  created() {
      this.getActivityByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
      this.getAdditionalInfo(1)
  },
  computed: {
    school() {
      return this.$route.query.name
    },


    popupAmount() {
        let attendees = this.editedItem.noAttendingArr.attendeesData,
            amount = 0;

        for(let i=0; i<attendees.length; i++) {
          if(attendees[i].amount != '') {
            amount += parseFloat(attendees[i].amount)
          }
        }
        
        return parseFloat(amount)
    },
    filteredList() {
        let searchString = this.attendingSearch.toLowerCase();
        let x = this.attendingTeacherList.filter(item => item.name.toLowerCase().includes(searchString));
        this.teachersSearchLength = x.length
        return x
    },
    // timeTotal() {
    //   let t1 = parseInt(this.editedItem.dateOfActivityArr.time1.substring(0,2))
    //   let t2 = parseInt(this.editedItem.dateOfActivityArr.time2.substring(0,2))

    //   let result = t2 - t1
    //   console.log(t2, t1, result)
    //   return result
    // },
    // totalMinute() {
    //   let m1 = parseInt(this.editedItem.dateOfActivityArr.time1.substring(3,5));
    //   let m2= parseInt(this.editedItem.dateOfActivityArr.time2.substring(3,5));

    //   let m1res = 0, m2res = 0;

    //   if(m1 != 0) {
    //     m1res = 60 - m1
    //   }

    //   if(m2 != 0) {
    //     m2res = 60 - m2
    //   }  

    //   let result =  m1res - m2res

    //   return result
    // },
    // totalPD() {
    //   let pd = 0;
    //   for(let i=0; i<this.data.length; i++) {
    //     let amount = parseFloat( this.data[i].amount )
    //     pd += amount
    //   }
    //   return pd.toFixed(2)
    // },
    // totalFE() {
    //   return Math.floor(Math.random() * 1000).toFixed(2)
    // },
    // usedPD() {
    //   return Math.floor(Math.random() * 1000).toFixed(2)
    // },
    // usedPE() {
    //   return Math.floor(Math.random() * 1000).toFixed(2)
    // },
    // remainingPD() {
    //   return Math.floor(Math.random() * 1000).toFixed(2)
    // },
    // remainingFE() {
    //   return Math.floor(Math.random() * 1000).toFixed(2)
    // },

  },
  watch: {
    show_attending_dialog(val) {
      console.log('date of activity popup')
      if(val) {
        let attendesData = this.editedItem.noAttendingArr.attendeesData
        for(let i=0; i<attendesData.length; i++) {
          const index = this.teachersTypeArr.indexOf(attendesData[i].type)
          this.teachersTypeArr[index].disable = true
        }
      }else {
        for(let i=0; i<this.teachersTypeArr.length; i++) {
          this.teachersTypeArr[i].disable = false
        }
        // for(let i=0; i<this.weekDays.length; i++) {
        //   this.weekDays[i].checked = false
        // }
      }
    },
    show_dialog_child(val) {
      console.log('date of activity popup child')
      if(val) {

      }else {
        // for(let i=0; i<this.weekDays.length; i++) {
        //   this.weekDays[i].checked = false
        // }
      }
    }
  },
}
</script>