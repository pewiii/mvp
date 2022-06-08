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
      categories: [],
      currentCategory: 'all',
      itemEdit: false
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.itemDeleteHandler= this.itemDeleteHandler.bind(this);
    this.itemEditHandler = this.itemEditHandler.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems(category = "all") {
    fetch('items?' + new URLSearchParams({category}))
    .then(res => {
      res.json()
      .then(data => {
        console.log(data);
        this.setState(data);
      });
    });
  }

  categoryHandler(cat) {
    console.log(cat);
    this.setState({currentCategory: cat});
    this.getItems(cat);
  }

  itemDeleteHandler(itemId) {
    var data = { type: 'item', _id: itemId }
    fetch('delete', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      this.getItems(this.state.currentCategory);
    });
  }

  itemEditHandler(item) {
    this.setState({ itemEdit: item })
  }

  formSubmit(data) {
    var url = data.operation ? 'update' : 'create';
    fetch(url, {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    .then(() => {
      console.log('post update');
      this.getItems(this.state.currentCategory);
    });
  }

  render() {
    return (
    <div className="">
        <h1 className="text-center">Inventory Tracker</h1>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 p-3 m-3">
            <CategoryForm onSubmit={this.formSubmit}/>
            <CategoryList categories={this.state.categories} currentCategory={this.state.currentCategory} handleClick={this.categoryHandler}/>
          </div>
          <div className="col-sm-8 p-3 m-3">
            <ItemForm onSubmit={this.formSubmit} categories={this.state.categories}/>
            <ItemList items={this.state.items} deleteHandler={this.itemDeleteHandler} editHandler={this.itemEditHandler} formSubmit={this.formSubmit}/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default App