<template>
    <div>
        <q-table
            :data="data" 
            :columns="columns"
            class="no-shadow"
            hide-bottom
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
                                @click="openDeleteModal"
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

        <div class="q-mt-md q-ml-md q-mb-md">
            <q-btn icon="add" size="sm" color="blue" class="q-mr-sm" round/>
            Add Document
        </div>

        <q-dialog v-model="confirm" persistent>
            <q-card>
                <q-card-section class="row items-center">
                <span class="q-ml-sm">Are you sure to delete this document?</span>
                </q-card-section>

                <q-card-actions align="right">
                <q-btn flat label="No, thanks" color="primary" v-close-popup />
                <q-btn label="Yes" color="edx-delete-btn" v-close-popup  />
                </q-card-actions>
            </q-card>
        </q-dialog>

    </div>
</template>

<script>
import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

import ICONS from '../../../icons'

export default {
    
    data() {
        return {
            data: [
                {
                    title: '-WEI 2020 W9',
                    category: 'Tax',
                    dateUploaded: '08/14/2020',
                    uploadedBy: 'Luke Skywalker',
                    size: '1.1 MB',
                    note: 'Hello. I am test note.',
                },
                {
                    title: '-WEI Star Wars',
                    category: 'Tax',
                    dateUploaded: '08/14/2020',
                    uploadedBy: 'Leonel Messi',
                    size: '35 Kb',
                    note: 'Hello. I am test note.',
                },
            ],
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
        }
    },
    methods: {
        openDeleteModal() {
            this.confirm = true
        }
    },
    computed: {
        deleteIcon() {
            return ICONS.delete
        },
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