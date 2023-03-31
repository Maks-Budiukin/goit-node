const path = require("path");
const fs = require("fs/promises");
const {v4} = require("uuid")

const contactsPath = path.join(__dirname, "db\\contacts.json");

const listContacts = async () => {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    // console.log(contacts)
    return contacts;
}

const getContactById = async (contactId) => {
    const contacts = await listContacts();
    const contactById = contacts.find(item => item.id === contactId);
    if (!contactById) {
        return null;
    }
    return contactById;
}

const removeContact = async (contactId) => {
    const contacts = await listContacts();
    const updatedContacts = contacts.filter(item => item.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts))
    if (!updatedContacts) {
        return null;
    }
    return contactId;
}

const addContact = async (name, email, phone) => {
    const contacts = await listContacts();
    const newContact = { name, email, phone, id: v4() };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return newContact;
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}