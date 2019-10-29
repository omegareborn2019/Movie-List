import React from 'react';

export default class MovieListEntry extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: ""
    }
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete(){
    this.props.deleteMovie(this.props.id)
  }

  render(){
    return(
      <div>
        <li className="list-group-item">{this.props.name}</li>
        <button type="button" className="btn btn-info" onClick={this.handleDelete}>X</button>
      </div>
    )
  }
}