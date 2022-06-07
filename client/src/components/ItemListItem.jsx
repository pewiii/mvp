import React from 'react';

var ItemListItem = ({ item, deleteHandler }) => {
  var pointer = {
    cursor: 'pointer'
  }
  return (
    <div className="list-group-item list-group-item-action" aria-current="true">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{item.name}</h5>
        <div className="text-center">
        <small><span>{item.unit} count: {item.unitQty} -- {item.qty} per {item.unit}</span></small><br />
          <span>Total Quantity: {item.qty * item.unitQty}</span>

        </div>
        <div className="text-end">
          <small className="text-danger fw-bold" style={pointer} onClick={() => deleteHandler(item.name)}>Delete</small><br />
          <small className="text-primary fw-bold" style={pointer}>Edit</small>
        </div>
      </div>
      <p className="mb-1">{item.description}</p>
    </div>
  )
}

export default ItemListItem;