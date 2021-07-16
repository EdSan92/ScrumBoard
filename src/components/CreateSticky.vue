<template>
    <form @submit.prevent="onSubmit">
        <div class="mb-3">
            <label for="text" class="form-label">Text</label>
            <input type="text" class="form-control" id="text" v-model="text" />
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
        <button class="btn btn-primary" @click="createSticky">Submit</button>
    </form>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { uuid } from "vue-uuid";

export default defineComponent({
  name: "CreateSticky",
  setup(_, { emit }) {
    const text = ref(undefined);
    const color = ref("#FFFFFF");
    function createSticky() {
      emit("foo", {
        id: uuid.v4(),
        color: color.value,
        text: text.value,
      });
    }
    return { text, color, createSticky };
  },
});
</script>

