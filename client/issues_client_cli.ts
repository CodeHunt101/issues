import axios from 'axios';
import { Command } from 'commander';
const program = new Command();

export class IssuesClientCLI {
  serverURL: string;
  program: Command;
  
  constructor(args: string[] | undefined = undefined, myProgram = program) {
    this.serverURL = 'http://localhost:3000'
    this.program = myProgram
    this.program
      .version('1.0.0')
      .description(
        'Issues CLI for interacting with the RESTful Node.js issues server'
      )

    const commands = args || process.argv
    this.setupCommands()
    this.program.parse(commands)

    if (!commands.slice(2).length) {
      this.program.outputHelp()
    }
  }

  setupCommands() {
    this.program
      .command('list-issues')
      .alias('ls')
      .description('List all issues')
      .action(this.listIssues.bind(this))

    this.program
      .command('get-issue <id>')
      .alias('get')
      .description('Get issue by ID')
      .action(this.getIssue.bind(this))

    this.program
      .command('add-issue <title> <description>')
      .alias('add')
      .description('Add a new issue')
      .action(this.addIssue.bind(this))

    this.program
      .command('update-issue <id> <title> <description>')
      .alias('update')
      .description('Update a issue by ID')
      .action(this.updateIssue.bind(this))

    this.program
      .command('delete-issue <id>')
      .alias('delete')
      .description('Delete a issue by ID')
      .action(this.deleteIssue.bind(this))
  }

  async listIssues() {
    try {
      const response = await axios.get(`${this.serverURL}/issues`)
      console.log('List of issues:', response.data)
    } catch (error: any) {
      console.error('Error fetching issues:', error.message)
    }
  }

  async getIssue(id: number) {
    try {
      const response = await axios.get(`${this.serverURL}/issues/${id}`)
      console.log('Issue details:', response.data)
    } catch (error: any) {
      console.error('Error fetching issue:', error.message)
    }
  }

  async addIssue(title: string, description: string) {
    try {
      const response = await axios.post(`${this.serverURL}/issues`, {
        title,
        description,
      })
      console.log('Issue added successfully:', response.data)
    } catch (error: any) {
      console.error('Error adding issue:', error.message)
    }
  }

  async updateIssue(id: number, title: string, description: string) {
    try {
      const response = await axios.put(`${this.serverURL}/issues/${id}`, {
        title,
        description,
      })
      console.log('Issue updated successfully:', response.data)
    } catch (error: any) {
      console.error('Error updating issue:', error.message)
    }
  }

  async deleteIssue(id: number) {
    try {
      const response = await axios.delete(`${this.serverURL}/issues/${id}`)
      console.log(response.data.message)
    } catch (error: any) {
      console.error('Error deleting issue:', error.message)
    }
  }
}
