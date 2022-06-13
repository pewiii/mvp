import React from 'react';

class ItemForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      description: '',
      quantity: '',
      category: '',
    }
    this.formChange = this.formChange.bind(this);
  }

  formChange(e) {
    var newState = {};
    var id = e.target.id.split('-')[1];
    newState[id] = e.target.value;
    this.setState(newState);
  }

  render() {
    return (
      <React.Fragment>
        <a id="collapseBtn" className="btn btn-primary mb-3" data-bs-toggle="collapse" href="#itemForm" role="button" aria-expanded="false" aria-controls="itemForm">
        Add Item
        </a>
        <div className="collapse mb-3" id="itemForm">
          <div className="card card-body">
            <form onSubmit={(e) => {
              e.preventDefault();
              e.target.reset();
              document.getElementById('collapseBtn').click();
              this.props.onSubmit({...this.state, type: 'item'});
              this.setState(getInitialState());
            }}>
              <div>
                <h3>Add Item</h3>
                <label htmlFor="itemName" className="form-label">Item Name</label>
                <input id="item-name" className="form-control" name="itemName" type="text" onChange={this.formChange}/>

                <label htmlFor="itemDescription" className="form-label">Description</label>
                <input id="item-description" className="form-control" name="itemDescription" onChange={this.formChange}/>

                <label htmlFor="itemQuantity" className="form-label">Quantity</label>
                <input id="item-quantity" className="form-control" name="itemQuantity" type="text" onChange={this.formChange}/>

                <label htmlFor="categories" className="form-label">Category</label>
                <select id="item-category" className="form-control" name="categories" onChange={this.formChange}>
                  <option>select</option>
                  {this.props.categories.map(cat => <option key={cat.name} value={cat.name}>{cat.name}</option>)}
                </select>

                <input className="btn btn-primary mt-2" type="submit" />
              </div>
            </form>
          </div>
        </div>
      </React.Fragment>
    )
  }
}

var getInitialState = () => {
  return  {
    name: '',
    description: '',
    quantity: '',
    category: '',
  };
}

export default ItemForm;