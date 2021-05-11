<template>
    <div>
        <dialog-draggable 
            :width="800" 
            :modelDialog="showPopup" 
            :title="`View Document`" 
            :icon="'description'"
        > 

            <q-card-section style="max-height: 85vh; height: 85vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div>
                    <VueDocPreview :value="value" :type="type" />
                </div>
            </q-card-section>

            <q-card-actions class="row justify-end">
                <div>
                    <q-btn @click="closePopup" flat label="Cancel" color="primary"></q-btn>
                </div>
            </q-card-actions>

        </dialog-draggable>

    </div>
</template>

<script>
import VueDocPreview from 'vue-doc-preview'
import dialogDraggable from '../../components/DialogDraggable'

export default {
    props: {
        show: {
            required: true
        },
        type: {
            required: true
        },
        value: {
            required: true
        },

    },
    data() {
        return {
        }
    },
    components: {
        dialogDraggable,
        VueDocPreview
    },
    methods: {
        closePopup() {
            this.$emit('togglePopup', false)
        }
    },
    computed: {
        showPopup() {
            return this.show
        },
    },
    watch: {
        show(val) {
            this.$emit('togglePopup', val)
            if(val) {
                console.log('if val', this.val)
                console.log('if val', this.type)
            }
        }
    }
}
</script>