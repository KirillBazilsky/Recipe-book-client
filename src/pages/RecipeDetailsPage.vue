<script setup lang="ts">
import { useRoute } from "vue-router";
import RecipeItem from "@/components/RecipeItem.vue";
import { computed, onMounted } from "vue";
import { useRecipeStore } from "@/stores/recipes.js";

const route = useRoute();
const paramsId: string = route.params.id.toString();
const recipeStore = useRecipeStore();
const recipe = computed(() => recipeStore.getCurrentRecipe);

onMounted(() => {
  recipeStore.fetchRecipe(paramsId);
});
</script>

<template>
  <div class="page-wrapper recipe-details">
    <RecipeItem :recipe="recipe" />
  </div>
</template>
