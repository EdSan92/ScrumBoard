<template>
    <button @click="createSticky" :disabled="mode === 'create'">
        New sticky
    </button>
    <div
        v-for="(sticky, i) in stickies.value"
        :key="i"
        class="card sticky"
        draggable="true"
        @drop="drop($event, sticky.id)"
        @dragover="allowDrop($event)"
        @dragstart="drag($event, sticky.id)"
    >
        <StickyForm
            v-show="
                (mode === 'create' || mode === 'update') &&
                sticky.id === stickyId
            "
            :id="sticky.id"
            @foo="saveSticky"
        />
        <p v-if="mode === 'read' || sticky.id !== stickyId">
            {{ sticky.text }}
        </p>
        <button v-if="mode === 'read'" @click="updateSticky(sticky.id)">
            Update
        </button>
        <button v-if="mode === 'read'" @click="deleteSticky(sticky.id)">
            Delete
        </button>
    </div>
    {{ stickies }}
    <div v-for="(groupedSticky, i) in groupedStickies" :key="i">
        <div
            v-for="(sticky, i) in groupedSticky.stickies"
            :key="i"
            @drop="drop($event, groupedSticky.id)"
            @dragover="allowDrop($event)"
        >
            {{ sticky.text }}
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from "vue";
import { uuid } from "vue-uuid";
import { ISticky } from "@/interfaces/ISticky";
import StickyForm from "@/components/StickyForm.vue";

export default defineComponent({
  name: "Board",
  components: { StickyForm },
  setup() {
    let stickies: { value: ISticky[] } = reactive({ value: [] });
    let groupedStickies: { id: string; stickies: ISticky[] }[] = reactive([]);
    let stickyId = ref();
    let mode = ref();
    function createSticky() {
      const id = uuid.v4();
      stickies.value.push({ id: id, text: "", color: "#FFFFFF" });
      stickyId.value = id;
      mode.value = "create";
    }
    function saveSticky({ id, text, color }: any) {
      stickies.value[stickies.value.findIndex((sticky) => sticky.id === id)] = {
        id,
        text,
        color,
      };
      stickyId.value = null;
      mode.value = "read";
    }
    function updateSticky(id: string) {
      stickyId.value = id;
      mode.value = "update";
    }
    function deleteSticky(id: string) {
      stickies.value.splice(
        stickies.value.findIndex((sticky) => sticky.id === id),
        1
      );
      mode.value = "read";
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
      groupedStickies.push({
        id: uuid.v4(),
        stickies: stickies.value.filter(
          (sticky) =>
            sticky.id === draggedStickyId || sticky.id === droppedOnStickyId
        ),
      });
      stickies.value = stickies.value.filter(
        (sticky) =>
          sticky.id !== draggedStickyId && sticky.id !== droppedOnStickyId
      );
    }
    return {
      stickies,
      createSticky,
      saveSticky,
      updateSticky,
      deleteSticky,
      mode,
      stickyId,
      allowDrop,
      drag,
      drop,
      groupedStickies,
    };
  },
});
</script>

<style lang="scss" scoped>
.sticky {
    width: 250px;
    height: 250;
}
</style>
