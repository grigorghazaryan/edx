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
            <q-tr :props="props" class="cursor-pointer" @click="openEditSchedulePopup(props.row)" v-show="props.rowIndex == 0 || props.rowIndex != 0 && expand">

                <q-td auto-width>
                    <q-btn size="sm" 
                    v-if="props.rowIndex == 0"
                    flat
                    color="black"
                    @click.stop="expand = !expand" 
                    :icon="expand ? 'keyboard_arrow_down' : 'keyboard_arrow_right'"
                    >
                    </q-btn>
                </q-td>

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
                    <span v-if="props.rowIndex != 0">{{ props.row.location }}</span>
                </q-td>
                
                <q-td key="reccurance" :props="props">
                    <div v-if="props.rowIndex != 0">
                        {{ props.row.repeats.label }}
                        {{ props.row.repeatEvery }}
                        <span v-for="weekday in props.row.repeatOn" :key="weekday.label">
                            <span v-if="weekday.checked" class="q-mr-sm">{{ weekday.label }}</span>
                        </span>
                    </div>
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
                    
                    <q-btn
                        v-if="props.rowIndex != 0"
                        icon="delete_forever"
                        color="red" 
                        size=sm 
                        no-caps
                        round 
                        @click.stop="openDeleteDate(props.row)"
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
            expand: false,
            paginationDate: { rowsPerPage: 1000 },
            tableColumns: [
                {
                    name: "toggle",
                    style: 'width: 30px'
                },
                {
                    name: "startdate",
                    align: "left",
                    label: "Start Date",
                    field: "startdate"
                },
                {
                    name: "endDate",
                    align: "left",
                    label: "End Date",
                    field: "endDate"
                },
                {
                    name: "location",
                    align: "left",
                    label: "Location",
                    field: "location"
                },
                {
                    name: "reccurance",
                    align: "left",
                    label: "Recurranse",
                    field: "reccurance"
                },
                {
                    name: "note",
                    align: "left",
                    label: "Note",
                    field: "note"
                },
                {
                    name: "actions",
                    align: "left",
                    label: "Actions",
                    field: "actions"
                }
            ],
        }
    },
    props: {
        dateOfActivity: {
            required: true
        }
    },
    methods: {
        openEditSchedulePopup(schedule) {
            this.$emit("openEditPopup", schedule)
        },
        openDeleteDate(schedule) {
            this.$emit("openDeletePopup", schedule)
        }
    },
    created() {

        console.log('111111', this.dateOfActivity)
        console.log('222222', this.tableColumns)

    }
}

</script>

<style lang="scss" scoped>

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