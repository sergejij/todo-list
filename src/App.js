import React from 'react';
import Index from './components/List/List';
import listSvg from './assets/img/list.svg';

function App() {
  return (
    <div className="todo">
      <div className="todo__sidebar">
        <Index items={[
          {
            icon: <img src={listSvg} alt="Index icon" />,
            name: 'Все задачи',
          },
        ]}
        />
        <Index items={[
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
        />

      </div>
      <div className="todo__tasks" />
    </div>
  );
}

export default App;
