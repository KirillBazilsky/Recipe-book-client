<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { AxiosRequestConfig } from "axios";
import { useUsersStore } from "@/stores/users";
import { Autocomplete, IUser } from "@/interfaces/user";
import { updateCredentialsValidator } from "@/lib/validators";
import { errorHandler } from "@/lib/errors/errorHandler";
import PasswordInput from "./ui/PasswordInput.vue";
import TextInput from "./ui/TextInput.vue";
import { watch } from "vue";
import { blankUser } from "@/constants/appConstants";
import { mdiRename } from "@mdi/js";
import MdiIcon from "./MdiIcon.vue";
import { NEED_LOGIN, EDIT_ACCOUNT } from "@/constants/messages/users";
import UserMessage from "./ui/UserMessage.vue";

const usersStore = useUsersStore();
const isAuthenticated = computed(() => usersStore.isAuthenticated);
const currentUser = computed(() => usersStore.getCurrentUser);
const userId = ref(currentUser.value?.id ?? "");
const confirmedPassword = ref<string>("");
const params = ref<IUser>(currentUser.value || blankUser);

onMounted(() => {
  if (!isAuthenticated.value) {
    usersStore.setMessage(NEED_LOGIN, "error");

    return;
  }

  params.value.password = "";
  usersStore.setMessage(EDIT_ACCOUNT);
});

watch(
  () => currentUser.value,
  () => {
    params.value = currentUser.value ?? blankUser;
    userId.value = currentUser.value?.id ?? "";
    params.value.password = "";
  }
);

watch(
  () => isAuthenticated.value,
  () => {
    if (!isAuthenticated.value) {
      usersStore.setMessage(NEED_LOGIN, "error");

      return;
    }

    usersStore.setMessage(EDIT_ACCOUNT);
  }
);

const onSubmit = async () => {
  usersStore.setMessage();

  const config: AxiosRequestConfig<IUser> = {
    data: params.value,
  };

  const name = params.value.name.trim();
  const email = params.value.email.trim();
  const password = params.value.password;

  if (
    updateCredentialsValidator(name, email, password, confirmedPassword.value)
  ) {
    usersStore.setMessage(
      updateCredentialsValidator(
        name,
        email,
        password,
        confirmedPassword.value
      ),
      "error"
    );

    return;
  }

  try {
    const {
      data: { message, user },
    } = await usersStore.updateUser(userId.value, config);

    usersStore.setMessage(`${message}, ${user.name}!`);
  } catch (error: unknown) {
    usersStore.setMessage(errorHandler(error), "error");
  }
};
</script>

<template>
  <form @submit.prevent="onSubmit" class="card" :class="{ disabled: !isAuthenticated }">
    <div class="input-wrapper">
      <label>ACCOUNT</label>
      <p><MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Username:</p>
      <TextInput
        type="text"
        v-model="params.name"
        placeholder=""
        :class="{ disabled: !isAuthenticated }"
      />
      <p><MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Email:</p>
      <TextInput
        type="email"
        v-model="params.email"
        placeholder=""
        :class="{ disabled: !isAuthenticated }"
      />
      <p><MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Password</p>
      <PasswordInput
        v-model="params.password"
        :class="{ disabled: !isAuthenticated }"
        :type="Autocomplete.newPassword"
      />
      <p>
        <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Confirm new
        password
      </p>
      <PasswordInput
        v-model="confirmedPassword"
        :class="{ disabled: !isAuthenticated }"
        :type="Autocomplete.newPassword"
      />
    </div>
    <UserMessage />
    <button type="submit">
      Update
    </button>
  </form>
</template>

<style scoped>
p {
  background-color: white;
  margin-bottom: -16px;
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: left;
}
</style>
