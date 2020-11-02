<template>
  <q-page class="q-pa-sm">  

    <div class="q-pa-md q-gutter-sm">
      <q-breadcrumbs>
        <q-breadcrumbs-el icon="dashboard" label="Dashboard" to="/" />
        <q-breadcrumbs-el label="Budget"/>
        <q-breadcrumbs-el label="Budget"/>
      </q-breadcrumbs>
    </div>


    <q-card v-if='tab == "Title1" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{totalPD}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total FE</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{totalFE}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{usedPD}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used FE</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{usedPE}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{remainingPD}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining FE</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{remainingFE}}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
         

        </div>
      </q-card-section>
    </q-card>

    <q-card v-if='tab == "Title2" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7"> Total PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Material</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Material</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining Material</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>
         

        </div>
      </q-card-section>
    </q-card>

    <q-card v-if='tab == "Title3" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Instruction</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>

    <q-card v-if='tab == "Title4" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Well Rounded</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Safe Healthy</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used TechPD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }} </q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="purple" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used Tech Instruction</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }} </q-item-label>
              </q-item-section>
            </q-item>
          </div>

        </div>
      </q-card-section>
    </q-card>

    <q-card v-if='tab == "ESSER" ' class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Total Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="red" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Used PD</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
              </q-item-section>
            </q-item>
          </div>

          <div class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="attach_money" color="green" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">Remaining Allocation</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ Math.floor(Math.random() * 1000) }}</q-item-label>
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
          <q-tab name="Title1" label="Title I"/>
          <q-tab name="Title2" label="Title II"/>
          <q-tab name="Title3" label="Title III"/>
          <q-tab name="Title4" label="Title IV"/>
          <q-tab name="ESSER" label="ESSER"/>

        </q-tabs>

        <q-separator />

        <q-tab-panels v-model="tab" animated>

          <q-tab-panel name="Title1" class="q-p-sm">
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
                                  <span>{{ editedItem.dateOfActivityArr.startdate }}</span>, 
                                  <span>{{ editedItem.dateOfActivityArr.time1 }}</span>
                                </div>
                              </div>
                              <div class="row">
                                <div class="col-3 text-right q-pr-md"><b>Ends:</b></div>
                                <div class="col-9">
                                  <span>{{ editedItem.dateOfActivityArr.endDate }}</span>, 
                                  <span>{{ editedItem.dateOfActivityArr.time2 }}</span>
                                </div>
                              </div>

                              <q-separator class="q-mt-md q-mb-md"/>

                                <div class="row q-mt-lg">

                                  <div class="col-3 q-pr-md row items-center justify-end">Start date:</div>
                                  <div class="col-3">
                                    <q-input outlined dense v-model="editedItem.dateOfActivityArr.startdate">
                                      <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-date v-model="editedItem.dateOfActivityArr.startdate" mask="MM-DD-YYYY">
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
                                    <q-input outlined dense v-model="editedItem.dateOfActivityArr.endDate">
                                      <template v-slot:append>
                                        <q-icon name="event" class="cursor-pointer">
                                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-date v-model="editedItem.dateOfActivityArr.endDate" mask="MM-DD-YYYY">
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
                                    <q-input outlined dense v-model="editedItem.dateOfActivityArr.time1">
                                      <template v-slot:append>
                                        <q-icon name="access_time" class="cursor-pointer">
                                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="editedItem.dateOfActivityArr.time1">
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
                                    <q-input outlined dense v-model="editedItem.dateOfActivityArr.time2">
                                      <template v-slot:append>
                                        <q-icon name="access_time" class="cursor-pointer">
                                          <q-popup-proxy transition-show="scale" transition-hide="scale">
                                            <q-time v-model="editedItem.dateOfActivityArr.time2">
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
                                    <q-select dense outlined v-model="editedItem.dateOfActivityArr.selectDayWeekMonth" :options="selectOptionsDayWeekMonth"  />
                                  </div>
                                </div>

                                <div class="row q-mt-md">
                                  <div class="col-3 q-pr-md row items-center justify-end">Every:</div>
                                  <div class="col-2">
                                    <q-input outlined v-model="editedItem.dateOfActivityArr.selectWeekDay" dense/>
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
                    
                      <q-card-actions class="row justify-end">
                        <!-- <q-btn flat label="Remove recurrence" style="color: red"></q-btn> -->
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
                            <q-input dense outlined v-model="editedItem.noAttendingArr.attendees"/>
                          </div>
                        </div>

                        <div class="row q-mt-md">
                          <div class="col-12 text-left">
                            <span class="q-ml-sm">
                              <q-checkbox v-model="editedItem.noAttendingArr.split" label="Split activity and attendees:"/>
                            </span>
                          </div>
                        </div>

                        <q-separator class="q-mt-md" v-if="editedItem.noAttendingArr.split"></q-separator>

                        <div class="q-mt-md" v-if="editedItem.noAttendingArr.split">
                            <div>

                              <div class="q-mb-md">
                                <span class="text-subtitle2">Amount: </span> 
                                $ {{ popupAmount }}
                              </div>

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
                                      <q-input type="number" dense outlined 
                                        v-model="props.row.no"
                                        @input="selfTitleTeacherCount(props.row.no)"
                                      />
                                    </q-td>

                                    <q-td key="allocation" :props="props">
                                      <q-select  @input="changeAllocation" dense outlined v-model="props.row.allocation" :options="titlesArr"  />
                                    </q-td>

                                    <q-td key="type" :props="props" v-if="props.row.allocation.value == 'Title I'">
                                      <q-select dense outlined v-model="props.row.type" :options="typeArr"  />
                                    </q-td>
                                    <q-td key="type" :props="props" v-else-if="props.row.allocation.value == 'Title II'">
                                      <q-select dense outlined v-model="props.row.type" :options="typeArr2"  />
                                    </q-td>
                                    <q-td key="type" :props="props" v-else-if="props.row.allocation.value == 'Title III'">
                                      <q-select dense outlined v-model="props.row.type" :options="typeArr3"  />
                                    </q-td>
                                    <q-td key="type" :props="props" v-else-if="props.row.allocation.value == 'Title IV'">
                                      <q-select dense outlined v-model="props.row.type" :options="typeArr4"  />
                                    </q-td>
                                    <q-td key="type" :props="props" v-else-if="props.row.allocation.value == 'ESSER'">
                                      <q-select dense outlined v-model="props.row.type" :options="typeEssr"  />
                                    </q-td>
                                    <q-td key="type" :props="props" v-else>
                                      <q-select dense outlined v-model="props.row.type" :options="typeArr"  />
                                    </q-td>
                                    
                                    <q-td key="amount" :props="props">
                                      <q-input dense outlined v-model="props.row.amount"/>
                                    </q-td>

                                    <q-td key="attendeeList" :props="props" class="row">
                                      <div @click="props.expand = !props.expand" class="cursor-pointer" >
                                         <q-btn color="blue"   round dense icon="perm_identity"/>
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

                                        <q-input outlined dense 
                                          v-on:keyup.enter="searchEnter"
                                          v-model="attendingSearch"
                                          label="Search" class="q-mt-lg q-mb-sm">

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

                              <q-btn round dense color="secondary" icon="add" class="q-mt-md"  @click="addAttRow"/>

                            </div>
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

                    <q-td key="provider" :props="props">
                      {{ props.row.provider }}
                      <q-popup-edit v-model="props.row.provider" title="Update provider" buttons>
                        <q-input type="text" v-model="props.row.provider" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="status" :props="props">

                      <q-icon v-if="props.row.status == 'Approved'" name="done" color="green" style="font-size: 1.5em"/>
                      <q-icon v-else-if="props.row.status == 'Pending'" name="access_time" color="amber-7" style="font-size: 1.5em"/>
                      <q-icon v-else name="clear" color="red" style="font-size: 2em"/>

                      <q-popup-edit v-model="props.row.status" title="Update status" buttons>
                        <q-select outlined v-model="props.row.status" :options="status"/>
                      </q-popup-edit>

                    </q-td>

                    <q-td key="approvals" :props="props">
                      <q-icon v-if="props.row.approvals == 'Active'" name="done" color="green" style="font-size: 1.5em"/>
                      <q-icon v-else name="cancel" color="red" style="font-size: 2em"/>
                      
                      <q-popup-edit v-model="props.row.approvals" title="Update status" buttons>
                        <q-select outlined v-model="props.row.approvals" :options="approval"/>
                      </q-popup-edit>
                    </q-td>

                    <q-td key="PDActivity" :props="props">
                      {{ props.row.PDActivity }}
                      <q-popup-edit v-model="props.row.PDActivity" title="Update activity" buttons>
                        <q-input type="text" v-model="props.row.PDActivity" dense autofocus />
                      </q-popup-edit>
                    </q-td>
                    
                    <q-td key="dateOfActivity" :props="props"
                      :style="{maxWidth: '200px', width: '200px'}"
                    > 
                      <span @click="editDateOfActivity(props.row)" >{{ props.row.dateOfActivityArr.startdate }} - {{ props.row.dateOfActivityArr.endDate }}</span>
                      <span class="q-ml-sm">
                        <q-icon name="autorenew" color="green" style="font-size: 1.5em" v-if="props.row.repeat" />
                      </span>

                    </q-td>

                    <q-td key="noAttending" :props="props">
                      <div @click="editAttendingitem(props.row)">
                        <!-- {{ props.row.noAttendingArr.attendees }}  -->
                        {{ props.row.noAttendingArr.teacherCount }}
                        {{ tab }} Teachers
                        <span class="q-ml-sm">
                          <q-icon name="people_alt" color="green" style="font-size: 1.5em" v-if="props.row.noAttendingArr.split" />
                        </span>
                      </div>
                    </q-td>

                    <q-td key="amount" :props="props">
                      <div>$ {{ props.row.amount }}</div>
                      <q-popup-edit v-model="props.row.amount" title="Update amount" buttons>
                        <q-input type="text" v-model="props.row.amount" dense autofocus />
                      </q-popup-edit>
                    </q-td>

                    <q-td key="type" :props="props">
                      <!-- <div></div> -->

                      <q-chip square color="green" text-color="white" v-if="props.row.type.label == 'FE'">{{props.row.type.label}}</q-chip>
                      <q-chip square color="purple" text-color="white" v-else>{{props.row.type.label}}</q-chip>

                      <q-popup-edit v-model="props.row.type" title="Update type" buttons>
                        <q-select v-model="props.row.type" :options="type1test"/>
                      </q-popup-edit>  

                    </q-td>

                    <q-td key="grossPD" :props="props">
                      <div>$ {{ parseFloat(props.row.amount) + parseFloat(((props.row.amount * 12) / 100)) }}</div>
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
                    <q-td colspan="100%">
                      <div class="q-mt-md">
                        <div class="row">
                          <div class="col-3">

                            <div class="text-subtitle2">Date of activity:</div>
                            <p>
                              {{editedItem.dateOfActivityArr.startdate}} -
                              {{editedItem.dateOfActivityArr.endDate}}
                            </p>

                            <p v-if="props.row.repeat">
                              <b>Repeat:</b> {{props.row.dateOfActivityArr.selectDayWeekMonth}}, <br>
                              <b>Every:</b> {{props.row.dateOfActivityArr.selectWeekDay}} week(s),<br>
                              <b>On:</b> <br>
                            </p>
                            
                            <div class="text-subtitle2">Attendees:</div>
                            <p>
                              {{ props.row.noAttendingArr.teacherCount }}
                              {{ tab }} Teachers
                            </p>
                          </div>

                          <div class="col-md-5">
                            <div class="text-subtitle2">Notes</div>
                            <p>{{props.row.notes}}</p>
                            <!-- <q-input type="textarea" outlined v-model="props.row.notes" class="q-mb-md"/>   -->
                            <q-popup-edit v-model="props.row.notes" title="Update notes" buttons>
                              <q-input type="textarea" v-model="props.row.notes" dense autofocus />
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

          <q-tab-panel name="Title2" class="q-p-sm">
            <BudgetTableTitle2 />
          </q-tab-panel>

          <q-tab-panel name="Title3" class="q-p-sm">
            <BudgetTableTitle3 />
          </q-tab-panel>

          <q-tab-panel name="Title4" class="q-p-sm">
            <BudgetTableTitle4 />
          </q-tab-panel>

          <q-tab-panel name="ESSER" class="q-p-sm">
            <BudgetTableEsser />
          </q-tab-panel>


        </q-tab-panels>

      </q-card>
    </div>


  
  </q-page>
