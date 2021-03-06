<template>
    <q-card class="bg-transparent no-shadow no-border">
      <q-card-section class="q-pa-none">
        <div class="row q-col-gutter-sm ">
          
          <div v-for="i in barInfo" :key="i.id" class="col-md-2 col-sm-12 col-xs-12">
            <q-item style="background-color: #fff" class="q-pa-none q-ml-xs">
              <q-item-section side style="background-color: #fff" class=" q-pa-lg q-mr-none text-white">
                <q-icon name="school" color="deep-orange-6" size="24px"></q-icon>
              </q-item-section>
              <q-item-section class="q-ml-none">
                <q-item-label class="text-grey-7">{{ i.title }}</q-item-label>
                <q-item-label class="text-dark text-h6 text-weight-bolder">$ {{ i.total }}</q-item-label>
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
    props: {
        title: {
            required: true,
            default: 1
        }
    },
    data() {
        return {
            barInfo: null,
        }
    },
    methods: {
        getAllocationBar() {
            const conf = {
                method: 'GET',
                url: config.getAllocationBar + this.title,
                headers: {
                    Accept: 'application/json',
                }
            }
            axios(conf).then(res => {
                this.barInfo = res.data.totalAllocation
            })
        },
    },
    created() {
        this.getAllocationBar()
    }
}
</script>