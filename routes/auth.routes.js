const UserModel = require('../models/UserModel')
const Router = require('express')
const router = Router()



router.get(
  '/d',
  (req, res) => {
  res.send('GET request to the homepage from auth js');
});

router.post(
  '/dr',
  async (req, res) => {
    try {

      //TODO check and save what we need from frontend
      const newUser = new UserModel({...req})
      newUser.save();

      res.status(201).json({ message: 'Пользователь создан' })
    } catch(e) {
      res.status(500).json({ message: 'Что-то пошло не так, попробуйте снова' })
    }
  });

module.exports = router