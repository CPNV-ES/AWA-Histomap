/*!
 * Nom du fichier : routes.js
 * Auteur : VicMtn
 * Date : 09.01.2025
 * Description : Liste des routes
 * Licence : MIT
 * Version : 1.0.0
 */

import Story from './services/story.js'

const routes = [
  {
    method: 'get',
    route: '/stories',
    component: Story.getStories,
  },
  {
    method: 'post',
    route: '/stories',
    component: Story.addStory,
  },
  {
    method: 'delete',
    route: '/stories/:title',
    component: Story.deleteStory,
  },
]

export default routes
