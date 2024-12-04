<script setup lang="ts">
import MdiIcon from "@/components/MdiIcon.vue";
import { mdiMagnify, mdiSilverwareVariant } from "@mdi/js";
import { iconRandomizer } from "@/lib/iconRandomizer.js";
import { computed, onMounted, ref } from "vue";
import { useUsersStore } from "@/stores/users.js";
import { disableLink } from "@/lib/linkDisabler.js";
import { foodIconList } from "@/constants/icon.js";
import { navigationList } from "@/constants/navigation.js";
import { useRecipeStore } from "@/stores/recipes.js";
import router from "@/router";
import { LOGOUT } from "@/constants/messages/users";
import { redirectCountDown } from "@/lib/redirectCountdown";
import { checkGuestAccess } from "@/lib/pageAccessChecker";

const usersStore = useUsersStore();
const recipeStore = useRecipeStore();
const isAuthenticated = computed(() => usersStore.isUserAuthenticated);
const randomizer = iconRandomizer(foodIconList);
const isMobileMenuOpen = ref<boolean>(false);
const userId = localStorage.getItem("currentUserId") ?? "";

onMounted(() => {
  if (userId) {
    usersStore.fetchCurrentUser(userId);
    usersStore.getUserFavorites(userId);
  }
});

const toggleFilters = () => {
  recipeStore.isFiltersOpen = !recipeStore.isFiltersOpen;
};

const toggleMobileMenu = () => {
  setTimeout(() => (isMobileMenuOpen.value = !isMobileMenuOpen.value), 200);
};

const handleLogout = (timeout: number) => {
  usersStore.logout();

  if (!checkGuestAccess()) {
    redirectCountDown(LOGOUT, timeout, usersStore.setMessage).then(() => {
      router.replace("/recipes");
    });

    return;
  }

  usersStore.setMessage(LOGOUT);
};
</script>

<template>
  <nav class="navigation" @click="usersStore.setMessage()">
    <router-link
      v-for="(link, index) in navigationList"
      :to="link.route"
      :key="`nav-${link.label}`"
      class="nav-link"
      :class="{ disabled: disableLink(link.route, isAuthenticated) }"
      ><MdiIcon :icon="randomizer()" :size="32" color="#fff" />{{ link.label }}
    </router-link>
    <MdiIcon :icon="randomizer()" :size="32" color="#fff" />
    <button
      class="nav-button"
      @click="handleLogout(3)"
      :class="{ disabled: !isAuthenticated }"
    >
      Logout
    </button>
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
      @click="handleLogout(3)"
      :class="{ disabled: !isAuthenticated }"
    >
      <MdiIcon :icon="randomizer()" :size="32" color="#fff" />Logout
    </button>
  </nav>
  <div class="modal-blur mobile" v-if="isMobileMenuOpen"></div>
  <router-view @click="usersStore.setMessage()"> </router-view>
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
    top: var(--header-height);
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
