<template>
    <dialog-draggable 
        :width="600" 
        :modelDialog="showPopup" 
        :title="'Upload Document'" 
        :icon="'upload_file'"
    >  

        <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
            <div class="q-pa-md">
                <div class="row">
                    <div class="col-md-4">
                        <div class="text-subtitle2 q-mb-sm">File Category</div>
                        <q-select outlined v-model="selectedCategory" :options="categories" dense />
                    </div>
                    <div class="col-md-8 q-pl-md">
                        <div class="text-subtitle2 q-mb-sm">Title</div>
                        <q-input outlined v-model="title" dense />
                    </div>
                    <div class="col-md-12 q-mt-md">
                        <file-pond
                            name="document"
                            ref="pond"
                            label-idle="Drop document here..."
                            v-bind:allow-multiple="false"
                            :files="myFiles"
                        />
                    </div>
                    <div class="col-md-12 q-mt-md">
                        <div class="text-subtitle2 q-mb-sm">Note</div>
                        <q-input dense outlined type="textarea" v-model="note" />
                    </div>
                </div>
            </div>
        </q-card-section>

        <q-card-actions class="row justify-end">
            <div>
                <q-btn flat label="Cancel" color="primary" @click="emitClosePopup"></q-btn>
                <q-btn flat :loading="loading" label="Save" @click="addDocument" color="primary"></q-btn>
            </div>
        </q-card-actions>

    </dialog-draggable>
</template>

<script>
import axios from 'axios'
import config from '../../../config'

import dialogDraggable from '../../components/DialogDraggable'

// Import Vue FilePond
import vueFilePond from "vue-filepond";

// Import FilePond plugins
// Please note that you need to install these plugins separately

// Import image preview plugin styles
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.min.css";

// Import image preview and file type validation plugins
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";

// Create component
const FilePond = vueFilePond(
  FilePondPluginFileValidateType,
  FilePondPluginImagePreview
);

export default {
    components: {
        dialogDraggable,
        FilePond
    },    
    props: {
        show: {
            required: true
        },
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

            selectedCategory: null,
            categories: [],

            title: '',
            myFiles: [],
            note: '',

        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('togglePopup', false)
        },
        getCategories() {
            
            const conf = {
                method: 'GET',
                url: config.getDocumentCategory,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                let categories = res.data.category,
                    arr = [];

                for(let i=0; i<categories.length; i++) {
                    arr.push({
                        id: categories[i].id,
                        label: categories[i].name
                    })
                }

                this.categories = arr
            })
        },
        addDocument() {

            this.loading = true

            let file = this.$refs.pond.getFiles(0)

            let formData = new FormData();

            formData.append('name', this.title);
            formData.append('description', this.note);
            formData.append('category_id', this.selectedCategory.id);
            formData.append('document', file[0].file);

            axios.post(`${config.addDocument}${this.trayId}/${this.id}`, formData)
            .then(res => {
                this.loading = false
                console.log('Add document: ', res.data)
                let uploadedFile = res.data.file
                this.$emit('newDocument', uploadedFile)
                this.$emit('togglePopup', false)
               
            })
            .catch(err => {
                 this.loading = false
            })
        },

    },
    computed: {
        showPopup() {
            return this.show
        }
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)
            this.getCategories()
        }
    }
}
</script>

<style>
.filepond--drop-label {
    border: 1px solid #c2c2c2;
    border-radius: .2rem;
}
</style>