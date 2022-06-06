import React from 'react';

var CategoryList = (props) => {
  return (
    <ul className="list-group list-group-flush">
      <li className="list-group-item" onClick={() => props.handleClick('all')}>Show All Items</li>
      {props.categories.map(cat => {
        var style = {
          color: cat.color
        }
        return <li className="list-group-item" key={cat.name} style={style} onClick={() => props.handleClick(cat.name)}>{cat.name}</li>
      })}
    </ul>
  )
}

export default CategoryList;