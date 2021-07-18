<template>
    <nav class="navbar navbar-dark bg-success">
        <div class="container-fluid">
            <p class="text-white mb-0">Scrum Board</p>
            <button
                type="button"
                class="btn btn-light"
                @click="createSticky"
                :disabled="showForm"
            >
                New sticky
            </button>
        </div>
    </nav>
    <Draggable
        v-for="sticky in stickies.value"
        :key="sticky.id"
        :id="sticky.id"
        :type="'stickies'"
        @savePosition="savePosition"
    >
        <template v-slot:header>
            <button>Move</button>
        </template>
        <template v-slot:main>
            <Sticky
                :sticky="sticky"
                :showForm="showForm"
                :stickyId="stickyId"
                draggable="true"
                @drop="drop({ ev: $event, id: sticky.id })"
                @dragover="allowDrop($event)"
                @dragstart="drag($event, sticky.id)"
                @saveSticky="saveSticky"
                @deleteSticky="deleteSticky"
                @updateSticky="updateSticky"
            />
        </template>
    </Draggable>
    <template v-if="groupedStickies.value.length > 0">
        <Draggable
            v-for="groupedSticky in groupedStickies.value"
            :key="groupedSticky.id"
            :id="groupedSticky.id"
            :type="'groupedStickies'"
            @savePosition="savePosition"
        >
            <template v-slot:header>
                <button>Move</button>
            </template>
            <template v-slot:main>
                <GroupedStickies
                    :groupedSticky="groupedSticky"
                    @detachSticky="detachSticky"
                    @drop="drop"
                />
            </template>
        </Draggable>
    </template>
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref, watch } from "vue";
import { uuid } from "vue-uuid";
import { ISticky } from "@/interfaces/ISticky";
import { IGroupedSticky } from "@/interfaces/IGroupedSticky";
import Sticky from "@/components/Sticky.vue";
import Draggable from "@/components/Draggable.vue";
import GroupedStickies from "@/components/GroupedStickies.vue";

export default defineComponent({
  name: "Board",
  components: { Sticky, Draggable, GroupedStickies },
  setup() {
    let stickies: { value: ISticky[] } = reactive({ value: [] });
    let groupedStickies: {
      value: IGroupedSticky[];
    } = reactive({ value: [] });
    let stickyId = ref();
    let showForm = ref();
    watch(stickies, () => {
      localStorage.setItem("stickies", JSON.stringify(stickies.value));
    });
    watch(groupedStickies, () => {
      localStorage.setItem(
        "groupedStickies",
        JSON.stringify(groupedStickies.value)
      );
    });
    onMounted(() => {
      stickies.value = JSON.parse(localStorage.getItem("stickies")!) || [];
      groupedStickies.value =
        JSON.parse(localStorage.getItem("groupedStickies")!) || [];
    });
    function createSticky() {
      const id = uuid.v4();
      stickies.value.push({
        id: id,
        text: "",
        color: "#FFFFFF",
        order: 0,
        top: "",
        left: "",
      });
      stickyId.value = id;
      showForm.value = true;
    }
    function saveSticky({ id, text, color }: any) {
      stickies.value[stickies.value.findIndex((sticky) => sticky.id === id)] = {
        id,
        text,
        color,
        order: 0,
        top: "",
        left: "",
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
    function drop({ ev, id }: { ev: DragEvent; id: string }) {
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
      if (groupedStickies.value.find((sticky) => sticky.id === id)) {
        groupedStickies.value
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
        groupedStickies.value.push({
          id: uuid.v4(),
          top: "",
          left: "",
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
    function detachSticky({
      groupId,
      stickyId,
    }: {
      groupId: string;
      stickyId: string;
    }) {
      stickies.value.push(
        groupedStickies.value[
          groupedStickies.value.findIndex((group) => group.id === groupId)
        ].stickies.find((sticky) => sticky.id === stickyId)!
      );
      groupedStickies.value
        .find((group) => group.id === groupId)
        ?.stickies.splice(
          groupedStickies.value
            .find((group) => group.id === groupId)
            ?.stickies.findIndex((sticky) => sticky.id === stickyId) || 0,
          1
        );
      if (
        groupedStickies.value.find((group) => group.id === groupId)?.stickies
          .length === 0
      ) {
        groupedStickies.value.splice(
          groupedStickies.value.findIndex((group) => group.id === groupId),
          1
        );
      }
    }
    function savePosition({
      id,
      type,
      top,
      left,
    }: {
      id: string;
      type: string;
      top: string;
      left: string;
    }) {
      let stickiesToSave =
        type === "stickies" ? stickies.value : groupedStickies.value;
      stickiesToSave[
        stickiesToSave.findIndex((sticky: any) => sticky.id === id)
      ].top = top;
      stickiesToSave[
        stickiesToSave.findIndex((sticky: any) => sticky.id === id)
      ].left = left;
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
      detachSticky,
      savePosition,
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
    flex-direction: column;
}
</style>
