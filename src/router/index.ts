// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from '../pages/LoginRegister.vue';
import RecipesPage from '../pages/RecipesPage.vue';
import RecipeDetails from '../pages/RecipeDetails.vue';
import RecipeUpdate from '../pages/RecipeUpdate.vue';
import UserUpdate from '../pages/UserUpdate.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: RecipesPage,
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginRegister,
  },
  {
    path: '/recipe-details',
    name: 'recipe-details',
    component: RecipeDetails,
  },
  {
    path: '/update-recipe',
    name: 'Update recipe',
    component: RecipeUpdate,
  },
  {
    path: '/update-user',
    name: 'Update user',
    component: UserUpdate,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
