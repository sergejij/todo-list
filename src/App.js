import React, { useEffect, useState } from 'react';
import axios from 'axios';

import List from './components/List/List';
import AddList from './components/AddList/AddList';
import Tasks from './components/Tasks/Tasks';

import listSvg from './assets/img/list.svg';

function App() {
  const [lists, setLists] = useState(null);
  const [colors, setColors] = useState(null);
  const [activeItem, setActiveItem] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/lists?_expand=color&_embed=tasks')
      .then(({ data }) => {
        setLists(data);
      });

    axios.get('http://localhost:3001/colors')
      .then(({ data }) => {
        setColors(data);
      });
  }, []);

  const onAddList = (obj) => {
    const newList = [...lists, obj];
    setLists(newList);
  };

  const onAddTask = (listId, taskObj) => {
    const newList = lists.map((list) => {
      if (list.id === listId) {
        list.tasks = [...list.tasks, taskObj];
      }
      return list;
    });
    setLists(newList);
  };

  const onEditListTitle = (id, title) => {
    const newList = lists.map((list) => {
      if (list.id === id) {
        list.name = title;
      }
      return list;
    });
    setLists(newList);
  };

  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              active: true,
              icon: <img src={listSvg} alt="Index icon" />,
              name: 'Все задачи',
            },
          ]}
        />

        {lists ? (
          <List
            items={lists}
            onRemove={(id) => {
              const newLists = lists.filter((list) => list.id !== id);
              setLists(newLists);
            }}
            onClickItem={(item) => setActiveItem(item)}
            activeItem={activeItem}
            isRemovable
          />
        ) : ('Загрузка...')}
        <AddList onAdd={onAddList} colors={colors} />
      </div>
      <div className="todo__tasks">
        {
          lists
          && activeItem
          && (
          <Tasks
            list={activeItem}
            onAddTask={onAddTask}
            onEditTitle={onEditListTitle}
          />
          )
        }
      </div>
    </div>
  );
}

export default App;
