<template>
    <div
        :style="`background-color: ${sticky.color}; color: ${invertColor(
            sticky.color
        )}`"
        role="button"
    >
        <StickyForm
            v-show="showForm && sticky.id === stickyId"
            :id="sticky.id"
            @saveSticky="saveSticky"
        />

        <template v-if="!showForm || sticky.id !== stickyId">
            <p class="text-center">
                {{ sticky.text }}
            </p>
            <button
                type="button"
                class="btn float-start"
                @click="updateSticky(sticky.id)"
                :style="`background-color: ${
                    sticky.color
                }; color: ${invertColor(sticky.color)}`"
            >
                <i class="bi bi-pencil-square"></i>
            </button>
            <button
                type="button"
                class="btn float-end"
                @click="deleteSticky(sticky.id)"
                :style="`background-color: ${
                    sticky.color
                }; color: ${invertColor(sticky.color)}`"
            >
                <i class="bi bi-trash"></i>
            </button>
        </template>
    </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import StickyForm from "@/components/StickyForm.vue";
import invertColor from "@/composables/useInvertColor";

export default defineComponent({
  name: "Sticky",
  components: { StickyForm },
  props: {
    sticky: {},
    showForm: Boolean,
    stickyId: {},
  },
  setup(_, { emit }) {
    function saveSticky({ id, text, color }: any) {
      emit("saveSticky", { id, text, color });
    }
    function deleteSticky(id: string) {
      emit("deleteSticky", id);
    }
    function updateSticky(id: string) {
      emit("updateSticky", id);
    }
    return {
      saveSticky,
      updateSticky,
      deleteSticky,
      invertColor,
    };
  },
});
</script>

<style lang="scss" scoped>
.card {
    width: 100px;
    height: 100px;
    display: flex;
    align-items: center;
    z-index: 10;
}
</style>
