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
      itemEdit: false,
      sortUp: true,
      selectedSort: ''
    }
    this.formSubmit = this.formSubmit.bind(this);
    this.categoryHandler = this.categoryHandler.bind(this);
    this.deleteHandler= this.deleteHandler.bind(this);
    this.itemEditHandler = this.itemEditHandler.bind(this);
    this.onSearch = this.onSearch.bind(this);
    this.sort = this.sort.bind(this);
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
          this.setState(data);
        } else {
          var newItems = [...this.state.items];
          newItems[item.index] = data.items;
          this.setState({ items: newItems, selectedSort: '' });
        }
      });
    });
  }

  categoryHandler(cat) {
    this.setState({currentCategory: cat, selectedSort: ''});
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
        this.setState({items: data, selectedSort: ''});
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
      this.getItems(this.state.currentCategory, data.item);
    }).catch(err => {
      console.log('HERE');
    })
  }

  logout() {
    fetch('logout')
    .then(() => {
      window.location.reload();
    })
  }

  sort(e) {
    var sortOn = e.target.id.split('-')[1];
    var items = this.state.items;
    items.sort((a, b) => {
      if (this.state.sortUp) {
        if (a[sortOn] < b[sortOn]) { return -1 }
        if (a[sortOn] > b[sortOn]) { return 1 }
        return 0;
      }
      if (a[sortOn] > b[sortOn]) { return -1 }
      if (a[sortOn] < b[sortOn]) { return 1 }
      return 0;
    })
    var sortUp = !this.state.sortUp;
    var selectedSort = sortOn
    this.setState({ items, sortUp, selectedSort });
  }

  render() {
    return (
    <div className="">
        <h1 className="text-center mt-4">Inventory Manager</h1>
        <div className="container">
          <div className="w-25 col">
            <button className="btn btn-primary ms-4" onClick={this.logout}>Logout</button>
          </div>
        </div>
      <div className="container">
        <div className="row justify-content-end">
          <div className="col-3" style={moveDown}>
            <button type="button" className={this.state.selectedSort === 'name' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"} id="sort-name" onClick={this.sort}>Name</button>
            <button type="button" className={this.state.selectedSort === 'description' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"} id="sort-description" onClick={this.sort}>Description</button>
            <button type="button" className={this.state.selectedSort === 'quantity' ? "btn btn-primary btn-sm" : "btn btn-secondary btn-sm"} id="sort-quantity" onClick={this.sort}>Count</button>
          </div>
        </div>
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

var moveDown = {
  position: 'relative',
  top: 70
}

export default App