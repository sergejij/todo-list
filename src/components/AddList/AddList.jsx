import React, { useEffect } from 'react';
import axios from 'axios';

import List from '../List/List';
import Badge from '../Badge/Badge';

import addSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({ colors, onAdd }) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(3);
  const [isLoading, setIsLoading] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');

  useEffect(() => {
    if (Array.isArray(colors)) {
      setSelectedColor(colors[0].id);
    }
  }, [colors]);

  const onClose = () => {
    setVisiblePopup(false);
    setInputValue('');
    setSelectedColor(colors[0].id);
  };

  const addList = () => {
    if (!inputValue) {
      alert('Введите название списка');
      return;
    }
    setIsLoading(true);
    axios.post('http://localhost:3001/lists', {
      name: inputValue,
      colorId: selectedColor,
    })
      .then(({ data }) => {
        const color = colors.filter((c) => c.id === selectedColor)[0].name;
        const listObj = {
          ...data,
          color: { name: color },
        };
        onAdd(listObj);
        onClose();
      })
      .catch(() => alert('Ошибка при добавлении задачи!'))
      .finally(() => setIsLoading(false));
  };

  return (
    <div className="add-list">
      <List
        onClick={() => setVisiblePopup(true)}
        items={[
          {
            className: 'list_add-button',
            icon: <img width={12} height={12} src={addSvg} alt="Add icon" />,
            name: 'Добавить список',
          },
        ]}
      />
      {visiblePopup && (
        <div className="add-list__popup">
          <img
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
            onClick={onClose}
          />
          <input
            value={inputValue}
            className="field"
            type="text"
            placeholder="Название списка"
            onChange={(e) => setInputValue(e.target.value)}
          />
          <div className="add-list__popup-colors">
            {
              colors.map((color) => (
                <Badge
                  onClick={() => setSelectedColor(color.id)}
                  key={color.id}
                  color={color.name}
                  className={selectedColor === color.id && 'active'}
                />
              ))
            }
          </div>
          <button onClick={addList} className="button">
            {isLoading ? 'Добавить...' : 'Добавить'}
          </button>
        </div>
      )}
    </div>
  );
};
export default AddList;
