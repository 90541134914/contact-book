const STORAGE_KEY = 'contact_book'

export function getContacts() {
  let contacts = JSON.parse(localStorage.getItem(STORAGE_KEY))
  if (!contacts || !Array.isArray(contacts)) {
    contacts = []
    saveContacts(contacts)
  }
  return contacts
}

export function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

export function addContact(contact) {
  const contacts = getContacts()
  contact.id = Date.now().toString() // unique ID based on timestamp
  contacts.push(contact)
  saveContacts(contacts)
  return contact
}

export function updateContact(updatedContact) {
  const contacts = getContacts().map(contact =>
    contact.id === updatedContact.id ? updatedContact : contact
  )
  saveContacts(contacts)
}

export function deleteContact(id) {
  const contacts = getContacts().filter(contact => contact.id !== id)
  saveContacts(contacts)
}
