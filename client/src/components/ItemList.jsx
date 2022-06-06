import React from 'react';
import ItemListItem from './ItemListItem.jsx';

var ItemList = (props) => {
  return (
    <ul>
      {props.items.map(item => {
        return <ItemListItem key={item.name} item={item} />
      })}
    </ul>
  )
}

export default ItemList;