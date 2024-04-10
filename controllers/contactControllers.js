const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
// GET
// Get all Contact
// A Private Route

const getContacts = asyncHandler( async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});



// POST
// Create a contact - Private
const createContact = asyncHandler( async (req, res) => {
    console.log("The request body is : ", req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fiels are mandatory")
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id,
    });
    res.status(201).json(contact);
});

// GET
// Get A Single Contact  -  Private
const getContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// Delete Contact

const deleteContact = asyncHandler( async(req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact){
        res.status(404);
        throw new Error("Contact not Found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("You don't have permission to delete other user's contact! ")
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
});

// Update  -  Private
const updateContact = asyncHandler( async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if(!contact) {
        res.status(404);
        throw new Error("Contact not Found");
    };

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User don't have permission to update other user's contacts!  ")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );
    res.status(200).json(updatedContact);
});

module.exports = { 
    getContact,
    createContact,
    updateContact, 
    getContacts, 
    deleteContact };