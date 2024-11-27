<script setup lang="ts">
import { IRecipe } from "@/interfaces/recipe.js";
import { iconSwitcher } from "@/lib/iconSwitcher.js";
import MdiIcon from "./MdiIcon.vue";
import { useUsersStore } from "@/stores/users";
import { computed, onMounted, ref, watch } from "vue";
import { checkAuthor } from "@/lib/checkAuthor";
import { useRecipeStore } from "@/stores/recipes";
import { errorHandler } from "@/lib/errors/errorHandler";
import UserMessage from "./ui/UserMessage.vue";
import { redirectCountDown } from "@/lib/redirectCountdown";
import router from "@/router";
import { RECIPE_DELETED } from "@/constants/messages/users";

interface IProps {
  recipe: IRecipe | undefined;
}
const props = defineProps<IProps>();

const usersStore = useUsersStore();
const recipeStore = useRecipeStore();
const currentUser = computed(() => usersStore.getCurrentUser);
const isAuthor = ref<boolean>(checkAuthor(currentUser.value, props.recipe));

watch([() => usersStore.isAuthenticated, () => props.recipe?._id], () => {
  isAuthor.value = checkAuthor(currentUser.value, props.recipe);
});

onMounted(() => {
  usersStore.setMessage();
})

const deleteRecipe = async () => {
  try {
    if (props.recipe && props.recipe._id) {
      await recipeStore.deleteRecipe(props.recipe._id);

      redirectCountDown(
        RECIPE_DELETED,
        5,
        usersStore.setMessage
      ).then(() => router.push("/recipes"));
    }
  } catch (error: unknown) {
    errorHandler(error);
  }
};

const goToRecipe = (id: string | undefined) => {
  if (!id) return;

  router.push({ name: "Update recipe", params: { id } });
};
</script>

<template>
  <div class="card">
    <MdiIcon
      :icon="iconSwitcher(props.recipe?.category ?? '')"
      :size="96"
      color="#1c3d5a"
      class="icon"
    />
    <div class="label-wrapper">
      <h1>{{ props.recipe?.name }}</h1>
    </div>
    <h3 class="category">{{ props.recipe?.category }}</h3>
    <h2>Ingredients</h2>
    <div class="info-wrapper">
      <table>
        <thead>
          <tr>
            <td>Ingredient</td>
            <td>Quantity</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="ingredient in recipe?.ingredients" :key="ingredient.name">
            <td>
              {{ ingredient.name }}
            </td>
            <td>
              {{ ingredient.quantity }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <h2>Instructions</h2>
    <div class="info-wrapper">
      <p>{{ recipe?.instructions }}</p>
    </div>
    <h4>Author: {{ recipe?.creator.name }}</h4>
    <div class="tab-button-wrapper" v-if="isAuthor">
      <button @click="goToRecipe(props.recipe?._id)">Update Recipe</button>
      <button class="danger" @click="deleteRecipe">DELETE Recipe</button>
    </div>
    <UserMessage />
  </div>
</template>

<style lang="css" scoped>
.card {
  position: relative;
  max-width: 55%;
  margin: 16px Auto 0;
  padding: var(--padding-size);
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  gap: 18px;
}
.label-wrapper {
  display: flex;
  justify-content: left;
  align-items: center;
  border-bottom: 2px solid var(--neutral-gray);
}

h2 {
  text-align: center;
  color: var(--secondary-color);
  font-weight: 600;
}

h3 {
  margin: -12px 0;
  text-align: left;
  font-style: italic;
}

h4 {
  font-style: italic;
  color: var(--secondary-color);
}

.icon {
  margin: 8px auto;
  display: block;
  border: 2px solid var(--secondary-color);
  border-radius: 50%;
  padding: 4px;
  background-color: white;
  box-shadow: 0 0 12px var(--neutral-gray);
}

p::first-letter {
  font-size: 28px;
  font-weight: 900;
  color: var(--secondary-color);
}

.info-wrapper {
  min-height: 100px;
  background-color: var(--main-bg-color);
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 0 12px var(--neutral-gray);
}

table {
  width: 100%;
  border-collapse: collapse;
}

thead td {
  padding-bottom: 12px;
  font-style: italic;
  font-weight: 600;
}

td {
  border-bottom: solid 2px #fff;
  padding: 2px 12px;
}

td:last-of-type {
  border-left: solid 2px #fff;
}

tbody tr:last-of-type td {
  border-bottom: none;
}

.tab-button-wrapper {
  width: auto;
}

@media (max-width: 768px) {
  .card {
    max-width: 100%;
  }
}
</style>
