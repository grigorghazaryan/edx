<template>
    <div>

    <q-dialog v-model="showPopup">
      <q-card>

        <q-card-section style="max-width: 400px; max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
            <div class="q-pa-md">
                <div class="row">

                    <div class="col-md-12 q-mb-md">
                        <div v-if="data" class="row justify-start ">
                            <div class="icon-parent w-100">
                                <div>
                                    <q-icon 
                                        :name="data.icon" 
                                        style="font-size: 4em" 
                                        :class="color()"
                                    />
                                </div>
                                <div class="text-center w-100">
                                    <q-chip square size="sm"  :class="bgcolor()" class="m-0 text-white">
                                        <b>{{ abbr }}</b>
                                    </q-chip>
                                </div>
                            </div>
                            <div class="text-h6 q-ml-md">
                                <div class="q-mt-md">{{ data.name }}</div>
                            </div>
                        </div>
                    </div>

                    <div class="col-md-12 q-mb-md">
                        <div class="text-subtitle2 q-mb-sm">Status</div>
                        <q-select v-model="selectedStatus" :options="documentsStatusOptions" dense outlined />
                    </div>

                    <div class="col-md-12">
                        <div class="text-subtitle2 q-mb-sm">Note</div>
                        <q-input v-model="note" dense outlined type="textarea"/>
                    </div>

                </div>
            </div>
        </q-card-section>

        <q-card-actions class="row justify-end">
            <div>
                <q-btn flat label="Cancel" color="primary" @click="emitClosePopup"></q-btn>
                <q-btn flat label="Save"  @click="addTrackingStatus" :loading="loading" color="primary"></q-btn>
            </div>
        </q-card-actions>

      </q-card>
    </q-dialog>

    </div>
</template>

<script>

import dialogDraggable from '../../components/DialogDraggable'
import axios from 'axios'
import config from '../../../config'

export default {
    components: {
        dialogDraggable
    },
    data() {
        return {
            loading: false,
            note: '',
            documentsStatusOptions: [],
            selectedStatus: null,
        }
    },
    props: {
        show: {
            required: true
        },
        data: {
            required: true
        },
        activityId: {
            required: true
        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('togglePopup', false)
        },
        addTrackingStatus() {

            this.loading = true

            const conf = {
                method: 'POST',
                url: config.addTrackingStatus + this.activityId,
                headers: {
                Accept: 'application/json',
                },
                data: {
                    id: this.data.id,
                    note: this.note,
                    status: this.selectedStatus.id
                }
            }

            axios(conf).then(res => {
                this.loading = false
                this.$emit('updateTrackingStatus', res.data)
                this.emitClosePopup()
            })
            .catch(err => {
                this.loading = false
            })

        },
        getDocumentsStatus() {

            const conf = {
                method: 'GET',
                url: config.getDocumentsStatus,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let arr = []
                let documentStatus = res.data.documentStatus
                for(let i=0; i<documentStatus.length; i++) {
                    arr.push({
                        id: documentStatus[i].id,
                        label: documentStatus[i].name
                    })
                }
                this.documentsStatusOptions = arr
            })

        },
        color() {
            // Not started : 1
            // On File : 2
            // Pending : 4
            // Not Required : 4

            let color = ''

            switch(this.selectedStatus.id) {
                case 1:
                    color = 'edx-red'
                    break;
                case 2:
                    color = 'edx-green'
                    break;
                case 3:
                    color = 'edx-yellow'
                    break;
                case 4:
                    color = 'edx-gray'
                    break;
                default: 
                    color = 'edx-gray';
                    break;
            }

            return color
        },
        bgcolor() {
                        // On File : 2
            // Pending : 4
            // Not Required : 4

            let color = ''

            switch(this.selectedStatus.id) {
                case 1:
                    color = 'edx-bg-red'
                    break;
                case 2:
                    color = 'edx-bg-green'
                    break;
                case 3:
                    color = 'edx-bg-yellow'
                    break;
                case 4:
                    color = 'edx-bg-gray'
                    break;
                default:
                    color = 'edx-bg-gray'
                    break;
            }

            return color
        }
    },
    computed: {
        showPopup() {
            return this.show
        },
        abbr() {
            return this.data.abbreviation
        }
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)
            if(val) {
                this.getDocumentsStatus()
                this.note = this.data.note
                if(this.data.status) {
                    this.selectedStatus = {
                        id: this.data.status.id,
                        label: this.data.status.name
                    }
                }else {
                    this.selectedStatus = {
                        id: null,
                        label: null
                    }
                }
            }
        },

    }
}
</script>


<style lang="scss" scoped>
.icon-parent {
    width: 60px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 3px;

    & div {
        text-align: center;
    }

    i {
        margin: 0 auto;
    }
}
</style>