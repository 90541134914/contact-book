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
      <li
        v-for="contact in filteredContacts"
        :key="contact.id"
      >
        <router-link :to="`/contact/${contact.id}`">
          {{ contact.lastName }}, {{ contact.firstName }}
        </router-link>
      </li>
    </ul>
    <router-link to="/add">Add New Contact</router-link>
  </div>
</template>

<script>
import { ref, computed, watch, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { getContacts } from '../utils/contactStorage'

export default {
  setup() {
    const contacts = ref([])
    const search = ref('')
    const route = useRoute()

    function loadContacts() {
      contacts.value = getContacts()
    }

    // Load on mount
    onMounted(() => {
      loadContacts()
    })

    // Watch for route change (in case of return from form)
    watch(() => route.fullPath, () => {
      loadContacts()
    })

    const filteredContacts = computed(() => {
      if (!search.value) return contacts.value.sort((a, b) =>
        a.lastName.localeCompare(b.lastName)
      )

      const lower = search.value.toLowerCase()
      return contacts.value
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
