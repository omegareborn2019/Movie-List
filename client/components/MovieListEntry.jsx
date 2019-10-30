import React from 'react';

export default class MovieListEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      isEditing: false,
      name: this.props.name
    }
    this.handleDelete = this.handleDelete.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  handleDelete(){
    this.props.deleteMovie(this.props.id)
  }

  handleChange(e){
    this.setState({
      [e.target.name]: e.target.value
    })
  }

  toggleForm(){
    this.setState({
      isEditing: true
    })
  }

  handleUpdate(e){
    e.preventDefault();
    this.props.updateMovie(this.props.id, this.state.name);
    this.setState({
      isEditing: false
    })
  }

  render(){
    let display;
    if (this.state.isEditing){
      display = (
        <div>
          <form onSubmit={this.handleUpdate}>
            <label htmlFor="name"></label>
            <input 
            type="text"
            name="name"
            value={this.state.name}
            onChange={this.handleChange}
            />
            <button>Submit</button>
          </form>
        </div>
      )
    }else{
      display = (
        <div>
          <li className="list-group-item">{this.props.name}</li>
          <button type="button" className="btn btn-info" onClick={this.handleDelete}>X</button>
          <button type="button" className="btn btn-info" onClick={this.toggleForm}>Edit</button>
        </div>
      )
    }
    return(
      display
    )
  }
}