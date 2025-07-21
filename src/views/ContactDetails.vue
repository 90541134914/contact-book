<template>
  <div v-if="contact">
    <h1>Contact Details</h1>
    <p><strong>First Name:</strong> {{ contact.firstName }}</p>
    <p><strong>Last Name:</strong> {{ contact.lastName }}</p>
    <p><strong>Email:</strong> {{ contact.email }}</p>

    <router-link :to="`/edit/${contact.id}`">Edit Contact</router-link> |
    <button @click="deleteContact">Delete Contact</button> |
    <router-link to="/">Back to Contact List</router-link>
  </div>
  <div v-else>
    <p>Contact not found.</p>
    <router-link to="/">Back to Contact List</router-link>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getContacts, deleteContact as deleteContactStorage } from '../utils/contactStorage'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()
    const contact = ref(null)

    onMounted(() => {
      const contacts = getContacts()
      contact.value = contacts.find(c => c.id === route.params.id)
    })

    function deleteContact() {
      if (confirm('Are you sure you want to delete this contact?')) {
        deleteContactStorage(route.params.id)
        router.push('/')
      }
    }

    return {
      contact,
      deleteContact
    }
  }
}
</script>

<style scoped>
button {
  cursor: pointer;
  margin-left: 0.5rem;
  padding: 0.3rem 0.6rem;
  background-color: #d9534f;
  border: none;
  border-radius: 3px;
  color: white;
  font-size: 0.9rem;
}

button:hover {
  background-color: #c9302c;
}
</style>
