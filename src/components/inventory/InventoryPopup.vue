<template>
    <div>
        <dialog-draggable 
            :width="800" 
            :modelDialog="showPopup" 
            :title="`Inventory`" 
            :icon="'inventory'"
        > 

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">

                        <div class="col-md-6 q-pr-sm">
                            
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Item name</div>
                                <q-input dense outlined v-model="editedData.item_name" />
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Item description</div>
                                <q-input 
                                    type="textarea"
                                    dense
                                    outlined
                                    rows="2"
                                    v-model="editedData.note"
                                />
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Campus</div>
                                <q-select  
                                    dense
                                    outlined
                                    hide-selected
                                    fill-input
                                    input-debounce="0"
                                    v-model="editedData.campus_uni" 
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
                                    v-model="editedData.inventory_supplier_uni" 
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

                            <div class="q-mb-md">
                                <div class="row">
                                    <div class="col-md-4 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Qty</div>
                                        <q-input type="number" dense outlined v-model="editedData.quantity" />
                                    </div>
                                    <div class="col-md-4 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Item Cost</div>
                                        <q-input type="number" prefix="$" dense outlined v-model="editedData.item_cost" />
                                    </div>
                                    <div class="col-md-4">
                                        <div class="text-subtitle2 q-mb-sm">Total</div>
                                        <q-input prefix="$" dense outlined disable filled readonly :value="editedData.item_cost * editedData.quantity" />
                                    </div>
                                </div>
                            </div>

                            <div class="q-mb-md">
                                <div class="row">
                                    <div class="col-md-4 q-pr-sm" v-if="editedData.status_uni">
                                        <div class="text-subtitle2 q-mb-sm">Removal Date</div>
                                        <q-input :disabled="editedData.status_uni.label == 'On Premise'" v-model="editedData.relocation_date" dense outlined />
                                        <q-popup-proxy>
                                            <q-date color="edx-pagination" :disabled="editedData.status_uni.label == 'On Premise'" v-model="editedData.relocation_date" mask="YYYY-MM-DD">
                                                <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Cancel" color="primary" flat v-close-popup />
                                                <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </div>
                                    <div class="col-md-4 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Visibility Date</div>
                                        <q-input v-model="editedData.visibility_date" dense outlined />
                                        <q-popup-proxy>
                                            <q-date color="edx-pagination" v-model="editedData.visibility_date" mask="YYYY-MM-DD">
                                                <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Cancel" color="primary" flat v-close-popup />
                                                <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </div>
                                </div>
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Removal Note</div>
                                <q-input rows="3" dense outlined type="textarea" v-model="editedData.transition_information_note" />
                            </div>
                            
                        </div>

                        <div class="col-md-6 q-pl-sm">

                            <div class="q-mb-md">
                                <div class="row">
                                    <div class="col-md-4">
                                        <div class="text-subtitle2 q-mb-sm">Purchase Date</div>
                                        <q-input v-model="editedData.purchase_date" dense outlined />
                                        <q-popup-proxy>
                                            <q-date color="edx-pagination" v-model="editedData.purchase_date" mask="YYYY-MM-DD">
                                                <div class="row items-center justify-end q-gutter-sm">
                                                <q-btn label="Cancel" color="primary" flat v-close-popup />
                                                <q-btn label="OK" color="primary" flat v-close-popup />
                                                </div>
                                            </q-date>
                                        </q-popup-proxy>
                                    </div>
                                </div>
                            </div>

                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Inventory Category</div>
                                <q-select  
                                    dense
                                    outlined
                                    use-input
                                    hide-selected
                                    fill-input
                                    input-debounce="0"
                                    v-model="editedData.inventory_category_uni" 
                                    :options="optionsCategory"
                                    @filter="filterCategory"
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
                                <div class="row">
                                    <div v-if="editedData.status_uni" class="col-md-4 cursor-pointer">
                                        <div class="text-subtitle2 q-mb-sm">Status</div>

                                        <q-popup-edit v-model="editedData.status" title="Status">
                                            <q-select
                                            @input="changeStatus(4)"
                                            dense
                                            outlined
                                            v-model="editedData.status_uni"
                                            :options="optionsStatus"
                                            />
                                        </q-popup-edit>

                                        <div v-if="editedData.status_uni.label == 'On Premise'">
                                            <q-icon
                                                name="emoji_transportation" 
                                                class="edx-icon-onpremise"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.status_uni.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.status_uni.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.status_uni.label == 'Off Premise'">
                                            <q-icon
                                                name="domain_disabled" 
                                                class="edx-icon-offpremise"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.status_uni.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.status_uni.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.status_uni.label == 'Disposed'">
                                            <q-icon
                                                name="recyclingd" 
                                                class="edx-icon-disposed"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.status_uni.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.status_uni.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.status_uni.label == 'Lost'">
                                            <q-icon
                                                name="wrong_location" 
                                                class="edx-icon-lost"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.status_uni.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.status_uni.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.status_uni.label == 'Stolen'">
                                            <q-icon
                                                name="person_search" 
                                                class="edx-icon-stolen"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.status_uni.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.status_uni.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.status_uni.label == 'Transfered'">
                                            <q-icon
                                                name="local_shipping" 
                                                class="edx-icon-transfered"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.status_uni.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.status_uni.label }}</span>
                                        </div>

                                        <div v-else>
                                            <q-icon
                                                name="inventory" 
                                                class="edx-icon-stored"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.status_uni.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.status_uni.label }}</span>
                                        </div>
                                    </div>
                                    <div v-if="editedData.condition" class="col-md-4 cursor-pointer">
                                        <div class="text-subtitle2 q-mb-sm">Condition</div>

                                        <q-popup-edit
                                            v-model="editedData.condition"
                                            title="Condition"
                                            buttons
                                        >
                                            <q-select
                                                dense
                                                outlined
                                                v-model="editedData.condition"
                                                :options="optionsCondition"
                                            />
                                        </q-popup-edit>

                                        <div v-if="editedData.condition.label == 'Excelent'">
                                            <q-icon
                                                name="sellr" 
                                                class="edx-icon-excellent"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.condition.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.condition.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.condition.label == 'Very Good'">
                                            <q-icon
                                                name="sellr" 
                                                class="edx-icon-verygood"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.condition.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.condition.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.condition.label == 'Good'">
                                            <q-icon
                                                name="sellr" 
                                                class="edx-icon-good"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.condition.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.condition.label }}</span>
                                        </div>

                                        <div v-else-if="editedData.condition.label == 'Fair'">
                                            <q-icon
                                                name="sellr" 
                                                class="edx-icon-fair"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.condition.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.condition.label }}</span>
                                        </div>

                                        <div v-else>
                                            <q-icon
                                                name="sellr" 
                                                class="edx-icon-poor"
                                            >
                                                <q-tooltip 
                                                    content-class="edx-tooltip"
                                                    anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                    transition-show="flip-right"
                                                    transition-hide="flip-left"
                                                >
                                                    <strong>{{ editedData.condition.label }}</strong>
                                                </q-tooltip>
                                            </q-icon>
                                            <span class="q-ml-sm">{{ editedData.condition.label }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="q-mb-md">
                                <div class="row">
                                    <div v-if="editedData.identification_uni" class="col-md-6 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Identifier</div>  
                                        <q-select
                                            dense
                                            outlined
                                            v-model="editedData.identification_uni"
                                            :options="optionsIdentifier"
                                        />
                                    </div>
                                    <div v-if="editedData.identification_uni && editedData.identification_uni.id != 5" class="col-md-6">
                                        <div class="text-subtitle2 q-mb-sm">District ID</div>
                                        <q-input :disabled="!editedData.identification_uni.id != 1" dense outlined v-model="editedData.district_assigned_id"/>
                                    </div>
                                    <div v-if="editedData.identification_uni && editedData.identification_uni.id == 5" class="col-md-3 q-pr-sm">
                                        <div class="text-subtitle2 q-mb-sm">Start ID</div>
                                        <q-input  dense outlined v-model="editedData.sticker_range_start"/>
                                    </div>
                                    <div v-if="editedData.identification_uni && editedData.identification_uni.id == 5" class="col-md-3">
                                        <div class="text-subtitle2 q-mb-sm">End ID</div>
                                        <q-input dense outlined v-model="editedData.sticker_range_end"/>
                                    </div>
                                </div>
                            </div>

                            <div class="q-mb-md">
                               <div class="row">
                                   <div class="col-md-4">
                                        <div class="text-subtitle2 q-mb-sm">Serial #</div> 
                                        <q-input dense outlined v-model="editedData.serial_number" />
                                   </div>
                                </div> 
                            </div>

                            <div class="q-mb-md">
                               <div class="row">
                                   <div class="col-md-6">
                                        <div class="text-subtitle2 q-mb-sm">Location</div> 
                                        <q-input dense outlined v-model="editedData.location" />
                                   </div>
                                </div> 
                            </div>

                            <div class="q-mb-md">
                               <div class="row">
                                   <div class="col-md-12">
                                        <div class="text-subtitle2 q-mb-sm">Location Note</div> 
                                        <q-input rows="5" type="textarea" dense outlined v-model="editedData.location_information_note" />
                                   </div>
                                </div> 
                            </div>


                        </div>

                    </div>

                    <div class="row">
                        <div class="col-md-12">
                            <div class="text-subtitle2 q-mb-sm">Note</div>
                            <q-input cols="5" type="textarea" dense outlined v-model="editedData.note" />
                        </div>
                    </div>

                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                    <q-btn :loading="loading" @click="editInventory" v-if="isEdit" flat label="Save" color="primary"></q-btn>
                    <q-btn :loading="loading" @click="editInventory" v-else flat label="Add" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

        <!-- ############################ -->
        <!-- ############################ -->
        <!-- ############################ -->
        <!-- ############################ -->
        <!-- ############################ -->
        <!-- STATUS POPUPS -->

        <dialog-draggable :width="700" :modelDialog="onpremise" :title=" 'On Premise' " @onHide="onpremise=false">
            <q-card>
                
            <q-toolbar>

                <!-- <q-avatar>
                <span class="mdi mdi-school mdi-24px" style="color: blue"></span>
                </q-avatar> -->

                <q-toolbar-title class="row justify-between">
                <!-- On Premise -->
                <div v-if="editedData.quantity > 1">
                    {{ editedData.quantity - statusChangeObject.quantity }}
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
                    :disable="editedData.quantity <= 1" 
                    :rules="[ val => val <= editedData.quantity || 'Number cant be more than ' + editedData.quantity]"
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

                <div class="full-width" v-if="editedData.identification_uni && editedData.identification_uni.id == 5">

                    <div class="row">

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                        <q-input outlined dense v-model="editedData.sticker_range_start" />
                    </div>

                    <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                        <q-input outlined dense v-model="editedData.sticker_range_end" />
                    </div>

                    </div>

                    <div class="row" v-if="statusChangeObject.quantity <= 1">
                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                        <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                        </div>
                    </div>
                    
                    <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedData.quantity">
                    
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
                    <div v-if="editedData.quantity > 1">
                        {{ editedData.quantity - statusChangeObject.quantity }}
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
                        :disable="editedData.quantity <= 1" 
                        :rules="[ val => val <= editedData.quantity || 'Number cant be more than ' + editedData.quantity]"
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

                    <div class="full-width" v-if="editedData.identification_uni && editedData.identification_uni.id == 5">

                        <div class="row">

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                            <q-input outlined dense v-model="editedData.sticker_range_start" />
                        </div>

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                            <q-input outlined dense v-model="editedData.sticker_range_end" />
                        </div>

                        </div>

                        <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedData.quantity">
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
                    <div v-if="editedData.quantity > 1">
                        {{ editedData.quantity - statusChangeObject.quantity }}
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
                        :disable="editedData.quantity <= 1" 
                        :rules="[ val => val <= editedData.quantity || 'Number cant be more than ' + editedData.quantity]"
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
                            <q-date color="edx-pagination" v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
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
                    
                    <div class="full-width" v-if="editedData.identification_uni && editedData.identification_uni.id == 5">

                        <div class="row">

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                            <q-input outlined dense v-model="editedData.sticker_range_start" />
                        </div>

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                            <q-input outlined dense v-model="editedData.sticker_range_end" />
                        </div>

                        </div>

                        <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedData.quantity">
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
                    <div v-if="editedData.quantity > 1">
                        {{ editedData.quantity - statusChangeObject.quantity }}
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
                        :disable="editedData.quantity <= 1" 
                        :rules="[ val => val <= editedData.quantity || 'Number cant be more than ' + editedData.quantity]"
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
                            <q-date color="edx-pagination" v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
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

                    <div class="full-width" v-if="editedData.identification_uni && editedData.identification_uni.id == 5">

                        <div class="row">

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                            <q-input outlined dense v-model="editedData.sticker_range_start" />
                        </div>

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                            <q-input outlined dense v-model="editedData.sticker_range_end" />
                        </div>

                        </div>

                        <div class="row" v-if="statusChangeObject.quantity <= 1">
                            <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                            <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                            </div>
                        </div>
                        
                        <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedData.quantity">
                        
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
                    <div v-if="editedData.quantity > 1">
                        {{ editedData.quantity - statusChangeObject.quantity }}
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
                        :disable="editedData.quantity <= 1" 
                        :rules="[ val => val <= editedData.quantity || 'Number cant be more than ' + editedData.quantity]"
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
                            <q-date color="edx-pagination" v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
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
                    
                    <div class="full-width" v-if="editedData.identification_uni && editedData.identification_uni.id == 5">

                        <div class="row">

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                            <q-input outlined dense v-model="editedData.sticker_range_start" />
                        </div>

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                            <q-input outlined dense v-model="editedData.sticker_range_end" />
                        </div>

                        </div>

                        <div class="row" v-if="statusChangeObject.quantity <= 1">
                            <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                            <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                            </div>
                        </div>
                        
                        <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedData.quantity">
                        
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
                    <div v-if="editedData.quantity > 1">
                    {{ editedData.quantity - statusChangeObject.quantity }}
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
                        :disable="editedData.quantity <= 1" 
                        :rules="[ val => val <= editedData.quantity || 'Number cant be more than ' + editedData.quantity]"
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
                            <q-date color="edx-pagination" v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
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

                    <div class="full-width" v-if="editedData.identification_uni && editedData.identification_uni.id == 5">

                    <div class="row">

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                        <q-input outlined dense v-model="editedData.sticker_range_start" />
                        </div>

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                        <q-input outlined dense v-model="editedData.sticker_range_end" />
                        </div>

                    </div>

                    <div class="row" v-if="statusChangeObject.quantity <= 1">
                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                            <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                        </div>
                    </div>
                    
                    <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedData.quantity">
                        
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
                    <div v-if="editedData.quantity > 1">
                        {{ editedData.quantity - statusChangeObject.quantity }}
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
                        :disable="editedData.quantity <= 1" 
                        :rules="[ val => val <= editedData.quantity || 'Number cant be more than ' + editedData.quantity]"
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
                            <q-date color="edx-pagination" v-model="statusChangeObject.showUntil" mask="YYYY-MM-DD">
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
                    
                    <div class="full-width" v-if="editedData.identification_uni && editedData.identification_uni.id == 5">

                        <div class="row">

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Curent Sticker range</div>
                            <q-input outlined dense v-model="editedData.sticker_range_start" />
                        </div>

                        <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">&nbsp; </div>
                            <q-input outlined dense v-model="editedData.sticker_range_end" />
                        </div>

                        </div>

                        <div class="row" v-if="statusChangeObject.quantity <= 1">
                            <div class="col-3 q-pr-sm q-pl-sm q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Sticker ID</div>
                            <q-input outlined dense v-model="statusChangeObject.stickerRangeStart" />
                            </div>
                        </div>
                        
                        <div class="row" v-if="statusChangeObject.quantity > 1 && statusChangeObject.quantity != editedData.quantity">
                        
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

import dialogDraggable from '../../components/DialogDraggable'

import axios from 'axios'
import config from '../../../config'

let oldObject = {}

export default {
    props: {
        show: {
            required: true
        },
        isEdit: {
            required: true
        },
        data: {
            required: true
        },
        tab: {
            required: true
        },
    },
    components: {
        dialogDraggable
    },

    data() {
        return {

            loading: false,
            editedData: {},

            optionsCategory: [],
            optionsCategoryForFilter: [],
            optionsCondition: [],
            optionsStatus: [],
            optionsSupplier: [],
            optionsSupplierForFilter: [],
            optionsIdentifier: [],
            optionsCampus: [],
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

            statusChangeObject: {},
            statusChanged: false,
            date: '2020-06-06',
            onpremise: false,
            offpremise: false,
            disposed: false,
            lost: false,
            stolen: false,
            transfered: false,
            stored: false,



        }
    },
    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
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
                    let label = res.data.categories[i].category.name ? res.data.categories[i].category.name : ''
                    let obj = {
                        id: res.data.categories[i].category?.id,
                        label: res.data.categories[i].category?.name,
                        value: res.data.categories[i].category?.id
                    }
                    categoryArr.push(obj)
                }
                this.optionsCategory = categoryArr
                this.optionsCategoryForFilter = categoryArr


                // Supplier
                let supplierArr = []
                for(let i=0; i<res.data.suppliers.length; i++) {
                    let label = res.data.suppliers[i].short_name ? res.data.suppliers[i].short_name : ''
                    let obj = {
                        id: res.data.suppliers[i]?.id,
                        label: label,
                        value: res.data.suppliers[i]?.id
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


            })
        },
        getCampueses() {

            const conf = {
                method: 'GET',
                url: config.getCampuses + this.$route.params.id,
                headers: {
                    Accept: 'application/json',
                }
            }
            axios(conf).then(res => {
                
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
              for(let i=0; i<res.data.schools.length; i++) {

                    let obj = {
                        id: res.data.schools[i].id,
                        name: res.data.schools[i].school_name,
                        label: res.data.schools[i].school_name,
                        value: res.data.schools[i].id,
                    }
                    schoolsArr.push(obj)
              }

              this.optionsSchool = schoolsArr
              this.optionsSchoolForFilter = schoolsArr
          })
        },
        changeStatus() {

            this.statusChangeObject = {
                quantity: this.editedData.quantity,
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

          

          this.statusChangeObject.serial = this.editedData.serial_number
        
          if(this.editedData.status_uni.label == 'On Premise') {

              this.onpremise = true
              this.statusChangeObject.location = this.$route.query.name
              if (this.editedData.quantity <= 1) {
                this.statusChangeObject.locationWithinSchool = ''
              }
              
          }
          else if(this.editedData.status_uni.label == 'Off Premise') {
              this.offpremise = true      
              this.statusChangeObject.location = 'Off Premise'
              if (this.editedData.quantity <= 1) {
                this.statusChangeObject.locationWithinSchool = ''
              }

          }
          else if(this.editedData.status_uni.label == 'Disposed') {
              this.disposed = true
              this.statusChangeObject.location = 'Disposed'   
              if (this.editedData.quantity <= 1) {
                this.statusChangeObject.locationWithinSchool = ''
              }    
          }
          else if(this.editedData.status_uni.label == 'Lost') {

              this.lost = true    
              this.statusChangeObject.location = 'Lost'
              if (this.editedData.quantity <= 1) {
              this.statusChangeObject.locationWithinSchool = ''
              }

          }
          else if(this.editedData.status_uni.label == 'Stolen') {
              this.stolen = true     
              this.statusChangeObject.location = 'Stolen'
              if (this.editedData.quantity <= 1) {
                this.statusChangeObject.locationWithinSchool = ''
              }  
          }
          else if(this.editedData.status_uni.label == 'Transfered') {
              
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

              if (this.editedData.quantity <= 1) {
                this.statusChangeObject.locationWithinSchool = ''
              }  
          }
          else {
              this.stored = true
              this.statusChangeObject.location = 'Stored'
              if (this.editedData.quantity <= 1) {
                this.statusChangeObject.locationWithinSchool = ''
              }
          }

        },
        cancelStatus() {

            let d = JSON.parse(oldObject)
            this.editedData.status_uni = d.status_uni
            this.statusChanged = false

        },
        confirmStatusChanges() {
            this.onpremise = false
            this.offpremise = false
            this.disposed = false
            this.lost = false
            this.stolen = false
            this.transfered = false
            this.stored = false

            this.statusChanged = true
        },
        filterCategory (val, update, abort) {
            update(() => {
                if(val) { 
                    const needle = val.toLowerCase()
                    this.optionsCategory = this.optionsCategoryForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },
        filterSupplier (val, update, abort) {
            update(() => {
                if(val) {
                    const needle = val.toLowerCase()
                    this.optionsSupplier = this.optionsSupplierForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },
        filterSchool (val, update, abort) {
            update(() => {
                if(val) {
                const needle = val.toLowerCase()
                this.optionsSchool = this.optionsSchoolForFilter.filter(v =>   v.label.toLowerCase().indexOf(needle) > -1)
                }
            })
        },


        editInventory() {

            
        
            const updateData = {
                school_id: this.editedData.school_id,
                allocation_type_id: parseInt(this.editedData.allocation_type_id),
                quantity:  this.editedData.quantity,
                inventory_category_type_id:  this.editedData.inventory_category_uni.id,
                item_name: this.editedData.item_name,
                supplier_id: this.editedData.inventory_supplier_uni.id,
                item_cost: this.editedData.item_cost,
                inventory_condition_type_id: this.editedData.condition.id,
                status_id: this.editedData.status_uni.id,
                inventory_identification_type_id: this.editedData.identification_uni.id,
                district_assigned_id: this.editedData.district_assigned_id,
                serial_number: this.editedData.serial_number,
                location: this.editedData.location,
                location_information_note: this.editedData.location_information_note,
                note:  this.editedData.note,
                purchase_date: this.editedData.purchase_date,
                visibility_date : "",
                transition_date : "",
                transition_information_note :  ""
            }

            const modifyData = {

                status_id: this.editedData.status_uni.id,
                quantity: parseInt(this.statusChangeObject.quantity),
                sticker_range_start: this.editedData.sticker_range_start,
                sticker_range_end: this.editedData.sticker_range_end,
                location: this.statusChangeObject.location,
                location_information_note: this.statusChangeObject.locationWithinSchool,
                note: this.statusChangeObject.note,
                visibility_date: this.statusChangeObject.showUntil,
                new_sticker_range_start: this.statusChangeObject.stickerRangeStart,
                new_sticker_range_end: this.statusChangeObject.stickerRangeEnd,
                allocation_type_id: this.allocationSelected.id,
                school_id: this.statusChangeObject.schoolToTransfer && this.statusChangeObject.schoolToTransfer.id,
                purchase_date: this.editedData.purchase_date,

            }

            let finalData = {}

            if(!this.isEdit) {

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

                    this.$emit('updateTableList', {})

                    this.isEdit = false
                    this.statusChanged = false

                    this.closePopup()

                })

            } 
            else {
                
                finalData.updateData = updateData

                if(this.statusChanged) {
                    finalData.modifyData = modifyData
                }else {
                    finalData.modifyData = {}
                }

                let id = this.editedData.id

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

                    this.$emit('updateTableList', {})

                    this.statusChanged = false

                    this.closePopup()
                    

                })
            }
        }
    },
    computed: {
        showPopup() {
            return this.show
        },
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)

            if(val) {
                this.editedData = this.data
                oldObject = JSON.stringify(this.data)
                this.getAdditionalInfo(this.tab)
                this.getCampueses()
                this.getSchools()
            }
        }
    }
}

</script>