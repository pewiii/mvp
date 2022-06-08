import React from 'react';
import ItemListItem from './ItemListItem.jsx';

class ItemList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      editItem: {},
      operation: 'add',
      newQty: 0
    }
    this.setEditItem = this.setEditItem.bind(this);
    this.operatorChangeHandler = this.operatorChangeHandler.bind(this);
    this.itemQtyChangeHandler = this.itemQtyChangeHandler.bind(this);
    this.itemEditSubmit = this.itemEditSubmit.bind(this);
  }

  setEditItem(item) {
    this.setState({editItem: item});
  }

  operatorChangeHandler(e) {
    this.setState({ operation: e.target.id })
  }

  itemQtyChangeHandler(e) {
    this.setState({ newQty: e.target.value })
  }

  itemEditSubmit(e) {
    e.preventDefault();
    this.props.formSubmit({ operation: this.state.operation, qty: this.state.newQty, item: this.state.editItem });
    e.target.reset();
    this.setState({ operation: 'add' });
  }

  render() {
    return (
      <React.Fragment>
      <div className="list-group">
        {this.props.items.map(item => {
          return <ItemListItem key={item._id} item={item} deleteHandler={this.props.deleteHandler} editItem={this.setEditItem}/>

        })}
      </div>
      <div className="modal fade" id="itemEdit" tabIndex="-1" aria-labelledby="itemEdit" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">{this.state.editItem.name}</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <span className="mb-3">{this.state.editItem.description}</span>
            <form className="mt-2" onSubmit={this.itemEditSubmit}>
              <div className="form-group">

              <div className="custom-control custom-radio custom-control-inline">
                <input type="radio" id="add" name="itemEditRadio" className="custom-control-input" defaultChecked="true" onClick={this.operatorChangeHandler}/>
                <label className="custom-control-label" htmlFor="add">&nbsp;Add</label>
                &nbsp;&nbsp;&nbsp;
                <input type="radio" id="subtract" name="itemEditRadio" className="custom-control-input" onClick={this.operatorChangeHandler}/>
                <label className="custom-control-label" htmlFor="subtract">&nbsp;Subtract</label>
                &nbsp;&nbsp;&nbsp;
                <input type="radio" id="overwrite" name="itemEditRadio" className="custom-control-input" onClick={this.operatorChangeHandler}/>
                <label className="custom-control-label" htmlFor="overwrite">&nbsp;Overwrite</label>
              </div>

                <label className="mt-2" htmlFor="editQuantity">Quantity</label>
                <input type="text" className="form-control" id="editQuantity" placeholder={getPlaceHolderText(this.state.operation)} onChange={this.itemQtyChangeHandler}/>
              </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Save changes</button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>
    </React.Fragment>
    )
  }
}

var getPlaceHolderText = (operation) => {
  if (operation === 'overwrite') {
    return 'Enter new quantity';
  } else {
    return 'Enter quantity to ' + operation;
  }
}

export default ItemList;