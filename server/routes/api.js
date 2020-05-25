const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
var mysql = require('mysql');
const Book = require('../models/book');
const db = "mongodb://localhost:27017/test";

mongoose.connect(db, function (err) {  //Mongo Connection
  if (err) {
    console.error("Error " + err);
  }
else {
  console.log("Mongo Connected");
}
});

var conn = mysql.createConnection({    //MySQL Connection
  host: "localhost",
  user: "root",
  password: "sys123",
  database: "test"
});
conn.connect(function (err) {
  if (err) throw err;
  console.log("Mysql Connected");
});





//For Mongo

router.get('/getAll', (req, res) => {    //getAllBooks
  let promise = Book.find({}).exec(); 
  promise.then(function (doc) {
    if (doc) {
      console.log("doc received")
      res.status(200).send(doc)
    } else {
      console.log("doc not received")
    }
  })
})
router.get('/get/:name', (req, res) => {  //getBookByName 
  let bookName = req.params.name
  let promise = Book.find({ name: bookName }).exec();
  promise.then(function (doc) {
    if (doc) {
      console.log("doc received")
      res.status(200).send(doc)
    } else {
      console.log("doc not received")
    }
  })
})
router.post('/update', (req, res) => {    //Update Book Quantity
  let book = req.body.name;
  let quantity = req.body.quantity
  Book.updateOne({ "name": book }, { $set: { "quantity": quantity } }, function (err, result) {
    if (err) throw err;
    console.log("1 document updated");
    res.send(result)
  });
})
router.post('/create', (req, res) => {    //Create Book and its Quantity 
  let book = req.body.name;
  let quantity = req.body.quantity
  var bookData = new Book({
    name: book,
    quantity: quantity
  });
  let promise = bookData.save();
  promise.then(function (doc) {
    return res.status(200).json(doc);
  })
})
router.delete('/delete', (req, res) => {    //DeleteBook
  Book.deleteOne({ "name": "Nginx Book" }, function (err, result) {
    if (err) throw err;
    console.log("1 document deleted");
    res.send(result)
  });
})







//For MySQL
router.get('/mysql/getAll', (req, res) => {  //getAllBooks
  var sql = 'Select * from books';
  conn.query(sql, function (err, result) {
    if (err) throw err;
    else {
      return res.status(200).json(result);
    }
  })
})
router.get('/mysql/get/:name', (req, res) => {  //getBookByName  {}
  let name = req.params.name
  var sql = 'Select * from books where name =?';
  conn.query(sql,name, function (err, result) {
    if (err) throw err;
    else {
      return res.status(200).json(result[0].quantity);
    }
  })
})
router.post('/mysql/update', (req, res) => {  //update Quantity
  let name = req.body.name;
  let quantity = req.body.quantity
  var sql = 'UPDATE books SET quantity = ? where name =?';
  conn.query(sql, [quantity,name], function (err, result) {
    if (err) throw err;
    else {
      return res.status(200).json(result);
    }
  })
})
router.post('/mysql/create', (req, res) => {  //create
  let name = req.body.name;
  let quantity = req.body.quantity
  var sql = 'INSERT INTO books (name, quantity) VALUES (?, ?)';
  conn.query(sql, [name, quantity], function (err, result) {
    if (err) throw err;
    else {
      return res.status(200).json(result);
    }
  })
})
router.delete('/mysql/delete', (req, res) => {  //delete
  let name = req.body.name;
  var sql = 'DELETE FROM books WHERE name = ?';
  conn.query(sql, name, function (err, result) {
    if (err) throw err;
    else {
      return res.status(200).json(result);
    }
  })
})











router.get('/render', (req, res) => {
  res.write('<html><div>Hi HTML</div></html>')
})

router.get('/', function (req, res) {
  res.send('api works');
});


module.exports = router;
