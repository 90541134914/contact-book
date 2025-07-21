const STORAGE_KEY = 'contact_book'

export function getContacts() {
  let contacts = JSON.parse(localStorage.getItem(STORAGE_KEY))
  if (!contacts || contacts.length === 0) {
    contacts = [
      { id: '1', firstName: 'Unish', lastName: 'Giri', email: 'unish@example.com' }
    ]
    saveContacts(contacts)
  }
  return contacts
}

export function saveContacts(contacts) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(contacts))
}

export function addContact(contact) {
  const contacts = getContacts()
  contact.id = Date.now().toString()
  contacts.push(contact)
  saveContacts(contacts)
  return contact
}

export function updateContact(updatedContact) {
  const contacts = getContacts().map(c =>
    c.id === updatedContact.id ? updatedContact : c
  )
  saveContacts(contacts)
}

export function deleteContact(id) {
  const contacts = getContacts().filter(c => c.id !== id)
  saveContacts(contacts)
}
