import React, {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      tasks: [],
      selectedTag: tagsList[0].optionId,
      taskInput: '',
    }
  }

  handleTaskInputChange = event => {
    this.setState({taskInput: event.target.value})
  }

  handleTagSelectChange = event => {
    this.setState({selectedTag: event.target.value})
  }

  handleAddTask = () => {
    const {tasks, taskInput, selectedTag} = this.state
    if (taskInput.trim() === '') return

    const newTask = {
      id: uuidv4(),
      text: taskInput,
      tag: selectedTag,
    }
    this.setState(prevState => ({
      tasks: [...prevState.tasks, newTask],
      taskInput: '',
      selectedTag: tagsList[0].optionId,
    }))
  }

  render() {
    const {tasks, selectedTag, taskInput} = this.state
    const filteredTasks =
      selectedTag === 'ALL'
        ? tasks
        : tasks.filter(task => task.tag === selectedTag)

    return (
      <div className="App">
        <h1>Create a Task</h1>
        <div className="input-container">
          <form>
            <label htmlFor="task">Task:</label>
            <input
              type="text"
              id="task"
              value={taskInput}
              onChange={this.handleTaskInputChange}
              placeholder="Enter the task here"
            />
            <label htmlFor="tags">Tags:</label>
            <select
              id="tags"
              value={selectedTag}
              onChange={this.handleTagSelectChange}
            >
              {tagsList.map(tag => (
                <option key={tag.optionId} value={tag.optionId}>
                  {tag.displayText}
                </option>
              ))}
            </select>
            <button type="button" onClick={this.handleAddTask}>
              Add Task
            </button>
          </form>
        </div>
        <h2>Tags</h2>
        <ul>
          {tagsList.map(tag => (
            <li key={tag.optionId}>
              <button>{tag.displayText}</button>
            </li>
          ))}
        </ul>
        <h2>Tasks</h2>
        <p>Selected Tag: {selectedTag}</p>
        <ul>
          {filteredTasks.map(task => (
            <li key={task.id}>
              <p>{task.text}</p>
              <p>
                Tag:{' '}
                {tagsList.find(tag => tag.optionId === task.tag).displayText}
              </p>
            </li>
          ))}
        </ul>
        {tasks.length === 0 && <p>No Tasks Added Yet</p>}
      </div>
    )
  }
}

export default App
