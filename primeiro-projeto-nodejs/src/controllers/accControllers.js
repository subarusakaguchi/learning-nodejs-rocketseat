const { v4:uuidv4 } = require('uuid')
let customerFakeDB = []
const totalBalance = (statement) => {
  let totalAmount = statement.reduce((acc, operation) => {
    if (operation.type === "credit") {
      return acc += operation.amount
    } else if (operation.type === "debit") {
      return acc -= operation.amount
    }
  }, 0)

  return totalAmount
}

const accController = {
  checkStatement: (req, res) => {
    const { customer } = req
    return res.send(customer.statement)
  },

  checkStatementByDate: (req, res) => {
    const { customer } = req
    const { date } = req.query

    const dateFormat = new Date(date + " 00:00")

    const statement = customer.statement.filter((statement) => {
      return statement.created_at.toDateString() === new Date(dateFormat).toDateString()
    })

    return res.json(statement)
  },

  newAcc: (req, res) => {
    const { cpf, name, email, birth } = req.body
    const verifyCPF = customerFakeDB.every((customer) => {
      return customer.cpf !== cpf
    })
    if (verifyCPF) {
      const client = {
        id: uuidv4(),
        cpf,
        name,
        email,
        birth,
        statement: []
      }
    
      customerFakeDB.push(client)
      return res.status(201).send()
    } else {
      return res.status(409).send({ error: "CPF already registered!"})
    }
  },

  attAcc: (req, res) => {
    const { name, email, birth } = req.body
    const { customer } = req
    
    customer.name = name
    customer.email = email
    customer.birth = birth

    console.log(customerFakeDB)
    return res.status(201).send()
  },

  getAcc: (req, res) => {
    const { customer } = req
    return res.send(customer)
  },

  deleteAcc: (req, res) => {
    const { customer } = req

    customerFakeDB = customerFakeDB.filter((customerDB) => {
      return customerDB.cpf != customer.cpf
    })

    return res.status(200).send(customerFakeDB)
  },

  deposit: (req, res) => {
    const { description, amount } = req.body
    const { customer } = req

    const statementOperation = {
      description,
      amount,
      created_at: new Date(),
      type: "credit"
    }

    customer.statement.push(statementOperation)
    console.log(customerFakeDB)
    return res.status(200).send()
  },

  withdraw: (req, res) => {
    const { description, amount } = req.body
    const { customer } = req
    const balance = totalBalance(customer.statement)

    if (balance <= 0 || amount > balance || (balance - amount) < 0) {
      return res.status(409).send({ error: "Insuficient funds!" })
    } else {
      const statementOperation = {
        description,
        amount,
        created_at: new Date(),
        type: "debit"
      }

      customer.statement.push(statementOperation)
      
      return res.status(201).send()
    }
  },

  getBalance: (req, res) => {
    const { customer } = req

    const balance = totalBalance(customer.statement)

    return res.json({ balance })
  },

  // Middleware
  verifyIfExistsAccCPF: function (req, res, next) {
    const { cpf } = req.headers

    const customer = customerFakeDB.find((customer) => {
      return customer.cpf === cpf
    })

    if (!customer) {
      return res.status(400).send({ error: "Customer not found" })
    } else {
      req.customer = customer
      return next()
    }
  },  
}

module.exports = accController