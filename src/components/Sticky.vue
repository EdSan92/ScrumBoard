<template>
    <Draggable>
        <template v-slot:header>
            <button>Move</button>
        </template>
        <template v-slot:main>
            <StickyForm
                v-show="showForm && sticky.id === stickyId"
                :id="sticky.id"
                @saveSticky="saveSticky"
            />

            <template v-if="!showForm || sticky.id !== stickyId">
                <p>
                    {{ sticky.text }}
                </p>
                <button @click="updateSticky(sticky.id)">Update</button>
                <button @click="deleteSticky(sticky.id)">Delete</button>
            </template>
        </template>
    </Draggable>
</template>

<script lang="ts">
import { defineComponent, onBeforeUpdate, ref } from "vue";
import StickyForm from "@/components/StickyForm.vue";
import Draggable from "@/components/Draggable.vue";

export default defineComponent({
  name: "Sticky",
  components: { StickyForm, Draggable },
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
