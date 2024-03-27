const axios = require('axios')
const IssuesClientCLI = require('../client/issues_client_cli')
const { Command } = require('commander')


describe('IssuesClientCLI', () => {

  test('listIssues', async () => {
    const mockResponse = {
      data: [
        { id: 1, title: 'Test Issue 1', description: 'Test Description 1' },
        { id: 2, title: 'Test Issue 2', description: 'Test Description 2' },
      ],
    }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse)
    axios.get.mockResolvedValueOnce(mockResponse)
    const consoleLogSpy = jest.spyOn(console, 'log')
    const customProgram = new Command()
    const issuesClientCLI = new IssuesClientCLI(['', '', 'list-issues'], customProgram) // Create instance after mocking argv
    await issuesClientCLI.listIssues()

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/issues')
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'List of issues:',
      mockResponse.data
    )
  })

  test('getIssues', async () => {
    const mockResponse = {
      data: { id: 1, title: 'Test Issue 1', description: 'Test Description 1' },
    }
    jest.spyOn(axios, 'get').mockResolvedValueOnce(mockResponse)
    axios.get.mockResolvedValueOnce(mockResponse)
    const consoleLogSpy = jest.spyOn(console, 'log')

    const customProgram = new Command()
    const issuesClientCLI = new IssuesClientCLI(['', '', 'get-issue', '1'], customProgram) // Create instance after mocking argv
    await issuesClientCLI.getIssue('1')

    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/issues/1')
    expect(consoleLogSpy).toHaveBeenCalledWith(
      'Issue details:',
      mockResponse.data
    )
  })
})
