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
                                <div v-if="data.status">
                                    <q-icon 
                                        :name="data.icon" 
                                        :class="data.status == 1 ? 'edx-blue' : 'edx-red' "
                                        style="font-size: 4em" 
                                    />
                                </div>
                                <div class="text-center w-100">
                                    <q-chip square size="sm"  :class="data.status === 1 ? 'edx-bg-blue' : 'edx-bg-red' " class="m-0 text-white">
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
                        <q-checkbox v-model="isComplete" label="Complete" />
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
            isComplete: null,
            note: '',
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
                    status: this.isComplete,
                    token: localStorage.getItem('access-token'),
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
                this.isComplete = this.data.status === 1 ? true : false
                this.note = this.data.note
            }
        }
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