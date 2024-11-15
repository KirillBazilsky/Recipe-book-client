<script setup lang="ts">
import { ref } from "vue";
import { AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { IUser } from "@/interfaces/user";
import { credentialsValidator } from "@/lib/validators";
import { errorHandler } from "#src/lib/errors/errorHandler.js";

const usersStore = useUsersStore();
const params = ref<IUser>({ name: "", email: "", password: "", id: null });
const errorMessage = ref<string | null>(null);
const userMessage = ref<string | null>("Enter your credentials, please");

const onSubmit = async () => {
  userMessage.value = null;

  const config: AxiosRequestConfig<IUser> = {
    data: params.value,
  };

  const name = params.value.name.trim();
  const email = params.value.email.trim();
  const password = params.value.password;

  if (credentialsValidator(name, email,  password)) {
    errorMessage.value = credentialsValidator(name, email, password);

    return
  }

  try {
    const response = await usersStore.register(config);

    userMessage.value = `${response.data.message}, welcome ${response.data.user.name}!`;
    errorMessage.value = null;

  } catch (error: unknown) {
    errorMessage.value = errorHandler(error);
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="input-wrapper">
      <label>REGISTER FORM</label>
      <input type="text" v-model="params.name" placeholder="Name" />
      <input type="text" v-model="params.email" placeholder="Email" />
      <input type="text" v-model="params.password" placeholder="Password" />
    </div>
    <div v-if="errorMessage" class="user-message error">{{ errorMessage }}</div>
    <div v-else class="user-message">{{ userMessage }}</div>
    <button type="submit">Register</button>
  </form>
</template>

<style scoped></style>
