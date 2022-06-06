import React from 'react';

var ItemListItem = ({ item }) => {
  return (
    <li>
      <div className="item">
        <div>
          <span>Name: {item.name}</span><br />
          <span>Description: {item.description}</span>
        </div>
        <div>
        <span>{item.unit} count: {item.qty}</span><br />
        <span>{item.unitQty} per {item.unit}</span><br />
        <span>Total Qty: {item.qty * item.unitQty}</span>
        </div>
      </div>
    </li>
  )
}

export default ItemListItem;