<template>
    <!-- <div
        class="card"
        draggable="true"
        :style="`background-color: ${sticky.color};`"
    > -->
    <div class="card" draggable="true">
        <CreateSticky @foo="createSticky"></CreateSticky>
        <!-- {{ sticky.text }}
        {{ sticky.textColor }} -->
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Sticky",
  setup() {
    // function drag(ev: DragEvent) {
    //   ev.dataTransfer!.setData("text", (ev.target as HTMLElement).id);
    // }

    return {
      // drag
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
    width: 100px;
    height: 100px;
}
</style>
