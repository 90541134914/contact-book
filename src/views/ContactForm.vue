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
        const existing = contacts.find(c => c.id.toString() === id.toString())
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
        const newContact = addContact(contact.value)
        contact.value = newContact // update local contact with id
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
