<script setup lang="ts">
import { errorHandler } from "@/lib/errors/errorHandler";
import router from "@/router";
import { useUsersStore } from "@/stores/users";
import { computed, onMounted, ref } from "vue";
import RecipeCard from "./RecipeCard.vue";
import Loader from "./Loader.vue";
import UserMessage from "./ui/UserMessage.vue";

const usersStore = useUsersStore();
const favorites = computed(() => usersStore.getFavorites);
const isLoading = ref<boolean>(false);

onMounted(async () => {
    try{
        usersStore.setMessage();
        isLoading.value = true
        await  usersStore.getUserFavorites(usersStore.currentUser?.id ?? "");
    } catch(error: unknown) {
        usersStore.setMessage(errorHandler(error), "error")
    } finally {
        isLoading.value = false
    }
});

const goToRecipe = (id: string | undefined) => {
  if (!id) return;

  router.push({ name: "Recipe", params: { id } });
};
</script>

<template>
    <div class="recipes-list-wrapper" v-if="!isLoading">
      <RecipeCard
        v-for="recipe in favorites"
        :key="recipe._id"
        :recipe="recipe"
        @click="goToRecipe(recipe._id ?? '')"
      />
    </div>
    <Loader v-else />
    <UserMessage />
</template>
