import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { db } from "../firebase-config";
import { ITask, ITodoList, test } from "../interfaces/task.interface"
import '../todo-list.css'

type TodoTaskProps = {
    task?: test,
    setDataIsChange: any,
    dataIsChange: boolean

}





const TodoTask = (props: TodoTaskProps) => {
    const [isComplete,setIsComplete] = useState<boolean>(false)
    /**
     * Delete Task
     * @param id - record id
     */
    const deleteTask = async (id?: string) => {
        if (id) {
            const taskDoc = doc(db, "tasks", id)
            await deleteDoc(taskDoc)
        }

    }

    /**
     * Button for complete task
     * @param id - id of record to change 'isFinish' property
     */
    const updateTask = async (id?: string) => {
        if (id) {
            const taskDoc = doc(db, "tasks", id)
            await updateDoc(taskDoc, { isFinish: true })
            setIsComplete(true)
            
        }
        
    }


   

    return <div className="task">
        <div className="content" >
            <span>{props.task?.header}</span>
            <span>{props.task?.description}</span>
            <span>{props.task?.date}</span>
        </div>
        <div className="actions">
            <button className="delete" onClick={() => {
                deleteTask(props.task?.id)
                props.setDataIsChange(!props.dataIsChange)
            }
            }>Delete</button>

            <button className="completed" onClick={() => {
                updateTask(props.task?.id)
                props.setDataIsChange(!props.dataIsChange)
            }}>Completed</button>
            {isComplete && <div style={{width:'100px', color:'green',fontSize:'44px'}}>✓</div>}
            <label htmlFor="inputTag">
                Select File
                <input id="inputTag" type="file" />
            </label>

        </div>


    </div>
}

export default TodoTask;