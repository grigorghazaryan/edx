<template>
  <q-dialog v-model="swDialog" persistent ref="myDialog" @show="onShow" @hide="onHide">
    <q-card :style="style">
      <q-bar class="q-pa-lg cursor-move" :class="bgcolor">
        <div class="text-subtitle1 row justify-start items-center">
            <q-icon class="q-mr-sm" :name="icon"  :color="color" style="font-size: 1.5em"/>
            <span :class="textColor">{{title}}</span>
        </div>
      </q-bar>
        <slot></slot>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: "dialogDraggable",
  props: {
    draggable: { type: Boolean, default: true },
    modelDialog: { type: Boolean, default: false },
    title: { type: String, default: "Popup" },
    width: { type: Number, default: 650  },
    icon: { type: String, default: "contact_page" },
    color: { type: String, default: "green" },
    bgcolor: { type: String, default: "bg-blue-grey-2" },
    textColor: { type: String, default: '#000' },
  },
  data() {
    return {
      swDialog: false,
      target: null,
      nodeDragg: null
    };
  },
  watch: {
    modelDialog(val) {
      this.swDialog = val;
    }
  },
  methods: {
    onShow() {
      let dialogElements = document.getElementsByClassName("q-dialog");
      this.target = dialogElements[0].querySelector(".q-card");
      this.nodeDragg = this.target.querySelector(".q-bar");
      if (this.draggable) {
        this.nodeDragg.addEventListener("mousedown", this.onGrab);
      }

      this.$emit("onShow");
    },
    onHide() {
      if (this.draggable) {
        document.removeEventListener("mousemove", this.onDrag);
        document.removeEventListener("mouseup", this.onLetGo);
        this.nodeDragg.removeEventListener("mousedown", this.onGrab);
      }
      this.$emit("onHide");
    },
    onDrag(e) {
      let originalStyles = window.getComputedStyle(this.target);
      this.target.style.left =
        parseInt(originalStyles.left) + e.movementX + "px";
      this.target.style.top = parseInt(originalStyles.top) + e.movementY + "px";
    },

    onLetGo() {
      document.removeEventListener("mousemove", this.onDrag);
      document.removeEventListener("mouseup", this.onLetGo);
    },

    onGrab() {
      document.addEventListener("mousemove", this.onDrag);
      document.addEventListener("mouseup", this.onLetGo);
    }
  },
  computed: {
    style () {
      return 'width: ' + this.width + 'px !important'
    }
  },
};
</script>

<style>

.cursor-move {
  cursor: move;
}

.q-dialog__inner--minimized > div {
    max-width: none;
}

</style>