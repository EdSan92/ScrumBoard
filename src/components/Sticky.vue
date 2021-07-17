<template>
    <Draggable>
        <template v-slot:header>
            <button>Move</button>
        </template>
        <template v-slot:main>
            <div
                :style="`background-color: ${
                    sticky.color
                }; color: ${invertColor(sticky.color)}`"
            >
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
            </div>
        </template>
    </Draggable>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
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
