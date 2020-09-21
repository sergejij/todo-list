import React from 'react';
import axios from 'axios';

import addSvg from '../../assets/img/add.svg';

const AddTaskForm = ({ list, onAddTask }) => {
  const [visibleForm, setFormVisible] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const toggleFromVisible = () => {
    setFormVisible(!visibleForm);
    setInputValue('');
  };

  const addTask = () => {
    const obj = {
      listId: list.id,
      text: inputValue,
      complated: false,
    };
    setIsLoading(true);
    axios.post('http://localhost:3001/tasks', obj)
      .then(({ data }) => {
        onAddTask(list.id, data);
        toggleFromVisible();
      })
      .catch(() => alert('Ошибка при добавлении задачи!'))
      .finally(() => setIsLoading(false));
  };
  return (
    <div className="tasks_form">
      {
        !visibleForm ? (
          <div onClick={toggleFromVisible} className="tasks__form-new">
            <img src={addSvg} alt="Добавить задачу" />
            <span>Новая задача</span>
          </div>
        ) : (
          <div className="tasks__form-block">
            <input
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="field"
              type="text"
              placeholder="Текст задачи"
            />
            <button disabled={isLoading} onClick={addTask} className="button">
              {isLoading ? 'Добавление...' : 'Добавить задачу'}
            </button>
            <button onClick={toggleFromVisible} className="button button-grey">Отмена</button>
          </div>
        )
      }

    </div>
  );
};

export default AddTaskForm;
