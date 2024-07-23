const User = require('../models/user')
const { v4: uuidv4 } = require('uuid')

exports.findUserById = async (id) => {
  console.log('id', id)
  return await User.findOne({ id })
}

exports.findAllUsers = async () => {
  return await User.find()
}

exports.createUser = async ({ name, email }) => {
  const newUser = new User({
    id: uuidv4(),
    name,
    email
  })
  return await newUser.save()
}

exports.updateUser = async (id, { name, email }) => {
  return await User.findOneAndUpdate({ id }, { name, email }, { new: true })
}

exports.deleteUser = async (id) => {
  return await User.findOneAndDelete({ id })
}
