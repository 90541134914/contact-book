<script>
import { ref, computed } from 'vue'
import { useRoute, onBeforeRouteUpdate, onBeforeRouteEnter } from 'vue-router'
import { getContacts } from '../utils/contactStorage'

export default {
  setup(_, { expose }) {
    const contacts = ref([])
    const search = ref('')
    const route = useRoute()

    function loadContacts() {
      contacts.value = getContacts()
    }

    // Load initially
    loadContacts()

    // Reload if the route is visited again (e.g., after adding a contact)
    onBeforeRouteEnter((to, from, next) => {
      next(vm => vm.loadContacts())
    })

    // Also reload if route changes while on the page
    onBeforeRouteUpdate(() => {
      loadContacts()
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

    // Expose to access from next()
    expose({ loadContacts })

    return {
      search,
      filteredContacts
    }
  }
}
</script>
