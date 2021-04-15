<template>
    <div>
        <dialog-draggable 
            :width="850" 
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
                                <div @click="showTrackingStatusModal=true" v-for="i in 4" :key="i" class="cursor-pointer tracking-icon-parent">
                                    <q-icon 
                                        name="description" 
                                        class="edx-blue" 
                                    ></q-icon>
                                    <div class="w-100">S/E</div>
                                </div>
                            </div>
                        </div>

                        <div class="col-md-12 q-mb-lg">
                            <q-table
                                :data="data" 
                                :columns="columns"
                                :loading="loading"
                                class="no-shadow"
                                row-key="id"
                                hide-bottom
                            >

                                <!-- Table Body -->
                                <template v-slot:body="props">
                                    <q-tr :props="props">

                                        <q-td @click="props.expand = !props.expand" class="cursor-pointer"  key="name" :props="props">
                                            <div>
                                                <q-icon name="inventory" class="edx-folder" style="width: 2em"/>
                                                {{ props.row.name }}
                                            </div>
                                        </q-td>

                                    </q-tr>
                                    <q-tr :props="props" v-show="props.expand">
                                        <q-td colspan="100%" class="p-0">
                                            <div class="row">
                                                <div class="col-md-12">
                                                    <ToggleTable />
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
                            <q-input type="textarea" outlined dense/>
                        </div>
                    </div>
                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                    <q-btn flat label="done" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

        <TrackingStatusModal 
            :show="showTrackingStatusModal"
            @togglePopup="togglePopup"
        />
    </div>
</template>

<script>

import dialogDraggable from '../../components/DialogDraggable'
import ToggleTable from './ToggleTable'
import TrackingStatusModal from './TrackingStatusModal'

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
            data: [
                { id: 1, name: 'Sign Ins' },
                { id: 2, name: 'Evals' },
                { id: 3, name: 'Tax Document' },
                { id: 4, name: 'Resumes' },
                { id: 5, name: 'Background Check' },
                { id: 6, name: 'Receipts' },
                { id: 7, name: 'Travel' },
            ],
            columns: [
                {
                    name: "name",
                    align: "left",
                    label: "",
                    field: "name",
                    style: "padding-left: 0"
                },
            ],
            showTrackingStatusModal: false,
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
        }
    }
}
</script>