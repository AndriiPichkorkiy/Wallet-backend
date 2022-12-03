const express = require('express')
const { ctrlWrapper } = require('../../helpers')
const ctrl = require('../../controllers/transaction')
const { validateBody } = require('../../middlewares')
const {schemasJoi} = require('../../models/transaction')

const router = express.Router()



// const {shemas} = require('../../models/transaction')

// Отримання всіх транзакцій користувача (можливість пагінації).
// router.get('/', wrapper(ctrl.getAll))

// Отримання інформації по категоріям трагзакцій
router.get('/categories', ctrlWrapper(ctrl.getCategories))

// Отримання інформації по транзакціям за місяць(число) / рік(число) - якщо не вказали місяць. Без пагінації
// router.get('/date', ctrl.getDate)

// Створення нової транзакції
router.post('/', validateBody(schemasJoi.schemaAdd), ctrlWrapper(ctrl.addTransaction))


module.exports = router;