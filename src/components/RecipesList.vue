<script setup lang="ts">
import { useRecipeStore } from "@/stores/recipes.js";
import { ref } from "vue";
import { computed, onMounted } from "vue";
import RecipeCard from "./RecipeCard.vue";
import { IRecipesFiltersParams } from "@/interfaces/recipe.js";
import TextInput from "./ui/TextInput.vue";
import { useUsersStore } from "@/stores/users.js";
import { categoriesList, defaultFilters } from "@/constants/appConstants.js";
import SelectInput from "./ui/SelectInput.vue";
import { errorHandler } from "@/lib/errors/errorHandler.js";
import MdiIcon from "./MdiIcon.vue";
import { mdiMagnify } from "@mdi/js";
import router from "@/router";
import Loader from "./Loader.vue";
import UserMessage from "./ui/UserMessage.vue";

interface IProps {
  userId?: string;
}

const props = defineProps<IProps>();

const recipeStore = useRecipeStore();
const usersStore = useUsersStore();
const recipes = computed(() => recipeStore.allRecipes);
const currentUser = computed(() => usersStore.getCurrentUser);
const isFiltersOpen = computed(() => recipeStore.getIsFiltersOpen);

const filters = ref<IRecipesFiltersParams>({ ...defaultFilters });
const isLoading = ref<boolean>(false);

const toggleFilters = () => {
  recipeStore.isFiltersOpen = false;
};

const getRecipes = async (
  filtersValue: IRecipesFiltersParams
): Promise<void> => {
  isLoading.value = true;
  usersStore.setMessage();

  try {
    await recipeStore.fetchRecipes(filtersValue);
  } catch (error: unknown) {
    usersStore.setMessage(errorHandler(error), "error");
  } finally {
    isLoading.value = false;
  }
};

const clearFilters = () => {
  if (props.userId) {
    defaultFilters.userId = props.userId;
    filters.value = { ...defaultFilters };
    filters.value.creator = currentUser.value?.name || "";

    return;
  }

  defaultFilters.userId = undefined;
  filters.value = { ...defaultFilters };

  getRecipes(filters.value);
};

const goToRecipe = (id: string) => {
  router.push({ name: "Recipe", params: { id } });
};

onMounted(() => {
  defaultFilters.userId = undefined;
  filters.value.userId = undefined;
  filters.value.creator = "";

  if (props.userId) {
    defaultFilters.userId = props.userId;
    filters.value.creator = currentUser.value?.name || "";
  }

  getRecipes({ ...defaultFilters });
});

const onSubmit = () => {
  getRecipes(filters.value);
};

const mobileFilterUpdate = () => {
  recipeStore.isFiltersOpen = false;

  onSubmit();
};
</script>

<template>
  <form class="filters card desktop" @submit.prevent="onSubmit">
    <h2>Filters</h2>
    <div class="filter-inputs">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Name</p>
      <TextInput type="text" v-model="filters.name" placeholder="Name" />
    </div>
    <div class="filter-inputs">
      <p>
        <MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Ingredients
      </p>
      <TextInput
        type="text"
        v-model="filters.ingredients"
        placeholder="Ingredients"
      />
    </div>
    <div class="filter-inputs">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Category</p>
      <SelectInput
        v-model="filters.category"
        :options="categoriesList"
        placeholder="Category"
      />
    </div>
    <div class="filter-inputs">
      <p>
        <MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Instructions
      </p>
      <TextInput
        type="text"
        v-model="filters.instructions"
        placeholder="Instructions"
      />
    </div>
    <div class="filter-inputs" :class="{ disabled: props.userId }">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Author</p>
      <TextInput type="text" v-model="filters.creator" placeholder="Author" />
    </div>
    <div class="filter-inputs">
      <button type="button" @click.prevent="clearFilters">
        Clear All Filters
      </button>
    </div>
    <div class="filters-button-wrapper">
      <button type="submit">Update</button>
    </div>
  </form>
  <button @click.prevent="toggleFilters" class="filters-toggle mobile">
    Filters
  </button>
  <form
    class="filters card mobile"
    @submit.prevent="onSubmit"
    v-if="isFiltersOpen"
  >
    <h2>Filters</h2>
    <div class="filter-inputs">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Name</p>
      <TextInput type="text" v-model="filters.name" placeholder="Name" />
    </div>
    <div class="filter-inputs">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Ingredients</p>
      <TextInput
        type="text"
        v-model="filters.ingredients"
        placeholder="Ingredients"
      />
    </div>
    <div class="filter-inputs">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Category</p>
      <TextInput
        type="text"
        v-model="filters.category"
        placeholder="Category"
      />
    </div>
    <div class="filter-inputs">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Instructions</p>
      <TextInput
        type="text"
        v-model="filters.instructions"
        placeholder="Instructions"
      />
    </div>
    <div class="filter-inputs" v-if="!props.userId">
      <p><MdiIcon :icon="mdiMagnify" :size="16" color="#1c3d5a" />Author</p>
      <TextInput type="text" v-model="filters.creator" placeholder="Author" />
    </div>
    <div class="filter-inputs">
      <button type="button" @click.prevent="clearFilters">
        Clear All Filters
      </button>
    </div>
    <div class="filters-button-wrapper">
      <button type="submit" @click="mobileFilterUpdate()">Update</button>
    </div>
  </form>
  <UserMessage />
  <div class="recipes-list-wrapper" v-if="!isLoading">
    <RecipeCard
      v-for="recipe in recipes"
      :key="recipe._id"
      :recipe="recipe"
      @click="goToRecipe(recipe._id ?? '')"
    />
  </div>
  <Loader v-else />
  <div class="modal-blur" v-if="isFiltersOpen" @click="toggleFilters"></div>
</template>

<style scoped>
.recipes-list-wrapper {
  width: 100%;
  margin: 16px auto;
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  border-radius: 12px;
  padding: var(--padding-size);
}

h2 {
  font-weight: 600;
  position: absolute;
  width: calc(100% - 64px);
  text-align: center;
  top: 12px;
}
.filters {
  position: sticky;
  top: calc(var(--header-height) + 18px);
  margin-top: var(--padding-size);
  padding: 36px 8px 50px;
  max-width: 96%;
  height: auto;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  z-index: 5;
}

.filter-inputs {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 200px;
  min-height: 64px;
}

.filter-inputs button {
  margin-top: 18px;
}

p {
  width: 100%;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: left;
}

.filters-button-wrapper {
  width: calc(100% - 64px);
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 8px;
}

.filters-toggle {
  margin: 8px auto;
  position: fixed;
  top: calc(var(--header-height) - 46px);
  z-index: 12;
  left: calc(50% - 60px);
  box-shadow: none;
  background-color: var(--secondary-color);
}

@media (max-width: 768px) {
  .recipes-list-wrapper {
    width: 100%;
  }
  .filters.mobile{
    display: flex;
    position: fixed;
    top: var(--header-height);
    justify-content: center;
    margin-top: 0;
    height: auto;
    width: 100%;
    max-width: 100%;
    gap: 8px;
    z-index: 10;
  }

  .filter-inputs {
    width: 100%;
  }

  .filters-button-wrapper {
    bottom: 8px;
  }
}
</style>
