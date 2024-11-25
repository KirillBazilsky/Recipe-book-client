import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from '../pages/AuthenticationPage.vue';
import RecipesPage from '../pages/RecipesPage.vue';
import RecipeUpdate from '../pages/RecipeUpdatePage.vue';
import UserUpdate from '../pages/UserUpdatePage.vue';
import RecipeDetailsPage from '../pages/RecipeDetailsPage.vue';

const routes = [
  {
    path: '/',
    redirect: '/recipes'
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: RecipesPage,
  },
  {
    path: '/recipe/:id',
    name: 'Recipe',
    component: RecipeDetailsPage,
  },
  {
    path: '/authentication',
    name: 'Authentication',
    component: LoginRegister,
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
