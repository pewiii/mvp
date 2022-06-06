import React from 'react';
import CategoryList from './CategoryList.jsx';
import ItemList from './ItemList.jsx';
import CategoryForm from './CategoryForm.jsx';
import ItemForm from './ItemForm.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      items: [],
      categories: []
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems(category = "all") {
    fetch('items?' + new URLSearchParams({category}))
    .then(res => {
      res.json()
      .then(data => {
        this.setState(data)
      });
    });
  }

  categoryHandler(cat) {
    console.log(cat);
    this.getItems(cat);
  }

  formSubmit(data) {
    fetch('create', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      this.getItems();
    });
  }

  render() {
    return (
    <div className="">
        <h1 className="bg-primary text-center">Inventory Tracker</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 p-3 m-3">
            <CategoryForm onSubmit={this.formSubmit}/>
            <CategoryList categories={this.state.categories} handleClick={this.categoryHandler}/>
          </div>
          <div className="col-sm-8 p-3 m-3">
            <ItemForm onSubmit={this.formSubmit} categories={this.state.categories}/>
            <ItemList items={this.state.items}/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}

export default App