<template>
    <div
        v-for="(sticky, i) in orderStickies(groupedSticky.stickies)"
        :key="i"
        @drop="drop($event, groupedSticky.id)"
        @dragover="allowDrop($event)"
        class="card sticky"
        :style="`background-color: ${sticky.color}; color: ${invertColor(
            sticky.color
        )}`"
    >
        <p class="text-center mt-4">{{ sticky.text }}</p>

        <button
            type="button"
            class="btn float-start"
            @click="detachSticky(groupedSticky.id, sticky.id)"
        >
            <i
                class="bi bi-unlock"
                :style="`color: ${invertColor(sticky.color)}`"
            ></i>
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
    function invertColor(hex: string) {
      if (hex.indexOf("#") === 0) {
        hex = hex.slice(1);
      }
      // convert 3-digit hex to 6-digits.
      if (hex.length === 3) {
        hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
      }
      if (hex.length !== 6) {
        throw new Error("Invalid HEX color.");
      }
      // invert color components
      var r = (255 - parseInt(hex.slice(0, 2), 16)).toString(16),
        g = (255 - parseInt(hex.slice(2, 4), 16)).toString(16),
        b = (255 - parseInt(hex.slice(4, 6), 16)).toString(16);
      // pad each with zeros and return
      return "#" + padZero(r) + padZero(g) + padZero(b);
    }

    function padZero(str: string, len?: number) {
      len = len || 2;
      var zeros = new Array(len).join("0");
      return (zeros + str).slice(-len);
    }
    return { orderStickies, detachSticky, allowDrop, drop, invertColor };
  },
});
</script>

