<template>
    <q-table
      :data="data" 
      :columns="columns"
      :visible-columns="visibleColumns"
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

      <q-input
        :disable="showRemainingBalance"
        class="q-mr-md"
        outlines
        dense
        v-model="filter"
        placeholder="Search"
        @keyup="keyUpFilter" 
        @keydown="keyDownFilter"
        style="min-width: 250px; max-width: 250px"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      
      <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
        dense outlines 
        v-model="schoolYear" 
        :options="schoolYears" 
        label="School year" 
        @input="filterActivity"
        :disable="showRemainingBalance"
      >
        <template v-if="schoolYear" v-slot:append>
          <q-icon name="cancel" @click.stop="schoolYear = '', filterActivity()" class="cursor-pointer" />
        </template>

      </q-select>

      <q-select
        :disable="showRemainingBalance" 
        @input="filterActivity"
        class="q-mr-md"
        style="min-width: 250px; max-width: 250px"
        dense
        outlines
        label="Status"
        :options="typeArr"
        v-model="typeModel"
      >
        <template v-if="typeModel" v-slot:append>
          <q-icon name="cancel" @click.stop="typeModel = '', filterActivity()" class="cursor-pointer" />
        </template>
        
      </q-select>

      <q-btn square :disabled="addNew"
       class="q-mr-md" style="background-color: #546bfa" text-color="white" icon="add" 
      @click="addNew = true, addNewRow()" no-caps>Add</q-btn>


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

      <q-checkbox v-model="showRemainingBalance" label="Show remaining balance" />



      <div class="q-pa-sm q-gutter-sm">

          <q-dialog  v-model="showDateOfActivityTable">
            <q-card style="width: 950px; max-width: 80vw;">

              <q-card-section class="row" style="display: flex; align-items: center;">
                <span class="text-h6" style="line-height: 2.5rem">Date of activity</span>
              </q-card-section>

              <q-separator />

              <q-card-section style="max-height: 60vh" class="scroll">

                <DateOfActivityTable  
                  :tableColumns="dateOfActivityColumns" 
                  :dateOfActivity="dateOfActivityTableData" 
                />

                  <div class="q-mt-md q-mb-md">
                    <q-btn icon="add" color="blue" round @click="addDate(index, item)"/>
                  </div>

              </q-card-section>

              <q-card-actions class="row justify-end">
                <div>
                  <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                </div>
              </q-card-actions>
        

            </q-card>
          </q-dialog>

          <q-dialog v-model="show_dialog_child">
            <q-card>

              <q-card-section class="row" style="width: 500px; display: flex; align-items: center;">
                <q-icon name="calendar_today" class="text-orange q-mr-sm" style="font-size: 2em"/>
                <span class="text-h6" style="line-height: 2.5rem">Schedule Activity</span>
              </q-card-section>

        
              <q-card-section
                style="max-height: 60vh"
                class="scroll q-pt-none q-pb-none q-pr-none q-pl-none"
              >
                <div class="row">

                  <div class="col-12">
                    <div class="q-mt-sm q-mb-md">

                      <q-separator class="q-mt-md q-mb-md"/>

                      <div class="row q-mt-lg">

                        <div class="col-3 q-pr-md row items-center justify-end">Start date:</div>
                          <div class="col-3">
                            <q-input :readonly="tempDateOfActivity.is_full_day" outlined dense v-model="tempDateOfActivity.startdate">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date 
                                    :disabled="tempDateOfActivity.is_full_day" 
                                    :readonly="tempDateOfActivity.is_full_day" 
                                    v-model="tempDateOfActivity.startdate" 
                                    >
                                    <!-- :options="optionsFn" -->
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
                            <q-input :readonly="tempDateOfActivity.is_full_day" outlined dense v-model="tempDateOfActivity.endDate">
                              <template v-slot:append>
                                <q-icon name="event" class="cursor-pointer">
                                  <q-popup-proxy transition-show="scale" transition-hide="scale">
                                    <q-date 
                                      :disabled="tempDateOfActivity.is_full_day" 
                                      :readonly="tempDateOfActivity.is_full_day" 
                                      v-model="tempDateOfActivity.endDate" 
                                    >
                                    <!-- :options="optionsFn" -->
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
                          <q-input :readonly="tempDateOfActivity.is_full_day"  outlined dense v-model="tempDateOfActivity.time1">
                            <template v-slot:append>
                              <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-time :disabled="tempDateOfActivity.is_full_day" :readonly="tempDateOfActivity.is_full_day" v-model="tempDateOfActivity.time1">
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
                          <q-input :readonly="tempDateOfActivity.is_full_day"  outlined dense v-model="tempDateOfActivity.time2">
                            <template v-slot:append>
                              <q-icon name="access_time" class="cursor-pointer">
                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                  <q-time :disabled="tempDateOfActivity.is_full_day" :readonly="tempDateOfActivity.is_full_day" v-model="tempDateOfActivity.time2">
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
                          <span class="q-ml-md"><q-checkbox v-model="tempDateOfActivity.is_full_day" label="All day event" /></span>
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
                                v-for="(week, i) in weekDays" :key="i"
                                :color=" week.checked ? 'amber' : 'yellow' " 
                                glossy
                                text-color="black" 
                                push 
                                :label="week.label.charAt(0)"
                                @click="repeatOnWeekDayChild(i)"
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
                            :pagination.sync="paginationAttendee"
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

                                <q-td key="attendeeList" style="width: 100px" :props="props" class="row">

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
                                      v-on:keyup.enter="openAddParticipantPopup"
                                      v-model="attendingSearch"
                                      label="Search" 
                                      class="q-mt-lg q-mb-sm">

                                      <template v-slot:prepend>
                                        <q-icon name="search" />
                                      </template>

                                    </q-input>

                                    <q-list bordered separator class="q-mb-lg" style="height: 195px; overflow-y: scroll;">

                                      <q-item
                                        v-for="(teacher, index) in attendingTeacherList" :key="index">
                                        <q-item-section>

                                          <div @click="addAttendee(teacher)" class="w-100 row justify-between items-center">
                                            <div class="text-subtitle2">
                                              {{ teacher.first_name }}
                                              {{ teacher.last_name }}
                                              {{ teacher.email }}
                                            </div>
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

                                                                  
                                    
                                    </q-list>

                                </q-td>
                              </q-tr>

                            </template>

                          </q-table>



                      <q-btn 
                        v-if="editedItem.noAttendingArr.attendeesData.length < teachersTypeArr.length"
                        round 
                        dense 
                        color="secondary" 
                        icon="add" 
                        class="q-mt-md"  
                        @click="addAttRow"
                      />

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
                  <q-btn v-if="!isEditSchedule" flat label="Confirm" color="primary"  @click="confirmNewDate"></q-btn>
                  <q-btn v-else flat label="Save" color="primary"  @click="editSchedule"></q-btn>
                </div>
              </q-card-actions>
        

            </q-card>
          </q-dialog>

          <q-dialog v-model="show_attending_dialog">
             <q-card style="width: 500px; max-width: 80vw;">

                <q-card-section 
                  class="row justify-start items-center"
                >
                  <q-icon class="q-mr-sm" name="people_alt"  color="green" style="font-size: 1.5em"/>
                  <div class="text-h6">Activity Attendees</div>
                </q-card-section>

                <q-card-section>
                  <div>

                    <q-table
                      :data="editedItem.noAttendingArr.attendeesData"
                      :columns="attendeesColumn"
                      row-key="id"
                      hide-bottom
                      :pagination.sync="paginationAttendee"
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

                          <q-td key="attendeeList" style="width: 100px" :props="props" class="row">

                            <div 
                            @click="props.expand = !props.expand, getParticipiant(props.row)" 
                            class="cursor-pointer" >
                              <q-btn color="blue" round dense icon="perm_identity"/>
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
                                v-on:keyup.enter="openAddParticipantPopup"
                                v-model="attendingSearch"
                                label="Search" 
                                class="q-mt-lg q-mb-sm"
                                @input="searchParticipant"
                              >

                                <template v-slot:prepend>
                                  <q-icon name="search" />
                                </template>

                              </q-input>

                              <q-list bordered separator class="q-mb-lg" style="height: 195px; overflow-y: scroll;">

                                <q-item 
                                  
                                  v-for="(teacher, index) in attendingTeacherList" :key="index">
                                  <q-item-section>
                                    <div @click="addAttendee(teacher)" class="w-100 row justify-between items-center">
                                      <div class="text-subtitle2">
                                        {{ teacher.first_name }}
                                        {{ teacher.last_name }}
                                        {{ teacher.email }}
                                      </div>
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

                                                                
                                <div v-if="!attendingTeacherList.length">
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
                    <q-btn 
                      v-if="editedItem.noAttendingArr.attendeesData.length < teachersTypeArr.length"
                      round 
                      dense 
                      color="secondary" 
                      icon="add" 
                      class="q-mt-md"  
                      @click="addAttRow"
                    />

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

          <q-dialog v-model="addParticipantModal">

            <q-card style="width: 550px; max-width: 80vw;">

              <q-card-section class="row" style="width: 500px; display: flex; align-items: center;">
                <q-icon name="perm_identity" class="text-blue q-mr-sm" style="font-size: 2em"/>
                <span class="text-h6" style="line-height: 2.5rem">Create New Attendee</span>
              </q-card-section>

        
              <q-card-section
                style="max-height: 60vh"
                class="scroll q-pt-none q-pb-none"
              >
                <div class="row">

                  <div class="col-12">
                    <q-input outlined v-model="addNewAttendee.firstName" label="First Name" />
                  </div>

                  <div class="col-12 q-mt-sm">
                    <q-input outlined v-model="addNewAttendee.lastName" label="Last Name" />
                  </div>

                  <div class="col-12 q-mt-sm">
                    <q-input outlined v-model="addNewAttendee.email" label="Email" />
                  </div>
                
                </div>
              </q-card-section>

              <q-card-actions class="row justify-end">
                <div>
                  <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                  <q-btn flat label="Add" color="primary" @click="addParticipant"></q-btn>
                </div>
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
            @click="copyRowData(props.rowIndex)"
          >

            <q-td auto-width>
                <q-btn size="sm" 
                  flat
                  color="black"
                  @click="props.expand = !props.expand, openBottomSection(props.row, props.rowIndex)" 
                  :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
                >
                </q-btn>
            </q-td>

            <q-td key="online" :props="props" @click="copyRowData(props.rowIndex)">

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
                
              <q-popup-edit 
                v-model="props.row.online_uni" 
                title="Online" buttons>
                <q-select 
                  @input="detectChange(props.rowIndex)" 
                  dense 
                  outlined 
                  v-model="props.row.online_uni" 
                  :options="online"
                />
              </q-popup-edit>

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

                <q-icon v-else-if="props.row.approval_type_uni.label == 'Pre Approval'" name="how_to_reg" color="blue" style="font-size: 1.5em">
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
                              :disable="props.row.approval_type_uni.label !== 'Pre Approval'" 
                              class="q-mt-md q-mb-lg" dense outlined v-model="props.row.approver" 
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
                <span @click="editDateOfActivity(props.row, props.rowIndex)" >
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

            <q-td key="noAttending" :props="props" @click="copyRowData(props.rowIndex)">
                
                <div @click="editAttendingitem(props.row)">

                  {{ props.row.no_attending }}
                  <span class="q-ml-sm">
                      <q-icon name="people_alt" color="green" style="font-size: 1.5em"/>
                  </span>

                </div>
            </q-td>

            <q-td key="amount" :props="props" 
            @click="copyRowData(props.rowIndex)">
                <div>$ {{ props.row.amount }}</div>
                <q-popup-edit v-model="props.row.amount" title="Update amount" buttons>
                  <q-input @input="detectChange(props.rowIndex)" type="text" 
                  v-model="props.row.amount" dense autofocus />
                  <q-input @input="detectChange(props.rowIndex)" v-model="props.row.percentage"  type="number"  :label="props.row.type_uni.label + ' Percentage' " dense autofocus/>
                </q-popup-edit>
            </q-td>

            <q-td key="type" :props="props" @click="copyRowData(props.rowIndex)">

                <q-chip 
                  square color="green" 
                  text-color="white" 
                  v-if="props.row.type_uni.name == 'PD'"
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
                <div>$ {{ (parseFloat(props.row.amount) + parseFloat(((props.row.amount * props.row.percentage) / 100))).toFixed(2) }}</div>
            </q-td>

            <q-td key="RemainingBalance" :props="props">
                <div>
                  $ <span :class=" props.row.remainingBalance > 0 ? 'text-positive' : 'text-negative' ">{{ (props.row.remainingBalance).toFixed(2) }}</span>
                </div>
            </q-td>

            <q-td key="actions" :props="props" style="min-width: 132px">
              
              <div v-if="props.row.changed">

                <q-btn
                  @click="cancellChange(props.rowIndex)"
                  class="q-mr-sm"
                  icon="cancel"
                  color="orange" 
                  size=sm 
                  no-caps
                  round 
                >
                  <q-tooltip 
                      anchor="top middle" self="bottom middle" :offset="[10, 10]"
                      transition-show="flip-right"
                      transition-hide="flip-left"
                  >
                    <strong>Cancel</strong>
                  </q-tooltip>
                </q-btn>
                
                <q-btn
                  @click="editActivity(props.rowIndex)"
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

              </div>

              <div v-if="props.row.showEditButton && !props.row.changed">
                <q-btn 
                  v-show="props.row.showEditButton && !props.row.changed"
                  class="q-mr-sm"
                  icon="content_copy"
                  color="orange" 
                  @click="addNew = true, duplicate = true, copyRow(props.row, props.rowIndex)"
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
              </div>
              
                <!-- <q-btn 
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
                </q-btn> -->

            </q-td>

          </q-tr>

          <q-tr v-show="props.expand" 
          :props="props">
            <q-td colspan="100%">
                <div class="q-mt-md">
                <div class="row">

                    <div class="col-7 q-mr-lg">

                      <div class="text-subtitle2 q-mb-md">Date of activity:</div>

                      <q-table
                        class="q-mb-md no-shadow border"
                        :data="props.row.dateOfActivityArr"
                        :columns="dateOfActivityColumns"
                        row-key="id"
                        hide-bottom
                        :pagination.sync="paginationDate"
                      >
                        <template v-slot:body="props">
                          <q-tr :props="props" @click="openEditSchedulePopup(props.row)">

                            <q-td key="startdate" :props="props">
                              <span class="q-mr-md">{{ props.row.startdate }}</span>
                              <span>{{ props.row.time1 }}</span>
                            </q-td>

                            <q-td key="endDate" :props="props">
                              <span class="q-mr-md">{{ props.row.endDate }}</span>
                              <span>{{ props.row.time2 }}</span>
                            </q-td>

                            <q-td key="location" 
                            style="white-space: initial;width: 230px; max-width: 230px;"
                            :props="props">
                              <span class="inline-span">
                                {{ props.row.location }}
                              </span>
                            </q-td>
                            
                            <q-td key="repeats" :props="props">
                              {{ props.row.repeats.label }}
                            </q-td>

                            <q-td key="repeatEvery" :props="props">
                              {{ props.row.repeatEvery }}
                            </q-td>

                            <q-td key="repeatOn" :props="props" style="white-space: initial;width: 230px; max-width: 230px;">
                                <span class="inline-span">{{ props.row.repeatsOn }}</span>
                            </q-td>

                            <q-td key="note" :props="props">
                              <!-- {{ props.row.note }} -->
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

                            <q-td key="actions" :props="props">
                              <q-btn
                                v-if="props.row.child"
                                @click.stop="openDeleteDate(props.row, props.rowIndex)" 
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
                        <q-btn icon="add" color="blue" round @click="addDate(props.pageIndex, props.row)"/>
                      </div>

                    </div>
                </div>

                <div class="row">

                    <div class="col-3">
                      <div class="text-subtitle2">Attendees:</div>
                      
                      <div 
                        v-if="editedItem.noAttendingArr.attendeesData.length"
                        @click="editAttendingitem(props.row)"
                        class="cursor-pointer q-mt-md"
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
                      <q-input class="q-mt-md" dense outlined type="textarea" v-model="props.row.note" readonly />
                      <q-popup-edit v-model="props.row.note" title="Update notes" buttons>
                          <q-input type="textarea" v-model="props.row.note" @input="detectChange(props.rowIndex)"
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

