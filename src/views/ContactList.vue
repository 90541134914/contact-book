<template>
  <div>
    <h1>Contact List</h1>
    <div style="display: flex; align-items: center; gap: 0.5rem; max-width: 400px; margin-bottom: 1rem;">
      <input
        v-model="search"
        placeholder="Search contacts by first or last name"
        type="text"
      />
      <button v-if="search" @click="search = ''">Clear</button>
    </div>
    <p v-if="filteredContacts.length === 0">No contacts found.</p>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <router-link :to="`/contact/${contact.id}`">
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>
      </li>
    </ul>
    <router-link to="/new">Add New Contact</router-link>
  </div>
</template>

<script>
import { ref, computed, watchEffect } from 'vue'
import { useRoute } from 'vue-router'
import { getContacts } from '../utils/contactStorage'

export default {
  setup() {
    const search = ref('')
    const route = useRoute()
    const contacts = ref([])

    // This always gets the latest contacts from localStorage when the route changes
    watchEffect(() => {
      route.fullPath // triggers the effect on route change
      contacts.value = getContacts()
    })

    const filteredContacts = computed(() => {
      const list = [...contacts.value]
      if (!search.value) return list.sort((a, b) => a.lastName.localeCompare(b.lastName))

      const lower = search.value.toLowerCase()
      return list
        .filter(
          c =>
            c.firstName.toLowerCase().includes(lower) ||
            c.lastName.toLowerCase().includes(lower)
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

<style scoped>
ul {
  list-style: none;
  padding: 0;
  max-width: 400px;
}

li {
  padding: 0.5rem 0;
  border-bottom: 1px solid #ddd;
}
</style>
