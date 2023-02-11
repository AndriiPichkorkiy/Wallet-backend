const express = require('express')
const { ctrlWrapper } = require('../../helpers')
const ctrl = require('../../controllers/transaction')
const { validateBody, authenticate, validateParams, isValidId } = require('../../middlewares')
const { schemasJoi } = require('../../models/transaction')

const router = express.Router() 

// Створення нової транзакції
router.post('/', authenticate, validateBody(schemasJoi.schemaAdd), ctrlWrapper(ctrl.addTransaction))

// Створення групи тестових транзакцій
router.post('/test', authenticate, validateParams(schemasJoi.schemaPostTestTransactions), ctrlWrapper(ctrl.addTestTransactions))

// Отримання всіх транзакцій користувача (можливість пагінації).
router.get('/getAll', authenticate, validateParams(schemasJoi.schemaGetAll), ctrlWrapper(ctrl.getAll))

// Отримання інформації по категоріям трагзакцій
router.get('/categories', ctrlWrapper(ctrl.getCategories))

// Отримання статистики по транзакціям за місяць(число) / рік(число) - якщо не вказали місяць. Без пагінації
router.get('/statistics', authenticate, validateParams(schemasJoi.schemaGetStatistic), ctrlWrapper(ctrl.getStatistic))

// Видалення транзакції по ID. Перерахунок наступних транзакцій
router.delete('/:id', authenticate, isValidId, ctrlWrapper(ctrl.deleteById));
// router.delete('/:id', authenticate, ctrlWrapper(ctrl.deleteById));

module.exports = router;