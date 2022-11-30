import React, { ChangeEvent, useEffect, useState } from 'react';
import { db } from './firebase-config'
import './App.css';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore'
  import './todo-list.css'
import { ITodoList, ITask } from './interfaces/task.interface';
import TodoTask from './components/TodoTask';
import dayjs from 'dayjs';

const App = () => {
  const [todoList, setTodoList] = useState<ITodoList[]>([])
  const [task, setTask] = useState<string>('')
  const [deadLine, setDeadline] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [dataIsChange, setDataIsChange] = useState<boolean>(false)
  const tasksCollectionRef = collection(db, 'tasks')

  /**
   * show new data on change
   */
  useEffect(() => {
    const data = getDocs(tasksCollectionRef)
    data.then(res => {
      const listData: ITodoList[] = res.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      setTodoList(listData)
    })
  }, [dataIsChange])

  /**
   * Define state depending on input
   * @param event - event type 
   */
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === 'task') {
      setTask(event.target.value)
    }
    if (event.target.name === 'description') {
      setDescription(event.target.value)
    }
    if (event.target.name === 'date') {
      setDeadline(event.target.value.replace("T",' '))
    }
  }

  /**
   * Add new task to todoList
   */ 
  const addTask = () => {
    const newTask: ITask = { header: task, date: deadLine, isFinish: false, description: description }
    addDoc(tasksCollectionRef, newTask)
    setTask('')
    setDescription('')
    setDeadline('')
    setDataIsChange(!dataIsChange)
  }



  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <input name='task' value={task} type="text" placeholder='Task Name' onChange={handleChange} />
          <input name='description' value={description} type="text" placeholder='Task Description' onChange={handleChange} />
          <input name='date' value={deadLine} type="datetime-local" placeholder='Task Deadline' onChange={handleChange} />
        </div>
        <button onClick={addTask} type={'submit'}>Add Task</button>
      </div>
      <div className='todoList'>
        {todoList.map((task: any, key: number) => {
          return <TodoTask key={key} task={task}  setDataIsChange = {setDataIsChange} dataIsChange = {dataIsChange} />
        })}
      </div>
    </div>
  );
}

export default App;
