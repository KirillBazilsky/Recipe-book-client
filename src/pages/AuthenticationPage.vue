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
  <h1>Welcome to the Recipe book site!</h1>
  <div class="button-wrapper">
    <button @click="loginSwitcher" :class="{ 'active': isLoginFormOpen }">LOGIN</button>
    <button @click="registerSwitcher" :class="{ 'active': isRegisterFormOpen }">REGISTER</button>
  </div>
  <div v-if="isLoginFormOpen" class="form-wrapper">
    <LoginForm />
  </div>
  <div v-if="isRegisterFormOpen" class="form-wrapper">
    <RegistrationForm />
  </div>
</template>

<style>
.button-wrapper{
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 16px;
  margin: 16px 0;
}

.active{
  background-color: var(--secondary-color);
}
</style>