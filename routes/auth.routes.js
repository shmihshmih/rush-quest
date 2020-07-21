const UserModel = require('../models/UserModel')
const Router = require('express')
const router = Router()

const newUser = new UserModel({
  id: "15",
  name: "FirstUser",
  email: "FirstUsers email",
  avatar: "avatars.com",
  isDriver: true,
  isPedestrian: true,
  about: "I am the best",
  birth: "10-07-2020",
  rate: "345",
  car: "Zhiguli",
  isCarVisible: true,
  carNumber: "coco450",
  isCarNumberVisible: true
})

router.get(
  '/d',
  (req, res) => {
  res.send('GET request to the homepage from auth js');
});

router.post(
  '/dr',
  async (req, res) => {
    try {
      res.status(201).json({ message: 'Пользователь создан' })
    } catch(e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  });

module.exports = router