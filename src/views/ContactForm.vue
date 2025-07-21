<template>
  <div>
    <h1>{{ isEdit ? 'Edit Contact' : 'Add New Contact' }}</h1>
    <form @submit.prevent="onSubmit" style="max-width: 400px;">
      <div>
        <label for="firstName">First Name:</label>
        <input id="firstName" v-model="contact.firstName" required />
      </div>

      <div>
        <label for="lastName">Last Name:</label>
        <input id="lastName" v-model="contact.lastName" required />
      </div>

      <div>
        <label for="email">Email:</label>
        <input id="email" v-model="contact.email" type="email" required />
      </div>

      <button type="submit">{{ isEdit ? 'Save' : 'Add' }}</button>
      <router-link to="/" style="margin-left: 1rem;">Cancel</router-link>
    </form>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  getContacts,
  addContact,
  updateContact
} from '../utils/contactStorage'

export default {
  setup() {
    const route = useRoute()
    const router = useRouter()

    const isEdit = ref(false)
    const contact = ref({
      firstName: '',
      lastName: '',
      email: ''
    })

    onMounted(() => {
      const id = route.params.id
      if (id) {
        isEdit.value = true
        const contacts = getContacts()
        const existing = contacts.find(c => c.id === id)
        if (existing) {
          contact.value = { ...existing }
        } else {
          alert('Contact not found')
          router.push('/')
        }
      }
    })

    function onSubmit() {
      if (isEdit.value) {
        updateContact(contact.value)
      } else {
        addContact(contact.value)
      }
      router.push(`/contact/${contact.value.id}`)
    }

    return {
      contact,
      isEdit,
      onSubmit
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 1rem;
}

input {
  padding: 0.5rem;
  font-size: 1rem;
  border-radius: 4px;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  padding: 0.6rem;
  font-size: 1rem;
  cursor: pointer;
  border-radius: 4px;
  border: none;
  background-color: #007acc;
  color: white;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #005fa3;
}
</style>
