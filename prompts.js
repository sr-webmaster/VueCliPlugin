module.exports = pkg => {
  const prompts = [
    {
      name: 'type',
      type: 'list',
      message: 'What type of UI are you building?',
      choices: [
        'Component',
        'Project',
        'Client [Component]'
      ]
    },
    {
      name: 'projectType',
      type: 'list',
      message: 'Do you want to Make a new project or Update an existing project?',
      when: (answers) => {
        return answers.type === 'Project'
      },
      choices: [
        'Update',
        'New'
      ]
    },
    {
      name: 'projectUpdates',
      type: 'checkbox',
      message: 'What aspects do you want to update',
      when: (answers) => {
        return answers.projectType === 'Update'
      },
      choices: [
        'Storybook',
        'Build'
      ]
    }
  ]

  return prompts
}
