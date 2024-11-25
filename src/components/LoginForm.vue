<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { AxiosError, AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { Autocomplete, IUserCredentials } from "@/interfaces/user";
import { errorHandler } from "@/lib/errors/errorHandler.js";
import { credentialsValidator } from "@/lib/validators.js";
import PasswordInput from "./ui/PasswordInput.vue";
import TextInput from "./ui/TextInput.vue";
import { blankName } from "@/constants/appConstants.js";
import { GREETINGS, LOGOUT } from "@/constants/messages/users";

const usersStore = useUsersStore();
const params = ref<IUserCredentials>({ email: "", password: "" });
const errorMessage = ref<string | null>(null);
const userMessage = ref<string | null>("Enter your credentials, please");
const isAuthenticated = computed(() => usersStore.isUserAuthenticated);
const currentUser = computed(() => usersStore.getCurrentUser);

onMounted(() => {
  if (isAuthenticated.value)
    userMessage.value = `Welcome ${currentUser.value?.name ?? "stranger"}`;
});

watch(
  () => currentUser.value,
  () => {
    if (isAuthenticated.value)
      userMessage.value = `${GREETINGS} ${currentUser.value?.name}`;
  }
);

const onSubmit = async () => {
  userMessage.value = null;

  const config: AxiosRequestConfig<IUserCredentials> = {
    data: params.value,
  };

  if (
    credentialsValidator(blankName, params.value.email, params.value.password)
  ) {
    errorMessage.value = credentialsValidator(
      blankName,
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

const handleLogout = () => {
  usersStore.logout();
  userMessage.value = LOGOUT;
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="card">
    <div class="input-wrapper">
      <label>LOGIN FORM</label>
      <TextInput
        type="email"
        v-model="params.email"
        placeholder="Email"
        canDisabled
      />
      <PasswordInput
        v-model="params.password"
        canDisabled
        :type="Autocomplete.currentPassword"
      />
    </div>
    <div v-if="errorMessage" class="user-message error">{{ errorMessage }}</div>
    <div v-else class="user-message">{{ userMessage }}</div>
    <button v-if="!isAuthenticated" type="submit">Login</button>
    <button v-else type="button" @click="handleLogout">Logout</button>
  </form>
</template>

<style scoped></style>
