const axios = require('axios')
const { program } = require('commander')

class IssuesClientCLI {
  constructor(args) {
    this.serverURL = 'http://localhost:3000'
    program
      .version('1.0.0')
      .description(
        'Issues CLI for interacting with the RESTful Node.js issues server'
      )

    const commands = args ?? process.argv
    this.setupCommands()
    program.parse(commands)

    if (!commands.slice(2).length) {
      program.outputHelp()
    }
  }

  setupCommands() {
    program
      .command('list-issues')
      .alias('ls')
      .description('List all issues')
      .action(this.listIssues.bind(this))

    program
      .command('get-issue <id>')
      .alias('get')
      .description('Get issue by ID')
      .action(this.getIssue.bind(this))

    program
      .command('add-issue <title> <description>')
      .alias('add')
      .description('Add a new issue')
      .action(this.addIssue.bind(this))

    program
      .command('update-issue <id> <title> <description>')
      .alias('update')
      .description('Update a issue by ID')
      .action(this.updateIssue.bind(this))

    program
      .command('delete-issue <id>')
      .alias('delete')
      .description('Delete a issue by ID')
      .action(this.deleteIssue.bind(this))
  }

  async listIssues() {
    try {
      const response = await axios.get(`${this.serverURL}/issues`)
      console.log('List of issues:', response.data)
    } catch (error) {
      console.error('Error fetching issues:', error.message)
    }
  }

  async getIssue(id) {
    try {
      const response = await axios.get(`${this.serverURL}/issues/${id}`)
      console.log('Issue details:', response.data)
    } catch (error) {
      console.error('Error fetching issue:', error.message)
    }
  }

  async addIssue(title, description) {
    try {
      const response = await axios.post(`${this.serverURL}/issues`, {
        title,
        description,
      })
      console.log('Issue added successfully:', response.data)
    } catch (error) {
      console.error('Error adding issue:', error.message)
    }
  }

  async updateIssue(id, title, description) {
    try {
      const response = await axios.put(`${this.serverURL}/issues/${id}`, {
        title,
        description,
      })
      console.log('Issue updated successfully:', response.data)
    } catch (error) {
      console.error('Error updating issue:', error.message)
    }
  }

  async deleteIssue(id) {
    try {
      const response = await axios.delete(`${this.serverURL}/issues/${id}`)
      console.log(response.data.message)
    } catch (error) {
      console.error('Error deleting issue:', error.message)
    }
  }
}

const issuesClientCLI = new IssuesClientCLI()

module.exports = IssuesClientCLI
