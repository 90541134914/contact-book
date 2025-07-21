import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ContactDetails from '../views/ContactDetails.vue'
import ContactForm from '../views/ContactForm.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/contact/:id', name: 'ContactDetails', component: ContactDetails },
  { path: '/add', name: 'AddContact', component: ContactForm },
  { path: '/edit/:id', name: 'EditContact', component: ContactForm }
]

const router = createRouter({
  history: createWebHistory('/contact-book/'), // match your base
  routes
})

export default router
