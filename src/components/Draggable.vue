<template>
    <div ref="draggableContainer" id="draggable-container" class="card">
        <div>
            <button
                type="button"
                class="btn btn-light w-100"
                @mousedown="dragMouseDown"
            >
                <i class="bi bi-arrows-move"></i>
            </button>
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
      clientX: 0,
      clientY: 0,
      movementX: 0,
      movementY: 0,
    };
    const draggableContainer = ref<HTMLElement>();
    function dragMouseDown(event: DragEvent) {
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
      const stickies =
        JSON.parse(localStorage.getItem(props.type) as string) || [];
      const sticky = stickies.find(
        (sticky: ISticky) => sticky.id === props.id
      ) || { top: "0px", left: "0px" };
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
    top: 54px;
    right: 12px;
}
.card {
    width: 150px;
}
</style>