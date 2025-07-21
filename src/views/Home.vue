<template>
  <div>
    <h1>Contact Book</h1>

    <input
      v-model="search"
      type="text"
      placeholder="Search by first or last name"
      class="search-input"
    />

    <button @click="goToAddContact" class="add-btn">Add New Contact</button>

    <ul>
      <li
        v-for="contact in filteredContacts"
        :key="contact.id"
        class="contact-item"
      >
        <!-- Clicking navigates to contact details -->
        <router-link :to="`/contact/${contact.id}`">
          {{ contact.firstName }} {{ contact.lastName }}
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      search: "",
      contacts: [],
    };
  },
  computed: {
    filteredContacts() {
      const s = this.search.toLowerCase();
      return this.contacts
        .filter(
          (c) =>
            c.firstName.toLowerCase().includes(s) ||
            c.lastName.toLowerCase().includes(s)
        )
        .sort((a, b) => a.lastName.localeCompare(b.lastName));
    },
  },
  methods: {
    loadContacts() {
      // Load contacts from localStorage or start with empty array
      const stored = localStorage.getItem("contacts");
      this.contacts = stored ? JSON.parse(stored) : [];
    },
    goToAddContact() {
      this.$router.push("/add");
    },
  },
  created() {
    this.loadContacts();
  },
};
</script>

<style scoped>
.search-input {
  margin-bottom: 1em;
  padding: 0.5em;
  width: 300px;
}
.add-btn {
  margin-bottom: 1em;
  padding: 0.5em 1em;
  cursor: pointer;
}
.contact-item {
  margin-bottom: 0.5em;
}
</style>
