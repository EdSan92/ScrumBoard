<template>
    <div ref="draggableContainer" id="draggable-container" class="card">
        <div id="draggable-header" @mousedown="dragMouseDown">
            <slot name="header"></slot>
        </div>
        <slot name="main"></slot>
    </div>
</template>
<script lang="ts">
import { ISticky } from "@/interfaces/ISticky";
import { defineComponent, onMounted, ref } from "vue";

export default defineComponent({
  name: "Draggable",
  props: {
    id: {},
    type: { type: String, required: true },
  },
  setup(props, { emit }) {
    let positions = {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    };
    const draggableContainer = ref<HTMLElement>();
    function dragMouseDown(event: any, id: string) {
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
      let top =
        draggableContainer.value!.offsetTop - positions.movementY + "px";
      let left =
        draggableContainer.value!.offsetLeft - positions.movementX + "px";
      draggableContainer.value!.style.top = top;
      draggableContainer.value!.style.left = left;
      emit("savePosition", { id: props.id, type: props.type, top, left });
    }
    function closeDragElement() {
      document.onmouseup = null;
      document.onmousemove = null;
    }
    onMounted(() => {
      const stickies = JSON.parse(localStorage.getItem(props.type)!);
      const sticky = stickies.find((sticky: ISticky) => sticky.id === props.id);
      draggableContainer.value!.style.top = sticky.top;
      draggableContainer.value!.style.left = sticky.left;
    });
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