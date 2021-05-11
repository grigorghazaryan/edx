<template>
    <div>

    <dialog-draggable 
        :width="600" 
        :modelDialog="showPopup" 
        :title="'Search Documents'" 
        :icon="'search'"
    >

        <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
            <div class="q-pa-md">
                <div class="row">

                        <div class="col-md-4">
                            <div class="text-subtitle2 q-mb-sm">Document Trays</div>
                            <div class="q-mb-md q-pr-sm">
                                <q-select outlined v-model="selectedStatus" :options="categories" dense />
                            </div>
                        </div>

                        <div class="col-md-8">
                            <div class="text-subtitle2 q-mb-sm">Search for..</div>
                            <div class="q-mb-md">
                                <q-select
                                    outlined
                                    dense
                                    v-model="modelMultiple"
                                    multiple
                                    use-chips
                                    use-input
                                    stack-label
                                    :options="options"
                                    @filter="filterFn"
                                >
                                </q-select>
                            </div>
                        </div>

                        <div class="col-md-12">
                            <q-table
                                :data="data" 
                                :columns="columns"
                                :loading="tableLoading"
                                class="overflow-auto"
                                hide-bottom
                            >

                                <template v-slot:body="props">
            
                                    <q-tr @click="openDocumentViewerPopup(props.row.path)" :props="props" class="cursor-pointer">
                                        <q-td key="title" :props="props">
                                            <div>
                                                {{ props.row.title }}
                                            </div>
                                        </q-td>
                                        <q-td key="date" :props="props">
                                            <div>
                                               {{ props.row.date }}
                                            </div>
                                        </q-td>
                                        <q-td key="uploadedBy" :props="props">
                                            <div>
                                               {{ props.row.uploadedBy }}
                                            </div>
                                        </q-td>
                                        <q-td key="size" :props="props">
                                            <div>
                                                {{ props.row.size }}
                                            </div>
                                        </q-td>
                                        <q-td key="note" :props="props">
                                            <div>
                                               <!-- {{ props.row.note }} -->
                                               <q-icon 
                                                    name="sticky_note_2" 
                                                    color="orange" 
                                                    style="font-size: 2em;" 
                                                    class="cursor-pointer"
                                                >
                                                </q-icon>
                                            </div>
                                        </q-td>
                                        <q-td key="selected" :props="props">
                                            <div>
                                                <q-checkbox v-model="props.row.selected" dense />
                                            </div>
                                        </q-td>
                                    </q-tr>

                                </template>

                            </q-table>
                        </div>

                </div>
            </div>
        </q-card-section>

        <q-card-actions class="row justify-end">
            <div>
                <q-btn flat label="Cancel" color="primary" @click="emitClosePopup"></q-btn>
                <q-btn flat label="Add" @click="add"  :loading="loading" color="primary"></q-btn>
            </div>
        </q-card-actions>

    </dialog-draggable>

    <DocumentViewer 
        :show="showDocumentViewerPopup"
        @togglePopup="togglePopup"
        :type="type"
        :value="value"
    />

    </div>
</template>

<script>

import dialogDraggable from '../../components/DialogDraggable'
import DocumentViewer from './DocumentViewer'

import axios from 'axios'
import config from '../../../config'

