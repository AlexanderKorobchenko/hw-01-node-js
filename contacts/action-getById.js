const contactsPath = require('../db/contacts-path.js');
const fileRead = require('./file-read.js');

async function getContactById(contactId) {
  const contacts = await fileRead(contactsPath);
  const result = contacts.find(contact => contact.id === contactId);

  if (!result) {
    console.log(`Contact with ID:"${contactId}" not found...`);
    return null;
  }

  return result;
}

module.exports = getContactById;
