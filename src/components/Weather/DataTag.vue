<template>
    <div class="tag">
        <div class="tag-wrapper">
            <p class="tag__text">{{type}}: <b>{{value}}</b></p>
        </div>
    </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
    type: String,
    value: String,
})

</script>

<style lang="scss" scoped> 
.tag {
    
    &-wrapper {
        background-color: #3FB27F64;
        padding: 7px 15px;
        border-radius: 17px;
    }

    &__text {
        margin: 0;
        width: auto;
        font-family: "Roboto";
        color: #32475B;
        word-break: break-all;
    }
}
</style>