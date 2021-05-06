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
                                                    <q-date color="edx-pagination" mask="DD/MM/YYYY" @input="filterBudgetItems" v-model="start">
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
                                                    <q-date color="edx-pagination" mask="DD/MM/YYYY" @input="filterBudgetItems" v-model="end">
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
                    <div class="row q-mt-md">
                        <q-table
                            class="overflow-auto my-sticky-column-table"
                            :data="data" 
                            :columns="columns"
                            hide-bottom
                            :pagination.sync="pagination"
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
                                        <q-chip v-if="props.row.type" square :class="checkType(props.row.type.abbreviation)">
                                            <span> {{props.row.type.abbreviation}}</span>
                                            <q-tooltip 
                                                anchor="top middle" self="bottom middle" :offset="[10, 10]"
                                                transition-show="flip-right"
                                                transition-hide="flip-left"
                                            >
                                                <strong> {{props.row.type.name}}</strong>
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
                    <q-btn :loading="loading" flat label="Add Selected" @click="addSelected" class="edx-add-btn q-ml-sm"></q-btn>
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
        },
        allocation: {
            required: true
        },
        category: {
            required: true
        }

    },
    data() {
        return {
            loading: false,

            pagination: { rowsPerPage: 999 },
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
                    label: "Amount",
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

            selectedTransactions: null,
            pagination: { rowsPerPage: 999 },
            start: null,
            end: null

        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('toggleBudgetItemsPopup', false)
        },
        addSelected() {
            
            this.loading = true
            let budgetIds = Array.from(this.selectedTransactions);

            const conf = {
                method: 'POST',
                url: config.addReconciliationBudgetItems + this.invoiceId,
                headers: {
                    Accept: 'application/json',
                },
                data: {
                    budget_ids: budgetIds
                }
            }

            axios(conf).then(res => {
                

                this.$q.notify({
                    message: 'Added!',
                    type: 'positive',
                })
                this.loading = false
                this.emitClosePopup()

            })


        },
        getBudgetItems() {

            let id = this.categoryId && this.categoryId.id

            let uri = '?';

            if(this.start) {
                uri += `start_date=${this.start}&`
            }
            if(this.end) {
                uri += `end_date=${this.end}&`
            }
            
            uri += `category=${this.category.id}&`
            

            const conf = {
                method: 'GET',
                url: config.getReconciliationBudgetItems + id + uri,
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
                        id: budgetItems[i]?.id,
                        transaction: budgetItems[i].name,
                        date: budgetItems[i]?.completed_date,
                        type: budgetItems[i].category ? budgetItems[i].category : { abbreviation: 'N/A' },
                        qty: budgetItems[i]?.quantity,
                        balance: budgetItems[i]?.unit_total_cost,
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
        },
        // Get subcategories
        getSubcategories(id) {
            const conf = {
                method: 'GET',
                url: config.getSubcategories + id,
                headers: {
                    Accept: 'application/json',
                }
            }

            axios(conf).then(res => {
                const subcategoriesArr = []
                const subcategories = res.data.typesCategories
                for(let i=0; i<subcategories.length; i++) {
                    let obj = {
                        id: subcategories[i].id,
                        name: subcategories[i].abbreviation,
                        label: subcategories[i].name
                    }
                    subcategoriesArr.push(obj)
                }
                this.optionsSubcategory = subcategoriesArr
            })
        },
        // Funds
        getFunds(title) {

            const conf = {
                method: 'GET',
                url: config.getFunds + title,
                headers: {
                Accept: 'application/json',
                }
            }
            
            axios(conf).then(res => {

                console.log('funds ======', res.data)

                let fundSource = res.data.fundSource;
                let fundSourceArr = [];

                for(let i=0; i<fundSource.length; i++) {
                    
                    let obj = {
                        id: fundSource[i].id,
                        label: fundSource[i].name,
                        abbr: fundSource[i].abbreviation
                    }
                    fundSourceArr.push(obj)
                }

                this.optionsFundSource = fundSourceArr;
            })
        },
        checkType(type) {

            let className = ''
            
            switch(type) {
                case 'I':
                className = 'bg-edx-bg-i';
                break;

                case 'M':
                className = 'bg-edx-bg-m';
                break;

                case 'PD':
                className = 'bg-edx-bg-pd';
                break;

                case 'FE':
                className = 'bg-edx-bg-fe';
                break;

                default:
                className = '';
                break;
            }

            return className
        }
    },
    components: {
        dialogDraggable
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

                this.selectedTransactions = new Set([])
                this.getBudgetItems()
                this.getcategories()

                console.log('invoiceId', this.allocation)

                let id = this.allocation?.id
                // console.log('idididididid', id, this.title)
                this.getFunds(id)
            }

        },
        selectedCategory(val) {
            this.getSubcategories(val.id)
        }
    }
}
</script>