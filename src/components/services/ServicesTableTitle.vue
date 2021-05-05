<template>
    <div>
        <q-table
            :data="data" 
            :columns="columns"
            :loading="loading"
            :pagination.sync="pagination"
            class="overflow-auto my-sticky-column-table"
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
      
                <!-- <q-select class="q-mr-md" style="min-width: 200px; max-width: 200px" 
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
                    
                </q-select> -->

                <q-btn 
                    square
                    class="q-mr-md edx-add-btn" text-color="white"
                    icon="add" 
                    no-caps
                    @click="openNewActivityPopup"
                >
                    Add
                </q-btn>

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

                <q-btn round size="10px" icon="price_check" @click="showRemainingBalance=true" no-caps class="edx-ledger-balance-btn q-ml-md" flat> 
                    <q-tooltip content-class="edx-tooltip">View Ledger Balances</q-tooltip>
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

                

                <div class="q-pa-sm q-gutter-sm">

                    <q-dialog v-model="confirm" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this item?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                            <q-btn flat label="No, thanks" color="primary" v-close-popup />
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteItem" />
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
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteAttendee" />
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

                    <q-dialog v-model="confirmTeacherModal" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this item?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                            <q-btn flat label="No, thanks" color="primary" v-close-popup />
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteTeacherItem" />
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
                            <q-btn label="Yes" color="edx-delete-btn" v-close-popup @click="deleteDate" />
                        </q-card-actions>
                        </q-card>
                    </q-dialog>

                </div>

            </template>

            <!-- Table Body -->
            <template v-slot:body="props">
            
                <q-tr :props="props" class="cursor-pointer" @click="openActivityPopup(props.row, props.rowIndex)">
                    
         

                    <q-td key="provider" :props="props">
                        <div v-if="props.row.provider">
                            {{ props.row.provider.label }}
                        </div>
                    </q-td>

                    <q-td key="status" :props="props">

                        <q-icon
                            :name="activityStatusIcon(props.row.status_uni.id)" 
                            :class="activityStatusIconColor(props.row.status_uni.id)"
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>{{ props.row.status_uni.label }}</strong>
                            </q-tooltip>
                        </q-icon>

                    </q-td>

                    <q-td key="approvals" :props="props">

                        <q-icon 
                            :name="approvalStatusIcon(props.row.approval_status_uni.id)" 
                            :class="approvalStatusIconColor(props.row.approval_status_uni.id)"
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>
                                    {{props.row.approval_status_uni.label}}
                                </strong>
                            </q-tooltip>
                        </q-icon>
                        
                        <q-icon 
                            :name="approvalTypeIcon(props.row.approval_type_uni.id)" 
                            :class="approvalTypeIconColor(props.row.approval_type_uni.id)" 
                        >
                            <q-tooltip 
                                content-class="edx-tooltip"
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
                                class="edx-green"
                                style="font-size: 1.5em" 
                                v-if="props.row.repeat" 
                            />
                            <q-icon 
                                name="all_inclusive" 
                                class="edx-blue"
                                style="font-size: 1.5em" 
                                v-if="props.row.multi" 
                            />
                        </span>

                    </q-td>

                    <q-td key="noAttending" :props="props">
                        
                        <div>

                            {{ props.row.no_attending }}
                            <span class="q-ml-sm">
                                <q-icon name="people_alt" class="edx-green" style="font-size: 1.5em"/>
                            </span>

                        </div>
                    </q-td>

                    <q-td key="amount" :props="props">
                        <div>$ {{ props.row.amount }}</div>
                    </q-td>

                    <q-td key="type" :props="props">

                        <q-chip 
                            square 
                            color="edx-bg-i"
                        >
                            <span>I</span>
                            <q-tooltip 
                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                transition-show="flip-right"
                                transition-hide="flip-left"
                            >
                                <strong>Instruction</strong>
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
                        <q-fab padding="xs" @click.stop color="edx-action-btn" icon="toc" active-icon="menu_open"  direction="left">
                            
                            <q-fab-action
                                icon="content_copy"
                                color="edx-duplicate-btn" 
                                size=sm 
                                no-caps
                                round 
                                class="q-mr-sm"
                                @click="openDuplicatePopup(props.row)"
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
                                color="edx-delete-btn" 
                                size=sm 
                                no-caps
                                round
                                @click="openDeleteModal(props.row)" 
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

        <dialog-draggable 
            :width="850" 
            :modelDialog="isShowActivityPopup" 
            :title="'Service Details'" 
            @onHide="isShowActivityPopup=false"
            :icon="'calendar_today'"
            
        >
            <div class="q-pa-md">
                <div class="row">

                    <div class="col-md-6 q-pr-lg">

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Service Name</div>
                            <q-input
                                outlined
                                v-model="editedItem.activity" 
                                dense 
                                autofocus
                            />
                        </div>

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Service Description</div>
                            <q-input
                                type="textarea"
                                outlined
                                v-model="editedItem.description" 
                                dense 
                                autofocus
                                rows="2"
                            />
                        </div>

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Campus</div>
                            <q-select  
                                outlined
                                dense
                                input-debounce="0"
                                v-model="editedItem.campus" 
                                :options="optionsCampus"
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

                        <div class="q-mb-md">
                            <div class="text-subtitle2 q-mb-sm">Provider</div>
                            <q-select  
                                dense
                                outlined
                                use-input
                                hide-selected
                                fill-input
                                input-debounce="0"
                                v-model="editedItem.provider" 
                                :options="optionsSupplier"
                                @filter="filterSupplier"
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
                                <div class="text-subtitle2 q-mb-sm">Cost</div>
                                <q-input prefix="$" class="q-mb-md" outlined type="text" v-model="editedItem.amount" dense autofocus />
                                <q-popup-edit v-model="editedItem.amount" title="Update amount" buttons>
                                    <q-input prefix="$" class="q-mb-sm" type="text" v-model="editedItem.amount" dense outlined autofocus />
                                    <q-input prefix="%" v-model="editedItem.percentage"  type="number" outlined  
                                    :label="editedItem.type_uni && (editedItem.type_uni.label + ' Percentage') " dense autofocus/>
                                </q-popup-edit>
                            </div>
                            <div class="col-md-6">
                                <div class="text-subtitle2 q-mb-sm">Total with markup</div>
                                <q-input prefix="$" standout readonly  class="q-mb-md" type="text" 
                                v-model="totalMarkup" dense autofocus />
                            </div>
                        </div>

                    </div>

                    <div class="col-md-6 q-pl-md">

                        <div class="row">

                            <div class="col-md-3 q-pr-sm q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Category</div>
                                <div class="row cursor-pointer h-popup">

                                    <div>
                                        <q-chip 
                                            square 
                                            color="edx-bg-m"
                                        >
                                            <span>M</span>
                                        </q-chip>
                                    </div>

                                </div>
                            </div>

                            <div class="col-md-3 q-pr-sm q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Subcategory</div>
                                <div class="row cursor-pointer h-popup">

                                    <div v-if="editedItem.subcategory_uni">
                                        <q-chip square color="edx-bg-m">
                                            <span>{{ editedItem.subcategory_uni.abbr }}</span>
                                        </q-chip>
                                    </div>

                                    <q-popup-edit v-model="editedItem.subcategory_uni" buttons>
                                        <div class="row  w-100 q-mb-lg q-mt-lg">
                                            
                                            <div class="col-md-12 q-pr-sm q-mb-md">
                                                <div class="text-subtitle2 q-mb-sm">Subcategory</div>
                                                <div class="row cursor-pointer h-popup">
                                                    <q-select 
                                                        class="w-100"
                                                        v-model="editedItem.subcategory_uni" 
                                                        :options="optionsSubcategory"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </q-popup-edit>  

                                </div>
                            </div>

                            <div v-if="optionsFundSource.length" class="col-md-6 q-pr-sm q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Fund Source</div>
                                <div class="row cursor-pointer h-popup">

                                    <div v-if="editedItem.fund_source">
                                        <q-chip 
                                            square 
                                            :class="fundSourceColor(editedItem.fund_source.abbr)"
                                        >
                                            <span>{{ editedItem.fund_source.abbr }}</span>
                                            <q-tooltip 
                                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                transition-show="flip-right"
                                                transition-hide="flip-left"
                                            >
                                                <strong>{{ editedItem.fund_source.label }}</strong>
                                            </q-tooltip>
                                        </q-chip>
                                    </div>

                                    <q-popup-edit  v-model="editedItem.fund_source" buttons>
                                        <div class="text-subtitle2">Fund Source</div>
                                        <div class="row q-mb-sm q-mt-sm">
                                            <div class="col-md-12 q-pr-sm q-mb-md">
                                                <div class="text-subtitle2 q-mb-sm"></div>
                                                <div class="row cursor-pointer h-popup">
                                                    <q-select 
                                                        class="w-100"
                                                        v-model="editedItem.fund_source" 
                                                        :options="optionsFundSource"
                                                        outlined
                                                        dense
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </q-popup-edit>  

                                </div>
                            </div>

                        </div>
                        
                        <div class="q-mb-md">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-subtitle2 q-mb-sm">Tracking Category</div>
                                    <q-select  
                                        outlined
                                        dense
                                        input-debounce="0"
                                        v-model="editedItem.tracking_category_uni" 
                                        :options="optionsCategoryTracking"
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
                            </div>
                        </div>

                        <div class="q-mb-md">
                            <div class="row">
                                <div class="col-md-12">
                                    <div class="text-subtitle2 q-mb-sm">Approval Status</div>
                                    <div v-if="editedItem.approval_status_uni" class="row h-popup">

                                        <div class="row">

                                            <!-- Approval status  -->
                                            <div class="q-mr-md cursor-pointer">

                                                <q-icon
                                                    class="q-mr-sm" 
                                                    :name="approvalStatusIcon(editedItem.approval_status_uni.id)" 
                                                    :class="approvalStatusIconColor(editedItem.approval_status_uni.id)"
                                                >
                                                </q-icon>
                                                <span>{{ editedItem.approval_status_uni.label }}</span>

                                            </div>
                                            <!-- End of Approval status  -->

                                            <!-- Approval type -->
                                            <div class="cursor-pointer">
                                                <q-icon 
                                                class="q-mr-sm" 
                                                :name="approvalTypeIcon(editedItem.approval_type_uni.id)" 
                                                :class="approvalTypeIconColor(editedItem.approval_type_uni.id)"></q-icon>
                                                <span>{{ approvalType(editedItem.approval_type_uni.id) }}</span>
                                            </div>
                                            <!-- End of Approval type -->
                                                

                                            <q-popup-edit v-model="editedItem.approval_status_uni"  title="Approvals" buttons >
                                                <div style="width: 450px !important;max-width: 450px !important;">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <q-select 
                                                                dense 
                                                                outlined 
                                                                v-model="editedItem.approval_status_uni" 
                                                                :options="approval"
                                                            />
                                                        </div>

                                                        <div class="col-md-7 q-ml-md" v-if="editedItem.approval_type_uni">

                                                            <q-option-group
                                                                :options="optionsApp"
                                                                label="Notifications"
                                                                type="radio"
                                                                v-model="editedItem.approval_type_uni.id"
                                                            />

                                                            <q-input 
                                                                :disable="editedItem.approval_type_uni.id !== 4" 
                                                                class="q-mt-md q-mb-lg" dense outlined v-model="editedItem.approver" 
                                                                label="Approver Name" 
                                                            />
                                                    
                                                        </div>
                                                    <q-separator />
                                                    </div>
                                                </div>
                                            </q-popup-edit>
                                            <!-- End of approval status -->

                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="q-mb-md" >
                            <div class="row">
                                <div v-if="editedItem.status_uni" class="col-md-5">
                                    <div class="text-subtitle2 q-mb-sm">Service Status</div>
                                    <div class="row">
                                        <div class="col-md-12">

                                            <div class="h-popup cursor-pointer">
                                                <q-icon 
                                                    :name="activityStatusIcon(editedItem.status_uni.id)" 
                                                    :class="activityStatusIconColor(editedItem.status_uni.id)" 
                                                    class="q-mr-sm"
                                                    style="font-size: 1.5em"
                                                ></q-icon>
                                                <span>{{ editedItem.status_uni.label }}</span>
                                            </div>

                                            <q-popup-edit v-model="editedItem.status_uni" 
                                            title="Service Status" buttons >
                                                <q-select  
                                                    outlined
                                                    dense
                                                    input-debounce="0"
                                                    v-model="editedItem.status_uni" 
                                                    :options="optionsStatus"
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
                                            
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-5"> 
                                    <div class="text-subtitle2 q-mb-sm">Documents and Tasks</div>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="h-popup cursor-pointer">
                                                <q-icon 
                                                    @click="openDocumentsModal"
                                                    name="folder"
                                                    class="edx-folder q-mr-sm"
                                                    style="font-size: 2em"
                                                ></q-icon>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="row" v-show="editedItem.status_uni && editedItem.status_uni.label == 'Completed' ">
                            <div class="col-md-12">
                                <div class="row">
                                    <div class="col-md-4 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Completed On</div>
                                        



                                        <q-input outlined dense class="q-mb-md" v-model="editedItem.completed_date">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                    <q-date color="edx-pagination" v-model="editedItem.completed_date">
                                                    <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                    </div>
                                                    </q-date>
                                                </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>





                                    </div>
                                    <div class="col-md-4" v-if="editedItem.billing">
                                        <div class="text-subtitle2 q-mb-sm">Billing Status</div>
                                        <div class="h-popup">
                                            <div class="cursor-pointer"><q-icon name="not_listed_location" style="font-size: 1.7em; color: #4daf4f"/>{{ editedItem.billing.label }}</div>
                                            <q-popup-edit v-model="editedItem.billing" title="Billing Status" buttons >
                                                <q-select  
                                                    outlined
                                                    dense
                                                    input-debounce="0"
                                                    v-model="editedItem.billing" 
                                                    :options="optionsBilling"
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
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div v-show="!isDuplicate && isEdit" class="col-md-12 q-mt-lg">
                        <DateOfActivityTable
                            :dateOfActivity="dateOfActivityTableData" 
                            @openEditPopup="openEditSchedulePopup"
                            @openDeletePopup="openDeleteDate"
                        />
                        <div class="q-ml-md q-mt-md q-mb-md">
                            <q-btn @click="addDate" icon="add" color="blue" round/>
                        </div>
                    </div>

                    <div class="col-md-12 q-mt-md">
                        <div class="row">
                            <div v-if="!isDuplicate && isEdit" class="col-md-3">

                                <div class="text-subtitle1 row justify-start items-center">
                                    <q-icon class="q-mr-sm" name="people_alt"  color="green" style="font-size: 1.5em"/>
                                    Attendee Summary:
                                </div>
                                
                                <div @click="showAttendingDialog()" v-if="editedItem.noAttendingArr && editedItem.noAttendingArr.attendeesData.length"
                                    class="cursor-pointer q-mt-md">
                                    <div v-for="(attendee, i) in editedItem.noAttendingArr.attendeesData" :key="i">
                                    <div>
                                        <span v-if="attendee.all">All</span>
                                        <span v-else>{{ attendee.no }}</span>
                                        <span class="q-ml-sm">{{ attendee.type.label }}</span>
                                    </div>
                                    </div>
                                </div>

                                <div @click="showAttendingDialog()" class="cursor-pointer" v-else>No Attendees found.</div>

                            </div>
                            <div :class="isDuplicate || !isEdit ? 'col-md-12' : 'col-md-9 q-pl-md'">
                                <div class="text-subtitle2 q-mb-sm">Note</div>
                                <q-input 
                                    dense 
                                    outlined
                                    type="textarea"
                                    v-model="editedItem.note" 
                                />
                            </div>
                        </div>
                    </div>


                </div>
            </div>

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn v-if="isEdit && !isDuplicate" :loading="btnLoading" @click="editActivity" flat label="Save" color="primary" />
                <q-btn v-if="!isEdit && !isDuplicate" :loading="btnLoading" @click="addActivity" flat label="Add" color="primary" />
                <q-btn v-if="isDuplicate && !isEdit" :loading="btnLoading" @click="duplicateItem" flat label="Duplicate" color="primary" />
            </q-card-actions>
            
        </dialog-draggable>


        <dialog-draggable 
            :width="500" 
            :modelDialog="isShowAttendingDialog" 
            :title="'Activity Attendees'" 
            @onHide="isShowAttendingDialog=false"
            :icon="'people_alt'"
            
        >    

            <q-card-section>
                <div>

                    <q-table
                        :data="editedItem.noAttendingArr && editedItem.noAttendingArr.attendeesData"
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

                                    <div @click="props.expand = !props.expand, getParticipiant(props.row)">
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

                    <div v-if="editedItem.noAttendingArr">
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
            </q-card-section>
            
            <q-card-actions class="row justify-end">
                <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
                <q-btn flat label="Confirm" color="primary" @click="confirmNoAttending"></q-btn>
            </q-card-actions>

        </dialog-draggable>

        <dialog-draggable 
            :width="600" 
            :modelDialog="isShowAddDate" 
            :title="'Schedule Service'" 
            @onHide="isShowAddDate=false"
            :icon="'calendar_today'"
            
        >  
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
                                        <q-date color="edx-pagination" 
                                        :disabled="tempDateOfActivity.is_full_day" 
                                        :readonly="tempDateOfActivity.is_full_day" 
                                        v-model="tempDateOfActivity.startdate" 
                                        >
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
                                        <q-date color="edx-pagination" 
                                            :disabled="tempDateOfActivity.is_full_day" 
                                            :readonly="tempDateOfActivity.is_full_day" 
                                            v-model="tempDateOfActivity.endDate" 
                                        >
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

                            <!-- <q-separator class="q-mt-md"></q-separator>

                            <div class="row q-pr-lg q-pl-lg q-mt-lg">

                                <div class="col-md-12 q-mb-md">
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
                            </div> -->

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

        </dialog-draggable>

        <dialog-draggable
            :width="850" 
            :modelDialog="isRemainingPopupOpen" 
            :title="'Budgeted Spending'" 
            @onHide="isRemainingPopupOpen=false"
            :icon="'attach_money'"
        >

        <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
            <div class="row q-mr-lg q-ml-lg q-mb-lg q-mt-lg">
                <div class="col-md-6 q-pr-sm q-mb-md">
                </div>
                <div class="col-md-6 q-pr-sm q-mb-md">
                    <div class="row q-mt-lg">
                        <div class="col-md-9 q-pr-md text-right">Priliminary:</div>
                        <div class="col-md-3"> <b>$ {{ priliminary }}</b> </div>
                    </div>
                    <div class="row">
                        <div class="col-md-9 q-pr-md text-right">Available to spend:</div>
                        <div class="col-md-3"> <b>$ {{ availableToSpend }}</b> </div>
                    </div>
                </div>

                <div class="col-md-12 q-mt-md">
                    <q-table
                        class="overflow-auto"
                        :data="tdata" 
                        :columns="tcolumns"
                        :loading="tloading"
                        :pagination.sync="tpagination"
                    >
                        <!-- Table Body -->
                        <template v-slot:body="props">
                            <q-tr :props="props" class="cursor-pointer">
                                <q-td key="transaction"  
                                    :style="{maxWidth: '350px', width: '350px'}"
                                    :props="props">
                                    <span class="inline-span">
                                        {{props.row.transaction}}
                                    </span>
                                </q-td>
                                <q-td key="date" :props="props">
                                    {{props.row.date}}
                                </q-td>
                                <q-td key="type" :props="props">

                                    <q-chip
                                        square 
                                        color="edx-bg-i"
                                    >
                                        <span>{{props.row.type}}</span>
                                        <q-tooltip 
                                            anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                            transition-show="flip-right"
                                            transition-hide="flip-left"
                                        >
                                            <strong>{{ props.row.type }}</strong>
                                        </q-tooltip>
                                    </q-chip>

                                </q-td>
                                <q-td key="amount" :props="props">
                                    $ {{props.row.amount}}
                                </q-td>
                                <q-td key="balance" :props="props">
                                    <div :class="props.row.balance > 0 ? 'edx-green' : 'edx-red' ">
                                        $ {{(props.row.balance).toFixed(2)}}
                                    </div>
                                </q-td>
                            </q-tr>
                        </template>

                        <!-- Pagination -->
                        <template v-slot:bottom class="justify-end">
                            <div class="q-pa-md flex flex-center">

                            <q-pagination
                                v-model="budgetCurrent"
                                color="edx-pagination"
                                :max-pages="6"
                                :max="budgetPages"
                                :direction-links="true"
                                @click="changeBudgetPagination(budgetCurrent)"
                            >
                            </q-pagination>

                            <div class="row justify-center items-center">
                                <span class="q-mr-md">Rows Per page</span>
                                <q-select dense outlined 
                                @input="changeBudgetRowsPerPage"
                                v-model="tpagination.rowsPerPage" 
                                :options="rowsPerPageArr" 
                                />
                            </div>
                            
                            </div>
                        </template>
                    </q-table>
                </div>

            </div>
        </q-card-section>

        <q-card-actions class="row justify-end">
            <div>
                <q-btn flat label="Cancel" color="primary" v-close-popup></q-btn>
            </div>
        </q-card-actions>

        </dialog-draggable>

        <DocumentsPopup 
            :show="showDocumentPopup" 
            @togglePopup="togglePopup"
            :activity="editedItem"
            :isEdit="isEdit"
            :categoryId="categoryId"
        />

    </div>