</template>

<script>
    import {exportFile} from 'quasar'
    import router from 'src/router'

    import BudgetTableTitle2 from '../../components/budget/BudgetTableTitle2'
    import BudgetTableTitle3 from '../../components/budget/BudgetTableTitle3'
    import BudgetTableTitle4 from '../../components/budget/BudgetTableTitle4'
    import BudgetTableEsser from '../../components/budget/BudgetTableEsser'
    


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
        components: {
          BudgetTableTitle2,BudgetTableTitle3,BudgetTableTitle4, BudgetTableEsser
        },
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
            confirmAttendeeModal: false,

            status: ['Approved', 'Declined', 'Pending'],
            approval: ['Active', 'Canceled'],
            
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
                name: "allocation",
                align: "left",
                label: "Allocation",
                field: "allocation",
                sortable: true
              },
              {
                name: "type",
                align: "left",
                label: "Type",
                field: "type",
                sortable: true
              },
              {
                name: "amount",
                align: "left",
                label: "Amount",
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
                name: "toggle",
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
              },
              {
                name: "actions",
                align: "left",
                label: "Actions",
                field: "actions"
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
              repeat: '',
              dateOfActivityArr: {
                startdate: '2019-02-01',
                endDate: '2019-02-01',
                time1: '00:00',
                time2: '00:00',
                selectDayWeekMonth: '',
                selectWeekDay: '',
              },
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
              'Family Engagement'
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

            item: '',
            confirm: false,
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
            typeArr: ['PD', 'FE'],
            typeArr2: ['PD', 'M'],
            typeArr3: ['PD', 'I'],
            typeArr4: ['WR', 'SH', 'PD', 'TI'],
            typeEssr: ['PD', 'M', 'S'],
            type1test: [
              {
                label: 'PD',
                value: true
              },
              {
                label: 'FE',
                value: false
              },
            ],
          };
        },
        methods: {
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
          changeAllocation(val) {
            const index = this.titlesArr.indexOf(val)
            this.titlesArr[index].disable = true
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
              console.log(this.editedItem)

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
                this.data = this.tempData.filter(a => a.typeTest == true);
              }else {
                this.data = this.tempData.filter(a => a.typeTest == false);
              }
            }else {
              this.data = this.tempData
            }
          },
          openDeleteModal(item) {
            this.item = item
            this.confirm = true
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
              allocation: '',
              type: '',
              amount: 0,
              attendeeList: 'View'
            }
            this.editedItem.noAttendingArr.attendeesData.push(obj)
          },
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

              let type1 = {
                label: 'PD',
                value: true
              };
              let type2 = {
                label: 'FE',
                value: false
              }

              let no = Math.floor(Math.random() * 12)
              // let attendeesObj = {   
              //   no: no,
              //   allocation: {
              //     label: 'Title I',
              //     value: 'Title I',
              //     disable: true
              //   },
              //   type: '',
              //   amount: 0,
              //   attendeeList: 'View'
              // }

              let obj = {
                  // toggle: '',
                  provider: 'WEI ' + i+1,
                  status: r ? 'Approved' : 'Declined',
                  approvals: r ? 'Active' : 'Canceled',
                  PDActivity: 'Balanced Literacy for Readers, #2-133 with Chris VB',
                  dateOfActivity: 'August, 2019 - May 2020 on Mondays',
                  noAttending: '12 TI teachers and 30 TII Teachers',
                  amount: amount,
                  type: pd ? type1 : type2,
                  typeTest: pd,
                  grossPD: charge.toFixed(2),
                  repeat: r,
                  notes: 'Lorem Ipsum – Generator, Origins and Meaning',
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
                    split: r,
                    attendeesData: [],
                    teacherCount: no,
                  },
              }

              dataTest.push(obj)
            }

            this.data = dataTest
            this.tempData = dataTest
        },
        computed: {
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
          titleTeacherNumber() {
            console.log('44', this.data)
            return 4
          },
          filteredList() {
              let searchString = this.attendingSearch.toLowerCase();
              let x = this.attendingTeacherList.filter(item => item.name.toLowerCase().includes(searchString));
              this.teachersSearchLength = x.length
              return x
          },
          timeTotal() {
            let t1 = parseInt(this.editedItem.dateOfActivityArr.time1.substring(0,2))
            let t2 = parseInt(this.editedItem.dateOfActivityArr.time2.substring(0,2))

            let result = t2 - t1
            console.log(t2, t1, result)
            return result
          },
          totalMinute() {
            let m1 = parseInt(this.editedItem.dateOfActivityArr.time1.substring(3,5));
            let m2= parseInt(this.editedItem.dateOfActivityArr.time2.substring(3,5));

            let m1res = 0, m2res = 0;

            if(m1 != 0) {
              m1res = 60 - m1
            }

            if(m2 != 0) {
              m2res = 60 - m2
            }  

            let result =  m1res - m2res
            console.log('m1',m1res, 'm2', m2res, 'result=',result)

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

   // No attending
   // on click show teacher lastname firstname 
   // approved - not approved


</script>

<style lang="scss" scoped>

.border {
  border: 1px solid #e0e0e0;
}

</style>