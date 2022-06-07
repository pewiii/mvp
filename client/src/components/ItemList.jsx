import React from 'react';
import ItemListItem from './ItemListItem.jsx';

var ItemList = (props) => {
  return (
    <div className="list-group">
      {props.items.map(item => {
        return <ItemListItem key={item.name} item={item} deleteHandler={props.deleteHandler}/>
      })}
    </div>
  )
}

export default ItemList;