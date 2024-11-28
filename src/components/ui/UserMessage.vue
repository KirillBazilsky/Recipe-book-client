<script setup lang="ts">
import { messageType } from "@/interfaces/common";
import MdiIcon from "../MdiIcon.vue";
import { computed, ref, watch } from "vue";
import { mdiAlert, mdiClose, mdiInformation } from "@mdi/js";
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();
const message = computed(() => userStore.getMessage);

const isError = ref<boolean>(message.value?.type === messageType.error);

watch(
  () => message.value?.type,
  () => {
    isError.value = message.value?.type === messageType.error;
  }
);

const handleClose = () => {
  userStore.setMessage();
};
</script>

<template>
  <div class="user-message" :class="{ error: isError }" v-if="message?.value">
    <MdiIcon
      :icon="mdiClose"
      :size="24"
      color="#f3f0f0"
      class="close-button"
      @click="handleClose"
    />
    <MdiIcon
      :icon="isError ? mdiAlert : mdiInformation"
      color="#f3f0f0"
      :size="48"
    />
    {{ message?.value }}
  </div>
</template>

<style lang="css" scoped>
.user-message {
  position: fixed;
  top: 30%;
  left: calc(50% - 125px);
  background-color: var(--secondary-color);
  color: var(--main-bg-color);
  border-radius: 8px;
  padding: var(--padding-size);
  font-size: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  width: 250px;
  margin: 16px auto 19px;
  display: flex;
  gap: 8px;
  align-items: center;
  justify-content: center;
  white-space: pre-line;
  z-index: 10;
}

.user-message.error {
  background-color: var(--error-bg-color);
}

.close-button {
  position: absolute;
  top: 0;
  right: 0;
  transition: background-color var(--transition-speed),
    transform var(--transition-speed);
}

.close-button:hover {
  transform: scale(1.05);
}

.close-button:active {
  transform: scale(0.98);
}
</style>
