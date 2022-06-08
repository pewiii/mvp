import React from 'react';

var CategoryList = (props) => {
  var pointer = {
    cursor: 'pointer',
  }
  var getBadgeClass = (cat) => {
    var className = "badge bg-";
    var color = cat === props.currentCategory ? 'primary' : 'secondary';
    className += color + " rounded-pill";
    return className;
  }
  var totalItemCount = props.categories.reduce((total, cat) => {
    return total + cat.itemCount;
  }, 0);
  return (
    <ul className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-center" style={pointer} onClick={() => props.handleClick('all')}>All Items
      <span className={getBadgeClass('all')}>{totalItemCount}</span>
      </li>
      {props.categories.map(cat => {
        return <li className="list-group-item d-flex justify-content-between align-items-center" style={pointer} key={cat.name} onClick={() => props.handleClick(cat.name)}>{cat.name}
          <span className={getBadgeClass(cat.name)}>{cat.itemCount}</span>
        </li>
      })}
    </ul>
  )
}

export default CategoryList;