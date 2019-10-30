import React from 'react';
import MovieListEntry from './MovieListEntry.jsx';
import NewMovieForm from './NewMovieForm.jsx';
import uuid from 'uuid/v4';
import Search from './Search.jsx';
import $ from 'jquery'

export default class MovieList extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      movies: []
    }
    this.createMovie = this.createMovie.bind(this);
    this.searchMovie = this.searchMovie.bind(this);
    this.deleteMovie = this.deleteMovie.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

  componentDidMount(){
    $.ajax({
      url: '/movies',
      type: 'GET',
      success: (data)=>{
        console.log(data);
        this.setState({
          movies: data
        })
      }
    })
  }
  
  createMovie(newMovie){
    $.ajax({
      url: '/movies',
      type: 'POST',
      data: newMovie,
      statusCode: {
        200: (data) =>{
          console.log(data);
        },
        400: ()=>{
          console.log("post err from client")
        }
      }
    })
    this.setState({
      movies: [...this.state.movies, newMovie]
    })
  }

  searchMovie(newName){
    const newMovies = this.state.movies.filter(movie =>{
      return movie.movieName === newName;
    })
    this.setState({
      movies: newMovies
    })
  }

  deleteMovie(id){
    const newMovies = this.state.movies.filter(movie =>{
      return movie.movieId !== id;
    })
    this.setState({
      movies: newMovies
    })
    // send delete request to the server
    $.ajax({
      url: "/movies",
      type: 'DELETE',
      data: {"id": id},
      statusCode: {
        204: () =>{
          console.log("movie has been deleted from the database");
        },
        400: () =>{
          console.log("delete error from client");
        }
      }
    });
  }

  updateMovie(id, newName){
    const newMovies = this.state.movies.map(movie =>{
      if (movie.movieId === id){
        return {...movie, movieName: newName};
      }else{
        return movie;
      }
    })
    this.setState({
      movies: newMovies
    })
    // send update request to the server
    $.ajax({
      url: "/movies",
      type: 'PUT',
      data: {"name": newName, "id": id},
      statusCode: {
        204: () =>{
          console.log("movie name has been updated");
        },
        400: () =>{
          console.log("update error from client");
        }
      }
    });
  }

  render(){
    const movies = this.state.movies.map((movie, index) =>{
      return <MovieListEntry 
      key={index}
      id={movie.movieId}
      name={movie.movieName}
      createMovie={this.createMovie}
      deleteMovie={this.deleteMovie}
      updateMovie={this.updateMovie}
      />
    })
    return(
      <div className="container">
        <NewMovieForm createMovie={this.createMovie} />
        <Search searchMovie={this.searchMovie}/>
        <ul className="list-group">
        {movies}
        </ul>
      </div>
    )
  }
}