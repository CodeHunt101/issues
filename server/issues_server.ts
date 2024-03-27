import express, { Express, Request, Response } from "express";
import bodyParser from 'body-parser'
import dotenv from 'dotenv'
import {Routes} from './routes'
import {IssuesData} from './issues_data'

dotenv.config()

class IssuesServer {
  app: Express
  port: string | number
  issuesData: IssuesData
  routes: Routes
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
