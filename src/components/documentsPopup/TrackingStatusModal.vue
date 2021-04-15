<template>
    <dialog-draggable 
        :width="400" 
        :modelDialog="showPopup" 
        :title="''" 
        :icon="''"
    >  

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">

                        <div class="col-md-12 q-mb-md">
                            <div class="row items-center">
                                <div class="icon-parent">
                                    <div><q-icon name="description" class="edx-blue" style="font-size: 5.5em" /></div>
                                    <div class="text-center"><span>S/E</span></div>
                                </div>
                                <div class="text-h6 q-ml-md">Sign in and Evalution Forms</div>
                            </div>
                        </div>

                        <div class="col-md-12 q-mb-md">
                            <q-checkbox v-model="isComplete" label="Complete" />
                        </div>

                        <div class="col-md-12">
                            <div class="text-subtitle2 q-mb-sm">Note</div>
                            <q-input dense outlined type="textarea"/>
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

export default {
    components: {
        dialogDraggable
    },
    data() {
        return {
            isComplete: false,
        }
    },
    props: {
        show: {
            required: true
        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('togglePopup', false)
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
        }
    }
}
</script>


<style lang="scss" scoped>
.icon-parent {
    width: 60px;
    display: flex;
    flex-wrap: wrap;
    margin: 0 3px;

    & div {
        text-align: center;
    }

    i {
        margin: 0 auto;
    }
}
</style>