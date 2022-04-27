import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'

import '../css/drag_and_drop.css';

export const DragAndDrop = () => {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        (
            async () => {

                const resp = await fetch(`https://jsonplaceholder.typicode.com/users`)
                const data = await resp.json();

                const newDataset = [];
                newDataset.push(data[0]);
                newDataset.push(data[1]);
                newDataset.push(data[2]);
                newDataset.push(data[3]);
                setTasks(newDataset);
                console.log(newDataset);
            }
        )();
    }, [])


    const reorder = (list, startIndex, endIndex) => {
        const result = [...list];
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);

        return result;
    }


    return (
        <DragDropContext onDragEnd={
            (result) => {
                const { source, destination} = result;
                if(!destination) {
                    return;
                }
                
                if(source.index === destination.index
                    && source.droppableId === destination.droppableId) {
                    return;
                }

                setTasks(prevTasks => reorder(prevTasks, source.index, destination.index));
            }}
            >
            <div className="app container">
                <h1>Estudiar: </h1>
                <Droppable droppableId='tasks' direction='horizontal'>
                    {(droppableProvided) =>(
                        <ul
                            {...droppableProvided.droppableProps}
                            ref={droppableProvided.innerRef}
                            className="task-container"
                        >
                            {
                                (tasks?.length < 1)
                                    ?
                                    (
                                        <li className="task-item bg-info rounded p-2 list-style-none"> No hay tareas para mostrar</li>
                                    )
                                    :
                                    (
                                        tasks.map((task, index) => (
                                            <Draggable key={task.id} draggableId={(task.id).toString()} index={index}>
                                                {
                                                    (draggableProvided) => (
                                                    <li {...draggableProvided.draggableProps}
                                                        ref={draggableProvided.innerRef}
                                                        {...draggableProvided.dragHandleProps}
                                                        className="task-item list-style-none">
                                                        {task.name}
                                                    </li>)
                                                }
                                            </Draggable>
                                        ))
                                    )
                            }
                            {droppableProvided.placeholder}
                        </ul>
                    )}
                </Droppable>
            </div>
        </DragDropContext>

    )
}
