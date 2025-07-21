<template>
  <div>
    <h1>Contact Book</h1>
    <input v-model="search" placeholder="Search contacts by name" />

    <ul>
      <li v-for="contact in filteredContacts" :key="contact.id">
        {{ contact.firstName }} {{ contact.lastName }} — {{ contact.email }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      search: '',
      contacts: [
        { id: 1, firstName: 'Unish', lastName: 'Giri', email: 'unish@example.com' },
        { id: 2, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
      ]
    }
  },
  computed: {
    filteredContacts() {
      const searchLower = this.search.toLowerCase()
      return this.contacts.filter(c => 
        c.firstName.toLowerCase().includes(searchLower) || 
        c.lastName.toLowerCase().includes(searchLower)
      )
    }
  }
}
</script>
