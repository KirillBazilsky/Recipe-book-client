<script setup lang="ts">
import { ref } from 'vue';

interface IProps {
    modelValue: string
}
const props = defineProps<IProps>()
const emit = defineEmits(['update:modelValue']);

const inputType = ref<string>("password")
    const togglePasswordHide = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};

const handleInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target) {
    emit('update:modelValue', target.value);
  }
};

</script>

<template>
    <div class="input-wrapper">
        <input
            :type="inputType"
            :value="props.modelValue"
            placeholder="Password"
            @input = "handleInput"
        ></input>
        <button 
            @click.prevent="togglePasswordHide"
            type="button"
            :class="{ 'openPassword': inputType !=='text' }"
        ></button>
    </div>
</template>

<style scoped>
button {
    width: 20px;
    height: 20px;
    background-image: url('/assets/icons/close-eye.svg');
    background-color: var(--main-bg-color);
    background-size: cover; 
    background-position: center;
    position: absolute;
    top: 30%;
    right: 8px;
}

button:hover {
    background-color: var(--main-bg-color);
}

button.openPassword {
    background-image: url('/assets/icons/eye.svg');
}
</style>