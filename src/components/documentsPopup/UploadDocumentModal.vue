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
                            name="test"
                            ref="pond"
                            label-idle="Drop document here..."
                            v-bind:allow-multiple="false"
                            v-bind:files="myFiles"
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
                <q-btn flat label="Save" color="primary"></q-btn>
            </div>
        </q-card-actions>

    </dialog-draggable>
</template>

<script>
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
        }
    },
    data() {
        return {

            selectedCategory: 'Tax',
            categories: ['tax', 'JoJo', 'DuDu'],

            title: '',
            myFiles: [],
            note: '',

        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('togglePopup', false)
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