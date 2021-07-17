<template>
    <div ref="draggableContainer" id="draggable-container" class="card">
        <div id="draggable-header" @mousedown="dragMouseDown">
            <slot name="header"></slot>
        </div>
        <slot name="main"></slot>
    </div>
</template>
<script lang="ts">
import { defineComponent, onBeforeUpdate, ref } from "vue";

export default defineComponent({
  name: "Draggable",
  setup() {
    let positions = {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    };
    const draggableContainer = ref<HTMLElement>();
    function dragMouseDown(event: any) {
      event.preventDefault();
      // get the mouse cursor position at startup:
      positions.clientX = event.clientX;
      positions.clientY = event.clientY;
      document.onmousemove = elementDrag;
      document.onmouseup = closeDragElement;
    }
    function elementDrag(event: any) {
      event.preventDefault();
      positions.movementX = positions.clientX! - event.clientX;
      positions.movementY = positions.clientY! - event.clientY;
      positions.clientX = event.clientX;
      positions.clientY = event.clientY;
      // set the element's new position:
      draggableContainer.value!.style.top =
        draggableContainer.value!.offsetTop - positions.movementY + "px";
      draggableContainer.value!.style.left =
        draggableContainer.value!.offsetLeft - positions.movementX + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    return {
      dragMouseDown,
      draggableContainer,
    };
  },
});
</script>
<style>
#draggable-container {
    position: absolute;
    z-index: 9;
}
</style>