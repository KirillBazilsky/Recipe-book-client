<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { IUserCredentials } from "@/interfaces/user";
import { errorHandler } from "@/lib/errors/errorHandler.js";
import { credentialsValidator } from "@/lib/validators.js";
import { NAME } from "@/constants/appConstants.js";
import PasswordInput from "./ui/PasswordInput.vue";
import TextInput from "./ui/TextInput.vue";
import { mdiAlertCircle, mdiInformation } from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";

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
  () =>
    (userMessage.value = `Greetings! you're authorized as ${currentUser.value?.name}`)
);

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

const handleLogout = () => {
  usersStore.logout();
  userMessage.value = "logout successful";
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="input-wrapper">
      <label>LOGIN FORM</label>
      <TextInput type="email" v-model="params.email" placeholder="Email" />
      <PasswordInput v-model="params.password" />
    </div>
    <div v-if="errorMessage" class="user-message error">
      <MdiIcon :icon="mdiAlertCircle" :size="28" color="#f9f9f9" />{{
        errorMessage
      }}
    </div>
    <div v-else class="user-message">
      <MdiIcon :icon="mdiInformation" :size="28" color="#f9f9f9" />{{
        userMessage
      }}
    </div>
    <button v-if="!isAuthenticated" type="submit">Login</button>
    <button v-else type="button" @click="handleLogout">Logout</button>
  </form>
</template>
