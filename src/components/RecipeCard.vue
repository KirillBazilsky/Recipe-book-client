<script setup lang="ts">
import { IRecipe } from "@/interfaces/recipe.js";
import { iconSwitcher } from "@/lib/iconSwitcher.js";
import MdiIcon from "./MdiIcon.vue";
import FavoriteHeart from "./ui/FavoriteHeart.vue";
import { BASE_IMG_URL } from "@/constants/api";

interface IProps {
  recipe: IRecipe;
}

const props = defineProps<IProps>();
</script>

<template>
  <div class="recipe-card card">
    <h4>{{ props.recipe.name }}</h4>
    <MdiIcon
      :icon="iconSwitcher(props.recipe.category)"
      :size="64"
      color="#d3c7c7d3"
      v-if="!props.recipe.image"
    />
    <div class="recipe-img-wrapper" v-else>
      <img :src="`${BASE_IMG_URL}${props.recipe.image}`" class="recipe-img" alt="recipe-image"/>
    </div>
    <h6>Category:</h6>
    <p>{{ props.recipe.category }}</p>
    <h6>Author:</h6>
    <p>{{ props.recipe.creator.name }}</p>
    <FavoriteHeart :recipe="props.recipe" isList />
  </div>
</template>

<style lang="css" scoped>
.recipe-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 200px;
  height: 250px;
  padding: 16px;
  background-color: #fff;
  border-radius: 12px;
  cursor: pointer;
}

.recipe-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

h4 {
  margin: 8px 0;
  font-size: 1.1rem;
  max-height: 2.2em;
  font-weight: 700;
  color: var(--main-color);
  text-align: center;
  background-color: transparent;
}

h6 {
  margin: 4px 0 2px;
  font-size: 0.9rem;
  font-weight: 600;
  background-color: transparent;
  color: var(--secondary-text-color);
}

p {
  margin: 2px 0;
  font-size: 0.85rem;
  color: var(--text-color);
  text-align: center;
  background-color: transparent;
}

.recipe-card p:last-of-type {
  font-size: 0.8rem;
  color: var(--secondary-text-color);
}

.recipe-card .icon-container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 80px;
  height: 80px;
  margin: 8px 0;
  background-color: var(--icon-bg);
  border-radius: 50%;
}

.recipe-img-wrapper {
  width: 60%;
  border-radius: 50%;
  overflow: hidden;
  height: 50%;
}

.recipe-img {
  width: 100%
}
</style>
