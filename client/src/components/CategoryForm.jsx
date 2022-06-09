import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ''
    }
    this.formChange = this.formChange.bind(this);
  }

  formChange(e) {
    var newState = {};
    var id = e.target.id.split('-')[1];
    newState[id] = e.target.value;
    this.setState(newState, () => {
      console.log(this.state);
    });
  }

  render() {
    var pointer = {
      cursor: 'pointer'
    };
    return (
      <form id="catForm" onSubmit={(e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state, type: 'addCat'});
        document.getElementById('cat-name').value = '';
        this.setState({ name: '' });
        }}>
        <div className="mb-3">
          <h3>Categories</h3>
          <label htmlFor="cat-name" className="form-label">Add or Remove Categories</label>
          <input id="cat-name" className="form-control" name="catName" type="text" onChange={this.formChange}/>
          <input className="btn btn-primary mt-2 mb-3" type="submit" value="Create"/>
          <span className="text-danger fw-bold ms-4" style={pointer} onClick={() => {
            this.props.deleteHandler({type: 'cat', data: { name: this.state.name }});
          }}>Delete</span>
        </div>
      </form>
    )
  }
}

export default CategoryForm;