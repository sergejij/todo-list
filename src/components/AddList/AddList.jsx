import React from 'react';

import List from '../List/List';
import Badge from '../Badge/Badge';

import addSvg from '../../assets/img/add.svg';
import closeSvg from '../../assets/img/close.svg';

import './AddList.scss';

const AddList = ({ colors }) => {
  const [visiblePopup, setVisiblePopup] = React.useState(false);
  const [selectedColor, setSelectedColor] = React.useState(colors[0].id);

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
            onClick={() => setVisiblePopup(false)}
            src={closeSvg}
            alt="Close button"
            className="add-list__popup-close-btn"
          />
          <input className="field" type="text" placeholder="Название списка" />
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
          <button className="button">Добавить</button>
        </div>
      )}
    </div>
  );
};
export default AddList;
