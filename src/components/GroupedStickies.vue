<template>
    <div class="card" draggable="true">
        {{ sticky.text }}
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "GroupedStickies",
  props: {
    stickies: [],
  },
  setup() {
    return {};
  },
});
</script>

