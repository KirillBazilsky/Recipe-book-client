<script setup lang="ts">
import { PASSWORD_REQUIREMENTS } from '@/constants/messages/users';
import { Autocomplete } from '@/interfaces/user.js';
import { useUsersStore } from '@/stores/users.js';
import { computed, ref, watch } from 'vue';

interface IProps {
    modelValue: string
    canDisabled?: boolean
    type: Autocomplete
}
const props = defineProps<IProps>()
const emit = defineEmits(['update:modelValue']);
const usersStore = useUsersStore();
const isAuthenticated = computed(() => usersStore.isUserAuthenticated);

const inputType = ref<string>("password")
    const togglePasswordHide = () => {
  inputType.value = inputType.value === "password" ? "text" : "password";
};

watch(() => inputType.value, () => setTimeout(() => inputType.value = "password", 3000 ));

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
            :disabled = "isAuthenticated && canDisabled"
            :class="{'disabled': isAuthenticated && canDisabled}"
            class="input"
            :autocomplete="props.type"
        ></input>
        <button 
        @click.prevent="togglePasswordHide"
        type="button"
        :class="{ 'openPassword': inputType !=='text', 'disabled': isAuthenticated && canDisabled}"
        ></button>
        <p class="tips">{{ PASSWORD_REQUIREMENTS }}</p>
    </div>
</template>

<style scoped>
button {
    width: 20px;
    height: 20px;
    background-image: url('src/assets/icons/close-eye.svg');
    background-color: transparent;
    background-size: cover; 
    background-position: center;
    position: absolute;
    top: 6px;
    right: 8px;
    box-shadow: none;
    z-index: 2;
}

button:hover {
    background-color: transparent;
}

button.openPassword {
    background-image: url('src/assets/icons/eye.svg');
}
</style>