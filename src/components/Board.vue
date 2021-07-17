<template>
    <button @click="createSticky" :disabled="showForm">New sticky</button>
    <Sticky
        v-for="(sticky, i) in stickies.value"
        :sticky="sticky"
        :key="i"
        :showForm="showForm"
        :stickyId="stickyId"
        draggable="true"
        @drop="drop($event, sticky.id)"
        @dragover="allowDrop($event)"
        @dragstart="drag($event, sticky.id)"
        @saveSticky="saveSticky"
        @deleteSticky="deleteSticky"
        @updateSticky="updateSticky"
    />
    <Draggable v-if="groupedStickies.length > 0">
        <template v-slot:header>
            <button>Move</button>
        </template>
        <template v-slot:main>
            <div
                v-for="(groupedSticky, i) in groupedStickies"
                :key="i"
                class="grouped"
            >
                <div
                    v-for="(sticky, i) in orderStickies(groupedSticky.stickies)"
                    :key="i"
                    @drop="drop($event, groupedSticky.id)"
                    @dragover="allowDrop($event)"
                    class="card sticky"
                >
                    {{ sticky.text }}
                </div>
            </div>
        </template>
    </Draggable>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { uuid } from "vue-uuid";
import { ISticky } from "@/interfaces/ISticky";
import Sticky from "@/components/Sticky.vue";
import Draggable from "@/components/Draggable.vue";

export default defineComponent({
  name: "Board",
  components: { Sticky, Draggable },
  setup() {
    let stickies: { value: ISticky[] } = reactive({ value: [] });
    let groupedStickies: { id: string; stickies: ISticky[] }[] = reactive([]);
    let stickyId = ref();
    let showForm = ref();
    function createSticky() {
      const id = uuid.v4();
      stickies.value.push({ id: id, text: "", color: "#FFFFFF", order: 0 });
      stickyId.value = id;
      showForm.value = true;
    }
    function saveSticky({ id, text, color }: any) {
      stickies.value[stickies.value.findIndex((sticky) => sticky.id === id)] = {
        id,
        text,
        color,
        order: 0,
      };
      stickyId.value = null;
      showForm.value = false;
    }
    function updateSticky(id: string) {
      stickyId.value = id;
      showForm.value = true;
    }
    function deleteSticky(id: string) {
      stickies.value.splice(
        stickies.value.findIndex((sticky) => sticky.id === id),
        1
      );
    }
    function allowDrop(ev: DragEvent) {
      ev.preventDefault();
    }
    function drag(ev: DragEvent, id: string) {
      ev.dataTransfer!.setData("text", id);
    }
    function drop(ev: DragEvent, id: string) {
      ev.preventDefault();
      let draggedStickyId = ev.dataTransfer!.getData("text");
      let droppedOnStickyId = id;
      if (draggedStickyId === droppedOnStickyId) return;
      let draggedSticky = stickies.value.findIndex(
        (sticky) => sticky.id === draggedStickyId
      );
      let droppedOnSticky = stickies.value.findIndex(
        (sticky) => sticky.id === droppedOnStickyId
      );
      if (groupedStickies.find((sticky) => sticky.id === id)) {
        groupedStickies
          .find((sticky) => sticky.id === id)
          ?.stickies.push(
            stickies.value.find((sticky) => sticky.id === draggedStickyId)!
          );
        stickies.value = stickies.value.filter(
          (sticky) => sticky.id !== draggedStickyId
        );
      } else {
        stickies.value[draggedSticky].order = 1;
        stickies.value[droppedOnSticky].order = 2;
        groupedStickies.push({
          id: uuid.v4(),
          stickies: [
            stickies.value[draggedSticky],
            stickies.value[droppedOnSticky],
          ],
        });
        stickies.value = stickies.value.filter(
          (sticky) =>
            sticky.id !== draggedStickyId && sticky.id !== droppedOnStickyId
        );
      }
    }
    function orderStickies(stickies: ISticky[]) {
      return stickies.sort((a, b) => b.order - a.order);
    }
    return {
      stickies,
      createSticky,
      saveSticky,
      updateSticky,
      deleteSticky,
      showForm,
      stickyId,
      allowDrop,
      drag,
      drop,
      groupedStickies,
      orderStickies,
    };
  },
});
</script>

<style lang="scss" scoped>
.sticky {
    width: 150px;
    min-height: 100px;
}
.grouped {
    width: 200px;
    min-height: 250px;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
