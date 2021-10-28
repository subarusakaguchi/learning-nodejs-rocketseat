const express = require('express')
const router = express.Router()

const accController = require('../controllers/accControllers')

// Para as rotas que NÃO precisam do express.json() como middleware
router.get('/statement', accController.verifyIfExistsAccCPF, accController.checkStatement)

router.get('/balance', accController.verifyIfExistsAccCPF, accController.getBalance)

router.get('/statement/date', accController.verifyIfExistsAccCPF, accController.checkStatementByDate)

router.get('/acc', accController.verifyIfExistsAccCPF, accController.getAcc)

router.delete('/acc', accController.verifyIfExistsAccCPF, accController.deleteAcc)

// Para as rotas que precisam do express.json() como middleware
router.use(express.json())

router.post('/newAcc', accController.newAcc)

router.post('/deposit', accController.verifyIfExistsAccCPF, accController.deposit)

router.post('/withdraw', accController.verifyIfExistsAccCPF, accController.withdraw)

router.patch('/attAcc', accController.verifyIfExistsAccCPF, accController.attAcc)

module.exports = router