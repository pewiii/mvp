import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      createUser: false,
      message: ''
    }
    this.inputChange = this.inputChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    console.log(document.cookie);
  }

  inputChange(e) {
    var newState = {};
    var value = e.target.id === 'createUser' ? e.target.checked : e.target.value;
    newState[e.target.id] = value;
    newState.message = '';
    this.setState(newState, () => {
      console.log(this.state);
    });
  }

  onSubmit(e) {
    e.preventDefault();

    fetch('user', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    }).then(res => {
      console.log('STATUS', res.status);
      if (res.status === 409) {
        this.setState({message: 'Username Taken'});
      } else if (res.status === 400) {
        this.setState({message: 'Invalid Username/Password'});
      } else {
        window.location.reload();
      }
    });
  }

  render() {
    return (
      <div className="container">
        <div className="col-md-4 offset-md-4">
          <div className="mt-5">
            <form id="loginForm" onSubmit={this.onSubmit}>
              <div className="mb-3">
                <h3>Login/Create Account</h3>
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" value="" id="createUser" onChange={this.inputChange}/>
                  <label className="form-check-label" htmlFor="createUser">
                    New User
                  </label>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-danger">{this.state.message}</span>
                </div>
                <label htmlFor="username" className="form-label">Username</label>
                <input id="username" className="form-control" type="text" onChange={this.inputChange} />
                <label htmlFor="password" className="form-label">Password</label>
                <input id="password" className="form-control" type="password" onChange={this.inputChange} />
                <input className="btn btn-primary mt-2 mb-3" type="submit" value="Login/Create"/>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

export default Login;