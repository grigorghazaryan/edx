<template>
    <div>

        <dialog-draggable 
            :width="850" 
            :modelDialog="showPopup" 
            :title="'Budget Items'" 
            :icon="'attach_money'"
            :pagination.sync="pagination"
        > 

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">
                        <div class="col-md-8">
                            <div class="row">
                                <div class="col-md-4">
                                    <div class="q-mb-md">
                                        <div class="text-subtitle2 q-mb-sm">Start Date</div>
                                        <q-input  outlined class="q-mr-md" dense v-model="start">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                    <q-date mask="DD/MM/YYYY" @input="filterBudgetItems" v-model="start">
                                                        <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                                <div class="col-md-4">
                                    <div class="q-mb-md">
                                        <div class="text-subtitle2 q-mb-sm">End Date</div>
                                        <q-input  outlined class="q-mr-md" dense v-model="end">
                                            <template v-slot:append>
                                                <q-icon name="event" class="cursor-pointer">
                                                    <q-popup-proxy transition-show="scale" transition-hide="scale">
                                                    <q-date mask="DD/MM/YYYY" @input="filterBudgetItems" v-model="end">
                                                        <div class="row items-center justify-end">
                                                        <q-btn v-close-popup label="Close" color="primary" flat />
                                                        </div>
                                                    </q-date>
                                                    </q-popup-proxy>
                                                </q-icon>
                                            </template>
                                        </q-input>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-md-4 row justify-end items-center">
                            <b>Total selected: $ <span>{{ totalSelected }}</span> </b>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-3 q-pr-sm">
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Category</div>
                                <q-select outlined dense 
                                v-model="selectedCategory" 
                                :options="optionsCategory"
                                @input="filterBudgetItems" />
                            </div>
                        </div>
                        <div class="col-md-3 q-pr-sm">
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Subcategory</div>
                                <q-select outlined dense 
                                v-model="selectedCategory" 
                                :options="optionsCategory"
                                @input="filterBudgetItems" />
                            </div>
                        </div>
                        <div class="col-md-3 q-pr-sm">
                            <div class="q-mb-md">
                                <div class="text-subtitle2 q-mb-sm">Funding source</div>
                                <q-select outlined dense 
                                v-model="selectedCategory" 
                                :options="optionsCategory"
                                @input="filterBudgetItems" />
                            </div>
                        </div>
                    </div>
                    <div class="row q-mt-md">
                        <q-table
                            class="overflow-auto"
                            :data="data" 
                            :columns="columns"
                            hide-bottom
                        >
                            <!-- Table Body -->
                            <template v-slot:body="props">
                                <q-tr :props="props" class="cursor-pointer">
                                    <q-td key="transaction" :props="props" style="white-space: initial;width: 350px; max-width: 350px;">
                                        <div class="inline-span">
                                            {{props.row.transaction}}
                                        </div>
                                    </q-td>
                                    <q-td key="date" :props="props">
                                        {{props.row.date}}
                                    </q-td>
                                    <q-td key="allocation" :props="props">
                                        {{props.row.allocation}}
                                    </q-td>
                                    <q-td key="type" :props="props">
                                        <q-chip square class="bg-edx-bg-wr">
                                            <span>{{props.row.type.abbreviation}}</span>
                                            <q-tooltip 
                                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                transition-show="flip-right"
                                                transition-hide="flip-left"
                                            >
                                                <strong>{{props.row.type.name}}</strong>
                                            </q-tooltip>
                                        </q-chip>
                                    </q-td>
                                    <q-td key="qty" :props="props">
                                        {{props.row.qty}}
                                    </q-td>
                                    <q-td key="balance" :props="props">
                                        {{props.row.balance}}
                                    </q-td>
                                    <q-td key="select" :props="props">
                                        <q-checkbox v-model="props.row.select" @input="calculateSelectedPrice(props.row)"/>
                                    </q-td>
                                </q-tr>
                            </template>

                        </q-table>
                    </div>
                </div>
            </q-card-section>


            <q-card-actions class="row justify-end">
                <div>
                    <q-btn flat label="Cancel" color="primary" @click="emitClosePopup"></q-btn>
                    <q-btn flat label="Add Selected" @click="addSelected" class="edx-add-btn q-ml-sm"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

    </div>
