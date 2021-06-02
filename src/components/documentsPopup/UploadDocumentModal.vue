<template>
  <dialog-draggable
    :width="600"
    :modelDialog="showPopup"
    :title="'Upload Document'"
    :icon="'upload_file'"
  >

    <q-card-section
      style="max-height: 60vh"
      class="scroll q-pt-none q-pb-none q-pr-none q-pl-none"
    >
      <div class="q-pa-md">
        <div class="row">
          <div class="col-md-4">
            <div class="text-subtitle2 q-mb-sm">File Category</div>
            <q-select
              outlined
              v-model="selectedCategory"
              :options="categories"
              dense
            />
          </div>
          <div class="col-md-8 q-pl-md">
            <div class="text-subtitle2 q-mb-sm">Title</div>
            <q-input outlined v-model="title" dense />
          </div>

          <div class="col-md-12 q-mt-md">
            <div class="text-subtitle2 q-mb-sm">Tags</div>
            <q-select
              outlined
              dense
              ref="myChipInput"
              v-model="modelMultiple"
              multiple
              use-chips
              use-input
              new-value-mode="add"
              stack-label
            >
            </q-select>
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
        <q-btn
          flat
          label="Cancel"
          color="primary"
          @click="emitClosePopup"
        ></q-btn>

        <q-btn
          flat
          :loading="loading"
          label="Save"
          @click="addDocument"
          color="primary"
        ></q-btn>

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

            modelMultiple: [],
            inputValue: ''

        }
    },
    methods: {

        // filterFn(val, update, abort) {
        //     update(() => {
        //         if(val) {
        //             const needle = val.toLowerCase()

        //             let arr = []
        //             const conf = {
        //                 method: 'GET',
        //                 url: config.searchTag + needle,
        //                 headers: {
        //                     Accept: 'application/json',
        //                 }
        //             }

        //             axios(conf).then(res => {
        //                 for(let i=0; i<res.data.tags.length; i++) {
        //                     arr.push({
        //                         id: res.data.tags[i].id,
        //                         label: res.data.tags[i].name
        //                     })
        //                 }
        //                 this.options = arr
        //             })
        //             // console.log(needle)
        //             // this.options = this.options2.filter(v =>   v.toLowerCase().indexOf(needle) > -1)
        //         }
        //     })
        // },

        // createValue (val, done) {
        //     // this.showOk = false
        //     // console.log(1)
        //     // if(done) {
        //     //     console.log(2)
        //     //     done(val)
        //     // }
        // },
        // doStuff (val) {
        //     // this.showOk = true
        //     // this.inputValue = val
        //     // console.log(val)
        // },
        // doOtherStuff () {
        //     this.showOk = false
        //     this.$refs.myChipInput.add(this.inputValue)
        //     this.$refs.myChipInput.updateInputValue('')
        //     this.inputValue = ''
        // },

        // documentByTagId(ids) {

        //     const conf = {
        //         method: 'GET',
        //         url: config.documentByTagId + ids,
        //         headers: {
        //             Accept: 'application/json',
        //         }
        //     }

        //     let docs = []

        //     axios(conf).then(res => {
        //         console.log('RES DATAAAA', res.data)
        //         let document = res.data.document
        //         for(let i=0; i<document.length; i++) {
        //             for(let j=0; j<document[i].length; j++) {
        //                 docs.push({
        //                     value: document[i][j].document.id,
        //                     label: document[i][j].document.document_original_name
        //                 })
        //             }
        //         }
        //         this.documents = docs
        //     })

        // },

        /////
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
            formData.append('tags', this.modelMultiple)

            axios.post(`${config.addDocument}${this.trayId}/${this.id}/budget`, formData)
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
        }
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
      },
        // modelMultiple(val) {
        //     let ids = '';

        //     let tagCount = val.length

        //     for(let i=0; i<val.length; i++) {
        //         // this.options.findIndex( item => item.id == val[i].id )   
        //         if(i == tagCount - 1) {
        //             ids += val[i].id
        //         }else {
        //             ids += val[i].id + ','
        //         }
        //     }
        //     console.log(ids, 'ids')
        //     this.documentByTagId(ids)
        // }
    }
}
</script>

<style>

.filepond--drop-label {
  border: 1px solid #c2c2c2;
  border-radius: 0.2rem;
}

</style>
