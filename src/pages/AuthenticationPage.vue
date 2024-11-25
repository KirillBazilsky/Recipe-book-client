<script setup lang="ts">
import { ref } from "vue";
import LoginForm from "@/components/LoginForm.vue";
import RegistrationForm from "@/components/RegistrationForm.vue";

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
  <div class="page-wrapper auth">
    <h1>Welcome to the Recipe book site!</h1>
    <div class="tab-button-wrapper">
      <button @click="loginSwitcher" :class="{ 'active': isLoginFormOpen }">Login</button>
      <button @click="registerSwitcher" :class="{ 'active': isRegisterFormOpen }">Create account</button>
    </div>
    <div v-if="isLoginFormOpen" class="form-wrapper">
      <LoginForm />
    </div>
    <div v-if="isRegisterFormOpen" class="form-wrapper">
      <RegistrationForm />
    </div>
  </div>
</template>
