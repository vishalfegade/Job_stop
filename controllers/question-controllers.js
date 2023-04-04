let Job = require('../models/jobs-database');
let Question = require('../models/questions-database');

const show_questions = async (req, res) => {
    try {
        // let questions = await Question.find({});
        let jobId = req.params.id;
        let job = await Job.findById(jobId).populate('questions');
        let questions = job.questions;
        res.render('questions/index-question', { questions, jobId, job, page: "all-jobs" });
    } catch (error) {
        req.flash('error', 'Problem while fetching questions')
        res.redirect('/jobs')
        // console.log('problem while fetching questions', error);
    }
}

const new_question_get = async (req, res) => {
    try {
        // let jobId = await Job.findById(req.params.id);
        let jobId = req.params.id;
        res.render('questions/new-question', { jobId, page: "all-jobs" });
        // res.render('questions/new-question');
    } catch (error) {
        // console.log('problem while fetching questions', error);
        req.flash('error', 'Problem while fetching questions')
        res.redirect('/jobs')
    }
}

const new_question_post = async (req, res) => {
    try {
        let question = await Question.create(req.body.question);
        await question.save();
        let job = await Job.findById(req.params.id);
        job.questions.push(question);
        job.save();
        req.flash('success', 'Question Created Success')
        res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
        req.flash('error', 'Problem while creating questions')
        res.redirect('/jobs')
        // console.log(`problem while creating questions`, error);
    }
}

const delete_question = async (req, res) => {
    try {
        let question = await Question.findByIdAndDelete(req.params.question_id);
        let job = await Job.findById(req.params.id);
        job.questions.remove(question);
        job.save();
        req.flash('success', 'Question Deleted Success')
        res.redirect(`/jobs/${req.params.id}/questions`);
    } catch (error) {
        req.flash('error', 'Problem while deleting questions')
        res.redirect('/jobs')
        // console.log(`problem while deleting questions`, error);
    }
}

const test_get = async (req, res) => {
    try {
        let jobId = req.params.id;
        let job = await Job.findById(jobId).populate('questions');
        // let questions = job.questions;
        // res.render('questions/test-question', {questions,jobId});
        res.render('questions/test-question', { job, page: "test" });
    } catch (error) {
        req.flash('error', 'Problem while fetching test')
        res.redirect('/jobs')
        // console.log('problem while fetching questions', error);
    }
}

const test_post = async (req, res) => {
    try {
        // user can give test only once
        // selected user not able to give test
        let jobId = req.params.id;
        let job = await Job.findById(jobId).populate('questions');
        let questions = job.questions;
        let score = 0;
        let required = 0.75 * questions.length;
        for (let i in questions) {
            // console.log("default Correct" + questions[i].correctOption)
            // console.log("user correct" + req.body.answers[i])
            if (questions[i].correctOption == req.body.answers[i]) {
                score += 1;
            }
        }
        if (score >= required) {
            req.flash('success', 'You Passed the Test')
            return res.send(`PASSED <br> Correct Answers : ${score} <br> Total Questions : ${questions.length}`)
        } else {
            req.flash('error', 'You Failed the Test')
            return res.send(`FAILED <br> Correct Answers : ${score} <br> Total Questions : ${questions.length}`)
        }
    } catch (error) {
        req.flash('error', 'Error while submitting the test, Please login again !')
        res.redirect('/jobs')
        // console.log('problem while fetching questions', error);
    }
}

module.exports = {
    show_questions,
    new_question_get,
    new_question_post,
    delete_question,
    test_get,
    test_post
}