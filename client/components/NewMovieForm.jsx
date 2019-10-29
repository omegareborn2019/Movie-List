import React from 'react'
import uuid from 'uuid/v4'

export default class NewMovieForm extends React.Component{
  constructor(props){
    super(props);
    this.state ={
      name: ""
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event){
    event.preventDefault();
    this.props.createMovie({movieName: this.state.name, movieId: uuid()});
    this.setState({
      name: ""
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSubmit}>
        <input 
        placeholder="Enter Movie Name"
        type="text"
        name="name"
        id="name"
        value={this.state.name}
        onChange={this.handleChange}
        />
        <button>Add</button>
      </form>
    )
  }
}