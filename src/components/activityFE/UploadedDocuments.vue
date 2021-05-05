<template>
    <div class="q-mr-md">
        <div class="text-subtitle2 q-mb-md">Upload Documents</div>
        
        <q-table
            :data="data"
            :columns="columns"
            row-key="id" 
            :loading="loading"
            binary-state-sort
            hide-bottom
        >

            <!-- Loading -->
            <template v-slot:loading>
                <q-inner-loading showing color="primary" />
            </template>

            <!-- Table Header -->
            <template> 
                <div class="q-pa-sm q-gutter-sm">
                    
                    <q-dialog v-model="deleteDocumentPopup" persistent>
                        <q-card>
                            <q-card-section class="row items-center">
                            <span class="q-ml-sm">Are you sure to delete this document?</span>
                            </q-card-section>

                            <q-card-actions align="right">
                                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                                <q-btn label="Yes" color="red" v-close-popup @click="deleteDocument" />
                            </q-card-actions>
                        </q-card>
                    </q-dialog>

                </div>
            </template>

            <!-- Table Body -->
            <template v-slot:body="props">

                <q-tr :props="props">

                    <q-td key="title" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.title }}
                        </div>
                    </q-td>

                    <q-td key="category" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.category }}
                        </div>
                    </q-td>

                    <q-td key="subcategory" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.subcategory }}
                        </div>
                    </q-td>

                    <q-td key="uploaddate" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.uploaddate }}
                        </div>
                    </q-td>

                    <q-td key="uploadedby" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.uploadedby }}
                        </div>
                    </q-td>

                    <q-td key="size" :props="props">
                        <div  class="cursor-pointer">
                            {{ props.row.size }}
                        </div>
                    </q-td>

                    <q-td key="note" :props="props">
                        <div  class="cursor-pointer">
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
                        </div>
                    </q-td>

                    <q-td key="actions" :props="props">
                        <q-btn
                            @click="openDeleteDocumentPopup"
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

                <q-tr v-show="props.expand" :props="props">
                    <q-td colspan="100%">
                        <div class="q-mt-md q-mb-lg">
                            <div class="row">
                                <div class="col-md-6">
                                    6
                                </div>
                                <div class="col-md-6">
                                    <div class="text-subtitle2">Notes</div>
                                    <q-input class="q-mt-md" dense outlined type="textarea" v-model="props.row.note" readonly />
                                    <q-popup-edit v-model="props.row.note" title="Update notes" buttons>
                                        <q-input type="textarea" v-model="props.row.note" @input="detectChange(props.rowIndex)"
                                        dense autofocus />
                                    </q-popup-edit>   
                                </div>
                            </div>
                        </div>
                    </q-td>
                </q-tr>

            </template>

        </q-table>

        <div class="q-mt-md q-mb-sm">
            <q-btn @click="addDocumentPopup=true" icon="add" color="blue" round/>
            <span class="q-ml-md">Add Document</span>
        </div>

        <dialog-draggable :modelDialog="addDocumentPopup" :title="'Add document'" @onHide="addDocumentPopup=false">

            <q-card-section class="flex column items-center justify-center">
                <div class="row full-width">
                    <div class="col-md-12 q-mt-md">
                        <q-input outlined v-model="addDocument.title" label="Title" />
                    </div>
                    <div class="col-md-12 q-mt-md">
                        <q-input outlined v-model="addDocument.category" label="Category" />
                    </div>
                    <div class="col-md-12 q-mt-md">
                        <q-input outlined v-model="addDocument.subcategory" label="Subcategory" />
                    </div>
                    <div class="col-md-12 q-mt-md">
                        <q-file outlined  bottom-slots v-model="addDocument.document" label="Choose Document" counter>
                            <template v-slot:prepend>
                            <q-icon name="cloud_upload" @click.stop />
                            </template>
                            <template v-slot:append>
                            <q-icon name="close" @click.stop="addDocument.document = null" class="cursor-pointer" />
                            </template>
                        </q-file>
                    </div>
                    <div class="col-md-12 q-mt-md">
                        <q-checkbox v-model="addDocument.encrypt" label="Encrypt document" />
                    </div>
                    <div class="col-md-12 q-mt-md">
                        <q-input outlined type="textarea" v-model="addDocument.note" label="Note" />
                    </div>
                </div>
            </q-card-section>

            <q-separator />

            <q-card-actions align="right">
                <q-btn flat label="Cancel" color="primary" v-close-popup/>
                <q-btn flat label="Add" color="primary" v-close-popup/>
            </q-card-actions>

        </dialog-draggable>

    </div>
</template>

<script>

import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)
import dialogDraggable from '../../components/DialogDraggable'

export default {
    name: 'UploadDocuments',
    components: {
        dialogDraggable
    },
    data() {
        return {
            loading: false,
            addDocumentPopup: false,
            deleteDocumentPopup: false,
            columns: [
                {
                    name: "title",
                    align: "left",
                    label: "Title",
                    field: "title",
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
                    name: "subcategory",
                    align: "left",
                    label: "Sub Category",
                    field: "subcategory",
                    sortable: true
                },
                {
                    name: "uploaddate",
                    align: "left",
                    label: "Date Upload",
                    field: "uploaddate",
                    sortable: true
                },
                {
                    name: "uploadedby",
                    align: "left",
                    label: "Uploaded By",
                    field: "uploadedby",
                    sortable: true
                },
                {
                    name: "size",
                    align: "left",
                    label: "Size",
                    field: "size",
                    sortable: true
                },
                {
                    name: "note",
                    align: "left",
                    label: "Note",
                    field: "note",
                    sortable: true
                },
                {
                    name: "actions",
                    align: "left",
                    label: "Actions",
                    field: "actions"
                }
            ],
            data: [
                {
                    id: 1,
                    title: 'WEI 2020 W9',
                    category: 'IRS',
                    subcategory: 'W9',
                    uploaddate: '08/22/20',
                    uploadedby: 'Han Solo',
                    size: '2.2 MB',
                    note: 'I am note. )))',
                },
                {
                    id: 2,
                    title: 'WEI 2020 W9',
                    category: 'IRS',
                    subcategory: 'W9',
                    uploaddate: '08/22/20',
                    uploadedby: 'Han Solo',
                    size: '2.2 MB',
                    note: 'I am note. )))',
                },
                {
                    id: 3,
                    title: 'WEI 2020 W9',
                    category: 'IRS',
                    subcategory: 'W9',
                    uploaddate: '08/22/20',
                    uploadedby: 'Han Solo',
                    size: '2.2 MB',
                    note: 'I am note. )))',
                },
            ],

            addDocument: {
                title: '',
                category: '',
                subcategory: '',
                document: '',
                note: '',
                encrypt: false,
            }
        }
    },
    methods: {
        openDeleteDocumentPopup() {
            this.deleteDocumentPopup = true
        },
        deleteDocument() {
            alert('Document deleted')
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