import React from 'react';
import List from './components/List/List';
import AddList from './components/AddList/AddList';

import listSvg from './assets/img/list.svg';

import DB from './assets/db.json';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <List
          items={[
            {
              icon: <img src={listSvg} alt="Index icon" />,
              name: 'Все задачи',
            },
          ]}
        />
        <List
          items={[
            {
              color: 'green',
              name: 'Покупки',
            },
            {
              color: 'blue',
              name: 'Фронтенд',
              active: true,
            },
            {
              color: 'pink',
              name: 'Фильмы и сериалы',
            },
            {
              color: 'light_green',
              name: 'Книги',
            },
            {
              color: 'grey',
              name: 'Личное',
            },
          ]}
          isRemovable
        />
        <AddList colors={DB.colors} />
      </div>
      <div className="todo__tasks" />
    </div>
  );
}

export default App;
