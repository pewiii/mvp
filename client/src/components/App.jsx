import React from 'react';
import CategoryList from './CategoryList.jsx';
import ItemList from './ItemList.jsx';
import CategoryForm from './CategoryForm.jsx';
import ItemForm from './ItemForm.jsx';
import Search from './Search.jsx';

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
    this.deleteHandler= this.deleteHandler.bind(this);
    this.itemEditHandler = this.itemEditHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);
  }

  componentDidMount() {
    this.getItems();
  }

  getItems(category = "all", item) {
    var searchParams = { category };
    if (item) {
      searchParams.id = item._id;
    }
    fetch('items?' + new URLSearchParams(searchParams))
    .then(res => {
      res.json()
      .then(data => {
        if (Array.isArray(data.items)) {
          console.log(data);
          this.setState(data);
        } else {
          var newItems = [...this.state.items];
          newItems[item.index] = data.items;
          this.setState({ items: newItems});
        }
      });
    });
  }

  categoryHandler(cat) {
    this.setState({currentCategory: cat});
    this.getItems(cat);
  }

  deleteHandler(data) {
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

  onSearch(term) {
    fetch('search?' + new URLSearchParams({search: term }))
    .then(res => {
      res.json()
      .then(data => {
        this.setState({items: data});
      })
    })
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
      console.log('data', data);
      this.getItems(this.state.currentCategory, data.item);
    });
  }

  logout() {
    fetch('logout')
    .then(() => {
      window.location.reload();
    })
  }

  render() {
    return (
    <div className="">
        <h1 className="text-center mt-4">Inventory Tracker</h1>
        <button className="btn btn-primary ms-4" onClick={this.logout}>Logout</button>
      <div className="container">
        <div className="row">
          <div className="col-sm-3 p-3 m-3">
            <CategoryForm onSubmit={this.formSubmit} deleteHandler={this.deleteHandler}/>
            <CategoryList categories={this.state.categories} currentCategory={this.state.currentCategory} handleClick={this.categoryHandler}/>
          </div>
          <div className="col-sm-8 p-3 m-3">
            <Search onSearch={this.onSearch}/>
            <ItemForm onSubmit={this.formSubmit} categories={this.state.categories}/>
            <ItemList items={this.state.items} deleteHandler={this.deleteHandler} editHandler={this.itemEditHandler} formSubmit={this.formSubmit}/>
          </div>
        </div>
      </div>
    </div>
    )
  }
}


export default App