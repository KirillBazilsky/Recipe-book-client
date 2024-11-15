<script setup lang="ts">
import { ref } from "vue";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { IUserCredentials } from "@/interfaces/user";
import { errorHandler } from "#src/lib/errors/errorHandler.js";
import { credentialsValidator } from "#src/lib/validators.js";
import { NAME } from "#src/constants.js";
import PasswordInput from "./ui/PasswordInput.vue";
import TextInput from "./ui/TextInput.vue";

const usersStore = useUsersStore();
const params = ref<IUserCredentials>({ email: "", password: "" });
const errorMessage = ref<string | null>(null);
const userMessage = ref<string | null>("Enter your credentials, please");

const onSubmit = async () => {
  userMessage.value = null;
  
  const config: AxiosRequestConfig<IUserCredentials> = {
    data: params.value,
  };

  if (credentialsValidator(NAME, params.value.email, params.value.password)) {
    errorMessage.value = credentialsValidator(
      NAME,
      params.value.email,
      params.value.password
    );

    return;
  }

  try {
    const response = await usersStore.login(config);
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
      <label>LOGIN FORM</label>
      <TextInput type="email" v-model="params.email" placeholder="Email" />
      <PasswordInput v-model="params.password" />
    </div>
    <div v-if="errorMessage" class="user-message error">{{ errorMessage }}</div>
    <div v-else class="user-message">{{ userMessage }}</div>
    <button type="submit">Login</button>
  </form>
</template>

<style scoped></style>
