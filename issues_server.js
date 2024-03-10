const express = require('express')
const bodyParser = require('body-parser')
const dotenv = require('dotenv')
const Routes = require('./routes')
const IssuesData = require('./issues_data')

dotenv.config()

class IssuesServer {
  constructor() {
    this.app = express()
    this.port = process.env.PORT || 3000
    this.issuesData = new IssuesData()
    this.routes = new Routes(this.issuesData)
    this.setupMiddlewares()
    this.setupRoutes()
  }

  setupMiddlewares() {
    this.app.use(bodyParser.json())
  }

  setupRoutes() {
    this.app.use('/', this.routes.getRoutes())
  }

  start() {
    this.app.listen(this.port, () => {
      console.log(`Server listening at http://localhost:${this.port}`)
    })
  }
}

const server = new IssuesServer()
server.start()
