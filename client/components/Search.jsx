import React from 'react'

export default class Search extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      name: ""
    }
    this.handleSearchChange = this.handleSearchChange.bind(this);
    this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
  }

  handleSearchChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSearchSubmit(event){
    event.preventDefault()
    this.props.searchMovie(this.state.name)
    this.setState({
      name: ""
    })
  }

  render(){
    return(
      <form onSubmit={this.handleSearchSubmit}>
        <input 
        placeholder="Search Movie"
        type="text"
        name="name"
        id="name"
        value={this.state.name}
        onChange={this.handleSearchChange}
        />
        <button>Search</button>
      </form>
    )
  }
}