import Task from './task.js'

export default class TaskModel {
  constructor () {
    this.tasks = []

    // Add some mock tasks
    this.tasks.push(
      new Task('1', 'project1', 'Task 1', 'Description 1', '2023-09-10', false),
      new Task('2', 'project1', 'Task 2', 'Description 2', '2023-09-11', false),
      new Task('3', 'project2', 'Task 3', 'Description 3', '2023-09-30', true),
      new Task('4', null, 'Task 4', 'Description 4', '2023-09-29', false),
      new Task('5', 'project2', 'Task 5', 'Description 5', '', false),
      new Task('6', 'project2', 'Task 6', 'Description 6', '2023-07-20', true)
    )
  }

  getAllTasks = () => {
    return this.tasks
  }
}
