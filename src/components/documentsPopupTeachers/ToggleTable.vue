<template>
    <div>
        <q-table
            :data="data" 
            :columns="columns"
            class="no-shadow overflow-auto my-sticky-column-table"
            hide-pagination
        >
            <!-- Table Body -->
            <template v-slot:body="props">
                <q-tr :props="props">
                    <q-td  key="title" :props="props">
                        {{ props.row.title }}
                    </q-td>
                    <q-td  key="category" :props="props">
                        {{ props.row.category }}
                    </q-td>
                    <q-td  key="dateUploaded" :props="props">
                        {{ props.row.dateUploaded }}
                    </q-td>
                    <q-td  key="uploadedBy" :props="props">
                        {{ props.row.uploadedBy }}
                    </q-td>
                    <q-td  key="size" :props="props">
                        {{ props.row.size }}
                    </q-td>
                    <q-td  key="note" :props="props">
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
                    <q-td  key="action" :props="props">
                        <q-btn
                                :icon="deleteIcon"
                                color="edx-delete-btn" 
                                size=sm 
                                no-caps
                                round
                                @click="openDeleteModal( props.row.id )"
                            >
                                <q-tooltip 
                                    content-class="edx-tooltip"
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

        <div class="q-mt-md q-ml-md q-mb-lg">
            <q-btn @click="openUploadModal" icon="add" size="sm" color="blue" class="q-mr-sm" round/>
            Add Document
        </div>

        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure to delete this document?</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                <q-btn label="Yes" :loading="loading" @click="deleteDocument" color="edx-delete-btn"  />
                </q-card-actions>
            </q-card>
        </q-dialog>

        <UploadDocumentModal 
            :show="openUploadDocumentModal"
            @togglePopup="togglePopup"
            :trayId="trayId"
            :id="id"
            @newDocument="newDocument"
        />

    </div>
</template>

<script>
import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import ICONS from '../../../icons'
import UploadDocumentModal from '../documentsPopup/UploadDocumentModal'

import axios from 'axios'
import config from '../../../config'

export default {

    components: {
        UploadDocumentModal
    },

    props: {
        trayId: {
            required: true
        },
        id: {
            required: true
        }
    },
    
    data() {
        return {
            loading: false,
            data: [],
            columns: [
                {
                    name: "title",
                    align: "left",
                    label: "Title",
                    field: "title"
                },
                {
                    name: "category",
                    align: "left",
                    label: "Category",
                    field: "category"
                },
                {
                    name: "dateUploaded",
                    align: "left",
                    label: "Date Uploaded",
                    field: "dateUploaded"
                },
                {
                    name: "uploadedBy",
                    align: "left",
                    label: "Uploaded By",
                    field: "uploadedBy"
                },
                {
                    name: "size",
                    align: "left",
                    label: "Size",
                    field: "size"
                },
                {
                    name: "note",
                    align: "left",
                    label: "Note",
                    field: "note"
                },
                {
                    name: "action",
                    align: "left",
                    label: "Action",
                    field: "action"
                },
            ],
            confirm: false,
            openUploadDocumentModal: false,
            documentId: null,
        }
    },
    methods: {
        openDeleteModal(id) {
            this.confirm = true
            this.documentId = id
        },
        deleteDocument() {
            this.loading = true

            const conf = {
                method: 'DELETE',
                url: config.deleteDocument + this.documentId,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                this.loading = false
                this.confirm = false
                this.getDocuments()
            })
            .catch(err => {
                this.loading = false
                this.confirm = false
            })
        },
        openUploadModal() {
            this.openUploadDocumentModal = true
        },
        togglePopup(val) {
            this.openUploadDocumentModal = val
        },
        bytesToSize(bytes) {
            let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        },
        getDocuments() {

            const conf = {
                method: 'GET',
                url: `${config.documentsByTray}${this.trayId}/${this.id}`,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                let data = res.data.file
                let arr = [];

                for(let i=0; i<data.length; i++) {
                    arr.push({
                        id: data[i].document.id,
                        title: data[i].document.name,
                        category: data[i].document.document_category?.name,
                        dateUploaded: data[i].uploaded_date,
                        uploadedBy: data[i].document.uploaded_by,
                        size: this.bytesToSize(data[i].document.size),
                        note: data[i].document.description,
                    })
                }
                this.data = arr
            })
        },
        newDocument(document) {
            this.getDocuments()
        }
    },
    created() {
        this.getDocuments()
    },
    computed: {
        deleteIcon() {
            return ICONS.delete
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