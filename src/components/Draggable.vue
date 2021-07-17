<template>
    <div
        ref="draggableContainer"
        id="draggable-container"
        @dragMouseDown="dragMouseDown"
    >
        <slot></slot>
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
    let index: number;
    const refsStickies = ref<HTMLElement[]>([]);
    function dragMouseDown(event: any, i: number) {
      event.preventDefault();
      index = i;
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
      refsStickies.value[index].style.top =
        refsStickies.value[index].offsetTop - positions.movementY + "px";
      refsStickies.value[index].style.left =
        refsStickies.value[index].offsetLeft - positions.movementX + "px";
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    onBeforeUpdate(() => {
      refsStickies.value = [];
    });
    return {
      dragMouseDown,
      refsStickies,
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