<script setup lang="ts">
import {
  categoriesList,
  defaultIngredient,
  defaultRecipe,
} from "@/constants/app";
import { IRecipe } from "@/interfaces/recipe";
import { useRecipeStore } from "@/stores/recipes";
import { useUsersStore } from "@/stores/users";
import { AxiosRequestConfig } from "axios";
import { computed, onMounted, ref, watch } from "vue";
import TextInput from "./ui/TextInput.vue";
import { mdiDelete, mdiPlus, mdiRename } from "@mdi/js";
import Loader from "./Loader.vue";
import MdiIcon from "./MdiIcon.vue";
import SelectInput from "./ui/SelectInput.vue";
import { validateRecipe } from "@/lib/recipeValidator";
import { errorHandler } from "@/lib/errors/errorHandler";
import { NEED_LOGIN, RECIPE_ADDED } from "@/constants/messages/users";
import UserMessage from "./ui/UserMessage.vue";

const usersStore = useUsersStore();
const recipesStore = useRecipeStore();
const recipe = ref<IRecipe>({ ...defaultRecipe });
const isLoading = ref<boolean>(false);
const isRecipeAdded = ref<boolean>(false);
const currentUser = computed(() => usersStore.getCurrentUser);

const updateRecipeCreator = () => {
  if (!currentUser.value) {
    usersStore.setMessage(NEED_LOGIN, "error");

    return;
  }

  const { name, id } = currentUser.value;

  recipe.value.creator = {
    name,
    id: id ?? "",
  };
};

onMounted(() => {
  updateRecipeCreator();
  usersStore.setMessage(NEED_LOGIN, "error");
});

watch(
  () => usersStore.currentUser,
  () => {
    updateRecipeCreator();
    usersStore.setMessage(NEED_LOGIN, "error");
  }
);

watch(recipe.value, () => {
  usersStore.setMessage();
});

const onSubmit = async () => {
  usersStore.setMessage();
  isLoading.value = true;

  if (!recipe.value) {
    return;
  }

  if (validateRecipe(recipe.value)) {
    usersStore.setMessage(validateRecipe(recipe.value), "error");
    isLoading.value = false;

    return;
  }

  try {
    const config: AxiosRequestConfig = {
      data: recipe.value,
    };

    await recipesStore.addRecipe(config);
    usersStore.setMessage(RECIPE_ADDED);
    isRecipeAdded.value = true;
  } catch (error) {
    usersStore.setMessage(errorHandler(error), "error");
  } finally {
    isLoading.value = false;
  }
};

const addIngredient = () => {
  recipe.value.ingredients.push({ ...defaultIngredient });
};

const deleteIngredient = (number: number) => {
  recipe.value.ingredients = recipe.value.ingredients.filter(
    (_ingredient, index) => index !== number
  );
};

const addOtherRecipe = () => {
  recipe.value = { ...defaultRecipe };

  if (currentUser.value) {
    recipe.value.creator = {
      name: currentUser.value.name,
      id: currentUser.value.id ?? "",
    };
  }

  recipe.value.ingredients = [];
  usersStore.setMessage();
  isRecipeAdded.value = false;
};
</script>

<template>
  <h1>Adding recipe</h1>
  <form
    @submit.prevent="onSubmit"
    class="card recipe-form"
    :class="{ disabled: !currentUser }"
  >
    <div class="input-wrapper recipe-form">
      <p class="recipe-form">
        <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Name
      </p>
      <TextInput
        v-model="recipe.name"
        type="text"
        placeholder="name"
        class="input-field"
      />
    </div>
    <div class="input-wrapper recipe-form">
      <p class="recipe-form">
        <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Category
      </p>
      <SelectInput
        v-model="recipe.category"
        type="text"
        placeholder="category"
        :options="categoriesList"
        class="input-field"
      />
    </div>
    <div class="card inner recipe-form">
      <h3>Ingredients:</h3>
      <div
        v-for="(_ingredient, index) in recipe.ingredients"
        :key="`ingredient-${index}`"
        class="ingredient-wrapper"
      >
        <h4 class="label recipe-form">{{ `Ingredient ${index + 1}` }}</h4>
        <div class="input-wrapper recipe-form">
          <p class="recipe-form">
            <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Name
          </p>
          <TextInput
            v-model="recipe.ingredients[index].name"
            type="text"
            placeholder="name"
          />
        </div>
        <div class="input-wrapper recipe-form">
          <p class="recipe-form">
            <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Quantity
          </p>
          <TextInput
            v-model="recipe.ingredients[index].quantity"
            type="text"
            placeholder="quantity"
          />
        </div>
        <MdiIcon
          :icon="mdiDelete"
          color="#ff6f61"
          :size="32"
          @click="deleteIngredient(index)"
          class="mdi-button recipe-form"
        />
      </div>
      <MdiIcon
        :icon="mdiPlus"
        @click.prevent="addIngredient"
        color="#228765"
        :size="32"
        class="mdi-button recipe-form add"
      />
    </div>
    <div class="input-wrapper recipe-form instructions">
      <p class="recipe-form">
        <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Instructions
      </p>
      <textarea class="input" v-model="recipe.instructions"></textarea>
    </div>
    <div class="input-wrapper recipe-form author">
      <p class="recipe-form">Author name</p>
      <TextInput
        v-model="recipe.creator.name"
        type="name"
        placeholder="name"
        class="disabled input-field"
      />
    </div>
    <button type="submit" class="submit">
      Add recipe<Loader v-if="isLoading" />
    </button>
    <UserMessage class="recipe-form" />
    <button @click="addOtherRecipe" v-if="isRecipeAdded">
      Add other recipe
    </button>
  </form>
</template>
