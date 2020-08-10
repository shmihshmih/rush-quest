const jwt = require('jsonwebtoken')
const UserModel = require('../models/UserModel')
const Router = require('express')
const router = Router()
const bcrypt = require('bcryptjs')
const config = require('config')

const responseStatus = {
  userCreated: 999,
  userNotExist: 666,
  userExist: 777,
  passMatched: 555,
  passNotMathed: 888
}

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

      //checking of exist
      if(isExist) {
        if(user && isExist && !user.password) {
          res.status(201).json({
            message: "Пользователь существует",
            email: isExist.email,
            status: responseStatus.userExist
          })
        }
          //login
          if(user && isExist && user.password) {
            const isPassMatch = await bcrypt.compare(user.password, isExist.password)
            if(isPassMatch) {
              const token = jwt.sign(
                {email: user.email},
                config.get('jwtSecret'),
                {expiresIn: '12h'}
              )
              res.status(201).json({ email: user.email, token, status: responseStatus.passMatched})
            } else {
              res.status(201).json({ auth: false, email: user.email, status: responseStatus.passNotMathed})
            }
          }
      }

      //registration
      if(!isExist) {
        //register
        if(user && !isExist && user.email && user.password) {
          const hashedPass = await bcrypt.hash(user.password, 12)
          const addUser = new UserModel({...user,password: hashedPass })
          await addUser.save()
          res.status(201).json({message: 'Пользователь создан', user, status: responseStatus.userCreated})
        }
      }
      res.status(201).json({message: 'Пользователь не существует', user, status: responseStatus.userNotExist})
    } catch (e) {
      res.status(500).json({message: 'Что-то пошло не так, попробуйте снова'})
    }
  });

module.exports = router