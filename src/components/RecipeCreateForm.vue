<script setup lang="ts">
import {
  categoriesList,
  defaultIngredient,
  defaultRecipe,
} from "@/constants/appConstants";
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

onMounted(() => {
  {
    if (currentUser.value) {
      recipe.value.creator = {
        name: currentUser.value.name,
        id: currentUser.value.id ?? "",
      };

      return;
    }

    usersStore.setMessage(NEED_LOGIN, "error");
  }
});

watch(
  () => usersStore.currentUser,
  () => {
    if (currentUser.value) {
      recipe.value.creator = {
        name: currentUser.value.name,
        id: currentUser.value.id ?? "",
      };

      return;
    }

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
    class="card"
    :class="{ disabled: !currentUser }"
  >
    <div class="input-wrapper">
      <p><MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Name</p>
      <TextInput
        v-model="recipe.name"
        type="text"
        placeholder="name"
        class="input-field"
      />
    </div>
    <div class="input-wrapper">
      <p><MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Category</p>
      <SelectInput
        v-model="recipe.category"
        type="text"
        placeholder="category"
        :options="categoriesList"
        class="input-field"
      />
    </div>
    <div class="card inner">
      <h3>Ingredients:</h3>
      <div
        v-for="(_ingredient, index) in recipe.ingredients"
        :key="`ingredient-${index}`"
        class="ingredient-wrapper"
      >
        <h4 class="label">{{ `Ingredient ${index + 1}` }}</h4>
        <div class="input-wrapper">
          <p><MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Name</p>
          <TextInput
            v-model="recipe.ingredients[index].name"
            type="text"
            placeholder="name"
          />
        </div>
        <div class="input-wrapper">
          <p>
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
          class="mdi-button"
        />
      </div>
      <MdiIcon
        :icon="mdiPlus"
        @click.prevent="addIngredient"
        color="#228765"
        :size="32"
        class="mdi-button add"
      />
    </div>
    <div class="input-wrapper instructions">
      <p>
        <MdiIcon :icon="mdiRename" :size="16" color="#1c3d5a" />Instructions
      </p>
      <textarea class="input" v-model="recipe.instructions"></textarea>
    </div>
    <div class="input-wrapper author">
      <p>Author name</p>
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
    <UserMessage />
    <button @click="addOtherRecipe" v-if="isRecipeAdded">
      Add other recipe
    </button>
  </form>
</template>

<style lang="css" scoped>
.card {
  max-width: 65%;
  display: grid;
  gap: 16px;
  grid-template-columns: 1fr 1fr;
  grid-auto-flow: row;
}

.card.inner {
  max-width: 100%;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: auto;
  padding: var(--padding-size);
  grid-column: 1/-1;
  align-items: center;
}
.ingredient-wrapper {
  position: relative;
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;
  gap: 16px;
  padding: 8px;
  border-top: solid 2px var(--neutral-gray);
}

.label {
  font-style: italic;
  font-weight: 600;
  font-size: 16px;
  position: absolute;
  top: -20px;
  margin: 5px;
  padding: 0 10px;
  color: var(--neutral-gray);
  background-color: #fff;
}

p {
  margin-bottom: -16px;
  text-align: left;
  display: flex;
  align-items: center;
  justify-content: left;
}

.instructions {
  grid-column: 1/-1;
}

.author {
  grid-column: -1 / -2;
}

.submit {
  grid-row: 4;
  width: 100%;
  height: 100%;
}

.mdi-button {
  cursor: pointer;
  background-color: var(--main-bg-color);
  border: 2px solid var(--primary-color);
  border-radius: 50%;
  margin-top: 18px;
  padding: 2px;
}

.mdi-button.add {
  border: 2px solid var(--secondary-color);
}

.user-message {
  grid-column: 1 / -1;
}
@media (max-width: 768px) {
  .card {
    max-width: 100%;
    grid-template-columns: 1fr;
  }

  .ingredient-wrapper {
    flex-direction: column;
  }

  .minus-button {
    margin-top: 0px;
  }

  .submit {
    grid-row: 6;
  }
}
</style>
