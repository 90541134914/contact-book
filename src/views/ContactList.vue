<template>
  <div>
    <h1>Contact List</h1>
    <input v-model="search" placeholder="Search contacts" />
    <button v-if="search" @click="search = ''">Clear</button>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <router-link :to="`/contact/${contact.id}`">
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>
      </li>
    </ul>
    <router-link to="/add">Add New Contact</router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue'
import { useRoute, onBeforeRouteUpdate } from 'vue-router'
import { getContacts } from '../utils/contactStorage'

export default {
  setup() {
    const contacts = ref([])
    const search = ref('')

    function loadContacts() {
      contacts.value = getContacts()
    }

    onMounted(() => {
      loadContacts()
    })

    onBeforeRouteUpdate((to, from, next) => {
      loadContacts()
      next()
    })

    const filteredContacts = computed(() => {
      if (!search.value) return contacts.value.sort((a, b) => a.lastName.localeCompare(b.lastName))
      const lower = search.value.toLowerCase()
      return contacts.value
        .filter(c =>
          c.firstName.toLowerCase().includes(lower) || c.lastName.toLowerCase().includes(lower)
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName))
    })

    return {
      search,
      filteredContacts
    }
  }
}
</script>
