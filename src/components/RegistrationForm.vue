<script setup lang="ts">
import { ref } from "vue";
import { AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { IUser } from "@/interfaces/user";
import { credentialsValidator } from "@/lib/validators";
import { errorHandler } from "#src/lib/errors/errorHandler.js";
import PasswordInput from "./ui/PasswordInput.vue";
import TextInput from "./ui/TextInput.vue";

const usersStore = useUsersStore();
const params = ref<IUser>({ name: "", email: "", password: "", _id: null });
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
      <TextInput type="text" v-model="params.name" placeholder="Name" />
      <TextInput type="email" v-model="params.email" placeholder="Email" />
      <PasswordInput v-model="params.password" />
    </div>
    <div v-if="errorMessage" class="user-message error">{{ errorMessage }}</div>
    <div v-else class="user-message">{{ userMessage }}</div>
    <button type="submit">Create account</button>
  </form>
</template>

