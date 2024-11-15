import { createRouter, createWebHistory } from 'vue-router';
import LoginRegister from '../pages/AuthenticationPage.vue';
import RecipesPage from '../pages/RecipesPage.vue';
import RecipeDetails from '../pages/RecipeDetailsPage.vue';
import RecipeUpdate from '../pages/RecipeUpdatePage.vue';
import UserUpdate from '../pages/UserUpdatePage.vue';
import LayoutPage from '@/pages/LayoutPage.vue';

const routes = [
  {
    path: '/recipes',
    name: 'Recipes',
    component: RecipesPage,
  },

  {
    path: '/authentication',
    name: 'Authentication',
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
