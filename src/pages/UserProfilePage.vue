<script setup lang="ts">
import { useUsersStore } from "@/stores/users.js";
import { computed } from "vue";
import UserForm from "@/components/UserForm.vue";
import RecipesList from "@/components/RecipesList.vue";
import Favorites from "@/components/Favorites.vue";
import { ProfileTabs } from "@/constants/navigation";

const userStore = useUsersStore();
const currentUser = computed(() => userStore.getCurrentUser);
const openedTab = computed(() => userStore.getCurrentProfileTab);

const onTabClick = (tab: ProfileTabs) => {
  userStore.setCurrentProfileTab(tab);
};
</script>

<template>
  <div class="page-wrapper user-update">
    <div class="tab-button-wrapper" :class="{ disabled: !currentUser }">
      <button
        @click="onTabClick(ProfileTabs.userForm)"
        :class="{ active: 'user-form' === openedTab }"
      >
        My Account
      </button>
      <button
        @click="onTabClick(ProfileTabs.recipeList)"
        :class="{ active: 'recipe-list' === openedTab }"
      >
        My Recipes
      </button>
      <button
        @click="onTabClick(ProfileTabs.favorites)"
        :class="{ active: 'favorites' === openedTab }"
      >
        My Favorites
      </button>
    </div>
    <UserForm v-if="'user-form' === openedTab" />
    <RecipesList
      v-if="'recipe-list' === openedTab"
      :userId="currentUser?.id ?? ''"
    />
    <Favorites v-if="'favorites' === openedTab" />
  </div>
</template>
