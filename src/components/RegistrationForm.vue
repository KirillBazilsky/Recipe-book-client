<script setup lang="ts">
import { onMounted, ref } from "vue";
import { AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { Autocomplete, IUser } from "@/interfaces/user";
import { credentialsValidator } from "@/lib/validators";
import { errorHandler } from "@/lib/errors/errorHandler.js";
import PasswordInput from "./ui/PasswordInput.vue";
import TextInput from "./ui/TextInput.vue";
import { ENTER_CREDENTIALS } from "@/constants/messages/users";
import UserMessage from "./ui/UserMessage.vue";

const usersStore = useUsersStore();
const params = ref<IUser>({ name: "", email: "", password: "", id: null });

onMounted(() => {
  usersStore.setMessage(ENTER_CREDENTIALS);
})

const onSubmit = async () => {
  usersStore.setMessage();

  const config: AxiosRequestConfig<IUser> = {
    data: params.value,
  };

  const name = params.value.name.trim();
  const email = params.value.email.trim();
  const password = params.value.password;

  if (credentialsValidator(name, email, password)) {
    usersStore.setMessage(credentialsValidator(name, email, password), "error");

    return;
  }

  try {
    const response = await usersStore.register(config);

    usersStore.setMessage(
      `${response.data.message}, welcome ${response.data.user.name}!`
    );
  } 
  
  catch (error: unknown) {
    usersStore.setMessage(errorHandler(error), "error");
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="card">
    <div class="input-wrapper">
      <label>REGISTER FORM</label>
      <TextInput
        type="text"
        v-model="params.name"
        placeholder="Name"
        canDisabled
      />
      <TextInput
        type="email"
        v-model="params.email"
        placeholder="Email"
        canDisabled
      />
      <PasswordInput
        v-model="params.password"
        canDisabled
        :type="Autocomplete.newPassword"
      />
    </div>
    <UserMessage />
    <button type="submit">Create account</button>
  </form>
</template>
