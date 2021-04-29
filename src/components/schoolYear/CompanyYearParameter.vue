<template>
    <div class="q-pa-lg q-mt-md">
        
        <div class="text-subtitle1">Company Year Duration</div>
        
        <div class="row">
            <div class="col-md-6">
                <div class="row">
                    <div class="row q-mt-lg">

                        <div class="q-pr-md row items-center justify-end">Start date:</div>
                        <div class="col-2">
                            <q-input outlined dense v-model="startDate">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-date color="edx-pagination" v-model="startDate">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                            </div>
                                        </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                        <div class="q-ml-lg q-pr-md row items-center justify-end">End date:</div>
                        <div class="col-2">
                            <q-input outlined dense v-model="endDate">
                                <template v-slot:append>
                                    <q-icon name="event" class="cursor-pointer">
                                        <q-popup-proxy transition-show="scale" transition-hide="scale">
                                        <q-date color="edx-pagination" v-model="endDate">
                                            <div class="row items-center justify-end">
                                                <q-btn v-close-popup label="Close" color="primary" flat />
                                            </div>
                                        </q-date>
                                        </q-popup-proxy>
                                    </q-icon>
                                </template>
                            </q-input>
                        </div>

                        <div class="col-md-3 q-ml-lg">
                            233 work days excluding weekends and public holidays
                        </div>

                        <div class="col-md-12">
                            <q-checkbox v-model="isActive" label="School is active for current school year" />
                        </div>

                    </div>
                </div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <q-separator class="q-mb-sm q-mt-sm" />
            </div>
        </div>

        <div class="text-subtitle1 q-mt-lg">Adminsitrative fee overrides</div>

        <div class="row q-mt-md">
            <div class="col-md-2">
                <div class="text-subtitle2">Description</div>
            </div>
            <div class="col-md-1">
                <div class="text-subtitle2">Percentage</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-4">
                <q-separator class="q-mb-sm q-mt-sm" />
            </div>
        </div>

        <div class="row q-mt-sm q-mb-sm">
            <div class="col-md-2">
                <span>Administrative Fee</span>
            </div>
            <div class="col-1 q-pr-xl">
                <q-input outlined dense v-model="startDate" />
            </div>
        </div>

        <div class="row">
            <div class="col-md-12">
                <q-separator class="q-mb-sm q-mt-sm" />
            </div>
        </div>

        <!-- ########## -->

        <div class="text-subtitle1 q-mt-lg">Fee overrides</div>

        <div class="row q-mt-md">
            <div class="col-md-1">
                <div class="text-subtitle2">Allocation</div>
            </div>
            <div class="col-md-2">
                <div class="text-subtitle2">Description</div>
            </div>
            <div class="col-md-1">
                <div class="text-subtitle2">Category</div>
            </div>
            <div class="col-md-1">
                <div class="text-subtitle2">Percentage</div>
            </div>
        </div>

        <div class="row">
            <div class="col-md-5">
                <q-separator class="q-mb-sm q-mt-sm" />
            </div>
        </div>

        <div v-for="i in 12" :key="i" class="row q-mt-sm q-mb-sm">
            <div class="col-md-1">
                <span>Title I</span>
            </div>
            <div class="col-md-2">
                <span>Professional Development</span>
            </div>
            <div class="col-md-1">
                <span>PD</span>
            </div>
            <div class="col-1 q-pr-xl">
                <q-input outlined dense v-model="startDate"/>
            </div>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            startDate: '',
            endDate: '',
            isActive: false,
        }
    }
}
</script>