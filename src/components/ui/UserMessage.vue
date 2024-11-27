<script setup lang="ts">
import { messageType } from "@/interfaces/common";
import MdiIcon from "../MdiIcon.vue";
import { computed, ref, watch } from "vue";
import { mdiAlert, mdiInformation } from "@mdi/js";
import { useUsersStore } from "@/stores/users";

const userStore = useUsersStore();
const message = computed(() => userStore.getMessage);

const isError = ref<boolean>(message.value?.type === messageType.error);

watch(() => message.value?.type, () => {
    isError.value = message.value?.type === messageType.error;
})
</script>

<template>
  <div class="user-message" :class="{ 'error': isError }" v-if="message?.value">
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
  background-color: var(--secondary-color);
  color: var(--main-bg-color);
  border-radius: 8px;
  padding: var(--padding-size);
  font-size: 16px;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  opacity: 0;
  animation: fadeIn 0.5s forwards;
  max-width: 300px;
  margin: 16px auto 19px;
  display: flex;
  gap: 8px;
  align-items: center;
  white-space: pre-line;
}

.user-message.error {
  background-color: var(--error-bg-color);
}


</style>
