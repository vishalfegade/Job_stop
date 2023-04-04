const express = require('express');
let router = express.Router();


// let User = require('../models/users-database');
let { isLoggedIn, isAdmin } = require('../middlewares/middlewares')
let { show_questions, new_question_get, new_question_post, delete_question, test_get, test_post } = require('../controllers/question-controllers')

//index
router.get('/jobs/:id/questions', isLoggedIn, show_questions)

//new
router.get('/jobs/:id/questions/new', isAdmin, isLoggedIn, new_question_get)

//create
router.post('/jobs/:id/questions', isAdmin, isLoggedIn, new_question_post)

// delete
router.delete('/jobs/:id/questions/:question_id', isAdmin, isLoggedIn, delete_question)

// test
router.get('/jobs/:id/test', isLoggedIn, test_get)

// test submit
router.post('/jobs/:id/test', isLoggedIn, test_post)

module.exports = router;