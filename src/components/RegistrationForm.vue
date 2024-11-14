<script setup lang="ts">
import { ref } from "vue";
import { useUsersStore } from "../stores/usersStore";
import axios, { AxiosRequestConfig } from "axios";
import IUser from "../interfaces/IUser";

const usersStore = useUsersStore();
const params = ref<IUser>({ name: "", email: "", password: "", id: null});
const errorMessage = ref<string | null>(null);
const userMessage = ref<string | null>("Enter your credentials, please");

const onSubmit = async () => {
  userMessage.value = null;
  const config: AxiosRequestConfig<IUser> = {
    data: params.value,
  };
  try {
    const response = await usersStore.register(config);
    userMessage.value = `${response.data.message}, welcome ${response.data.user.name}!`;
    errorMessage.value = null;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      errorMessage.value = `error: ${
        error.response.data.message || "something is wrong"
      }`;
    }
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="input-wrapper">
      <label>REGISTER FORM</label>
      <input type="text" v-model="params.name" placeholder="Name" />
      <input type="text" v-model="params.email" placeholder="Email" />
      <input type="text" v-model="params.password" placeholder="password" />
    </div>
    <div v-if="errorMessage" class="user-message error">{{ errorMessage }}</div>
    <div v-else class="user-message">{{ userMessage }}</div>
    <button type="submit">Register</button>
  </form>
</template>

<style scoped></style>
