<script setup lang="ts">
import MdiIcon from "@/components/MdiIcon.vue";
import { mdiMagnify, mdiSilverwareVariant } from "@mdi/js";
import { iconRandomizer } from "@/lib/iconRandomizer.js";
import { computed, onMounted, ref } from "vue";
import { useUsersStore } from "@/stores/users.js";
import { disableLink } from "@/lib/linkDisabler.js";
import { foodIconList } from "@/constants/iconConstants.js";
import { navigationList } from "@/constants/navigationConstants.js";
import { useRecipeStore } from "@/stores/recipes.js";

const usersStore = useUsersStore();
const recipeStore = useRecipeStore();
const isAuthenticated = computed(() => usersStore.isUserAuthenticated);
const randomizer = iconRandomizer(foodIconList);
const isMobileMenuOpen = ref<boolean>(false);
const userId = localStorage.getItem("currentUserId") ?? "";

onMounted(() => {
  if (userId) usersStore.fetchCurrentUser(userId);
});

const toggleFilters = () => {
  recipeStore.isFiltersOpen = !recipeStore.isFiltersOpen
}

const toggleMobileMenu = () => {
  setTimeout(() => (isMobileMenuOpen.value = !isMobileMenuOpen.value), 200);
};
</script>

<template>
  <nav class="navigation">
    <router-link
      v-for="(link, index) in navigationList"
      :to="link.route"
      class="nav-link"
      :class="{ disabled: disableLink(link.route, isAuthenticated) }"
      ><MdiIcon
        :icon="randomizer()"
        :size="32"
        color="#fff"
        v-if="index === 0" />{{ link.label }}
      <MdiIcon :icon="randomizer()" :size="32" color="#fff"
    /></router-link>
    <button
      class="nav-button"
      @click="usersStore.logout"
      :class="{ disabled: !isAuthenticated }"
    >
      Logout
    </button>
    <MdiIcon :icon="randomizer()" :size="32" color="#fff" />
  </nav>
  <div class="nav-wrapper mobile">
    <button class="nav-button mobile">
      <MdiIcon
        :icon="mdiMagnify"
        :size="32"
        color="#fff"
        @click="toggleFilters"
      />
    </button>
    <button class="nav-button mobile">
      <MdiIcon
        :icon="mdiSilverwareVariant"
        :size="32"
        color="#fff"
        @click="toggleMobileMenu"
      />
    </button>
  </div>
  <nav class="navigation mobile" v-if="isMobileMenuOpen">
    <router-link
      @click="toggleMobileMenu"
      v-for="link in navigationList"
      :to="link.route"
      class="nav-link mobile"
      :class="{ disabled: disableLink(link.route, isAuthenticated) }"
      ><MdiIcon :icon="randomizer()" :size="32" color="#fff" />{{
        link.label
      }}</router-link
    >
    <button
      class="nav-link mobile"
      @click="usersStore.logout"
      :class="{ disabled: !isAuthenticated }"
    >
      <MdiIcon :icon="randomizer()" :size="32" color="#fff" />Logout
    </button>
  </nav>
  <div class="modal-blur mobile" v-if="isMobileMenuOpen"></div>
  <router-view> </router-view>
</template>

<style scoped lang="css">
.navigation {
  width: 100%;
  height: 68px;
  background-color: var(--main-color);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--padding-size);
  position: fixed;
  top: 0;
  z-index: 10;
}
.nav-link {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--padding-size);
  font-size: larger;
  font-weight: 700;
  text-decoration: none;
  color: var(--main-bg-color);
  background-color: var(--main-color);
}

.nav-link:hover {
  color: var(--primary-color);
}

.router-link-active {
  color: var(--secondary-bg);
}

.nav-link.mobile {
  display: flex;
  align-items: center;
  justify-content: left;
  height: 50px;
  width: 100%;
  border-bottom: 2px solid #fff;
  border-radius: 0px;
  box-shadow: none;
}
.nav-link.mobile:hover {
  transform: none;
}
.nav-link.mobile:active {
  transform: scale(0.95);
}

.home-icon {
  position: absolute;
  left: 0px;
  top: 8px;
}
.nav-icon:hover {
  box-shadow: 0 4px 12px black;
  transform: scale(0.98);
}

.nav-button {
  width: auto;
  height: auto;
  font-size: larger;
  font-weight: 700;
  box-shadow: none;
}

.nav-button:hover {
  background-color: var(--main-color);
  color: var(--primary-color);
}

/* condition for responsive */
.mobile {
  display: none;
}
@media (max-width: 768px) {
  .navigation {
    display: none;
  }

  .mobile {
    display: block;
  }

  .navigation.mobile {
    z-index: 10;
    padding: 12px;
    display: flex;
    height: auto;
    position: absolute;
    flex-direction: column;
    justify-content: flex-start;
    position: fixed;
    top:var(--header-height);
  }
  .nav-wrapper.mobile {
    z-index: 10;
    padding: 12px;
    display: flex;
    justify-content: end;
    align-items: center;
    background-color: var(--main-color);
    position: fixed;
    width: 100%;
    top: 0;
  }
}
</style>