export default {
    components: {
        dialogDraggable,
        DocumentViewer
    },
    data() {
        return {

            loading: false,
            tableLoading: false,

            data: [],
            columns: [
                {
                    name: "title",
                    align: "left",
                    label: "Title",
                    field: "title",
                    sortable: false,
                },
                {
                    name: "date",
                    align: "left",
                    label: "Date",
                    field: "date",
                    sortable: false,
                },
                {
                    name: "uploadedBy",
                    align: "left",
                    label: "Uploaded By",
                    field: "uploadedBy",
                    sortable: false,
                },
                {
                    name: "size",
                    align: "left",
                    label: "Size",
                    field: "size",
                    sortable: false,
                },
                {
                    name: "note",
                    align: "left",
                    label: "Note",
                    field: "note",
                    sortable: false,
                },
                {
                    name: "selected",
                    align: "left",
                    label: "",
                    field: "selected",
                    sortable: false,
                }
            ],

            selectedStatus: '',

            modelMultiple: [],
            options: [],

            showDocumentViewerPopup: false,

            //
            value: null,
            type: null,

        }
    },
    props: {
        show: {
            required: true
        },
        categories: {
            required: true
        },
        selectedDocumentType: {
            required: true
        },
        id: {
            required: true
        }
    },
    methods: {
        add() {

            this.loading = true

            let data = []
            if(this.data.length) {
                for(let i=0; i<this.data.length; i++) {
                    if(this.data[i].selected) {
                        data.push(this.data[i].id)
                    }
                }
            }

            const conf = {
                method: 'POST',
                url: `${config.addDocumentToExistingItem}${this.id}/${this.selectedStatus.id}/budget`,
                headers: {
                    Accept: 'application/json',
                },
                data: {
                    documentids: data
                }
            }

            axios(conf)
                .then(res => {
                    this.emitClosePopup()
                })
                .catch(err=>{
                    this.emitClosePopup() 
                })

                this.loading = false
        },

        emitClosePopup() {
            this.$emit('toggleSearchPopup', false)
        },

        bytesToSize(bytes) {
            let sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
            if (bytes == 0) return '0 Byte';
            let i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
            return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
        },
        documentType(filename) {
            return (/[.]/.exec(filename)) ? /[^.]+$/.exec(filename) : undefined;
        },
        documentByTagId(ids) {

            const conf = {
                method: 'GET',
                url: config.documentByTagId + ids,
                headers: {
                    Accept: 'application/json',
                }
            }

            let docs = []

            axios(conf).then(res => {
                console.log('RES DATAAAA', res.data)
                let document = res.data.document
                for(let i=0; i<document.length; i++) {
                    for(let j=0; j<document[i].length; j++) {
                        docs.push({
                            id: document[i][j].document.id,
                            path: document[i][j].document.location,
                            title: document[i][j].document.name,
                            date: (document[i][j].document.uploaded_date).substring(0,10),
                            uploadedBy: document[i][j].document.uploaded_by,
                            size: this.bytesToSize(document[i][j].document.size),
                            note: document[i][j].document.description,
                            selected: false
                        })
                    }
                }
                this.data = docs
            })

        },
        filterFn(val, update, abort) {
            update(() => {
                if(val) {
                    const needle = val.toLowerCase()

                    let arr = []
                    const conf = {
                        method: 'GET',
                        url: config.searchTag + needle,
                        headers: {
                            Accept: 'application/json',
                        }
                    }

                    axios(conf).then(res => {
                        for(let i=0; i<res.data.tags.length; i++) {
                            arr.push({
                                id: res.data.tags[i].id,
                                label: res.data.tags[i].name
                            })
                        }
                        this.options = arr
                    })
                }
            })
        },

        openDocumentViewerPopup(url) {

            let documentType = this.documentType(url)

            if(documentType == 'docx' || documentType == 'xlsx' || documentType == 'pptx') {
                this.value = url
                this.type = 'office'
                this.showDocumentViewerPopup = true
            }else {
                window.open(url, '_blank');
            }

            // if(documentType == 'pdf' || documentType == 'jpeg') {
                
            // }
 
        },
        togglePopup(val) {
            this.showDocumentViewerPopup = val
        }

    },
    computed: {
        showPopup() {
            return this.show
        }
    },
    watch: {
        show(val) {
            this.$emit('toggleSearchPopup', val)
            if(val) {
                this.data = []
                this.modelMultiple = []
                this.selectedStatus = this.selectedDocumentType
            }
        },
        modelMultiple(val) {
            let ids = '';

            let tagCount = val.length

            for(let i=0; i<val.length; i++) {
                // this.options.findIndex( item => item.id == val[i].id )   
                if(i == tagCount - 1) {
                    ids += val[i].id
                }else {
                    ids += val[i].id + ','
                }
            }

            this.documentByTagId(ids)
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