import React from 'react';
import axios from 'axios';

import Task from './Task';
import AddTaskForm from './AddTaskFrom';

import editSvg from '../../assets/img/edit.svg';

import './Tasks.scss';

const Tasks = ({
  list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask,
}) => {
  const editTitle = () => {
    const newTitle = window.prompt('Название списка', list.name);
    if (newTitle) {
      onEditTitle(list.id, newTitle);
      axios
        .patch(`http://localhost:3001/lists/${list.id}`, {
          name: newTitle,
        }).catch(() => {
          alert('Не удалось обновить название списка');
        });
    }
  };

  return (
    <div className="tasks">
      <h2 style={{ color: list.color.hex }} className="tasks__title">
        {list.name}
        <img onClick={editTitle} src={editSvg} alt="Edit icon" />
      </h2>

      <div className="tasks__items">
        {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Задачи отсутствуют</h2>}
        {
          list.tasks
          && list.tasks.map((task) => (
            <Task {...task} key={task.id} list={list} onEdit={onEditTask} onRemove={onRemoveTask} onComplete={onCompleteTask} />
          ))
        }
        <AddTaskForm key={list.id} list={list} onAddTask={onAddTask} />
      </div>
    </div>
  );
};

export default Tasks;
