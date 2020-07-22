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
      const user = req.body;
      const isExist = await UserModel.findOne({ email: user.email })

      //watching email
      if(user && user.email && !user.pass) {
        if(isExist) {
           res.status(201).json({ message: "Пользователь существует",  isExist})
        }
      }

      //login
      if(user && isExist && user.password) {
         res.status(201).json({...user})
      }

      //register
      if(user && !isExist && user.email && user.password) {
        const addUser = new UserModel({...user})
        await addUser.save()
        res.status(201).json({message: 'Пользователь создан', user, createdNow: true})
      }

      res.status(201).json({message: 'Пользователь не существует', user})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  });

module.exports = router