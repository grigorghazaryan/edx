<template>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          
            <div class="col-md-3 col-sm-12 col-xs-12">
                <q-item class="q-pa-none q-ml-xs">
                <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="monetization_on" class="edx-light-blue" size="35px"></q-icon>
                </q-item-section>
                <q-item-section class="q-ml-none">
                    <q-item-label class="text-grey-7">Total Paid</q-item-label>
                    <q-item-label  class="text-dark text-h6 text-weight-bolder">
                    <div >$ 6666</div>
                    </q-item-label>
                    <q-item-label>
                        <div>
                        <span class="edx-green q-mr-sm">+ 5.28 %</span>
                        Since last month
                        </div>
                    </q-item-label>
                </q-item-section>
                </q-item>
            </div>

            <div class="col-md-3 col-sm-12 col-xs-12">
                <q-item class="q-pa-none q-ml-xs">
                <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="monetization_on" class="edx-light-blue" size="35px"></q-icon>
                </q-item-section>
                <q-item-section class="q-ml-none">
                    <q-item-label class="text-grey-7">Total Paid</q-item-label>
                    <q-item-label  class="text-dark text-h6 text-weight-bolder">
                    <div >$ 6666</div>
                    </q-item-label>
                    <q-item-label>
                        <div>
                        <span class="edx-red q-mr-sm">- 8.28 %</span>
                        Since last month
                        </div>
                    </q-item-label>
                </q-item-section>
                </q-item>
            </div>

            <div class="col-md-3 col-sm-12 col-xs-12">
                <q-item class="q-pa-none q-ml-xs">
                <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="monetization_on" class="edx-light-blue" size="35px"></q-icon>
                </q-item-section>
                <q-item-section class="q-ml-none">
                    <q-item-label class="text-grey-7">Total Paid</q-item-label>
                    <q-item-label  class="text-dark text-h6 text-weight-bolder">
                    <div >$ 6666</div>
                    </q-item-label>
                    <q-item-label>
                        <div>
                        <span class="edx-red q-mr-sm">- 8.28 %</span>
                        Overdue
                        </div>
                    </q-item-label>
                </q-item-section>
                </q-item>
            </div>

            <div class="col-md-3 col-sm-12 col-xs-12">
                <q-item class="q-pa-none q-ml-xs">
                <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="description" class="edx-light-blue" size="35px"></q-icon>
                </q-item-section>
                <q-item-section class="q-ml-none">
                    <q-item-label class="text-grey-7">Total Invoices</q-item-label>
                    <q-item-label  class="text-dark text-h6 text-weight-bolder">
                    <div>32</div>
                    </q-item-label>
                </q-item-section>
                </q-item>
            </div>
          

        </div>
      </q-card-section>
    </q-card>
</template>

<script>

    import axios from 'axios'
    import config from '../../../config'

export default {
    // data() {
    //     return {
    //         barInfo: null,
    //     }
    // },
    // methods: {
    //     getAllocationBar() {
    //         const conf = {
    //             method: 'GET',
    //             url: config.getAllocationBar + this.title,
    //             headers: {
    //                 Accept: 'application/json',
    //             }
    //         }
    //         axios(conf).then(res => {
    //             this.barInfo = res.data.totalAllocation
    //         })
    //     },
    // },
    // created() {
    //     this.getAllocationBar()
    // }
}
</script>