<template>
<div>
  <q-table
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

      <q-input
        class="q-mr-md"
        outlines
        dense
        v-model="filter"
        placeholder="Search"
        @keyup="keyUpFilter" 
        @keydown="keyDownFilter"
      >
        <template v-slot:append>
          <q-icon name="search" />
        </template>
      </q-input>
      
      <q-select
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 300px; max-width: 300px"
        dense
        outlines
        label="Category"
        :options="optionsCategory"
        v-model="filterCategoryValue"
      >
        <template v-if="filterCategoryValue" v-slot:append>
          <q-icon name="cancel" @click.stop="filterCategoryValue = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

      <q-select
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 200px; max-width: 200px"
        dense
        outlines
        label="Vendor"
        :options="optionsSupplier"
        v-model="filterVendor"
      >
        <template v-if="filterVendor" v-slot:append>
          <q-icon name="cancel" @click.stop="filterVendor = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

      <q-select
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 150px; max-width: 150px"
        dense
        outlines
        label="Condition"
        :options="optionsCondition"
        v-model="filterCondition"
      >
        <template v-if="filterCondition" v-slot:append>
          <q-icon name="cancel" @click.stop="filterCondition = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

      <q-select
        @input="filterInventory"
        class="q-mr-md"
        style="min-width: 150px; max-width: 150px"
        dense
        outlines
        label="Status"
        :options="optionsStatus"
        v-model="filterStatus"
      >
        <template v-if="filterStatus" v-slot:append>
          <q-icon name="cancel" @click.stop="filterStatus = '', filterInventory()" class="cursor-pointer" />
        </template>
      </q-select>

              <q-btn :disabled="addNew" square class="q-mr-md edx-add-btn" text-color="white" icon="add" 
              @click="addNew = true, addNewRow()" no-caps>Add</q-btn>

              <q-btn
                icon-right="archive"
                label="Export to Excel"
                class="edx-excel-btn" text-color="white"
                no-caps
                @click="exportTable"
              />

      <q-btn
        flat
        round
        dense
        :icon="props.inFullscreen ? 'fullscreen_exit' : 'fullscreen'"
        @click="props.toggleFullscreen"
        v-if="mode === 'list'"
        class="q-px-sm"
      >
        <q-tooltip :disable="$q.platform.is.mobile" v-close-popup
          >{{props.inFullscreen ? 'Exit Fullscreen' : 'Toggle Fullscreen'}}
        </q-tooltip>
      </q-btn>

      <div class="q-pa-sm q-gutter-sm">

        <q-dialog v-model="confirm" persistent>
          <q-card>
            <q-card-section class="row items-center">
              <span class="q-ml-sm"
                >Are you sure to delete this item?</span
              >
            </q-card-section>

            <q-card-actions align="right">
              <q-btn
                flat
                label="No, thanks"
                color="primary"
                v-close-popup
              />
              <q-btn
                label="Yes"
                color="red"
                v-close-popup
                @click="deleteItem"
              />
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
          <q-btn
            size="sm"
            flat
            color="black"
            @click="props.expand = !props.expand"
            :icon="props.expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
          >
          </q-btn>
        </q-td>

        <q-td key="qty" :props="props">

          <div>{{ props.row.quantity }}</div>

          <q-popup-edit v-model="props.row.quantity" title="Qty" buttons>
            <q-input
              type="text"
              v-model="props.row.quantity"
              dense
              autofocus
              @input="detectChange(props.rowIndex), checkQuantity(props.row.quantity, props.rowIndex)"
            />
          </q-popup-edit>
        </q-td>

        <q-td
          key="category"
          :props="props"
          style="white-space: initial;width: 350px; max-width: 350px;"
        >
          <div> {{ props.row.inventory_category_uni.label }} </div>

          <q-popup-edit 
              v-model="props.row.inventory_category_uni"
              title="Category" buttons>

              <q-select  
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  @input="detectChange(props.rowIndex)"
                  v-model="props.row.inventory_category_uni" 
                  :options="optionsCategory"
                  @filter="filterCategory"
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

        <q-td
          key="itemName"
          :props="props"
          style="white-space: initial;width: 350px; max-width: 350px;"
        >
          <span class="inline-span">{{ props.row.item_name }}</span>

          <q-popup-edit
            v-model="props.row.item_name"
            title="Item name"
            buttons
          >
            <q-input
              type="text"
              v-model="props.row.item_name"
              dense
              autofocus
              @input="detectChange(props.rowIndex)"
            />
          </q-popup-edit>
        </q-td>

        <q-td
          key="vendor"
          :props="props"
          
        >
          <div v-if="props.row.inventory_supplier_uni">{{ props.row.inventory_supplier_uni.label }}</div>
          <div v-else>  </div>

            <q-popup-edit 
              v-model="props.row.inventory_supplier_uni"
              title="Vendor" buttons>

              <q-select  
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  @input="detectChange(props.rowIndex)"
                  v-model="props.row.inventory_supplier_uni" 
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

        <q-td
          key="costPerItem"
          :props="props"
          
        >
          <div>$ {{ props.row.item_cost }}</div>

          <q-popup-edit
            v-model="props.row.item_cost"
            title="Cost Per Item"
            buttons
          >
            <q-input
              type="text"
              v-model="props.row.item_cost"
              dense
              autofocus
              @input="detectChange(props.rowIndex)"
            />
          </q-popup-edit>
        </q-td>

        <q-td
          key="totalCost"
          :props="props"
          
        >
          <div>$ {{ (props.row.item_cost * props.row.quantity).toFixed(2) }}</div>
        </q-td>

        <q-td key="dateOfPurchase" :props="props">
          <div>{{ props.row.purchase_date }}</div>
          <q-popup-proxy transition-show="scale" transition-hide="scale">
            <q-date v-model="props.row.purchase_date" mask="MM-DD-YYYY" @input="detectChange(props.rowIndex)">
              <div class="row items-center justify-end q-gutter-sm">
                <q-btn label="Cancel" color="primary" flat v-close-popup />
                <q-btn label="OK" color="primary" flat v-close-popup />
              </div>
            </q-date>
          </q-popup-proxy>
        </q-td>

        <q-td key="condition" :props="props">

          <div v-if="props.row.condition.label == 'Excelent'">
            <span class="mdi mdi-circle-slice-7 mdi-24px edx-blue">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Excellent</strong>
              </q-tooltip>
            </span>
          </div>

          <div v-else-if="props.row.condition.label == 'Very Good'">
            <span class="mdi mdi-circle-slice-6 mdi-24px edx-green">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Very Good</strong>
              </q-tooltip>
            </span>
          </div>

          <div v-else-if="props.row.condition.label == 'Good'">
            <span class="mdi mdi-circle-slice-5 mdi-24px edx-warning">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Good</strong>
              </q-tooltip>
            </span>
          </div>

          <div v-else-if="props.row.condition.label == 'Fair'">
            <span class="mdi mdi-circle-slice-4 mdi-24px edx-warning">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Fair</strong>
              </q-tooltip>
            </span>
          </div>

          <div v-else>
            <span class="mdi mdi-circle-slice-2 mdi-24px edx-red">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Poor</strong>
              </q-tooltip>
            </span>
          </div>

          <q-popup-edit
            v-model="props.row.condition"
            title="Condition"
            buttons
          >
            <q-select
              @input="detectChange(props.rowIndex)"
              dense
              outlined
              v-model="props.row.condition"
              :options="optionsCondition"
            />
          </q-popup-edit>

        </q-td>

        <q-td key="status" :props="props">
          <div v-if="props.row.status_uni.label == 'On Premise'">
            <span class="mdi mdi-school mdi-24px edx-blue">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>On Premise</strong>
              </q-tooltip>
            </span>
            
          </div>

          <div v-else-if="props.row.status_uni.label == 'Off Premise'">
            <span class="mdi mdi-home mdi-24px edx-orange">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Off Premise</strong>
              </q-tooltip>
            </span>
            
          </div>

          <div v-else-if="props.row.status_uni.label == 'Disposed'">
            <span class="mdi mdi-recycle mdi-24px edx-green">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Disposed</strong>
              </q-tooltip>
            </span>
            
          </div>

          <div v-else-if="props.row.status_uni.label == 'Lost'">
            <span class="mdi mdi-map-marker-question mdi-red mdi-24px edx-red" >
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Lost</strong>
              </q-tooltip>
            </span>
            
          </div>

          <div v-else-if="props.row.status_uni.label == 'Stolen'">
            <span class="mdi mdi-robber mdi-red mdi-24px edx-dark">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Stolen</strong>
              </q-tooltip>
            </span>
            
          </div>

          <div v-else-if="props.row.status_uni.label == 'Transfered'">
            <span class="mdi mdi-truck-delivery mdi-24px edx-orange">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Transferred</strong>
              </q-tooltip>
            </span>
            
          </div>

          <div v-else>
            <span class="mdi mdi-dolly mdi-red mdi-24px edx-blue">
              <q-tooltip
                anchor="top middle"
                self="bottom middle"
                :offset="[10, 10]"
                transition-show="flip-right"
                transition-hide="flip-left"
              >
                <strong>Stored</strong>
              </q-tooltip>
            </span>
            
          </div>

          <q-popup-edit
            v-model="props.row.status"
            title="Status"
          >
            <q-select
              @input="changeStatus(props.rowIndex), detectChange(props.rowIndex)"
              dense
              outlined
              v-model="props.row.status_uni"
              :options="optionsStatus"
            />
          </q-popup-edit>

        </q-td>

        <q-td key="actions" :props="props" style="min-width: 132px">

            <div v-if="props.row.changed">

              <q-btn
                @click="cancellChange(props.rowIndex)"
                icon="cancel"
                color="edx-cancel-btn" 
                class="q-mr-sm"
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
                @click="editInventory(props.rowIndex)"
                color="edx-save-btn"
                class="q-mr-sm"
                icon="save"
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
                 icon="delete_forever"
                    color="edx-delete-btn"
                    class="q-mr-sm"
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

        </q-td>

      </q-tr>

      <q-tr v-show="props.expand" :props="props" @click="copyRowData(props.rowIndex)" :class="{ 'bg-red-2' : props.row.changed }">
        <q-td colspan="100%">
          <div class="q-mb-lg">
            <div class="row q-mt-lg q-mb-lg"></div>

            <div class="row">

              <div class="col-1 q-mr-md" @click="identifierCheckQuantity(props.rowIndex)">
                <div class="text-subtitle2 q-mb-md">Identifier</div>

                <q-input readonly dense outlined v-model="props.row.identification_uni.label"/>

                <q-popup-edit
                  v-model="props.row.identification_uni"
                  title="Identifier"
                  buttons
                >
                  <q-select
                    @input="detectChange(props.rowIndex)"
                    dense
                    outlined
                    v-model="props.row.identification_uni"
                    :options="optionsIdentifier"
                  />
                </q-popup-edit>
              </div>

              <div class="col-1 q-mr-md" v-if="props.row.identification_uni.id != 5">

                <div class="text-subtitle2 q-mb-md">District ID</div>

                <div>
                  <q-input readonly dense outlined v-model="props.row.district_assigned_id"/>

                  <q-popup-edit
                    v-if="props.row.identification_uni.id != 1"
                    v-model="props.row.district_assigned_id"
                    title="District ID"
                    buttons
                  >
                    <q-input
                      type="text"
                      v-model="props.row.district_assigned_id"
                      dense
                      autofocus
                      @input="detectChange(props.rowIndex)"
                    />
                  </q-popup-edit>
                </div>

              </div>

              <div class="col-1 q-mr-md" v-if="props.row.identification_uni.id == 5">
                <div class="text-subtitle2 q-mb-md">District ID</div>
                <div class="relative-position">
                  <q-input 
                    readonly
                    dense 
                    outlined 
                    v-model="props.row.sticker_range_start"
                    class="left-arrow-input"
                  />
                </div>
              </div>
              <div class="col-1 q-mr-md" v-if="props.row.identification_uni.id == 5">
                <div class="text-subtitle2 q-mb-md">&nbsp;</div>
                <div class="relative-position">
                  <q-input 
                    readonly
                    dense 
                    outlined 
                    v-model="props.row.sticker_range_end"
                    class="left-arrow-input"
                  />
                </div>
              </div>

              <div class="col-1" >
                <div class="text-subtitle2 q-mb-md">Serial #</div>
                <q-input  readonly dense outlined v-model="props.row.serial_number"/>
                <q-popup-edit
                  v-if="props.row.identification_uni.id != 1"
                  v-model="props.row.serial_number"
                  title="Serial #"
                  buttons
                >
                  <q-input
                    type="text"
                    v-model="props.row.serial_number"
                    dense
                    autofocus
                    @input="detectChange(props.rowIndex)"
                  />
                </q-popup-edit>
              </div>

              <div class="col-2 q-mr-sm q-ml-sm">
                <div class="text-subtitle2 q-mb-md">Location</div>

                <!-- <p class="white-space-initial fixed-height-for-large-text">
                  {{props.row.location}}
                </p> -->

                <q-input readonly dense outlined v-model="props.row.location"/>
                
                <q-popup-edit
                  v-model="props.row.location"
                  title="Location"
                  buttons
                >
                  <q-input
                    type="input"
                    v-model="props.row.location"
                    dense
                    autofocus
                    @input="detectChange(props.rowIndex)"
                  />
                </q-popup-edit>
              </div>

              <div class="col-2 q-mr-sm q-ml-sm">
                <div class="text-subtitle2 q-mb-md">
                  Location Note
                </div>
                <q-input readonly dense outlined v-model="props.row.location_information_note"/>
                <q-popup-edit
                  v-model="props.row.location_information_note"
                  title="Location Note"
                  buttons
                >
                  <q-input
                    type="textarea"
                    v-model="props.row.location_information_note"
                    dense
                    autofocus
                    @input="detectChange(props.rowIndex)"
                  />
                </q-popup-edit>
              </div>

            </div>

            <q-separator class="q-mt-lg q-mb-lg" />

            <div class="row">

              <div class="col-md-1 q-mr-sm q-ml-sm">

                <div class="text-subtitle2 q-mb-md">Removal Date</div>
                <q-input 
                  readonly 
                  dense 
                  outlined 
                  :disabled="props.row.status_uni.label == 'On Premise'" 
                  v-model="props.row.relocation_date"
                />

                <q-popup-proxy>
                  <q-date :disabled="props.row.status_uni.label == 'On Premise'" v-model="props.row.relocation_date" mask="YYYY-MM-DD" @input="detectChange(props.rowIndex)">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>

              </div>

              <div class="col-md-3 q-mr-sm q-ml-sm">

                <div class="text-subtitle2 q-mb-md">Removal Note</div>

                <q-input 
                  type="textarea"
                  readonly 
                  dense 
                  outlined 
                  v-model="props.row.transition_information_note"
                />

                <q-popup-edit
                  v-model="props.row.transition_information_note"
                  title="Removal Note"
                  buttons
                >
                  <q-input
                    type="textarea"
                    v-model="props.row.transition_information_note"
                    dense
                    autofocus
                  />
                </q-popup-edit>
              </div>

              <div class="col-md-1 q-mr-sm q-ml-sm">

                <div class="text-subtitle2 q-mb-md">Visibility date</div>

                <q-input
                  readonly 
                  dense 
                  outlined 
                  v-model="props.row.visibility_date"
                />

                <q-popup-proxy transition-show="scale" transition-hide="scale">
                  <q-date v-model="props.row.visibility_date" mask="YYYY-MM-DD" @input="detectChange(props.rowIndex)">
                    <div class="row items-center justify-end q-gutter-sm">
                      <q-btn label="Cancel" color="primary" flat v-close-popup />
                      <q-btn label="OK" color="primary" flat v-close-popup />
                    </div>
                  </q-date>
                </q-popup-proxy>

              </div>

            </div>

            <q-separator class="q-mt-lg q-mb-lg" />

            <div class="row">
              <div class="col-md-12 q-mr-sm q-ml-sm">
                <div class="text-subtitle2 q-mb-md">General Note</div>
                
                <q-input
                  readonly 
                  dense 
                  outlined 
                  type="textarea"
                  v-model="props.row.note"
                />
                <q-popup-edit
                  v-model="props.row.note"
                  title="Notes"
                  buttons
                >
                  <q-input
                    type="textarea"
                    v-model="props.row.note"
                    dense
                    autofocus
                    @input="detectChange(props.rowIndex)"
                  />
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

    <dialog-draggable :width="700" :modelDialog="onpremise" :title=" 'On Premise' " @onHide="onpremise=false">
      <q-card>
            
        <q-toolbar>

          <!-- <q-avatar>
            <span class="mdi mdi-school mdi-24px" style="color: blue"></span>
          </q-avatar> -->

          <q-toolbar-title class="row justify-between">
            <!-- On Premise -->
            <div v-if="editedItem.quantity > 1">
              {{ editedItem.quantity - statusChangeObject.quantity }}
              left
            </div>
          </q-toolbar-title>

        </q-toolbar>

        <q-card-section>
          <div class="row">

            <div class="col-2 q-pr-sm q-pl-sm">
              <div class="text-subtitle2 q-mb-sm">Qty</div>
              <q-input 
                outlined 
                dense 
                v-model="statusChangeObject.quantity" 
                :disable="editedItem.quantity <= 1" 
                :rules="[ val => val <= editedItem.quantity || 'Number cant be more than ' + editedItem.quantity]"
              />
            </div>

            <div class="col-5 q-pr-sm q-pl-sm">
              <div class="text-subtitle2 q-mb-sm">Location</div>
              <q-input  outlined dense v-model="statusChangeObject.location" />
            </div>

            <div class="col-5 q-pr-sm q-pl-sm">
              <div class="text-subtitle2 q-mb-sm">Location within school</div>
              <q-input  outlined dense v-model="statusChangeObject.locationWithinSchool" />
            </div>

            <div class="col-12 q-pr-sm q-pl-sm q-mt-md">
              <div class="text-subtitle2 q-mb-sm">Note</div>
              <q-input outlined type="textarea" dense v-model="statusChangeObject.note" />
            </div>

            <div class="full-width" v-if="editedItem.identification_uni && editedItem.identification_uni.id == 5">

              <div class="row">

                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                  <q-input outlined dense v-model="editedItem.sticker_range_start" />
                </div>

                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                  <q-input outlined dense v-model="editedItem.sticker_range_end" />
                </div>

              </div>

              <div class="row" v-if="statusChangeObject.quantity <= 1">
                  <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                    <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                    <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                  </div>
              </div>
              
              <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedItem.quantity">
                
                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">New Sticker range</div>
                  <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                </div>

                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                  <q-input outlined dense v-model="statusChangeObject.stickerRangeEnd" />
                </div>

              </div>

            </div>

          </div>
        </q-card-section>
        
        <q-card-actions align="right">
          <q-btn
            flat
            label="Cancel"
            color="primary"
            v-close-popup
            @click="cancelStatus"
          ></q-btn>
          <q-btn
            flat
            label="Confirm"
            color="primary"
            @click="confirmStatusChanges"
          ></q-btn>
        </q-card-actions>

      </q-card>
    </dialog-draggable>

    <dialog-draggable :width="700" :modelDialog="offpremise" :title=" 'Off Premise' " @onHide="offpremise=false">
      <q-card>
            
            <q-toolbar>

              <!-- <q-avatar>
                <span class="mdi mdi-home mdi-24px" style="color: orange"></span>
              </q-avatar> -->
              
              <q-toolbar-title class="row justify-between">
                <!-- Off Premise -->
                <div v-if="editedItem.quantity > 1">
                  {{ editedItem.quantity - statusChangeObject.quantity }}
                  left
                </div>
              </q-toolbar-title>

            </q-toolbar>

            <q-card-section>
              <div class="row">

                <div class="col-2 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Qty</div>
                  <q-input 
                    outlined 
                    dense 
                    v-model="statusChangeObject.quantity" 
                    :disable="editedItem.quantity <= 1" 
                    :rules="[ val => val <= editedItem.quantity || 'Number cant be more than ' + editedItem.quantity]"
                  />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location</div>
                  <q-input disable outlined dense v-model="statusChangeObject.location" />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location within school</div>
                  <q-input disable outlined dense v-model="statusChangeObject.locationWithinSchool" />
                </div>

                <div class="col-12 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Note</div>
                  <q-input outlined type="textarea" dense v-model="statusChangeObject.note" />
                </div>

                <div class="full-width" v-if="editedItem.identification_uni && editedItem.identification_uni.id == 5">

                  <div class="row">

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                      <q-input outlined dense v-model="editedItem.sticker_range_start" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="editedItem.sticker_range_end" />
                    </div>

                  </div>

                  <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedItem.quantity">
                      <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                        <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                      </div>
                  </div>
                  
                  <div class="row" v-if="statusChangeObject.quantity > 1">
                    
                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">New Sticker range</div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeEnd" />
                    </div>

                  </div>

                </div>

              </div>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn
                flat
                label="Cancel"
                color="primary"
                v-close-popup
                @click="cancelStatus"
              ></q-btn>
              <q-btn
                flat
                label="Confirm"
                color="primary"
                @click="confirmStatusChanges"
              ></q-btn>
            </q-card-actions>

      </q-card>
    </dialog-draggable>

    <dialog-draggable :width="700" :modelDialog="disposed" :title=" 'Disposed' " @onHide="disposed=false">
      <q-card>
            <q-toolbar>

              <!-- <q-avatar>
                <span class="mdi mdi-recycle mdi-24px" style="color: green"></span>
              </q-avatar> -->

              <q-toolbar-title class="row justify-between">
                <!-- Disposed -->
                <div v-if="editedItem.quantity > 1">
                  {{ editedItem.quantity - statusChangeObject.quantity }}
                  left
                </div>
              </q-toolbar-title>

            </q-toolbar>

            <q-card-section>
              <div class="row">

                <div class="col-2 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Qty</div>
                  <q-input 
                    outlined 
                    dense 
                    v-model="statusChangeObject.quantity" 
                    :disable="editedItem.quantity <= 1" 
                    :rules="[ val => val <= editedItem.quantity || 'Number cant be more than ' + editedItem.quantity]"
                  />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location</div>
                  <q-input disable outlined dense v-model="statusChangeObject.location" />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location within school</div>
                  <q-input disable outlined dense v-model="statusChangeObject.locationWithinSchool" />
                </div>

                <div class="col-9 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Note</div>
                  <q-input outlined type="textarea" dense v-model="statusChangeObject.note" />
                </div>

                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Show until</div>
                  <q-input dense outlined v-model="statusChangeObject.showUntil">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                
                <div class="full-width" v-if="editedItem.identification_uni && editedItem.identification_uni.id == 5">

                  <div class="row">

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                      <q-input outlined dense v-model="editedItem.sticker_range_start" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="editedItem.sticker_range_end" />
                    </div>

                  </div>

                  <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedItem.quantity">
                      <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                        <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                      </div>
                  </div>
                  
                  <div class="row" v-if="statusChangeObject.quantity > 1">
                    
                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">New Sticker range</div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeEnd" />
                    </div>

                  </div>

                </div>

              </div>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn
                flat
                label="Cancel"
                color="primary"
                v-close-popup
                @click="cancelStatus"
              ></q-btn>
              <q-btn
                flat
                label="Confirm"
                color="primary"
                @click="confirmStatusChanges"
              ></q-btn>
            </q-card-actions>
      </q-card>
    </dialog-draggable>

    <dialog-draggable :width="700" :modelDialog="lost" :title=" 'Lost' " @onHide="lost=false">
      <q-card>
        <q-toolbar>
