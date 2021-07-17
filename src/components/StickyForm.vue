<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="text" class="form-label">Text</label>
            <input
                type="text"
                class="form-control"
                id="text"
                v-model="text"
                required
            />
        </div>
        <div class="mb-3">
            <label for="color" class="form-label">Color</label>
            <input
                type="color"
                class="form-control"
                id="color"
                v-model="color"
            />
        </div>
        <button
            class="btn btn-primary"
            @click="saveSticky(id)"
            :disabled="text === ''"
        >
            Save
        </button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "StickyForm",
  props: {
    id: {
      type: String,
    },
  },
  setup(_, { emit }) {
    const text = ref("");
    const color = ref("#FFFFFF");
    function saveSticky(id: string) {
      emit("saveSticky", {
        id: id,
        color: color.value,
        text: text.value,
      });
    }
    return { text, color, saveSticky };
  },
});
</script>

