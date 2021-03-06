const { v4 } = require('uuid');
const contactsPath = require('../db/contacts-path.js');
const fileRead = require('./file-read.js');
const fileWrite = require('./file-write.js');

async function addContact(name, email, phone) {
  const createNewContact = { id: v4(), name, email, phone };

  const contacts = await fileRead(contactsPath);
  contacts.push(createNewContact);
  await fileWrite(contactsPath, contacts);

  return createNewContact;
}

module.exports = addContact;