<!-- 
              <q-avatar>
                <span class="mdi mdi-map-marker-question mdi-red mdi-24px" style="color: red"></span>
              </q-avatar> -->

              <q-toolbar-title class="row justify-between">
                <!-- Lost -->
                <div v-if="editedItem.quantity > 1">
                  {{ editedItem.quantity - statusChangeObject.quantity }}
                  left
                </div>
              </q-toolbar-title>

            </q-toolbar>

            <q-card-section>
              <div class="row">

                <div class="col-2 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Qty</div>
                  <q-input 
                    outlined 
                    dense 
                    v-model="statusChangeObject.quantity" 
                    :disable="editedItem.quantity <= 1" 
                    :rules="[ val => val <= editedItem.quantity || 'Number cant be more than ' + editedItem.quantity]"
                  />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location</div>
                  <q-input disable outlined dense v-model="statusChangeObject.location" />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location within school</div>
                  <q-input disable outlined dense v-model="statusChangeObject.locationWithinSchool" />
                </div>

                <div class="col-9 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Note</div>
                  <q-input outlined type="textarea" dense v-model="statusChangeObject.note" />
                </div>

                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Show until</div>
                  <q-input dense outlined v-model="statusChangeObject.showUntil">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>

                <div class="full-width" v-if="editedItem.identification_uni && editedItem.identification_uni.id == 5">

                  <div class="row">

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                      <q-input outlined dense v-model="editedItem.sticker_range_start" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="editedItem.sticker_range_end" />
                    </div>

                  </div>

                  <div class="row" v-if="statusChangeObject.quantity <= 1">
                      <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                        <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                      </div>
                  </div>
                  
                  <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedItem.quantity">
                    
                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">New Sticker range</div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeEnd" />
                    </div>

                  </div>

                </div>

              </div>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn
                flat
                label="Cancel"
                color="primary"
                v-close-popup
                @click="cancelStatus"
              ></q-btn>
              <q-btn
                flat
                label="Confirm"
                color="primary"
                @click="confirmStatusChanges"
              ></q-btn>
            </q-card-actions>
      </q-card>
    </dialog-draggable>

    <dialog-draggable :width="700" :modelDialog="stolen" :title=" 'Stolen' " @onHide="stolen=false">
          <q-card>
            
            <q-toolbar>

              <!-- <q-avatar>
                <span
                class="mdi mdi-robber mdi-red mdi-24px"
                style="color: black"
              ></span>
              </q-avatar> -->

              <q-toolbar-title class="row justify-between">
                <!-- Stolen -->
                <div v-if="editedItem.quantity > 1">
                  {{ editedItem.quantity - statusChangeObject.quantity }}
                  left
                </div>
              </q-toolbar-title>

            </q-toolbar>

            <q-card-section>
              <div class="row">

                <div class="col-2 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Qty</div>
                  <q-input 
                    outlined 
                    dense 
                    v-model="statusChangeObject.quantity" 
                    :disable="editedItem.quantity <= 1" 
                    :rules="[ val => val <= editedItem.quantity || 'Number cant be more than ' + editedItem.quantity]"
                  />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location</div>
                  <q-input disable outlined dense v-model="statusChangeObject.location" />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location within school</div>
                  <q-input disable outlined dense v-model="statusChangeObject.locationWithinSchool" />
                </div>

                <div class="col-9 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Note</div>
                  <q-input outlined type="textarea" dense v-model="statusChangeObject.note" />
                </div>

                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Show until</div>
                  <q-input dense outlined v-model="statusChangeObject.showUntil">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                
                <div class="full-width" v-if="editedItem.identification_uni && editedItem.identification_uni.id == 5">

                  <div class="row">

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                      <q-input outlined dense v-model="editedItem.sticker_range_start" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="editedItem.sticker_range_end" />
                    </div>

                  </div>

                  <div class="row" v-if="statusChangeObject.quantity <= 1">
                      <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                        <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                      </div>
                  </div>
                  
                  <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedItem.quantity">
                    
                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">New Sticker range</div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeEnd" />
                    </div>

                  </div>

                </div>

              </div>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn
                flat
                label="Cancel"
                color="primary"
                v-close-popup
                @click="cancelStatus"
              ></q-btn>
              <q-btn
                flat
                label="Confirm"
                color="primary"
                @click="confirmStatusChanges"
              ></q-btn>
            </q-card-actions>

          </q-card>
    </dialog-draggable>

    <dialog-draggable :width="700" :modelDialog="transfered" :title=" 'Transfered' " @onHide="transfered=false">
        <q-card>
          <q-toolbar>

            <!-- <q-avatar>
              <span class="mdi mdi-truck-delivery mdi-24px" style="color: orange"></span>
            </q-avatar> -->

            <q-toolbar-title class="row justify-between">
              <!-- Transfer -->
              <div v-if="editedItem.quantity > 1">
                {{ editedItem.quantity - statusChangeObject.quantity }}
                left
              </div>
            </q-toolbar-title>

          </q-toolbar>

          <q-card-section>
            <div class="row">

              <div class="col-2 q-pr-sm q-pl-sm">
                <div class="text-subtitle2 q-mb-sm">Qty</div>
                <q-input 
                  outlined 
                  dense 
                  v-model="statusChangeObject.quantity" 
                  :disable="editedItem.quantity <= 1" 
                  :rules="[ val => val <= editedItem.quantity || 'Number cant be more than ' + editedItem.quantity]"
                />
              </div>

              <div class="col-4 q-pr-sm q-pl-sm">
                <div class="text-subtitle2 q-mb-sm">School to transfer to</div>
                <q-select  
                  dense
                  outlined
                  use-input
                  hide-selected
                  fill-input
                  input-debounce="0"
                  :options="optionsSchool"
                  @filter="filterSchool"
                  v-model="statusChangeObject.schoolToTransfer"
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

              <div class="col-2 q-pr-sm q-pl-sm">
                <div class="text-subtitle2 q-mb-sm">Allocation</div>
                <q-select outlined dense v-model="allocationSelected" :options="optionsAllocation"/>
              </div>

              <div class="col-4 q-pr-sm q-pl-sm">
                <div class="text-subtitle2 q-mb-sm">Location within school</div>
                <q-input outlined dense v-model="statusChangeObject.locationWithinSchool" />
              </div>

              <div class="col-9 q-pr-sm q-pl-sm q-mt-md">
                <div class="text-subtitle2 q-mb-sm">Transfer Note</div>
                <q-input outlined type="textarea" dense v-model="statusChangeObject.note" />
              </div>

              <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                <div class="text-subtitle2 q-mb-sm">Show until</div>
                <q-input dense outlined v-model="statusChangeObject.showUntil">
                  <template v-slot:append>
                    <q-icon name="event" class="cursor-pointer">
                      <q-popup-proxy transition-show="scale" transition-hide="scale">
                      <q-date v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
                        <div class="row items-center justify-end q-gutter-sm">
                          <q-btn label="Cancel" color="primary" flat v-close-popup />
                          <q-btn label="OK" color="primary" flat v-close-popup />
                        </div>
                      </q-date>
                    </q-popup-proxy>
                    </q-icon>
                  </template>
                </q-input>
              </div>

              <div class="full-width" v-if="editedItem.identification_uni && editedItem.identification_uni.id == 5">

                <div class="row">

                  <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                    <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                    <q-input outlined dense v-model="editedItem.sticker_range_start" />
                  </div>

                  <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                    <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                    <q-input outlined dense v-model="editedItem.sticker_range_end" />
                  </div>

                </div>

                <div class="row" v-if="statusChangeObject.quantity <= 1">
                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                    </div>
                </div>
                
                <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedItem.quantity">
                  
                  <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                    <div class="text-subtitle2 q-mb-sm">New Sticker range</div>
                    <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                  </div>

                  <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                    <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                    <q-input outlined dense v-model="statusChangeObject.stickerRangeEnd" />
                  </div>

                </div>

              </div>


            </div>
          </q-card-section>
          
          <q-card-actions align="right">
            <q-btn
              flat
              label="Cancel"
              color="primary"
              v-close-popup
              @click="cancelStatus"
            ></q-btn>
            <q-btn
              flat
              label="Confirm"
              color="primary"
              @click="confirmStatusChanges"
            ></q-btn>
          </q-card-actions>

        </q-card>
    </dialog-draggable>

    <dialog-draggable :width="700" :modelDialog="stored" :title=" 'Stored' " @onHide="stored=false">
          <q-card>
            <q-toolbar>

              <!-- <q-avatar>
                <span class="mdi mdi-dolly mdi-red mdi-24px" style="color: blue"></span>
              </q-avatar> -->

              <q-toolbar-title class="row justify-between">
                <!-- Stored -->
                <div v-if="editedItem.quantity > 1">
                  {{ editedItem.quantity - statusChangeObject.quantity }}
                  left
                </div>
              </q-toolbar-title>

            </q-toolbar>

            <q-card-section>
              <div class="row">

                <div class="col-2 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Qty</div>
                  <q-input 
                    outlined 
                    dense 
                    v-model="statusChangeObject.quantity" 
                    :disable="editedItem.quantity <= 1" 
                    :rules="[ val => val <= editedItem.quantity || 'Number cant be more than ' + editedItem.quantity]"
                  />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location</div>
                  <q-input disable outlined dense v-model="statusChangeObject.location" />
                </div>

                <div class="col-5 q-pr-sm q-pl-sm">
                  <div class="text-subtitle2 q-mb-sm">Location within school</div>
                  <q-input disable outlined dense v-model="statusChangeObject.locationWithinSchool" />
                </div>

                <div class="col-9 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Note</div>
                  <q-input outlined type="textarea" dense v-model="statusChangeObject.note" />
                </div>

                <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                  <div class="text-subtitle2 q-mb-sm">Show until</div>
                  <q-input dense outlined v-model="statusChangeObject.showUntil">
                    <template v-slot:append>
                      <q-icon name="event" class="cursor-pointer">
                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                        <q-date v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
                          <div class="row items-center justify-end q-gutter-sm">
                            <q-btn label="Cancel" color="primary" flat v-close-popup />
                            <q-btn label="OK" color="primary" flat v-close-popup />
                          </div>
                        </q-date>
                      </q-popup-proxy>
                      </q-icon>
                    </template>
                  </q-input>
                </div>
                
                <div class="full-width" v-if="editedItem.identification_uni && editedItem.identification_uni.id == 5">

                  <div class="row">

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                      <q-input outlined dense v-model="editedItem.sticker_range_start" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="editedItem.sticker_range_end" />
                    </div>

                  </div>

                  <div class="row" v-if="statusChangeObject.quantity <= 1">
                      <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                        <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                      </div>
                  </div>
                  
                  <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedItem.quantity">
                    
                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">New Sticker range</div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                      <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                      <q-input outlined dense v-model="statusChangeObject.stickerRangeEnd" />
                    </div>

                  </div>

                </div>

              </div>
            </q-card-section>
            
            <q-card-actions align="right">
              <q-btn
                flat
                label="Cancel"
                color="primary"
                v-close-popup
                @click="cancelStatus"
              ></q-btn>
              <q-btn
                flat
                label="Confirm"
                color="primary"
                @click="confirmStatusChanges"
              ></q-btn>
            </q-card-actions>

          </q-card>
    </dialog-draggable>

  </div>
