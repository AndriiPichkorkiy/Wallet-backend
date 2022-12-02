const express = require('express')
const { wrapper } = require('../../helpers')
const router = express.Router()
const ctrl = require('../../controllers/transaction');
// const {ctrlWrapper} = require('../../helpers')

// const {shemas} = require('../../models/transaction')

// Отримання всіх транзакцій користувача (можливість пагінації).
router.get('/', wrapper(ctrl.getAll))

// Отримання інформації по категоріям трагзакцій
// router.get('/categories', ctrl.getDate)

// Отримання інформації по транзакціям за місяць(число) / рік(число) - якщо не вказали місяць. Без пагінації
// router.get('/date', ctrl.getDate)

// Створення нової транзакції
router.post('/', wrapper(ctrl.addTransaction))


module.exports = router;