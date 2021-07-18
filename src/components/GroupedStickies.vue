<template>
    <div
        v-for="(sticky, i) in orderStickies(groupedSticky.stickies)"
        :key="i"
        @drop="drop($event, groupedSticky.id)"
        @dragover="allowDrop($event)"
        class="card sticky"
    >
        {{ sticky.text }}
        <button @click="detachSticky(groupedSticky.id, sticky.id)">
            Detach
        </button>
    </div>
</template>

<script lang="ts">
import { IGroupedSticky } from "@/interfaces/IGroupedSticky";
import { ISticky } from "@/interfaces/ISticky";
import { defineComponent, PropType } from "vue";

export default defineComponent({
  name: "GroupedStickies",
  props: {
    groupedSticky: { type: Object as PropType<IGroupedSticky> },
  },
  emits: ["detachSticky", "drop"],
  setup(_, { emit }) {
    function orderStickies(stickies: ISticky[]) {
      return stickies.sort((a, b) => b.order - a.order);
    }
    function detachSticky(groupId: string, stickyId: string) {
      emit("detachSticky", { groupId, stickyId });
    }
    function allowDrop(ev: DragEvent) {
      ev.preventDefault();
    }
    function drop(ev: DragEvent, id: string) {
      emit("drop", { ev, id });
    }
    return { orderStickies, detachSticky, allowDrop, drop };
  },
});
</script>

