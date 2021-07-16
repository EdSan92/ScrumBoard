<template>
    {{sticky.text}}
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Sticky',
    props: {
        sticky: {
            color: String,
            text: String,
            required: true
        }
    },
    setup() {
        return {}
    },
})
</script>
