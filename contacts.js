const fs = require('fs').promises;
const path = require('path');
const { v4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const result = contacts.find(contact => contact.id === contactId);
  console.log(result);
  if (!result) {
    return null;
  }
  return result;
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    return null;
  }
  const newContacts = contacts.filter((_, indx) => indx !== index);
  //write to file
  await fs.writeFile(contactsPath, JSON.stringify(newContacts, null, 2));
  return contacts[index];
}

async function addContact(name, email, phone) {
  const createNewContact = { id: v4(), name, email, phone };

  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);

  contacts.push(createNewContact);
  //write to file
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return createNewContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
