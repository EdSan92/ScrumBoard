<template>
    <button @click="createSticky" :disabled="mode === 'create'">
        New sticky
    </button>
    <div v-for="(sticky, i) in stickies" :key="i" class="card sticky">
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
    let stickies: ISticky[] = reactive([]);
    let stickyId = ref();
    let mode = ref();
    function createSticky() {
      const id = uuid.v4();
      stickies.push({ id: id, text: "", color: "#FFFFFF" });
      stickyId.value = id;
      mode.value = "create";
    }
    function saveSticky({ id, text, color }: any) {
      stickies[stickies.findIndex((sticky) => sticky.id === id)] = {
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
      stickies.splice(
        stickies.findIndex((sticky) => sticky.id === id),
        1
      );
      mode.value = "read";
    }
    return {
      stickies,
      createSticky,
      saveSticky,
      updateSticky,
      deleteSticky,
      mode,
      stickyId,
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
