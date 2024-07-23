const userService = require('../services/userService')
const handleError = require('../utils/errorHandler')

// 특정 사용자 조회
exports.getUserById = async (req, res) => {
  try {
    const user = await userService.findUserById(req.params.id)
    if (user) {
      res.status(200).json(user)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    handleError(res, error, 'Failed to get the user')
  }
}

// 모든 사용자 조회
exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.findAllUsers()
    res.status(200).json(users)
  } catch (error) {
    handleError(res, error, 'Failed to get users')
  }
}

// 사용자 생성
exports.createUser = async (req, res) => {
  try {
    const { name, email } = req.body
    const newUser = await userService.createUser({ name, email })
    res.status(201).json(newUser)
  } catch (error) {
    handleError(res, error, 'Failed to save the user')
  }
}

// 사용자 수정
exports.updateUser = async (req, res) => {
  try {
    const { name, email } = req.body
    const updatedUser = await userService.updateUser(req.params.id, {
      name,
      email
    })
    if (updatedUser) {
      res.status(200).json(updatedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    handleError(res, error, 'Failed to update the user')
  }
}

// 사용자 삭제
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await userService.deleteUser(req.params.id)
    if (deletedUser) {
      res.status(200).json(deletedUser)
    } else {
      res.status(404).json({ message: 'User not found' })
    }
  } catch (error) {
    handleError(res, error, 'Failed to delete the user')
  }
}