</template>

<script>

import {exportFile} from 'quasar'
import lodash from 'lodash'
import axios from 'axios'
import config from '../../../config'

let oldObject = {}
let typingTimer
let doneTypingInterval = 500

import dialogDraggable from '../../components/DialogDraggable'


export default {
  name: 'InventoryTitle2',
    components: {
      dialogDraggable
  },
  data() {
    return {
      mode: 'list',
      tab: '2',
      pages: 1,
      pagination: { rowsPerPage: 10 },
      current: 1,
      count: 10,
      data: [],
      tempDataX: [],
      columns: [
        {
          name: "toggle",
          style: 'width: 30px'
        },
        {
          name: "qty",
          align: "left",
          label: "Qty",
          field: "qty",
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
          name: "itemName",
          align: "left",
          label: "Item Name",
          field: "itemName",
          sortable: true
        },
        {
          name: "vendor",
          align: "left",
          label: "Vendor",
          field: "vendor",
          sortable: true
        },
        {
          name: "costPerItem",
          align: "left",
          label: "Cost Per Item",
          field: "costPerItem",
          sortable: true
        },
        {
          name: "totalCost",
          align: "left",
          label: "Total Cost",
          field: "totalCost",
          sortable: true
        },
        {
          name: "dateOfPurchase",
          align: "left",
          label: "Date Of Purchase",
          field: "dateOfPurchase",
          sortable: true
        },
        {
          name: "condition",
          align: "left",
          label: "Condition",
          field: "condition",
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
          name: "actions",
          align: "left",
          label: "Actions",
          field: "actions",
          sortable: true
        },
      ],
      editedItem: {},

      filter: '',
      filterCategoryValue: '',
      filterVendor: '',
      filterCondition: '',
      filterStatus: '',

      loading: true,
      confirm: false,
      typeModel: '',
      optionsSchool: [],
      optionsSchoolForFilter: [],
      optionsAllocation: [
        { id: 1, label: 'Title I' },
        { id: 2, label: 'Title II' },
        { id: 3, label: 'Title III' },
        { id: 4, label: 'Title IV' },
        { id: 5, label: 'ESSER' },
        { id: 6, label: 'GEEP' }
      ],
      allocationSelected: this.tab == '1' && { id: 1, label: 'Title I' },
      optionsCategory: [],
      optionsCategoryForFilter: [],
      optionsSupplier: [],
      optionsSupplierForFilter: [],
      optionsIdentifier: [],
      optionsCondition: [],
      optionsStatus: [],
      typeModel: null,
      addNew: false,
      barInfo: {},
      rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
      onpremise: false,
      offpremise: false,
      disposed: false,
      lost: false,
      stolen: false,
      transfered: false,
      stored: false,
      date: '2020-06-06',
      statusChangeObject: {
        // quantity: '',
        // schoolToTransfer: null,
        // location: '',
        // locationWithinSchool: '',
        // note: '',
        // serial: '',
        // showUntil: '2020-06-06',

        // stickerRangeStart: '',
        // stickerRangeEnd: '',
        // newStickerId: '',
        // newSerial: '',
      },
      statusChanged: false,
    }
  },
  methods: {
    openDeleteModal(item) {
      this.item = item
      this.confirm = true
    },
    deleteItem() {
      let item = this.item
      // const index = this.data.indexOf(item)
      // this.data.splice(index, 1)
      const conf = {
        method: 'DELETE',
        url: config.getInventory + item.id,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf)
      .then(res => {
        console.log('DELETE RES :', res)
        const index = this.data.indexOf(item)
        this.data.splice(index, 1)
          this.$q.notify({
            message: res.data,
            type: 'positive',
          })
      })

    },
    filterType() {
      if(this.typeModel) {
        if(this.typeModel == 'Professional Development') {
          this.data = this.tempDataX.filter(a => a.type == 'PD');
        }else {
          this.data = this.tempDataX.filter(a => a.type == 'FE');
        }
      }else {
        this.data = this.tempDataX
      }
    },
    addEmptyRow() {
      let id = Math.floor(Math.random() * 100)

      let obj = {
        id: id,
        qt0: 0,
        categoryDescription: '',
        itemName: '' ,
        vendor: '',
        identifier: '',
        mpsId: 0,
        serial: parseInt((id * 8) / 4),
        costPerItem: 0,
        totalCost: 0,
        type: 'PD',
        dateOfPurchase: '24-11-2020',
        condition: '',
        location: '',
        classroomOrLocationWithinSchool: '',
        dateAndExplanationOfRemoval: '',
        status: '',
        notes: '',
        // changed: false,
        // showEditButton: true,
      }
      this.data.unshift(obj)
    },
    copyRowData(index) {
      oldObject = JSON.stringify(this.tempDataX[index])
    },
    copyRow(row, index) {
      oldObject = JSON.stringify(this.tempDataX[index])
      // oldObject = JSON.stringify(row)
      // console.log('tempDataX', JSON.stringify(this.data[index]))
      // let old = JSON.stringify(this.data[index])

      // let newData = this.data[index]
      // newData.id =  Math.floor(Math.random() * 50)
      // newData.changed = true
      // let ddd = JSON.stringify(newData)
      // console.log('new data', JSON.stringify(newData))

      // let i = index+1

      // this.data.splice(i, 0, JSON.parse(ddd));

      // Object.assign(this.data[index], JSON.parse(old));
    },
    detectChange(index) {

      this.editedItem = this.tempDataX[index]
      console.log('detectChange function', this.editedItem)

      let d = JSON.parse(oldObject)
      let f = JSON.stringify(this.data[index])
          f = JSON.parse(f)

      let status = _.isEqual(d, f)

      if(status) {
        this.data[index].changed = false
      }else {
        this.data[index].changed = true
      }


    },
    changeStatus(index) {

      this.editedItem = this.data[index]
      this.statusChangeObject = {
        quantity: this.editedItem.quantity,
        schoolToTransfer: null,
        location: '',
        locationWithinSchool: '',
        note: '',
        serial: '',
        showUntil: '',
        stickerRangeStart: '',
        stickerRangeEnd: '',
        newSerial: '',
      }

      this.getSchools();

      this.statusChangeObject.serial = this.editedItem.serial_number
      console.log('change status', this.data[index].status_uni)
      
      if(this.data[index].status_uni.label == 'On Premise') {

        this.onpremise = true
        this.statusChangeObject.location = this.$route.query.name
        if (this.editedItem.quantity <= 1) {
          this.statusChangeObject.locationWithinSchool = ''
        }
        
      }
      else if(this.data[index].status_uni.label == 'Off Premise') {
        this.offpremise = true      
        this.statusChangeObject.location = 'Off Premise'
        if (this.editedItem.quantity <= 1) {
          this.statusChangeObject.locationWithinSchool = ''
        }

      }
      else if(this.data[index].status_uni.label == 'Disposed') {
        this.disposed = true
        this.statusChangeObject.location = 'Disposed'   
        if (this.editedItem.quantity <= 1) {
          this.statusChangeObject.locationWithinSchool = ''
        }    
      }
      else if(this.data[index].status_uni.label == 'Lost') {

        this.lost = true    
        this.statusChangeObject.location = 'Lost'
        if (this.editedItem.quantity <= 1) {
          this.statusChangeObject.locationWithinSchool = ''
        }

      }
      else if(this.data[index].status_uni.label == 'Stolen') {
        this.stolen = true     
        this.statusChangeObject.location = 'Stolen'
        if (this.editedItem.quantity <= 1) {
          this.statusChangeObject.locationWithinSchool = ''
        }  
      }
      else if(this.data[index].status_uni.label == 'Transfered') {
        this.transfered = true     
        this.statusChangeObject.location = 'Transfered'

        switch(this.tab) {
          case '1':
            this.allocationSelected = this.optionsAllocation[0]
            break;
          case '2':
            this.allocationSelected = this.optionsAllocation[1]
            break;
          case '3':
            this.allocationSelected = this.optionsAllocation[2]
            break;
          case '4':
            this.allocationSelected = this.optionsAllocation[3]
            break;
          case '5':
            this.allocationSelected = this.optionsAllocation[4]
            break;
          case '6':
            this.allocationSelected = this.optionsAllocation[5]
            break;
        }

        if (this.editedItem.quantity <= 1) {
          
          this.statusChangeObject.locationWithinSchool = ''
        }  
      }
      else {
        this.stored = true
        this.statusChangeObject.location = 'Stored'
        if (this.editedItem.quantity <= 1) {
          
          this.statusChangeObject.locationWithinSchool = ''
        }
      }

    },
    cancellChange(index) {

      if(this.addNew) {
        this.data.splice(0, 1)
        this.addNew = false
      } else {
        let d = JSON.parse(oldObject)
        Object.assign(this.data[index], d);
        this.data[index].changed = false
      }

    },
    cancelStatus() {
      console.log('cancel status')

      let d = JSON.parse(oldObject)
      console.log(d)
      let index = this.data.findIndex( item => item.id === d.id )
      console.log('old', index)

      this.data[index].status_uni = d.status_uni
      this.statusChanged = false

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
    closePopup() {
      this.onpremise = false
      this.offpremise = false
      this.disposed = false
      this.lost = false
      this.stolen = false
      this.transfered = false
      this.stored = false
    },

    // Filter key events
    keyUpFilter() {
      console.log('Key up')
      clearTimeout(typingTimer);
      typingTimer = setTimeout(this.doneTyping, doneTypingInterval);
    },
    keyDownFilter() {
      console.log('Key down')
      clearTimeout(typingTimer);
    },
    doneTyping() {
      console.log('Typing done!')
      if(this.filter.length > 1 || this.filter.length == 0) {
        console.log('Send Request...')
        this.filterInventory()
      }
    },

    changePagination (val) {

      console.log('change pagination')
      this.current = val
      this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, val )
    },
    changeRowsPerPage() {

      console.log('changeRowsPerPage')
      
      this.count = this.pagination.rowsPerPage
      this.current = 1

      this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )

    },
    identifierCheckQuantity(index) {

      this.editedItem = this.tempDataX[index]
      let i = this.optionsIdentifier.findIndex( item => item.id == 5 )
      let indexSticker = this.optionsIdentifier.findIndex( item => item.id == 2 )

      if(this.editedItem.quantity <= 1) {
        this.optionsIdentifier[i].disable = true
        this.optionsIdentifier[indexSticker].disable = false
      } else {
        this.optionsIdentifier[i].disable = false
        this.optionsIdentifier[indexSticker].disable = true
      }

    },

    filterCategory (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsCategory = this.optionsCategoryForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterSupplier (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
      })
    },
    filterSchool (val, update, abort) {
      update(() => {
        const needle = val.toLowerCase()
        this.optionsSchool = this.optionsSchoolForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
      })
    },


    getToday() {
      let dateObj = new Date();
      let month = dateObj.getUTCMonth() + 1; //months from 1-12
      let day = dateObj.getUTCDate();
      let year = dateObj.getUTCFullYear();

      return year + "-" + month + "-" + day;
    },
    // Add new Row 
    addNewRow() {
      
      let date = this.getToday()

      const obj  = {
        quantity: 1,
        add: true,
        inventory_category_uni: {
          id: 1,
          label: 'Comprehension'        
        },
        item_name: '',
        inventory_supplier_uni: {
          id: 10001,
          label: 'A CHANCE TO GROW'       
        },
        item_cost: 0,
        purchase_date: date,
        condition:  {
          id: 1,
          label: 'Excelent'
        },
        status_uni: {
          id: 1,
          label: 'On Premise'
        },
        identification_uni: {
          id: 1,
          label: 'Stamp'
        },
        district_assigned_id: 0,
        serial_number: 0,
        location: '',
        location_information_note: '',
        transition_information_note: '',
        notes: '',
        changed: true,
        showEditButton: false,
      }

      this.data.unshift(obj)
      this.editedItem = obj
    
    },
    confirmStatusChanges() {

      this.statusChanged = true
      this.closePopup()

    },
    checkQuantity(quantity, index) {

      if(quantity < 1) {
        let i = this.optionsIdentifier.findIndex( item => item.id == 5 )

        if(this.editedItem.quantity <= 1) {
          this.optionsIdentifier[i].disable = true
        } else {
          this.optionsIdentifier[i].disable = false
        }

        this.data[index].identification_uni = this.optionsIdentifier[0]
      }

      if(this.data[index].identification_uni.id == 5 && this.editedItem.quantity <= 1) {
        this.$q.notify({
          message: 'When Identifier status equals Sticker Range you can not change quality 1! /t asdasd',
          type: 'negative',
          color: 'yellow',
          textColor: 'black'
        })
        this.data[index].identification_uni = this.optionsIdentifier[0]
      }
    },

    allocationParsing(data) {
      for(let i=0; i<data.length; i++) {

        // Inventory
        if(data[i].inventory_category != null) {
          let obj = {
            id: data[i].inventory_category.id,
            label: data[i].inventory_category.category_name,
            value: data[i].inventory_category.id
          }
          data[i].inventory_category_uni = obj
        }
        else {
          data[i].inventory_category_uni = {
            id: 0,
            label: 'N/A',
            value: 0
          }
        }


        // Suplier
        if(data[i].inventory_supplier != null) {

          let objSuplier = {
            id: data[i].inventory_supplier.id,
            label: data[i].inventory_supplier.short_name,
            value: data[i].inventory_supplier.id
          }

          data[i].inventory_supplier_uni = objSuplier
        }else {
          data[i].inventory_supplier_uni = {
            id: 0,
            label: 'N/A'       
          }
        }

        // Condition
        let conditionObj = {
          id: data[i].condition_id,
          label: data[i].condition
        }
        data[i].condition = conditionObj
        
        // Status
        let statusId = data[i].status
        let statusName = ''

        switch(statusId) {
          case 1:
            statusName = "On Premise"
            break;
          case 2:
            statusName = "Off Premise"
            break;
          case 3:
            statusName = "Disposed"
            break;
          case 4:
            statusName = "Lost"
            break;
          case 5:
            statusName = "Stolen"
            break;
          case 6:
            statusName = "Transfered"
            break;
          case 7:
            statusName = "Stored"
            break;
          default:
            break;
        }

        let statusObj = {
          id: data[i].condition_id,
          label: statusName
        }
        data[i].status_uni = statusObj

        // Identification
        let identificationObj = {
          id: data[i].identification_id,
          label: data[i].identification
        }
        data[i].identification_uni = identificationObj

        data[i].changed = false
        data[i].showEditButton = true
      }

      console.log('DATA ==============', data)
      return data
    },

    // Requests
    getAllocationBar(type, id) {
        const conf = {
          method: 'GET',
          url: config.getInventoryTotalCost + type + '/' + id,
          headers: {
              Accept: 'application/json',
          }
        }
        axios(conf).then(res => {
            this.barInfo = res.data
            console.log('Bar info', this.barInfo)
        })
    },
    getInventoryByType(type, id, limit, page) {
        this.loading = true

        const conf = {
            method: 'GET',
            url: config.getInventory + type + '/' + id + '?limit=' + limit + '&page=' + page,
            headers: {
                Accept: 'application/json',
            }
        }

        axios(conf).then(res => {

            console.log('grigor ghazaryan', res.data)
            let data = res.data.inventory
            this.pages = res.data.pagesCount

            // Allocation parsing function here
            let finalResult = this.allocationParsing(data)
            
            this.data = finalResult
            this.tempDataX = finalResult

            this.loading = false
            console.log('this.datathis.data', this.data)
        });
    },
    getAdditionalInfo(type) {
        const conf = {
            method: 'GET',
            url: config.getAdditionalInfoForInventory + '/' + type,
            headers: {
                Accept: 'application/json',
            }
        }
        axios(conf).then(res => {

            console.log('getAdditionalInfoForInventory', res.data)

            let conditionsArr = []
            for(let i=0; i<res.data.conditions.length; i++) {
                let obj = {
                    id: res.data.conditions[i].id,
                    label: res.data.conditions[i].condition_name
                }
                conditionsArr.push(obj)
            }
            this.optionsCondition = conditionsArr
            console.log('CONDITION ARR =',this.optionsCondition  )


            // Status
            let statusArr = []
            for(let i=0; i<res.data.status.length; i++) {
                let obj = {
                    id: res.data.status[i].id,
                    label: res.data.status[i].status_name
                }
                statusArr.push(obj)
            }
            this.optionsStatus = statusArr


            // Category
            let categoryArr = []
            for(let i=0; i<res.data.categories.length; i++) {
                let obj = {
                    id: res.data.categories[i].id,
                    label: res.data.categories[i].category_name,
                    value: res.data.categories[i].id
                }
                categoryArr.push(obj)
            }
            this.optionsCategory = categoryArr
            this.optionsCategoryForFilter = categoryArr


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

            // Identifications
            let identArr = []
            for(let i=0; i<res.data.identifications.length; i++) {
                let obj = {
                    id: res.data.identifications[i].id,
                    label: res.data.identifications[i].identifcation_name
                }
                identArr.push(obj)
            }
            this.optionsIdentifier = identArr

            console.log('4444444444444444444',this.optionsSupplier)


        })
    },
    editInventory(index) {

      const updateData = {
        school_id: this.editedItem.school_id,
        allocation_type_id: parseInt(this.editedItem.allocation_type_id),
        quantity:  this.editedItem.quantity,
        inventory_category_type_id:  this.editedItem.inventory_category_uni.id,
        item_name: this.editedItem.item_name,
        supplier_id: this.editedItem.inventory_supplier_uni.id,
        item_cost: this.editedItem.item_cost,
        inventory_condition_type_id: this.editedItem.condition.id,
        status_id: this.editedItem.status_uni.id,
        inventory_identification_type_id: this.editedItem.identification_uni.id,
        district_assigned_id: this.editedItem.district_assigned_id,
        serial_number: this.editedItem.serial_number,
        location: this.editedItem.location,
        location_information_note: this.editedItem.location_information_note,
        note:  this.editedItem.note
      }

      const modifyData = {

        status_id: this.editedItem.status_uni.id,
        quantity: parseInt(this.statusChangeObject.quantity),
        sticker_range_start: this.editedItem.sticker_range_start,
        sticker_range_end: this.editedItem.sticker_range_end,
        location: this.statusChangeObject.location,
        location_information_note: this.statusChangeObject.locationWithinSchool,
        note: this.statusChangeObject.note,
        visibility_date: this.statusChangeObject.showUntil,
        new_sticker_range_start: this.statusChangeObject.stickerRangeStart,
        new_sticker_range_end: this.statusChangeObject.stickerRangeEnd,
        allocation_type_id: this.allocationSelected.id,
        school_id: this.statusChangeObject.schoolToTransfer && this.statusChangeObject.schoolToTransfer.id,

      }

      let finalData = {}

      if(this.addNew) {

        updateData.schoolYearId = 21

        const conf = {
          method: 'POST',
          url: config.addInventory,
          headers: {
            Accept: 'application/json',
          },
          data: updateData
        }

        axios(conf)
          .then(res => {

            this.$q.notify({
              message: 'Inventory Added successfully!',
              type: 'positive',
            })

            this.data[index].changed = false
            this.data[index].showEditButton = true

            this.data[index].id = res.data.inventory[0].id
            this.data[index].add = false

            this.addNew = false
            this.statusChanged = false

          })

      } 
      else {

        console.log('status changed', this.statusChanged)
        
        finalData.updateData = updateData

        if(this.statusChanged) {
          finalData.modifyData = modifyData
        }else {
          finalData.modifyData = {}
        }

        let id = this.editedItem.id

          const conf = {
            method: 'PUT',
            url: config.modifyInventoryStatus + id,
            headers: {
              Accept: 'application/json',
            },
            data: finalData
          }

          axios(conf).then(res => {

            this.$q.notify({
              message: 'Inventory updated successfully!',
              type: 'positive',
            })

            let currentInventory = this.allocationParsing(res.data.currentInventory),
                newInventory;

            if(res.data.newInventory.length) {
              newInventory = this.allocationParsing(res.data.newInventory);
              this.data.unshift(newInventory[0])
            }
            

            let _index = this.data.findIndex( item => item.id === currentInventory[0].id )
            this.data = Object.assign( [], this.data, { [_index]: currentInventory[0] } ) 
            this.statusChanged = false
            

          })
      }
      

    },
    getSchools() {

      const conf = {
        method: 'GET',
        url: config.getSchools,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        let schoolsArr = []
        for(let i=0; i<res.data.length; i++) {
          let obj = {
            id: res.data[i].id,
            name: res.data[i].school_name,
            label: res.data[i].school_name,
            value: res.data[i].id,
          }
          schoolsArr.push(obj)
        }
        this.optionsSchool = schoolsArr
        this.optionsSchoolForFilter = schoolsArr
        console.log(schoolsArr)
      })
    },
    editInventoryRequest(index, data) {

        this.data[index].changed = false
        data.school_year_id = this.editedItem.school_year_id
        data.purchase_date = this.editedItem.purchase_date

        const conf = {
          method: 'PUT',
          url: config.getInventory + this.editedItem.id,
          headers: {
            Accept: 'application/json',
          },
          data: data
        }

        axios(conf)
          .then(res => {
            this.$q.notify({
              message: 'Inventory updated successfully!',
              type: 'positive',
            })
          })
    },
    filterInventory() {
      this.loading = true
      console.log('filterInventory')

      let uri = '';

      if(this.filter != '') {
        uri += '&search=' + this.filter
      }

      if(this.filterCategoryValue != '') {
        uri += '&category=' + this.filterCategoryValue.id
      }

      if(this.filterVendor != '') {
        uri += '&supplier=' + this.filterVendor.id
      }

      if(this.filterCondition != '') {
        uri += '&condition=' + this.filterCondition.id
      }

      if(this.filterStatus != '') {
        uri += '&status=' + this.filterStatus.id
      }

      console.log('URI', uri)

      const conf = {
        method: 'GET',
        url: config.filterInventory + '1/' + this.$route.params.id + '?' + uri,
        headers: {
          Accept: 'application/json',
        }
      }

      axios(conf).then(res => {
        console.log('res', res)

        this.pages = res.data.pagesCount
        let data = res.data.inventory
        let filteredData = this.allocationParsing(data)

        this.data = filteredData
        this.tempDataX = filteredData

        this.loading = false
      });

    }

  },
  created() {
    this.getInventoryByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
    this.getAdditionalInfo(2)
  },
}
</script>

<style>

</style>