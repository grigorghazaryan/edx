<template>         
    <q-table
        class="q-mb-md no-shadow border"
        :data="dateOfActivity"
        :columns="tableColumns"
        row-key="id"
        hide-bottom
        :pagination.sync="paginationDate"
    >
        <template v-slot:body="props">
            <q-tr :props="props">

            <q-td key="startdate" :props="props">
                <span class="q-mr-md">{{ props.row.startdate }}</span>
                <span>{{props.row.time1  }}</span>
            </q-td>

            <q-td key="endDate" :props="props">
                <span class="q-mr-md">{{ props.row.endDate }}</span>
                <span>{{ props.row.time2 }}</span>
            </q-td>

            <q-td key="location" 
            style="white-space: initial;width: 230px; max-width: 230px;"
            :props="props">
                {{ props.row.location }}
            </q-td>
            
            <q-td key="repeats" :props="props">
                {{ props.row.repeats.label }}
            </q-td>

            <q-td key="repeatEvery" :props="props">
                {{ props.row.repeatEvery }}
            </q-td>

            <q-td key="repeatOn" :props="props">
                <span v-for="weekday in props.row.repeatOn" :key="weekday.label">
                <span v-if="weekday.checked" class="q-mr-sm">{{ weekday.label }}</span>
                </span>
            </q-td>

            <q-td key="note" :props="props">
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

            <q-td key="actions" :props="props">
                <!-- @click="openDeleteDate(dateOfActivity)"  -->
                <q-btn
                v-if="dateOfActivity.child"
                
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
        </template>

    </q-table>  
</template>

<script>

import Vue from 'vue'
import VTooltip from 'v-tooltip'
Vue.use(VTooltip)

export default {
    name: 'DateOfActivityPopup',
    data() {
        return {
            paginationDate: { rowsPerPage: 100 },
        }
    },
    props: {
        dateOfActivity: {
            required: true
        },
        tableColumns: {
            required: true
        }
    },
    methods: {

    },
    created() {

        console.log('111111', this.dateOfActivity)
        console.log('222222', this.tableColumns)

    }
}
</script>