<script setup lang="ts">
import { useUsersStore } from '@/stores/users.js';
import { computed } from 'vue';
import UserForm from '../components/UserForm.vue';

const userStore = useUsersStore();
const currentUser = computed(() => userStore.getCurrentUser);

</script>

<template>
    <h1></h1>
    <UserForm />
</template>