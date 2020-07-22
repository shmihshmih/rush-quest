const UserModel = require('../models/UserModel')
const Router = require('express')
const router = Router()

router.get(
  '/d',
  (req, res) => {
    res.send('GET request to the homepage from auth js');
  });

router.post(
  '/',
  async (req, res) => {
    try {

      const addUser = new UserModel({...req.body})

      await addUser.save()

      res.status(201).json({message: 'Пользователь создан'})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  });

module.exports = router