const listContacts = require('./action-list');
const getContactById = require('./action-getById');
const removeContact = require('./action-remove');
const addContact = require('./action-add');

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
