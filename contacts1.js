const fs = require('fs').promises;
const { v4 } = require('uuid');
const path = require('path');

const contactsPath = require('./db/contacts-path.js');
const fileRead = require('./contacts/file-read.js');

async function listContacts() {
  const contacts = await fileRead(contactsPath);
  console.table(contacts);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await fileRead(contactsPath);
  const result = contacts.find(contact => contact.id === contactId);

  if (!result) {
    console.log(`Contact with ID:"${contactId}" not found...`);
    return null;
  }

  console.log(result);
  return result;
}

async function removeContact(contactId) {
  const contacts = await fileRead(contactsPath);

  const index = contacts.findIndex(contact => contact.id === contactId);
  if (index === -1) {
    console.log(`Contact with ID:"${contactId}" not found...`);
    return null;
  }
  const newContacts = contacts.filter((_, indx) => indx !== index);

  await fileWrite(contactsPath, newContacts);
  console.warn(contacts[index], ' is deleted!');
  return contacts[index];
}

async function addContact(name, email, phone) {
  const createNewContact = { id: v4(), name, email, phone };

  const contacts = await fileRead(contactsPath);
  contacts.push(createNewContact);

  await fileWrite(contactsPath, contacts);
  console.log(createNewContact, ' is added.');
  return createNewContact;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
