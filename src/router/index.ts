import { createRouter, createWebHistory } from 'vue-router';
import AuthenticationPage from '../pages/AuthenticationPage.vue';
import RecipesPage from '../pages/RecipesPage.vue';
import RecipeCreatePage from '../pages/RecipeCreatePage.vue';
import UserUpdatePage from '../pages/UserProfilePage.vue';
import RecipeDetailsPage from '../pages/RecipeDetailsPage.vue';
import RecipeUpdatePage from '@/pages/RecipeUpdatePage.vue';

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
    component: AuthenticationPage,
  },
  {
    path: '/create-recipe',
    name: 'Create recipe',
    component: RecipeCreatePage,
  },
  {
    path: '/update-recipe/:id',
    name: 'Update recipe',
    component: RecipeUpdatePage,
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserUpdatePage,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
