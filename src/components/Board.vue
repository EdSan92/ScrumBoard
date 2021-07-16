<template>
    <button @click="createStickie">New stickie</button>
    <Sticky
        v-for="(sticky, i) in stickies"
        :key="i"
        :sticky="sticky"
    ></Sticky>

</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import Sticky from "@/components/Sticky.vue";

export default defineComponent({
    name: 'Board',
    components: {
        Sticky
    },
    setup() {
        const stickies: any[] = reactive([]);
        function createStickie() {
            stickies.push({ color: 'red', text: 'foo' })
        }
        return {
            stickies,
            createStickie
        }
    },
})
</script>
