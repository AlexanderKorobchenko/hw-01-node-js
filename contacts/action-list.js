const contactsPath = require('../db/contacts-path.js');
const fileRead = require('./file-read.js');

async function listContacts() {
  const contacts = await fileRead(contactsPath);
  console.table(contacts);
  return contacts;
}

module.exports = listContacts;
