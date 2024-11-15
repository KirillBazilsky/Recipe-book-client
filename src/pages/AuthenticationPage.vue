<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";
import MdiIcon from "@/components/MdiIcon.vue";
import { mdiAccountPlus, mdiLogin } from "@mdi/js";

const isLoginFormOpen = ref(true);
const isRegisterFormOpen = ref(false);

const loginSwitcher = () => {
  isLoginFormOpen.value = true;
  isRegisterFormOpen.value = false;
};

const registerSwitcher = () => {
  isRegisterFormOpen.value = true;
  isLoginFormOpen.value = false;
};
</script>

<template>
  <h1>Welcome to the Recipe book site!</h1>
  <div class="button-wrapper">
    <button @click="loginSwitcher" :class="{ active: isLoginFormOpen }">
      <MdiIcon
        :icon="mdiLogin"
        :size="18"
        :color="isLoginFormOpen ? '#D6D9B0' : '#f9f9f9'"
        class="button-icon"
      />Login
    </button>
    <button @click="registerSwitcher" :class="{ active: isRegisterFormOpen }">
      <MdiIcon
        :icon="mdiAccountPlus"
        :size="18"
        :color="isRegisterFormOpen ? '#D6D9B0' : '#f9f9f9'"
        class="button-icon"
      />New account
    </button>
  </div>
  <div v-if="isLoginFormOpen" class="form-wrapper">
    <LoginForm />
  </div>
  <div v-if="isRegisterFormOpen" class="form-wrapper">
    <RegistrationForm />
  </div>
</template>

<style>
.button-wrapper {
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}

.active {
  color: var(--secondary-bg);
}
</style>