import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import DateOfActivityTable from './DateOfActivityTable';

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
let typingTimer
let doneTypingInterval = 500

export default {
components: {
  DateOfActivityTable
},
props: {
  barInfo: {
    required: true
  }
},
data() {
  return {

    totalPDremainder: this.barInfo.totalsAmount.PD,
    totalFEremainder: this.barInfo.totalsAmount.FE,
    final: false,
    isEditSchedule: false,

    ////////////////////////////
    showRemainingBalance: false,
    detectChangeOldData: {},
    tab: '1',
    pages: 1,
    pagination: { rowsPerPage: 10 },
    paginationAttendee: { rowsPerPage: 100 },
    paginationDate: { rowsPerPage: 100 },
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
    // numbersX: '',
    // selectOptionsNumbersX: ['1x', '2x', '3x', '31x'],
    // selectDayWeekMonth: "",
    // selectOptionsDayWeekMonth: [],
    // time1: '00:00',
    // time2: '00:00',


    show_dialog: false,
    show_dialog_child: false,
    show_attending_dialog: false,
    showDateOfActivityTable: false,

    splitActivity: false,
    confirmAttendeeModal: false,
    addNew: false,
    duplicate: false,

    approval : [],
    status : [ 
    {
      id: 1,
      label: "Active"
    }, 
    {
      id: 2,
      label: "Canceled"
    }
    ],
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

    optionsApp: [],
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
        label: "Actions",
        field: "attendeeList",
        sortable: true
      },
    ],
    attendeesData: [],

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
      // {
      //   name: "time1",
      //   align: "left",
      //   label: "Start Time",
      //   field: "time1"
      // },
      // {
      //   name: "time2",
      //   align: "left",
      //   label: "End Time",
      //   field: "time2"
      // },
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
        // field: "PDActivity",
        // field: row => row.name,
        // format: val => `${val}`,
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
        align: "left",
        label: "Actions",
        field: "actions"
      }
    ],
    data: [],
    tempDataX: [],

    visibleColumns: [
      "toggle",
      "online",
      "provider", 
      "status", 
      "approvals",
      "PDActivity", 
      "dateOfActivity", 
      "noAttending",
      "amount",
      "type",
      "grossPD",
      "actions"
    ],


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
    schoolYears: [],
    filter: "",
    options: [
      'Professional Development', 
      'Materials'
    ],
    typeModel: '',

    attendingTeacherList: [
    ],
    attendingSearch: '',
    teachersSearchLength: 0,

    optionsSupplier: [],
    optionsSupplierForFilter: [],

    item: '',
    teacherItem: {},
    attendeeItem: {},


    confirm: false,
    confirmDate: false,
    confirmTeacherModal: false,
    addParticipantModal: false,
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
    teachersTypeArr: [],
    // typeArr: ['PD', 'FE'],
    typeArr2: ['PD', 'M'],
    typeArr3: ['PD', 'I'],
    typeArr4: ['WR', 'SH', 'PD', 'TI'],
    typeEssr: ['PD', 'M', 'S'],
    typeArr: [],
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
      note: 'Note...',
      repeatEvery: 0,
      repeats: { id: 1, label: 'Daily', value: 'Daily', clean: 'Day' },
      repeatOn: [],
      repeat: false,
      child: true,
      attendies: false,
      is_full_day: false,
    },
    key: null,
    index: null,
    dateOfActivityTableData: [],
    addNewAttendee: {
      firstName: '',
      lastName: '',
      email: ''
    },
    reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,

  };
  },
  methods: {
    optionsFn (date) {
      // let start = this.editedItem.dateOfActivityArr[0].startdate
      // let end = this.editedItem.dateOfActivityArr[0].endDate
      // return date >= '2020/06/14' && date <= '2020/06/25'
    },
    detectChange(index) {

      this.editedItem = this.tempDataX[index]
      console.log('detectChange function', this.editedItem)
      
      let d = JSON.parse(oldObject)
      // let d = oldObject
      let f = JSON.stringify(this.data[index])
          f = JSON.parse(f)

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
    getToday() {
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      return year + "-" + month + "-" + day;
    },
    addNewRow() {

      let date = this.getToday()

      const obj  = {
        remainingBalance: 0,
        id: 0,
        online_uni: {
            id: 2,
            label: "On Site"
        },
        provider: {
          id: 999,
          label: 'Unknown'
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
          label: 'Needs Assessment'
        },
        activity: '',
        activity_date: 'TBD',
        no_attending: '',
        amount: 0,
        type_uni: {
          id: 1,
          label: 'PD'
        },
        percentage: 12,
        note: '',
        approver: '',
        charge: 0,
        repeat: false,
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
        dateOfActivityArr: [{
          location: '',
          selectDayWeekMonth: 'selectDayWeekMonth',
          repeatEvery: 1,
          note: 'Note...',
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

        changed: true,
        showEditButton: false,
      }

      this.data.unshift(obj)
      this.editedItem = obj

    },
    selfTitleTeacherCount(count) {
      console.log('selfTitleTeacherCount...', count )
      this.editedItem.noAttendingArr.teacherCount = count
      console.log(this.editedItem.noAttendingArr.attendeesData.no)

    },
    changeType(val) {
      const index = this.teachersTypeArr.indexOf(val)
      this.teachersTypeArr[index].disable = true
      console.log('changeType', val)
    },
    openAddParticipantPopup() {
      this.addParticipantModal = true
      
      this.addNewAttendee.firstName = ''
      this.addNewAttendee.lastName = ''
      this.addNewAttendee.email = ''

      let text = this.attendingSearch.split(" ")
      for(let i=0; i<text.length; i++) {

        if (this.reg.test(text[i])) {
          this.addNewAttendee.email = text[i]
        } else {
          if(i == 0) {
            this.addNewAttendee.firstName = text[0]
          }
          if(i == 1) {
            this.addNewAttendee.lastName = text[1]
          }
        }



      }
      
    },
    addParticipant() {

      let obj = {
        searchParties: this.attendingSearch,
        summary_id: this.attendeeItem.id, 
        type_id: this.attendeeItem.type.id, 
        first_name: this.addNewAttendee.first_name,
        last_name: this.addNewAttendee.last_name,
        email: this.addNewAttendee.email,
      }

      const conf = {
        method: 'POST',
        url: config.addNewParticipant + this.$route.params.id + '/' + this.item.id,
        headers: {
          Accept: 'application/json',
        },
        data: obj
      }

      axios(conf).then(res => {
            
            this.$q.notify({
              message: 'Participant added!',
              type: 'positive',
            })

            setTimeout(()=>{
              this.addParticipantModal = false
            }, 1000)
      })

    },

    openEditSchedulePopup(schedule) {
      console.log('schedule', schedule)

      this.isEditSchedule = true
      
      if(!schedule.is_full_day) {
        schedule.is_full_day = false
      }
      
      if(!schedule.repeat) {
        schedule.repeat = false
      }

      this.tempDateOfActivity = schedule
      this.show_dialog_child = true

      console.log('tempDateOfActivity', this.tempDateOfActivity)

    },
    // searchEnter() {

    //   if(!this.attendingTeacherList.length) {

    //     let obj = {
    //       searchParties: this.attendingSearch,
    //       summary_id: this.attendeeItem.id, 
    //       type_id: this.attendeeItem.type.id, 
    //     }

    //     const conf = {
    //       method: 'POST',
    //       url: config.addParticipant + this.$route.params.id + '/' + this.item.id,
    //       headers: {
    //         Accept: 'application/json',
    //       },
    //       data: obj
    //     }

    //     axios(conf).then(res => {
    //           console.log('Participant === ', res.data)
    //           this.attendingTeacherList.push(res.data.participant)
    //           this.$q.notify({
    //             message: 'Participant added!',
    //             type: 'positive',
    //           })
    //     })

    //     this.attendingSearch = ''

    //   }
    // },
    addAttendee(teacher) {

      console.log(teacher, 'searchPartiesIdsearchPartiesIdsearchPartiesId')

        let obj = {
          searchPartiesId: teacher.id,
          summary_id: this.attendeeItem.id, 
          type_id: this.attendeeItem.type.id, 
        }

        const conf = {
          method: 'POST',
          url: config.addParticipant + this.$route.params.id + '/' + this.item.id,
          headers: {
            Accept: 'application/json',
          },
          data: obj
        }

        axios(conf).then(res => {
            this.$q.notify({
              message: 'Participant added!',
              type: 'positive',
            })
        })
    },
    searchParticipant() {
      console.log('attendingSearch', this.attendingSearch)
      // searchParticipant + schoold ID?searchParties=test

      const conf = {
        method: 'GET',
        url: config.searchParticipant + this.$route.params.id + '?searchParties=' + this.attendingSearch,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        this.attendingTeacherList = res.data.participants
        console.log('searchParticipant', res.data.participants)
      })
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
    editDateOfActivity(item, index) {

        this.item = item
        this.index = index

        console.log('this.item ',this.item)
        console.log('this index', this.index)
        
        // this.editedIndex = this.data.indexOf(item);
        // this.editedItem = Object.assign({}, item);
        this.showDateOfActivityTable = true
        // this.dateOfActivityTableData = this.data[index].dateOfActivityArr
        // console.log('0-0-0-0-', this.data[index])
        // console.log('index', index)
        // console.log(item.id)
        this.getSchedules(item.id, index)

        // this.show_dialog = true;

        // console.log('editDateOfActivity', this.editedItem)

    },
    confirmDateOfActivity() {

      if (this.editedIndex > -1) {
        Object.assign(this.data[this.editedIndex], this.editedItem);
      } 

      this.close()

    },
    editAttendingitem(item) {

      this.item = item

      this.editedIndex = this.data.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.show_attending_dialog = true;

      this.getAttdeesById(item.id)

    },
    confirmNoAttending() {

      let item = this.item

      let attendees = this.editedItem.noAttendingArr.attendeesData;
      let attendeesArr = []

      for(let i=0; i<attendees.length; i++) {
        console.log('doc', attendees[i])
        let obj = {
          count: attendees[i].no,
          type_id: attendees[i].type.id,
          is_all: attendees[i].all
        }
        attendeesArr.push(obj)
      }


      const conf = {
          method: 'POST',
          url: config.addAttendee + item.id,
          headers: {
            Accept: 'application/json',
          },
          data: attendeesArr
      }

      axios(conf).then(res => {
        console.log('response === ', res.data)
            this.$q.notify({
              message: 'Attendees added!',
              type: 'positive',
            })
      })

      // if (this.editedIndex > -1) {
      //   Object.assign(this.data[this.editedIndex], this.editedItem);
      // } 
      // this.close()

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
    openDeleteModal(row) {
      
      this.item = row
      this.confirm = true
    },
    openDeleteDate(item, key) {
      this.key = key
      this.item = item
      this.confirmDate = true
    },
    deleteDate() {

      console.log(this.key)
      console.log(this.data[this.index].dateOfActivityArr[this.key])

      let item = this.item

      const conf = {
          method: 'DELETE',
          url: config.removeSchedule + item.id,
          headers: {
            Accept: 'application/json',
          }
      }

      // console.log( this.data[this.key] )

      axios(conf).then(res => {

        const index = this.data[this.index].dateOfActivityArr.indexOf(item)
        console.log('index', index);

        this.data[this.index].dateOfActivityArr.splice(index, 1)
          this.$q.notify({
            message: 'Deleted!',
            type: 'positive',
          })

      })
    
    },
    deleteItem() {

        let item = this.item

        const conf = {
            method: 'DELETE',
            url: config.deleteActivity + item.id,
            headers: {
                Accept: 'application/json',
            }
        }

        axios(conf).then(res => {
          const index = this.data.indexOf(item)
          this.data.splice(index, 1)
            this.$q.notify({
              message: res.data,
              type: 'positive',
            })
        })
    },
    openDeleteTeacherModal(item) {
      this.teacherItem = item
      this.confirmTeacherModal = true
    },
    openAttendeDeleteModal(item) {
      this.item = item
      this.confirmAttendeeModal = true
    },
    deleteAttendee() {

      let item = this.item
      // this.editedItem.noAttendingArr.attendeesData.splice(index, 1)

      const conf = {
          method: 'DELETE',
          url: config.removeAttendee + item.id,
          headers: {
            Accept: 'application/json',
          }
      }

      axios(conf).then(res => {
        const index = this.editedItem.noAttendingArr.attendeesData.indexOf(item)
        this.editedItem.noAttendingArr.attendeesData.splice(index, 1)
      })

      // Return Type to Enabled
      const typeIndex = this.teachersTypeArr.indexOf(item.type)
      this.teachersTypeArr[typeIndex].disable = false


    },
    deleteTeacherItem() {

        let item = this.item
        console.log('item', item)

        const conf = {
          method: 'DELETE',
          url: config.deleteAttendyParticipant + this.teacherItem.id + '/' + item.id,
          headers: {
              Accept: 'application/json',
          }
        }

        axios(conf).then(res => {

          const index = this.attendingTeacherList.indexOf(item)
          this.attendingTeacherList.splice(index, 1)

          this.$q.notify({
            message: 'Deleted!',
            type: 'positive',
          })

        })

    },
    addAttRow() {
      let obj = {  
        id: Math.floor(Math.random() * 100),
        no: 0,
        type: '',
        all: false,
        attendeeList: 'View'
      }
      this.editedItem.noAttendingArr.attendeesData.push(obj)
      console.log(this.editedItem.noAttendingArr.attendeesData)
    },
    addDate(index, row) {

      console.log('row', row, 'index', index)

      this.show_dialog_child = true
      this.key = index
      this.item = row

    },
    // Parsing activity
    activityParsing(data, final) {

      console.log('activity parsing 000000')

      let arr = []
      for(let i=0; i<data.length; i++) {

        let sd = data[i].start_date,
            ed = data[i].end_date,
            fullDate = sd + ' - ' + ed;

        let charge;

        if(data[i].cost != null) {
          charge = parseFloat(data[i].cost) + ((parseFloat(data[i].cost) * parseFloat(data[i].upcharge_percentage)) / 100 )
        }else {
          charge = 0
        }

        if(data[i].type.id == 1) {
          // PD
          if(final == 1) {
            this.totalPDremainder = this.totalPDremainder - charge
          }else {
            this.totalPDremainder = (this.totalPDremainder / 2) - charge
          }
        }else {
          // FE
          if(final == 1) {
            this.totalFEremainder = this.totalFEremainder - charge
          }else {
            this.totalFEremainder = (this.totalFEremainder / 2) - charge
          }
        }

        // PD = 1 totalPDremainder
        // FE = 2 totalFEremainder
        let isOnline;
        if(data[i].is_online == 1) {
          isOnline = 'Online'
        }else {
          isOnline = 'On Site'
        }

    
        let activityObj = {
          // remainingBalance: charge,
          remainingBalance: data[i].type.id == 1 ? this.totalPDremainder : this.totalFEremainder,
          id: data[i].id,
          online_uni: {
              id: data[i].is_online,
              label: isOnline
          },
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
          activity: data[i].activity_name,
          activity_date: sd == null ? 'TBD' : fullDate,
          no_attending: data[i].attendySummary.count,
          amount: data[i].cost != null ? data[i].cost : 0,
          percentage: parseInt(data[i].upcharge_percentage),
          type_uni: {
            id: data[i].type.id,
            label: data[i].type.name,
            name: data[i].type.abbreviation
          },
          note: data[i].activity_note,
          approver: '',
          charge: data[i].total_cost,
          repeat: data[i].has_recurring != null ? data[i].has_recurring : false,
          multi: data[i].has_multi_schedule != null ? data[i].has_multi_schedule : false,
          attendies: false,

          changed: false,
          showEditButton: true,
          

          dateOfActivityArr: [
          ],

          noAttendingArr: {
            attendees: '',
            amount: 0,
            split: false,
            attendeesData: [
            ],
          }
        }

        arr.push(activityObj)

      }

      return arr

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

            let data = res.data.activity
            this.pages = res.data.pagesCount

            let final = res.data.isSchoolAllocationFinal
            this.final = final


            if(res.data.isSchoolAllocationFinal == 1) {
              this.$emit('final', true)
            }else {
              this.$emit('final', false)
            }

            let finalResult = this.activityParsing(data, final)

            this.data = finalResult
            this.tempDataX = finalResult

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
    repeatOnWeekDayChild(index) {

      if(this.weekDays[index].checked) {
        this.weekDays[index].checked = false
      }
      else {
        this.weekDays[index].checked = true
        this.tempDateOfActivity.repeatOn = [...this.weekDays]
      }
      console.log(this.tempDateOfActivity)
      
    },
    confirmNewDate() {

      console.log('confirm new date')
      console.log('this.item ',this.item)
      

      const tempData = this.tempDateOfActivity
      // console.log('New obj : ', tempData)

      let repeatOnArr = []
      if(tempData.repeatOn.length) {
        for(let i=0; i<tempData.repeatOn.length; i++) {
          if(tempData.repeatOn[i].checked) {
            repeatOnArr.push(i)
          }
        }
      }


      let data = {
        start_date: tempData.startdate,
        end_date: tempData.endDate,
        start_time: tempData.time1,
        end_time: tempData.time2,
        is_full_day: tempData.is_full_day,
        is_recurring: tempData.repeat,
        recurrance_type_id: tempData.repeats.id,
        day_of_week: repeatOnArr,
        number_of_occurrences: tempData.repeatEvery,
        note: tempData.note,
        location: tempData.location,
      }

      const conf = {
          method: 'POST',
          url: config.addSchedule + this.item.id,
          headers: {
            Accept: 'application/json',
          },
          data: data
      }

      axios(conf).then(res => {

        this.getSchedules(this.item.id, this.key)

        this.show_dialog_child = false

        this.$q.notify({
            message: 'Schedule Added!',
            type: 'positive',
          })
            
          //   let schedule = res.data.schedule;
          //   console.log('res schedule', schedule)

          //   let obj = {
          //     id: schedule.id,
          //     startdate: schedule.start_date,
          //     endDate: schedule.end_date,
          //     time1: schedule.start_time,
          //     time2: schedule.end_time,
          //     location: schedule.location,

          //     repeats: {
          //       label: '',
          //     },

          //     repeatEvery: '',
          //     repeatOn: [],
          //     note: '',
          //     attendies: false,
          //     child: true
          //   }

          // this.data[this.key].dateOfActivityArr.push(obj)
          // this.dateOfActivityTableData.push(obj)
      })

    },
    editSchedule() {

      console.log('schedule id : ', this.tempDateOfActivity.id)
      console.log('activity id : ', this.item.id)

      const tempData = this.tempDateOfActivity
      console.log('tempData', tempData)
      let repeatOnArr = []

      if(tempData.repeatOn) {
        for(let i=0; i<tempData.repeatOn.length; i++) {
          if(tempData.repeatOn[i].checked) {
            repeatOnArr.push(i)
          }
        }
      }

      let data = {
        start_date: tempData.startdate,
        end_date: tempData.endDate,
        start_time: tempData.time1,
        end_time: tempData.time2,
        is_full_day: tempData.is_full_day,
        is_recurring: tempData.repeat,
        recurrance_type_id: tempData.repeats.id,
        day_of_week: repeatOnArr,
        number_of_occurrences: tempData.repeatEvery,
        note: tempData.note,
        location: tempData.location,
      }

      const conf = {
          method: 'PUT',
          url: config.editSchedule + this.tempDateOfActivity.id + '/' + this.item.id,
          headers: {
            Accept: 'application/json',
          },
          data: data
      }

      axios(conf).then(res => {

        this.getSchedules(this.item.id, this.index)
        this.show_dialog_child = false

        this.$q.notify({
            message: 'Schedule Edited!',
            type: 'positive',
          })

      });

    },
    getAtendeeTypes() {
        const conf = {
            method: 'GET',
            url: config.getAtendeeTypes,
            headers: {
              Accept: 'application/json',
            }
        }

        axios(conf).then(res => {

          let atendeeTypes = res.data.activityAttendyTypes;
          let atendeeArr = [];

          for(let i=0; i<atendeeTypes.length; i++) {
            
            let obj = {
              id: atendeeTypes[i].id,
              label: atendeeTypes[i].type,
              value: atendeeTypes[i].type,
              disable: false
            }
            atendeeArr.push(obj)
          }

          this.teachersTypeArr = atendeeArr;


        })
    },
    getAttdeesById(id) {

        this.editedItem.noAttendingArr.attendeesData = []

        const conf = {
            method: 'GET',
            url: config.getAttendeesById + id,
            headers: {
              Accept: 'application/json',
            }
        }

        axios(conf).then(res => {

          let attendees = res.data.attendySuumary

          for(let i=0; i<attendees.length; i++) {

            let obj = {  
              id: attendees[i].id,
              no: parseInt(attendees[i].count),
              type: {
                id: attendees[i].type.id,
                label: attendees[i].type.type,
                value: attendees[i].type.type,
                disable: true
              },
              all: attendees[i].is_all == 0 ? false : true,
              attendeeList: 'View'
            }

            for(let j=0; j<this.teachersTypeArr.length; j++) {
              if(this.teachersTypeArr[j].label == attendees[i].type.type) {
                this.teachersTypeArr[j].disable = true
              }
            }

            this.editedItem.noAttendingArr.attendeesData.push(obj)

          }
        })
    },
    cancellChange(index) {

      if(this.addNew && !this.duplicate) {

        this.data.splice(0, 1)
        this.addNew = false

      } else if(this.addNew && this.duplicate) {
          this.data.splice(index, 1)
          this.addNew = false
          this.duplicate = false
      } else {

        let d = JSON.parse(oldObject)
        Object.assign(this.data[index], d);
        this.data[index].changed = false

      }

    },
    editActivity(index) {

      console.log(this.editedItem)

      const editData = {
        supplier_id: this.editedItem.provider.id,
        activity_status_id: this.editedItem.status_uni.id,
        activity_approval_status_id: this.editedItem.approval_status_uni.id,
        activity_approval_type_id: this.editedItem.approval_status_uni.id,
        approver: this.editedItem.approver,
        activity_name: this.editedItem.activity,
        cost: this.editedItem.amount,
        allocation_type_categories_id: this.editedItem.type_uni.id,
        activity_note: this.editedItem.note,
        upcharge_percentage: this.editedItem.percentage,
        is_online: this.editedItem.online_uni.id,
      }

      if(this.addNew) {

          editData.school_id = this.$route.params.id
          editData.allocation_id = parseInt(this.tab)

          const conf = {
            method: 'POST',
            url: config.addActivity,
            headers: {
              Accept: 'application/json',
            },
            data: editData
          }

          axios(conf)
          .then(res => {

            this.$q.notify({
              message: 'Activity Added successfully!',
              type: 'positive',
            })

            this.data[index].changed = false
            this.data[index].showEditButton = true

            if (res.data.activity[0]) {
              this.data[index].id = res.data.activity[0].id
            }
            
            this.data[index].add = false

            this.addNew = false
            this.statusChanged = false

          })

      }else {

          const conf = {
            method: 'PUT',
            url: config.editActivity + this.editedItem.id,
            headers: {
              Accept: 'application/json',
            },
            data: editData
          }

          axios(conf)
            .then(res => {

              this.$q.notify({
                message: 'Activity edited successfully!',
                type: 'positive',
              })
              
              this.data[index].changed = false
              this.data[index].showEditButton = true

              this.data[index].id = res.data.activity[0].id
              this.data[index].add = false

              this.addNew = false
              this.statusChanged = false

            })
      }




      
    },
    getCategoryTypes(id) {

      const conf = {
        method: 'GET',
        url: config.getCategoryTypes + id,
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

        this.typeArr = typesArray
        console.log('2222222')
        console.log('2222222')
        console.log('2222222')
        console.log(res.data)
        console.log('2222222')
        console.log('2222222')
        console.log('2222222')

      })
    },
    getApprovals() {
      
      const conf = {
        method: 'GET',
        url: config.getApprovals,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        console.log('approvals', res.data)

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

        for(let i=0; i<approvalTypes.length; i++) {
          let obj = {
            id: approvalTypes[i].id,
            label: approvalTypes[i].name,
            value: approvalTypes[i].name,
          }
          typesArr.push(obj)
        }

        this.approval = statusArr
        this.optionsApp = typesArr
      })
    },
    getRcurranceTypes() {
        
        const conf = {
            method: 'GET',
            url: config.getRcurranceTypes,
            headers: {
              Accept: 'application/json',
            }
        }

        axios(conf).then(res => {

          let reccurance = res.data.recurranceType;
          let reccArr = [];
          
          for(let i=0; i<reccurance.length; i++) {

            let clean;
            
            switch(reccurance[i].recurrance_type) {
              case "Daily":
                clean = 'Day'
                break;
               case "Weekly":
                clean =  'Week'
                break;
              case "Monthly":
                clean =  'Month'
                break;
            }

            let obj = { 
              id: reccurance[i].id, 
              label: reccurance[i].recurrance_type, 
              value: reccurance[i].recurrance_type, 
              clean: clean
            }
            reccArr.push(obj)
          }
          this.selectOptionsDayWeekMonth = reccArr
          console.log('selectOptionsDayWeekMonth = ', this.selectOptionsDayWeekMonth)
        })
    },
    getSchedules(id, index) {
      // getSchedules
        const conf = {
          method: 'GET',
          url: config.getSchedules + id,
          headers: {
            Accept: 'application/json',
          }
        }

        axios(conf).then(res => {

console.log('mmmmm', this.data[index])

          let schedules = res.data.schedules;
          let schedulessArr = []

          for(let i = 0; i<schedules.length; i++) {

            let obj = {
              id: schedules[i].id,
              startdate: schedules[i].start_date,
              endDate: schedules[i].end_date,
              time1: schedules[i].start_time,
              time2: schedules[i].end_time,
              location: schedules[i].location,
              repeat: schedules[i].is_recurring == 1 ? true : false,
              is_full_day: schedules[i].is_full_day == 1 ? true : false,
              repeats: {
                id: parseInt(schedules[i].recurrance_type_id),
                label: schedules[i].type
              },
              repeatsOn: schedules[i].reapeatDays,
              repeatsId: schedules[i].repeatOn,
              repeatEvery: schedules[i].every,
              note: schedules[i].note,
              attendies: false,
              child: i != 0 ? true : false
            }

            schedulessArr.push(obj)

          }

          this.data[index].dateOfActivityArr = schedulessArr
          this.dateOfActivityTableData = schedulessArr

          console.log('#############')
          console.log(this.data[index].dateOfActivityArr)
          console.log(this.dateOfActivityTableData)
          console.log('#############')

        })
    },
    openBottomSection(row, index) {
      this.index = index
      this.item = row
      this.getAttdeesById(row.id)
      this.getSchedules(row.id, index)
    },
    getSchoolYears() {
      const conf = {
        method: 'GET',
        url: config.getSchoolYears,
        headers: {
          Accept: 'application/json',
        }
      }
      axios(conf).then(res => {
        console.log('getSchoolYears',  res)

        let data = res.data, schoolsArr = []
        for(let i=0; i<data.length; i++) {
          let obj = {
            id: data[i].id,
            label: data[i].year_name,
            value: data[i].year_name
          }
          schoolsArr.push(obj)
        }
        this.schoolYears = schoolsArr
      })
    },
    // Filter key events
    keyUpFilter() {
      clearTimeout(typingTimer);
      typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    },
    keyDownFilter() {
      clearTimeout(typingTimer);
    },
    doneTyping() {
      if(this.filter.length > 1 || this.filter.length == 0) {
        console.log('Send Request...')
        this.filterActivity()
      }
    },
    filterActivity() {

      // this.loading = true

      let uri = '';

      if(this.filter != '') {
        uri += '&search=' + this.filter
      }

      if(this.schoolYear) {
        uri += '&year=' + this.schoolYear.id
      }

      if(this.typeModel != '') {
        uri += '&type=' + this.typeModel.id
      }

      console.log('URI', uri)

      const conf = {
        method: 'GET',
        url: config.filterActivity + this.tab + '/' + this.$route.params.id + '?' + uri,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {

        this.pages = res.data.pagesCount
        let data = res.data.activity
        

        let filteredData = this.activityParsing(data, this.final)

        this.data = filteredData
        this.tempDataX = filteredData

        this.loading = false
      });
    },
    getParticipiant(value) {
      
      console.log(this.item)
      console.log('value', value)

      this.attendeeItem = value

      let id = value.id
      const conf = {
        method: 'GET',
        url: config.getAttendyParticipant + id,
        headers: {
          Accept: 'application/json',
        }
      }
      axios(conf).then(res => {
        console.log('res', res)
        let attendeeSchool = res.data.attendeeSchool
        this.attendingTeacherList = attendeeSchool
      })

      // getAttendyParticipant
    },
  },
  created() {
      this.getActivityByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
      this.getAdditionalInfo(1)
      this.getAtendeeTypes()
      this.getCategoryTypes(1)
      this.getApprovals()
      this.getRcurranceTypes()
      this.getSchoolYears()
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
    // filteredList() {
    //     let searchString = this.attendingSearch.toLowerCase();
    //     let x = this.attendingTeacherList.filter(item => item.first_name.toLowerCase().includes(searchString));
    //     this.teachersSearchLength = x.length
    //     return x
    // },
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

        let repeatsId = this.tempDateOfActivity.repeatsId
        if(repeatsId) {
          for(let i=0; i<repeatsId.length; i++) {
            this.weekDays[repeatsId[i]].checked = true
          }
        }
        

        
      }else {
        this.isEditSchedule = false
        for(let i=0; i<this.weekDays.length; i++) {
          this.weekDays[i].checked = false
        }
      }
    },
    showRemainingBalance(val) {
      if(val) {
        this.visibleColumns = [
          "toggle",
          "online",
          "provider", 
          "status", 
          "approvals",
          "PDActivity", 
          "dateOfActivity", 
          "noAttending",
          "amount",
          "type",
          "grossPD",
          "RemainingBalance",
          "actions"
        ]
      }else {
        this.visibleColumns = [
          "toggle",
          "online",
          "provider", 
          "status", 
          "approvals",
          "PDActivity", 
          "dateOfActivity", 
          "noAttending",
          "amount",
          "type",
          "grossPD",
          "actions"
        ]
      }
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

</style>