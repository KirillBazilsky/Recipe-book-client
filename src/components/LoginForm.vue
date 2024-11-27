<script setup lang="ts">
import { computed, onMounted, ref, watch } from "vue";
import { AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { Autocomplete, IUserCredentials } from "@/interfaces/user";
import { errorHandler } from "@/lib/errors/errorHandler.js";
import { credentialsValidator } from "@/lib/validators.js";
import PasswordInput from "./ui/PasswordInput.vue";
import TextInput from "./ui/TextInput.vue";
import { blankName } from "@/constants/appConstants.js";
import { ENTER_CREDENTIALS, GREETINGS, LOGOUT } from "@/constants/messages/users";
import UserMessage from "./ui/UserMessage.vue";
import router from "@/router";
import { redirectCountDown } from "@/lib/redirectCountdown";

const usersStore = useUsersStore();
const params = ref<IUserCredentials>({ email: "", password: "" });
const isAuthenticated = computed(() => usersStore.isUserAuthenticated);
const currentUser = computed(() => usersStore.getCurrentUser);

onMounted(() => {
  if (isAuthenticated.value) {
    usersStore.setMessage(`Welcome ${currentUser.value?.name ?? "stranger"}`);

    return;
  }

  usersStore.setMessage(ENTER_CREDENTIALS);
});

watch(
  () => currentUser.value,
  () => {
    if (isAuthenticated.value)
      usersStore.setMessage(`${GREETINGS} ${currentUser.value?.name}`);
  }
);

const onSubmit = async () => {
  usersStore.setMessage();

  const config: AxiosRequestConfig<IUserCredentials> = {
    data: params.value,
  };

  if (
    credentialsValidator(blankName, params.value.email, params.value.password)
  ) {
    usersStore.setMessage(
      credentialsValidator(
        blankName,
        params.value.email,
        params.value.password
      ),
      'error'
    );

    return;
  }

  try {
    const response = await usersStore.login(config);
    usersStore.setMessage(
      `${response.data.message}, welcome ${response.data.user.name}!`
    );
  } catch (error: unknown) {
    usersStore.setMessage(errorHandler(error), "error");
  }
};

const handleLogout = (timeout: number) => {
  usersStore.logout();
  redirectCountDown(LOGOUT, timeout, usersStore.setMessage).then(() =>
    router.push("/recipes")
  );
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
    <UserMessage />
    <button v-if="!isAuthenticated" type="submit">Login</button>
    <button v-else type="button" @click="handleLogout(5)">Logout</button>
  </form>
</template>