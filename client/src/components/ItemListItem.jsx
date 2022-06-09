import React from 'react';

var ItemListItem = ({ item, deleteHandler, editItem }) => {
  var pointer = {
    cursor: 'pointer'
  }
  return (
    <div className="list-group-item list-group-item-action" aria-current="true">
      <div className="d-flex w-100 justify-content-between">
        <div className="w-25 mt-2">
        <h5 className="mb-1">{item.name}</h5>
        </div>
        <div className="w-25 mt-2">
        <small className="mb-1">{item.description}</small>
        </div>
        <div className="text-start mt-2 w-25">
          <span>Quantity: {item.quantity}</span>
        </div>
        <div className="text-end">
          <small className="text-danger fw-bold" style={pointer} onClick={() => deleteHandler({type: 'item', data: item})}>Delete</small><br />
          <small className="text-primary fw-bold" style={pointer} data-bs-toggle="modal" data-bs-target="#itemEdit" onClick={() => editItem(item)}>Edit</small>
        </div>
      </div>

    </div>
  )
}

export default ItemListItem;