<template>
    <div>
        <dialog-draggable 
            :width="800" 
            :modelDialog="showPopup" 
            :title="`Documents for: ${activity.activity}`" 
            :icon="'description'"
        >  

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">

                        <div class="col-md-12">
                            <div class="text-subtitle2 q-mb-sm">Tracking Status</div>
                            <div class="row q-mt-md q-mb-md">
                                <div  v-for="status in trackingStatuses" :key="status.id" @click="showTrackingStatusModal=true, sendTrackingStatusToPopup(status)" class="cursor-pointer tracking-icon-parent">
                                    <q-icon 
                                        name="description" 
                                        :class="status.status === 1 ? 'edx-blue' : 'edx-red' "
                                        style="font-size: 2.5em;"
                                    ></q-icon>
                                    <div class="w-100">
                                        
                                        <q-chip square size="sm" :class="status.status === 1 ? 'edx-bg-blue' : 'edx-bg-red' " class=" edx-white m-0 text-white">
                                            <b>{{ status.abbreviation }}</b>
                                        </q-chip>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 q-mb-lg q-mt-md">
                            <div class="text-subtitle2 q-mb-sm">Manage Documents</div>
                            <q-table
                                :data="data" 
                                :columns="columns"
                                :loading="loading"
                                class="no-shadow hidden-header"
                                row-key="id"
                                hide-bottom
                            >

                                <!-- Table Body -->
                                <template v-slot:body="props">
                                    <q-tr :props="props">

                                        <q-td @click="props.expand = !props.expand" class="cursor-pointer"  key="name" :props="props">
                                            <div>
                                                <q-icon name="all_inbox" class="edx-folder" style="width: 2em"/>
                                                {{ props.row.name }}
                                            </div>
                                        </q-td>

                                    </q-tr>
                                    <q-tr :props="props" v-show="props.expand">
                                        <q-td colspan="100%" class="p-0">
                                            <div class="row">
                                                <div class="col-md-12 child-table">
                                                    <ToggleTable :trayId="activity.id" :id="props.row.id" />
                                                </div>
                                            </div>
                                        </q-td>
                                    </q-tr>

                                </template>

                            </q-table>
                            <br>
                        </div>

                        <div class="col-md-12">
                            <div class="text-subtitle2 q-mb-sm">Note</div>
                            <q-input v-model="note" type="textarea" outlined dense/>
                        </div>

                    </div>
                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                    <q-btn :loading="loading" @click="addTrackingNote" flat label="done" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

        <TrackingStatusModal 
            :show="showTrackingStatusModal"
            @togglePopup="togglePopup"
            :data="selectedTrackingStatus"
            :activityId="activity.id"
            @updateTrackingStatus="updateTrackingStatus"
        />

    </div>
</template>

<script>

import dialogDraggable from '../../components/DialogDraggable'
import ToggleTable from './ToggleTable'
import TrackingStatusModal from './TrackingStatusModal'

import axios from 'axios'
import config from '../../../config'

export default {
    props: {
        show: {
            required: true
        },
        activity: {
            required: true
        }
    },
    data() {
        return {
            loading: false,
            data: [],
            columns: [
                {
                    name: "name",
                    align: "left",
                    label: "Manage Documents",
                    field: "name",
                    style: "padding-left: 0;"
                },
            ],
            trackingStatuses: [],
            showTrackingStatusModal: false,
            selectedTrackingStatus: null,

            note: '',
        }
    },
    components: {
        dialogDraggable,
        ToggleTable,
        TrackingStatusModal
    },
    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
        },
        togglePopup(val) {
            this.showTrackingStatusModal = val
        },
        getDocumentTrays() {


            const conf = {
                method: 'GET',
                url: config.getDocumentTrays,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('getDocumentTrays = ', res.data.tray)
                let trays = res.data.tray,
                    arr = [];

                for(let i=0; i<trays.length; i++) {
                    arr.push({
                        id: trays[i].id,
                        name: trays[i].name
                    })
                }

                this.data = arr
            })
        },
        getTrackingStatus() {

           

            const conf = {
                method: 'GET',
                url: config.getTrackingStatus + this.activity.id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                this.trackingStatuses = res.data.fields
                this.note = res.data.note
                
            })

        },
        sendTrackingStatusToPopup(trackingStatus) {
            this.selectedTrackingStatus = trackingStatus
        },
        updateTrackingStatus(val) {
            this.getTrackingStatus()
        },
        addTrackingNote() {

             this.loading = true
            
            const conf = {
                method: 'POST',
                url: `${config.addTrackingNote}${this.activity.id}`,
                headers: {
                    Accept: 'application/json',
                },
                data: {
                    note: this.note
                }
            }

            axios(conf).then(res => {
                this.closePopup()
                this.loading = false
            })
            .catch(err => {
                this.loading = false
            })

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
                this.getDocumentTrays()
                this.getTrackingStatus()
            }
        }
    }
}
</script>

<style>

.hidden-header thead {
    display: none !important;
}

.child-table thead {
    display: table-header-group !important;
}

</style>