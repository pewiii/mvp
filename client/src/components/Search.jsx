import React from 'react';

var Search = (props) => {
  var [ searchTerm, setSearchTerm ] = React.useState('');
  return (
    <React.Fragment>
              <a id="" className="btn btn-primary mb-3" data-bs-toggle="modal" data-bs-target="#search" role="button" aria-expanded="false" aria-controls="itemForm">
        Search
        </a>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;

        <div className="modal fade" id="search" tabIndex="-1" aria-labelledby="itemEdit" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Search</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">
            <form className="mt-2" onSubmit={(e) => {
              e.preventDefault();
              props.onSearch(searchTerm);
              e.target.reset();
              setSearchTerm('');
            }}>
              <div className="form-group">
                <input type="text" className="form-control" id="search" placeholder="Search" onChange={(e) => {setSearchTerm(e.target.value)}}/>
              </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
            <button type="submit" className="btn btn-primary" data-bs-dismiss="modal">Search</button>
          </div>
          </form>
          </div>
        </div>
      </div>
    </div>

    </React.Fragment>
  );
}

export default Search;