</template>

<script>

import dialogDraggable from '../../components/DialogDraggable'
import DateOfActivityTable from '../activity/DateOfActivityTable';

import axios from 'axios'
import config from '../../../config'
import ICONS from '../../../icons'
import DialogDraggable from '../DialogDraggable.vue';
import DocumentsPopup from '../documentsPopup/DocumentsPopup';

let typingTimer
let doneTypingInterval = 500


export default {
    
    name: 'ServiceTable',
    components: {
        dialogDraggable,
        DateOfActivityTable,
        DialogDraggable,
        DocumentsPopup
    },
    props: {
        barInfo: {
            required: true
        },
        title: {
            required: true
        }
    },
    data() {
        return {

            showDocumentPopup: false,
            categoryId: 5,


            mode: 'list',
            tab: '1',
            //
            pages: 1,
            current: 1,
            count: 10,
            pagination: { rowsPerPage: 10 },
            rowsPerPageArr: ['5', '10', '25', '50', '75', '100'], 
            
            // -----------------------
            tdata: [],
            tcolumns: [
                {
                    name: "transaction",
                    align: "left",
                    label: "Transaction",
                    field: "transaction",
                    sortable: true,
                },
                {
                    name: "date",
                    align: "left",
                    label: "Date",
                    field: "date",
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
                    field: "amount",
                    sortable: true
                },
                {
                    name: "balance",
                    align: "left",
                    label: "Balance",
                    field: "balance",
                    sortable: true
                },
            ],
            tloading: true,
            priliminary: null,
            availableToSpend: null,
            //
            budgetPages: 1,
            budgetCurrent: 1,
            budgetCount: 10,
            allocationFundId: null,
            tpagination: { rowsPerPage: 10 },
            //

            // totalPDremainder: this.barInfo.totalsAmount.PD,
            // totalFEremainder: this.barInfo.totalsAmount.FE,
            //
            filter: '',
            schoolYear: null,
            schoolYears: [],
            typeModel: '',
            //
            data: [],
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
                    name: "approvals",
                    align: "left",
                    label: "Approval",
                    field: "approvals",
                    sortable: true
                },
                { 
                    name: "PDActivity", 
                    align: "left",
                    label: "Service", 
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
                    name: "actions",
                    align: "right",
                    label: "Actions",
                    field: "actions"
                }
            ],
            //
            dateOfActivityTableData: [],
            //
            editedItem: {},
            //
            loading: false,
            btnLoading: false,
            isRemainingPopupOpen: false,
            isEdit: true,
            isDuplicate: false,
            isShowActivityPopup: false,
            isShowAttendingDialog: false,
            isShowAddDate: false,
            showRemainingBalance: false,
            confirm: false,
            confirmAttendeeModal: false,
            confirmTeacherModal: false,
            isEditSchedule: false,
            confirmDate: false,
            //
            index: null,
            //
            optionsStatus: [],
            optionsCategoryTracking: [],
            approval: [],
            optionsApp: [],
            typeArr: [],
            teachersTypeArr: [],
            // supplier
            optionsSupplier: [],
            optionsSupplierForFilter: [],
            // subcategory

            // campus
            optionsCampus: [],
            //
            optionsSubcategory: [],
            //
            optionsBilling: [],

            //ATTENDIEs
            paginationAttendee: { rowsPerPage: 100 },
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
            item: {},
            editedIndex: null,
            attendingTeacherList: [],
            attendingSearch: '',
            addParticipantModal: false,
            addNewAttendee: {
                firstName: '',
                lastName: '',
                email: ''
            },
            reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
            teacherItem: {},
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
            weekDays: [
                { label: 'Sunday', checked: false }, 
                { label: 'Monday', checked: false}, 
                { label: 'Tuesday', checked: false}, 
                { label: 'Wednesday', checked: false}, 
                { label: 'Thursday', checked: false}, 
                { label: 'Friday', checked: false}, 
                { label: 'Saturday', checked: false}
            ],
            selectOptionsDayWeekMonth: [],
            optionsFundSource: [],
        }
    },
    methods: {
        
        filterSupplier (val, update) {

            if (val === '') {
                update(() => {
                    this.optionsSupplier = this.optionsSupplier
                })
                return
            }

            update(() => {
                const needle = val.toLowerCase()
                this.optionsSupplier = this.optionsSupplierForFilter.filter(v => v.label != null && v.label.toLowerCase().indexOf(needle) > -1)
            })

        },
        togglePopup(val) {
            this.showDocumentPopup = val
        },
        openDocumentsModal() {
            this.showDocumentPopup = true
        },

        getBudgetBalance( tab, categoryId, schoolId, limit, page) {
            
            this.tloading = true

            const conf = {
                method: 'GET',
                url: config.getBudgetBalance + 
                tab + '/' 
                + schoolId + '/' +  
                categoryId 
                + '?limit=' + limit + '&page=' + page,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let budgetInfo = res.data.budgetInfo, 
                    arr = [];

                this.budgetPages = res.data.pagesCount

                this.priliminary = res.data.preliminiary;
                this.availableToSpend = res.data.availableBalance;

                for(let i=0; i<budgetInfo.length; i++) {
                    arr.push({ 
                        transaction: budgetInfo[i].name, 
                        date: budgetInfo[i].start_date + ' ' + budgetInfo[i].end_date,
                        type: budgetInfo[i].category && budgetInfo[i].category.abbreviation,
                        amount: budgetInfo[i].unit_total_cost,
                        balance: budgetInfo[i].balance,
                    })
                }

                this.tdata = arr
                this.tloading = false

            })
        },
        getAllocationFundId(tab, activiryId) {
            
            const conf = {
                method: 'GET',
                url: config.allocationFundId + tab + '/' + activiryId,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                this.allocationFundId = res.data.allocationFundSource[0].allocation_fund_template_id
                // console.log(res.data.allocationFundSource[0].allocation_fund_template_id, 'getAllocationFundId getAllocationFundId getAllocationFundId getAllocationFundId')
            })

        },

        // ======
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
        // Parsing activity
        activityParsing(data, final) {

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

            // if(data[i].category.id == 1) {
            //     // PD
            //     if(final == 1) {
            //         this.totalPDremainder = this.totalPDremainder - charge
            //     }else {
            //         this.totalPDremainder = (this.totalPDremainder / 2) - charge
            //     }
            // }else {
            //     // FE
            //     if(final == 1) {
            //         this.totalFEremainder = this.totalFEremainder - charge
            //     }else {
            //         this.totalFEremainder = (this.totalFEremainder / 2) - charge
            //     }
            // }

            // PD = 1 totalPDremainder
            // FE = 2 totalFEremainder

        
        let activityObj = {
            // remainingBalance: charge,
            remainingBalance: 0,
            // data[i].category.id == 1 ? this.totalPDremainder : this.totalFEremainder,
            id: data[i].id,
            description: data[i].description,
            tracking_category_uni: {
                id: data[i].traking ? data[i].traking.id : null,
                label: data[i].traking ? data[i].traking.name : 'N/A',
            },
            billing: {
                id: data[i].billing ? data[i].billing.id : null,
                label: data[i].billing ? data[i].billing.name : 'N/A',
            },
            completed_date: data[i].completed_date,
            campus: {
                id: data[i].campus ? data[i].campus.id : null,
                label: data[i].campus ? data[i].campus.name : 'N/A'
            },
            provider: {
                id: data[i].supplier && data[i].supplier.id,
                label: data[i].supplier && data[i].supplier.short_name
            },
            status_uni: {
                id: data[i].status ? data[i].status.id : null,
                label: data[i].status ? data[i].status.name : 'N/A'
            },
            approval_status_uni: {
                id: data[i].approval_status ? data[i].approval_status.id : null,
                label: data[i].approval_status ? data[i].approval_status.name : 'N/A'
            },
            approval_type_uni: {
                label: data[i].approval_types ? data[i].approval_types.name : 'N/A',
                value: data[i].approval_types ? data[i].approval_types.id : null
            },
            activity: data[i].name,
            activity_date: sd == null ? 'TBD' : fullDate,
            no_attending: data[i].attendySummary.count,
            amount: data[i].cost != null ? data[i].cost : 0,
            percentage: parseInt(data[i].markup_percentage),
            type_uni: {
                id: data[i].category.id,
                label: data[i].category.name,
                name: data[i].category.abbreviation
            },
            subcategory_uni: {
                id: data[i].sub_category ? data[i].sub_category.id : null,
                label: data[i].sub_category ? data[i].sub_category.name : 'NA',
                abbr: data[i].sub_category ? data[i].sub_category.abbreviation : 'NA'
            },
            note: data[i].note,
            approver: data[i].approver,
            charge: data[i].total_cost,
            repeat: data[i].has_recurring != null ? data[i].has_recurring : false,
            multi: data[i].has_multi_schedule != null ? data[i].has_multi_schedule : false,
            attendies: false,
            
            // dateOfActivityArr: [
            // ],

            noAttendingArr: {
                attendees: '',
                amount: 0,
                split: false,
                attendeesData: [
                ],
            }
        }

        console.log('activity = ', activityObj)
        arr.push(activityObj)

        }

        return arr

        },
        getActivityByType(type, id, limit, page) {
            this.loading = true

            const conf = {
                method: 'GET',
                url: config.getActivity + type + '/' + id + '/' + 3 + '?limit=' + limit + '&page=' + page,
                headers: {
                Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let data = res.data.items

                let final = res.data.isSchoolAllocationFinal
                this.final = final
                this.pages = res.data.pagesCount

                if(res.data.isSchoolAllocationFinal == 1) {
                    this.$emit('final', true)
                }
                else {
                    this.$emit('final', false)
                }

                let finalResult = this.activityParsing(data, final)

                this.data = finalResult

                console.log('asdasdjhkgasdkhgasdkjhasd', finalResult)

                this.loading = false
            });
        },
        // Add Activity
        openNewActivityPopup() {
            this.isEdit = false
            this.isShowActivityPopup = true
            this.editedItem = {
                status_uni: { 
                    id: null, 
                    label: "N/A" 
                },
                subcategory_uni: {
                    id: null, 
                    label: 'N/A',
                    abbr: 'N/A'
                },
                approval_status_uni: {
                    id: 1,
                    label: 'Approved'
                },
                approval_type_uni: {
                    value: 1,
                    label: 'Needs Assessment'
                },
                type_uni: {
                    id: 3,
                    label: 'I',
                    name: 'I',
                },
                fund_source: {
                    id: null,
                    label: 'N/A',
                    abbr: 'N/A'
                },
                billing: {
                    id: 4,
                    label: "No Billed"
                },
                tracking_category_uni: {
                    id: null,
                    label: 'N/A'
                },
                campus: {
                    id: null,
                    label: 'N/A'
                },
                provider: {
                    id: null,
                    label: 'N/A'
                }
            }
        },
        addActivity() {

            this.btnLoading = true;

            const editData = {

                supplier_id: this.editedItem.provider && this.editedItem.provider.id,
                status_id: this.editedItem.status_uni && this.editedItem.status_uni.id,
                approval_status_id: this.editedItem.approval_status_uni && this.editedItem.approval_status_uni.id,
                approval_type_id: this.editedItem.approval_type_uni && this.editedItem.approval_type_uni.value,
                approver: this.editedItem.approver,
                name: this.editedItem.activity,
                unit_cost: this.editedItem.amount,
                category_id: this.editedItem.type_uni && this.editedItem.type_uni.id,
                subcategory_id: this.editedItem.subcategory_uni && this.editedItem.subcategory_uni.id,
                note: this.editedItem.note,
                markup_percentage: this.editedItem.percentage,

                //
                description: this.editedItem.description,
                campus_id: this.editedItem.campus.id,
                category_tracking_id: this.editedItem.tracking_category_uni.id,

                completed_date: this.editedItem.status_uni.label == 'Completed' ?  this.editedItem.completed_date : null, //
                billing_status_id: this.editedItem.status_uni.label == 'Completed' ?  this.editedItem.billing.id : null, //

            }

            editData.school_id = this.$route.params.id
            editData.allocation_type_id = parseInt(this.tab)

            const conf = {
                method: 'POST',
                url: config.addActivity + 3,
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

                if (res.data.items[0]) {

                    this.btnLoading = false;
                    // this.data.unshift(res.data.items[0])
                    this.getActivityByType( this.tab, this.$route.params.id, this.count, this.current )

                    setTimeout(()=>{
                        this.isShowActivityPopup = false
                    }, 500)

                }

            })
        },
        // Edit Activity
        editActivity() {

            this.btnLoading = true;

            const editData = {

                supplier_id: this.editedItem.provider && this.editedItem.provider.id,
                status_id: this.editedItem.status_uni && this.editedItem.status_uni.id,
                approval_status_id: this.editedItem.approval_status_uni && this.editedItem.approval_status_uni.id,
                approval_type_id: this.editedItem.approval_type_uni && this.editedItem.approval_type_uni.value,
                approver: this.editedItem.approver,
                name: this.editedItem.activity,
                unit_cost: this.editedItem.amount,
                category_id: this.editedItem.type_uni && this.editedItem.type_uni.id,
                subcategory_id: this.editedItem.subcategory_uni && this.editedItem.subcategory_uni.id,
                note: this.editedItem.note,
                markup_percentage: this.editedItem.percentage,

                //
                description: this.editedItem.description,
                campus_id: this.editedItem.campus.id,
                category_tracking_id: this.editedItem.tracking_category_uni.id,

                completed_date: this.editedItem.status_uni.label == 'Completed' ?  this.editedItem.completed_date : null, //
                billing_status_id: this.editedItem.status_uni.label == 'Completed' ?  this.editedItem.billing.id : null, //

            }

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

                this.btnLoading = false;
                this.data[this.index] = this.editedItem

                setTimeout(()=>{
                    this.isShowActivityPopup = false
                }, 500)

                

            })
        },
        // Pagination
        changePagination (val) {
            this.current = val
            this.getActivityByType( parseInt(this.tab), this.$route.params.id, this.count, val )
        },
        changeRowsPerPage() {
            this.count = this.pagination.rowsPerPage
            this.current = 1
            this.getActivityByType( parseInt(this.tab), this.$route.params.id, this.count, this.current )
        },
        // Open Delete Modal
        openDeleteModal(row) {
            this.editedItem = row
            this.confirm = true
        },
        deleteItem() {

            const conf = {
                method: 'DELETE',
                url: config.deleteActivity + this.editedItem.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                const index = this.data.indexOf(this.editedItem)
                this.data.splice(index, 1)
                    this.$q.notify({
                        message: 'Activity deleted!',
                        type: 'positive',
                    })
                })
        },
        // Duplicate
        openDuplicatePopup(row) {
            this.isShowActivityPopup = true
            this.isDuplicate = true
            this.isEdit = false

            this.editedItem = row
        },
        duplicateItem() {
            this.addActivity();
        },

        // Get School Years
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

        // Get schedules by id
        getSchedules(id) {

            console.log('getSchedules', id)

            const conf = {
                method: 'GET',
                url: config.getSchedules + id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

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
                // this.data[index].dateOfActivityArr = schedulessArr
                this.dateOfActivityTableData = schedulessArr

            })

        },
        // Get attendees by id
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
        // 
        openActivityPopup(row, index) {
            this.isEdit = true
            this.isShowActivityPopup=true 
            this.editedItem = row
            this.index = index
            this.getSchedules(row.id)
            this.getAttdeesById(row.id)
        },
        // Get subcategories
        getSubcategories(id) {
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
                        abbr: subcategories[i].abbreviation,
                        label: subcategories[i].name
                    }
                    subcategoriesArr.push(obj)
                }
                this.optionsSubcategory = subcategoriesArr
            })
        },
        // Get additional Info
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
        // Get category types
        getCategoryTypes(id) {

            const conf = {
                method: 'GET',
                url: config.getCategoryTypes + id + '/4',
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

        })
        },
        // Get Approvals
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

                for(let i=0; i<approvalTypes.length; i++) {
                    let obj = {
                        value: approvalTypes[i].id,
                        label: approvalTypes[i].name
                    }
                    typesArr.push(obj)
                }
                
                this.approval = statusArr
                this.optionsApp = typesArr

                console.log('pppp', this.optionsApp)

            })
        },


        // ATTENDING
        showAttendingDialog() {

            this.isShowAttendingDialog = true
            console.log('ROW : ', this.editedItem)

            this.item = this.editedItem
            this.editedIndex = this.data.indexOf(this.editedItem);
            this.editedItem = Object.assign({}, this.editedItem);
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
        },
        confirmNoAttending() {

            let item = this.item

            let attendees = this.editedItem.noAttendingArr.attendeesData;
            let attendeesArr = []

            for(let i=0; i<attendees.length; i++) {
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


        },
        selfTitleTeacherCount(count) {
            this.editedItem.noAttendingArr.teacherCount = count
        },
        changeType(val) {
            const index = this.teachersTypeArr.indexOf(val)
            this.teachersTypeArr[index].disable = true
        },
        openAttendeDeleteModal(item) {
            this.item = item
            this.confirmAttendeeModal = true
        },
        deleteAttendee() {

            let item = this.item

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

                this.$q.notify({
                    message: 'Deleted Successfuly!',
                    type: 'positive',
                })
            })

            // Return Type to Enabled
            const typeIndex = this.teachersTypeArr.indexOf(item.type)
            this.teachersTypeArr[typeIndex].disable = false


        },
        // FUNDS
        getFunds(title) {

            const conf = {
                method: 'GET',
                url: config.getFunds + title,
                headers: {
                Accept: 'application/json',
                }
            }
            
            axios(conf).then(res => {
                console.log('funds', res.data)

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
        // PARTICIPANTS
        getParticipiant(value) {

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
        searchParticipant() {

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
        openDeleteTeacherModal(item) {
            this.teacherItem = item
            this.confirmTeacherModal = true
        },
        deleteTeacherItem() {

            let item = this.item

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

        // Date
        addDate() {
            this.isShowAddDate = true
        },
        confirmNewDate() {
            
            const tempData = this.tempDateOfActivity

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
                url: config.addSchedule + this.editedItem.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {

                this.getSchedules(this.editedItem.id)

                this.isShowAddDate = false

                this.$q.notify({
                    message: 'Schedule Added!',
                    type: 'positive',
                })
            })

        },
        editSchedule() {

            const tempData = this.tempDateOfActivity
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
                url: config.editSchedule + this.tempDateOfActivity.id  + '/' + this.editedItem.id,
                headers: {
                    Accept: 'application/json',
                },
                data: data
            }

            axios(conf).then(res => {

                this.getSchedules(this.editedItem.id)
                this.show_dialog_child = false

                this.$q.notify({
                    message: 'Schedule Edited!',
                    type: 'positive',
                })

            });

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

            })
        },
        repeatOnWeekDayChild(index) {

            if(this.weekDays[index].checked) {
                this.weekDays[index].checked = false
            }
            else {
                this.weekDays[index].checked = true
                this.tempDateOfActivity.repeatOn = [...this.weekDays]
            }
        
        },
        openEditSchedulePopup(schedule) {

            this.isEditSchedule = true
            
            if(!schedule.is_full_day) {
                schedule.is_full_day = false
            }
            
            if(!schedule.repeat) {
                schedule.repeat = false
            }

            this.tempDateOfActivity = schedule
            this.isShowAddDate = true

        },
        openDeleteDate(schedule) {
            this.tempDateOfActivity = schedule
            this.confirmDate = true
        },
        deleteDate() {

            const conf = {
                method: 'DELETE',
                url: config.removeSchedule + this.tempDateOfActivity.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                // const index = this.data[this.index].dateOfActivityArr.indexOf(this.tempDateOfActivity)
                // this.data[this.index].dateOfActivityArr.splice(index, 1)

                this.getSchedules(this.editedItem.id)

                this.$q.notify({
                    message: 'Deleted!',
                    type: 'positive',
                })

            })
    
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

            const conf = {
                method: 'GET',
                url: config.filterActivity + this.tab + '/' + this.$route.params.id + '/4' + '?' + uri,
                headers: {
                Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                this.pages = res.data.pagesCount
                let data = res.data.items
                
                let filteredData = this.activityParsing(data, this.final)

                this.data = filteredData
                this.tempDataX = filteredData

                this.loading = false
            });
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
        // Get campuses
        getCampueses() {

            const conf = {
                method: 'GET',
                url: config.getCampuses + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }
            axios(conf).then(res => {
                console.log('get campuses',  res.data[0].campus)
                
                const campuses = res.data[0].campus;
                let campusesArr = [{ id: null, label: 'N/A'  }];

                for(let i=0; i<campuses.length; i++) {
                    campusesArr.push({
                        id: campuses[i].id,
                        label: campuses[i].name
                    })
                }

                this.optionsCampus = campusesArr
            });

        },
        // Get Status
        getStatus(id) {

            const conf = {
                method: 'GET',
                url: config.getActivityStatus + id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('get status',  res.data)

                // billingStatus - optionsBilling
                // itemStatus - optionsStatus
                
                const billingStatus = res.data.billingStatus;
                let billingStatusArr = [];

                for(let i=0; i<billingStatus.length; i++) {
                    billingStatusArr.push({
                        id: billingStatus[i].id,
                        label: billingStatus[i].name
                    })
                }
                this.optionsBilling = billingStatusArr

                // **********************************************

                const itemStatus = res.data.itemStatus;
                let itemStatusArr = [];

                for(let i=0; i<itemStatus.length; i++) {
                    itemStatusArr.push({
                        id: itemStatus[i].id,
                        label: itemStatus[i].name
                    })
                }
                this.optionsStatus = itemStatusArr
            });

        },
        // tracking categories
        getTrackingCategories(title, categoryId) {
            console.log('TRACKING CATEGORY')

            const conf = {
                method: 'GET',
                url: config.getTrackingCategories+title+'/'+categoryId,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                const categoryTracking = res.data.categoryTracking
                let categoryTrackingArr = [];

                categoryTrackingArr.push({
                    id: null,
                    label: 'N/A'
                })

                for(let i=0; i<categoryTracking.length; i++) {
                    categoryTrackingArr.push({
                        id: categoryTracking[i].id,
                        label: categoryTracking[i].name
                    })
                }
                this.optionsCategoryTracking = categoryTrackingArr
                console.log('TRACKING CATEGORY', this.optionsCategoryTracking)
            })
        },

        //////////////
        // Budget 
        changeBudgetRowsPerPage(){

            this.budgetCount = this.tpagination.rowsPerPage
            this.budgetCurrent = 1

            const tab = parseInt(this.tab)
            const schoolId = this.$route.params.id
            const allocationFundId = this.allocationFundId

            this.getBudgetBalance(tab, 3, schoolId, this.budgetCount, this.current)
        },
        changeBudgetPagination(val) {

            this.budgetCurrent = val
            
            const tab = parseInt(this.tab)
            const schoolId = this.$route.params.id
            const allocationFundId = this.allocationFundId

            this.getBudgetBalance(tab, 3, schoolId, this.count, val)
        },

        ////////
        approvalType(id) {
            // if(id) {
            //     for(let i=0; i<this.optionsApp.length; i++) {
            //         if(this.optionsApp[i].id === id) {
            //             console.log('doc doc doc ', this.optionsApp[i].label)
            //             return this.optionsApp[i].label
            //         }
            //     }
            // }
        },
        ////////////////////////////////////////////////
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
        ////////////////////////////////////////////////
        activityTypeIcon(id) {

            console.log(id)
            
            const iconId = id
            let icon = null

            switch(iconId) {
                case 1:
                    icon = ICONS.online
                    break;
                case 2:
                    icon = ICONS.onSite
                    break;
            }

            return icon

        },
        activityTypeIconColor(id) {

            // id: 1 : Online
            // id: 2 : On site

            if(id) {

                const iconId = id
                let color = null;

                switch(iconId) {
                    case 1:
                        color = 'edx-icon-online'
                        break;
                    case 2:
                        color = 'edx-icon-on-site'
                        break;
                }

                return color

            }

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
        fundSourceColor(fundName) {
            
            let className = null;

            switch(fundName) {
                case 'WR':
                    className = 'bg-edx-bg-wr'
                    break;
                case 'SH':
                    className = 'bg-edx-bg-sh'
                    break;
                case 'TPD':
                    className = 'bg-edx-bg-tpd'
                    break;
                case 'TI':
                    className = 'bg-edx-bg-ti'
                    break;
                    
            }

            return className
        }



    },
    watch: {
        showRemainingBalance(val) {
            if(val) {

                this.isRemainingPopupOpen = true
                
                const tab = parseInt(this.tab)
                const schoolId = this.$route.params.id
                const allocationFundId = this.allocationFundId

                this.getBudgetBalance( tab, 3, schoolId, this.count, this.current)

            }else {
                this.isRemainingPopupOpen = false
            }
        },
        isRemainingPopupOpen(val) {
            if(val) {
                this.showRemainingBalance = true
            }else {
                this.showRemainingBalance = false
            }
        },
        isShowActivityPopup(val) {
            if(!val) {
                this.isEdit = false
                this.isDuplicate = false
            }else {
                this.getCampueses();
                this.getStatus(parseInt(this.tab));
                this.getTrackingCategories(this.tab, 3);
            }
        },
    },
    created() {
        this.tab = this.title.toString()
        let tab = parseInt(this.tab)
        this.getActivityByType( tab, this.$route.params.id, this.count, this.current )
        this.getAdditionalInfo(tab)
        this.getCategoryTypes(tab)
        this.getAtendeeTypes() 
        this.getApprovals()
        this.getRcurranceTypes()
        this.getSchoolYears()
        this.getSubcategories(3)

        this.getAllocationFundId(tab, 3)
        this.getFunds(tab)
    },
    computed: {
        totalMarkup() {
            let charge = (parseFloat(this.editedItem.amount) + parseFloat(((this.editedItem.amount * this.editedItem.percentage) / 100)))
            if(charge) {
                return charge.toFixed(2)
            }else {
                return 0
            }
        },
    },
}
</script>

<style lang="scss" scoped>

.h-popup {
    height: 40px;
    align-items: center;
    display: flex;
}



</style>
