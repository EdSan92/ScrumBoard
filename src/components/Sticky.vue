<template>
    <div
        class="card"
        :ref="
            (el) => {
                refsStickies[i] = el;
            }
        "
        id="draggable-container"
    >
        <StickyForm
            v-show="showForm && sticky.id === stickyId"
            :id="sticky.id"
            @foo="saveSticky"
        />
        <template v-if="!showForm || sticky.id !== stickyId">
            <p>
                {{ sticky.text }}
            </p>
            <button @mousedown="dragMouseDown($event, i)">Move</button>
            <button @click="updateSticky(sticky.id)">Update</button>
            <button @click="deleteSticky(sticky.id)">Delete</button>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, ref } from "vue";
import StickyForm from "@/components/StickyForm.vue";

export default defineComponent({
  name: "Sticky",
  components: { StickyForm },
  props: {
    sticky: {},
    showForm: Boolean,
    stickyId: {},
  },
  setup(_, { emit }) {
    let positions = {
      clientX: undefined,
      clientY: undefined,
      movementX: 0,
      movementY: 0,
    };
    let index: number;
    const refsStickies = ref<HTMLElement[]>([]);
    function saveSticky({ id, text, color }: any) {
      emit("saveSticky", { id, text, color });
    }
    function deleteSticky(id: string) {
      emit("deleteSticky", id);
    }
    function updateSticky(id: string) {
      emit("updateSticky", id);
    }
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
      saveSticky,
      updateSticky,
      deleteSticky,
      dragMouseDown,
      refsStickies,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
}
#draggable-container {
    position: absolute;
}
</style>
