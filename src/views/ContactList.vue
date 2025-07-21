<template>
  <div>
    <h1>Contact List</h1>

    <input v-model="search" placeholder="Search contacts..." />

    <p v-if="filteredContacts.length === 0">No contacts found.</p>
    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        <router-link :to="`/contact/${contact.id}`">
          {{ contact.firstName }} {{ contact.lastName }}
        </router-link>
      </li>
    </ul>

    <router-link to="/add">Add New Contact</router-link>
  </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getContacts } from '../utils/contactStorage'

export default {
  setup() {
    const route = useRoute()
    const contacts = ref([])
    const search = ref('')

    function loadContacts() {
      contacts.value = getContacts()
    }

    onMounted(() => {
      loadContacts()
    })

    // 🔁 Watch for route changes to reload contacts
    watch(
      () => route.fullPath,
      () => {
        loadContacts()
      }
    )

    const filteredContacts = computed(() => {
      if (!search.value) return contacts.value
      const term = search.value.toLowerCase()
      return contacts.value.filter(c =>
        `${c.firstName} ${c.lastName}`.toLowerCase().includes(term)
      )
    })

    return {
      search,
      filteredContacts
    }
  }
}
</script>
