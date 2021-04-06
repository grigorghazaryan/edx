<template>
    
    <div>

        <dialog-draggable 
            :width="750" 
            :modelDialog="showPopup" 
            :title="'Budget Items'" 
            :icon="'attach_money'"
        >  

            <q-card-section style="max-height: 60vh" class="scroll q-pt-none q-pb-none q-pr-none q-pl-none">
                <div class="q-pa-md">
                    <div class="row">
                        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa quas illum necessitatibus porro magni? Tempore doloribus ducimus nemo, aperiam consequatur enim ipsa cupiditate provident totam illum tenetur quam accusantium sequi.</p>
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

    </div>

</template>

<script>
import dialogDraggable from '../../components/DialogDraggable'

export default {
    props: {
        show: {
            required: true
        }
    },
    methods: {
        emitClosePopup() {
            this.$emit('closeBudgetitemsPopup', false)
        }
    },
    components: {
        dialogDraggable
    },
    computed: {
        showPopup() {
            return this.show
        }
    },
    watch: {
        show(val) {
            this.$emit('closeBudgetitemsPopup', val)
        }
    }
}
</script>