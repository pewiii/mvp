import React from 'react';

class CategoryForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      color: ''
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
    return (
      <form id="catForm" onSubmit={(e) => {
        e.preventDefault();
        this.props.onSubmit({...this.state, type: 'cat'});
        }}>
        <div className="mb-3">
          <h3>Add Category</h3>
          <label htmlFor="cat-name" className="form-label">Category Name</label>
          <input id="cat-name" className="form-control" name="catName" type="text" onChange={this.formChange}/><br />
          <label htmlFor="cat-color" className="form-label">Category Color</label><br />
          <input id="cat-color" className="form-control" name="catColor" type="text" onChange={this.formChange}/>
          <input className="btn btn-primary mt-2" type="submit" />
        </div>
      </form>
    )
  }
}

export default CategoryForm;