import React from 'react';

var ItemListItem = ({ item, deleteHandler, editItem }) => {
  var pointer = {
    cursor: 'pointer'
  }
  return (
    <div className="list-group-item list-group-item-action" aria-current="true">
      <div className="d-flex w-100 justify-content-between">
        <h5 className="mb-1">{item.name}</h5>
        <div className="text-center mt-3">
          <span className="align-middle">Total Quantity: {item.quantity}</span>
        </div>
        <div className="text-end">
          <small className="text-danger fw-bold" style={pointer} onClick={() => deleteHandler(item._id)}>Delete</small><br />
          <small className="text-primary fw-bold" style={pointer} data-bs-toggle="modal" data-bs-target="#itemEdit" onClick={() => editItem(item)}>Edit</small>
        </div>
      </div>
      <p className="mb-1">{item.description}</p>
    </div>
  )
}

export default ItemListItem;