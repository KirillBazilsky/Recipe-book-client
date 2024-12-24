<script setup lang="ts">
import { categoriesList, defaultIngredient, defaultRecipe } from "@/constants/common";
import { IRecipe } from "@/interfaces/recipe";
import { useRecipeStore } from "@/stores/recipes";
import { useUsersStore } from "@/stores/users";
import { AxiosRequestConfig } from "axios";
import { computed, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import TextInput from "./ui/TextInput.vue";
import { mdiDelete, mdiFileImage, mdiPlus, mdiRename } from "@mdi/js";
import Loader from "./Loader.vue";
import MdiIcon from "./MdiIcon.vue";
import SelectInput from "./ui/SelectInput.vue";
import { validateRecipe } from "@/lib/recipeValidator";
import { errorHandler } from "@/lib/errors/errorHandler";
import { NEED_LOGIN, RECIPE_UPDATED } from "@/constants/messages/users";
import UserMessage from "./ui/UserMessage.vue";
import ImageInput from "./ui/ImageInput.vue";

const usersStore = useUsersStore();
const recipesStore = useRecipeStore();
const route = useRoute();
const paramsId: string = route.params.id.toString();
const currentRecipe = computed(() => recipesStore.getCurrentRecipe);
const recipe = ref<IRecipe>({ ...defaultRecipe });
const isLoading = ref<boolean>(false);
const currentUser = computed(() => usersStore.getCurrentUser);

onMounted(() => {
  recipesStore.fetchRecipe(paramsId);
  if (currentRecipe.value) recipe.value = currentRecipe.value;
});
watch(
  () => currentUser.value,
  () => {
    if (!currentUser.value) usersStore.setMessage(NEED_LOGIN, "error");
  }
);

watch(
  () => currentRecipe.value,
  () => {
    if (currentRecipe.value) recipe.value = currentRecipe.value;
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

  const recipeData = new FormData();

  recipeData.append("name", recipe.value.name);
  recipeData.append("category", recipe.value.category);
  recipeData.append("ingredients", JSON.stringify(recipe.value.ingredients));
  recipeData.append("instructions", recipe.value.instructions);

  if (recipe.value.image) {
    recipeData.append("image", recipe.value.image);
  }

  try {
    const payload: FormData = recipeData;
  
    await recipesStore.updateRecipe(paramsId, payload);
    usersStore.setMessage(RECIPE_UPDATED);
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
</script>

<template>
  <h1>Edit recipe</h1>
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
    <div class="card recipe-form inner">
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
      <p>
        <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Instructions
      </p>
      <textarea class="input" v-model="recipe.instructions"></textarea>
    </div>
     <div class="input-wrapper recipe-form image">
      <p class="recipe-form">
        <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Image
      </p>
      <ImageInput v-model="recipe.image" />
      <div>
        <h3>File for upload:</h3>
        <div v-if="recipe.image">
          <p>Name: {{ recipe.image?.name }}</p>
          <p>Type: {{ recipe.image?.type }}</p>
          <p>Size:{{ recipe.image?.size }} Kb</p>
        </div>
        <div v-else>
          <p>No file</p>
          <MdiIcon :icon="mdiFileImage" color="#1c3d5a" :size="24" />
        </div>
      </div>
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
      Send<Loader v-if="isLoading" />
    </button>
    <UserMessage class="recipe-form" />
  </form>
</template>
