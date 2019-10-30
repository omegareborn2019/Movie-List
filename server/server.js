const express = require('express');
let app = express();
const db = require('./database/database.js');

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));

let PORT = 3000;

app.get('/movies', (req, res)=>{
  db.query(`SELECT * FROM movie1`, (err, data) =>{
    if (err) console.log(err);
    else{
      console.log("server get route", data);
      res.send(data);
    }
  })
})

app.post('/movies', (req, res)=>{
  console.log(req.body);
  var sql = `INSERT INTO movie1 (movieName, movieId) VALUES (?,?)`
  db.query(sql, [req.body.movieName, req.body.movieId], (err, data) =>{
    if (err){
      console.log("posting to database", err);
    }else{
      res.sendStatus(201);
    }
  })
})

// delete route here
app.delete('/movies', (req, res) =>{
  console.log(req.body.id);
  db.query(`DELETE FROM movie1 WHERE movieId = ?`, [req.body.id], (err, data) =>{
    if (err) {
      console.log(err);
    } else {
      console.log("movie has been deleted");
      res.sendStatus(204);
    }
  });
});

// update route here
app.put('/movies', (req, res) =>{
  console.log(req.body)
  db.query(`UPDATE movie1 SET movieName = ? WHERE movieId = ?`, [req.body.name, req.body.id], (err, data) =>{
    if (err) {
      console.log(err);
    }else{
      console.log("movie has been successfully updated");
      res.sendStatus(204);
    }
  })
})

app.listen(PORT, ()=>{
  console.log(`live server is running on port: ${PORT}`);
})