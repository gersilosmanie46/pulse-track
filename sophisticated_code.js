/* 
Filename: sophisticated_code.js

This code is a sophisticated and complex implementation of a contact management system.
It allows the user to add, delete, search and update contacts using various functions and classes. 
The code contains multiple layers of abstraction, encapsulation, and modularization for a professional and creative approach.

*/

// Contact class
class Contact {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  toString() {
    return `Name: ${this.name}\nEmail: ${this.email}\nPhone: ${this.phone}\n`;
  }
}

// ContactManager class
class ContactManager {
  constructor() {
    this.contacts = [];
  }

  addContact(contact) {
    this.contacts.push(contact);
  }

  deleteContact(name) {
    const index = this.contacts.findIndex((contact) => contact.name === name);
    if (index !== -1) {
      this.contacts.splice(index, 1);
    }
  }

  searchContacts(keyword) {
    return this.contacts.filter(
      (contact) =>
        contact.name.toLowerCase().includes(keyword.toLowerCase()) ||
        contact.email.toLowerCase().includes(keyword.toLowerCase()) ||
        contact.phone.includes(keyword)
    );
  }

  updateContact(name, updatedContact) {
    const index = this.contacts.findIndex((contact) => contact.name === name);
    if (index !== -1) {
      this.contacts[index] = updatedContact;
    }
  }

  listAllContacts() {
    return this.contacts.map((contact) => contact.toString()).join('\n');
  }
}

// Usage example
const contactManager = new ContactManager();

const contact1 = new Contact('John Doe', 'john.doe@example.com', '123456789');
const contact2 = new Contact('Jane Smith', 'jane.smith@example.com', '987654321');
const contact3 = new Contact('Bob Johnson', 'bob.johnson@example.com', '555555555');

contactManager.addContact(contact1);
contactManager.addContact(contact2);
contactManager.addContact(contact3);

console.log(contactManager.listAllContacts());

contactManager.deleteContact('Jane Smith');

console.log(contactManager.listAllContacts());

const searchResults = contactManager.searchContacts('john');
console.log(searchResults);

const updatedContact = new Contact('John Doe', 'john.newemail@example.com', '123456789');
contactManager.updateContact('John Doe', updatedContact);

console.log(contactManager.listAllContacts());
