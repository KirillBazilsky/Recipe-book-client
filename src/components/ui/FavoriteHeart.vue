<script setup lang="ts">
import { mdiHeart, mdiHeartOutline } from "@mdi/js";
import MdiIcon from "../MdiIcon.vue";
import { AxiosRequestConfig } from "axios";
import { IFavoritesParams } from "@/interfaces/favorites";
import { IRecipe } from "@/interfaces/recipe";
import { useUsersStore } from "@/stores/users";
import { computed, onMounted, ref } from "vue";
import { checkFavorites } from "@/lib/FavoritesChecker";
import { watch } from "vue";
import { LOGIN_TO_FAVORITE } from "@/constants/messages/users";

interface IProps {
  recipe?: IRecipe;
  isList?: boolean;
}

const props = defineProps<IProps>();
const usersStore = useUsersStore();
const currentUser = computed(() => usersStore.getCurrentUser);
const isFavorite = ref<boolean>(false);
const favorites = computed(() => usersStore.getFavorites);
const isAuth = computed(() => usersStore.isAuthenticated);

const setFavoriteStatus = () => {
  if (favorites.value && props.recipe?._id) {
    isFavorite.value = checkFavorites(favorites.value, props.recipe._id);
  }
};

onMounted(() => {
  setFavoriteStatus();
});

watch([() => favorites.value, () => props.recipe?._id], () => {
  setFavoriteStatus();
});

const handleAddFavorite = async () => {
  if (!isAuth.value) {
    usersStore.setMessage(LOGIN_TO_FAVORITE);

    return;
  }

  const payload: AxiosRequestConfig<IFavoritesParams> = {
    data: {
      recipeId: props.recipe?._id ?? "",
    },
  };

  if (props.recipe) {
    usersStore.addFavorite(payload, props.recipe);
  }
};

const handleDeleteFromFavorites = async () => {

  const payload: AxiosRequestConfig<{ recipeId: string }> = {
    data: {
      recipeId: props.recipe?._id ?? "",
    },
  };

  usersStore.removeFavorite(payload);
};
</script>

<template>
  <div class="favorites-wrapper">
    <MdiIcon
      :icon="mdiHeart"
      :size="isList ? 24 : 36"
      color="#1c3d5a"
      v-if="isFavorite"
      @click="handleDeleteFromFavorites"
      class="favorites"
      title="Add to favorites"
      :class="{ disabled: isList }"
    />
    <MdiIcon
      :icon="mdiHeartOutline"
      :size="isList ? 24 : 36"
      color="#d3c7c7d3"
      v-else
      @click="handleAddFavorite"
      class="favorites"
      :class="{ disabled: isList }"
      title="Remove from favorites"
    />
    <span class="tooltip" v-if="!isList">
      {{ isFavorite ? "Remove from favorites" : "Add to favorites" }}
    </span>
  </div>
</template>

<style lang="css" scoped>
.disabled {
  opacity: 1;
}

.favorites-wrapper {
  position: relative;
  display: inline-block;
  position: absolute;
  top: 8px;
  right: 8px;
  cursor: pointer;
}

.tooltip {
  position: absolute;
  top: 0;
  left: -200%;
  transform: translateX(-50%);
  padding: 5px 10px;
  background-color: var(--secondary-color);
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  visibility: hidden;
  opacity: 0;
  transition: opacity 0.2s, visibility 0.2s;
  z-index: 10;
}

.favorites-wrapper:hover .tooltip {
  visibility: visible;
  opacity: 1;
}
</style>
