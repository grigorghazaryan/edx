<template>
  <q-dialog v-model="swDialog" persistent ref="myDialog" @show="onShow" @hide="onHide">
    <q-card style="width: 650px; max-width: 80vw;">
      <q-bar class="bg-white q-pa-lg" :class="draggable?'cursor-move':''">
        <div class="text-h6">{{title}}</div>
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
    title: { type: String, default: "Titulo" }
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
  }
};
</script>

<style>
.cursor-move {
  cursor: move;
}
</style>