</template>

<script>
import dialogDraggable from '../../components/DialogDraggable'
import axios from 'axios'
import config from '../../../config'

export default {
    props: {

        show: {
            required: true
        },
        categoryId: {
            required: true
        },
        invoiceId: {
            required: true,
            default: 0
        }

    },
    data() {
        return {
            data: [],
            columns: [
                {
                    name: "transaction",
                    align: "left",
                    label: "Transaction",
                    field: "transaction",
                    sortable: true
                },
                {
                    name: "date",
                    align: "left",
                    label: "Date",
                    field: "date",
                    sortable: true
                },
                {
                    name: "type",
                    align: "left",
                    label: "Type",
                    field: "type",
                    sortable: true
                },
                {
                    name: "qty",
                    align: "left",
                    label: "Qty",
                    field: "qty",
                    sortable: true
                },
                {
                    name: "balance",
                    align: "left",
                    label: "Balance",
                    field: "balance",
                    sortable: true
                },
                {
                    name: "select",
                    align: "left",
                    label: "Select",
                    field: "select",
                    sortable: true
                },
            ],

            selectedTransactions: new Set([]),
            pagination: { rowsPerPage: 999 },
            start: null,
            end: null,
            selectedCategory: null,
            optionsCategory: [
            ],

        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('toggleBudgetItemsPopup', false)
        },
        addSelected() {
            let budgetIds = Array.from(this.selectedTransactions);

            const conf = {
                method: 'POST',
                url: config.addSelected + this.invoiceId,
                headers: {
                    Accept: 'application/json',
                },
                data: {
                    budget_ids: budgetIds
                }
            }

            axios(conf).then(res => {
                console.log('res data 8888', res.data)
            })


        },
        getBudgetItems() {

            let id = this.categoryId && this.categoryId.id

            let uri = '?start_date=' + (this.start ? this.start : null) + '&end_date=' + (this.end ? this.end : null)
            
            if(this.selectedCategory && this.selectedCategory.id) {
                uri += '&category=' + this.selectedCategory.id
            }


            const conf = {
                method: 'GET',
                url: config.getBudgetItems + id + uri,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                console.log('gggg', res.data.items)

                let budgetItems = res.data.items,
                    arr = []

                for(let i=0; i<budgetItems.length; i++) {
                    arr.push({
                        id: budgetItems[i].id,
                        transaction: budgetItems[i].name,
                        date: budgetItems[i].completed_date,
                        type: budgetItems[i].category,
                        qty: budgetItems[i].quantity,
                        balance: budgetItems[i].unit_total_cost,
                        select: false
                    })
                }

                this.data = arr
            })
        },
        calculateSelectedPrice(row) {

            if(this.selectedTransactions.has(row.id)) {
                this.selectedTransactions.delete(row.id) 
            }else {
                this.selectedTransactions.add(row.id)
            }

            console.log(this.selectedTransactions)
        },
        getcategories() {

            const conf = {
                method: 'GET',
                url: config.getAllCategories,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {

                console.log(res.data.categories, 'res.data.categories')
                let categories = res.data.categories
                let arr = []

                for(let i=0; i<categories.length; i++) {
                    console.log(categories[i])

                    arr.push({
                        id: categories[i].id,
                        label: categories[i].name
                    })
                }

                this.optionsCategory = arr
            })
        },
        filterBudgetItems() {
            this.getBudgetItems()
        }
    },
    components: {
        dialogDraggable
    },
    created() {
    },
    computed: {
        showPopup() {
            return this.show
        },
        totalSelected() {
            let count = 0;
            for(let i=0; i<this.data.length; i++) {
                if(this.data[i].select) {
                    count += parseFloat(this.data[i].balance)
                }
            }
            return count
        }
    },
    watch: {
        show(val) {
            this.$emit('toggleBudgetItemsPopup', val)

            if(val) {
                this.getBudgetItems()
                this.getcategories()
            }

        }
    }
}
</script>