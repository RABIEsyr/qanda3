const express = require('express');
const router = express.Router();

const db = require('../../db/db');




router.post('/addQ', (req, res) => {
  try {
    const question = req.body.question;
    const answerA = req.body.aA;
    const answerB = req.body.aB;
    const answerC = req.body.aC;
    const answerD = req.body.aD;
    const correct = req.body.correct;

     
    if (question && answerA && answerB && answerC && answerD && isInLetter(correct)) {
      console.log('rr, ', question, answerA, answerB, answerC, answerD, correct)
      const newQ = new db.newQuestion();
      newQ.question = question;
      newQ.aA = answerA.text;
      newQ.aB = answerB.text;
      newQ.aC = answerC.text;
      newQ.aD = answerD.text;
      newQ.correct = correct;

      newQ.save((err, doc) => {
        if (err) {
          res.json({
            success: false,
            message: 'my database error'
          })
        } else {
          res.json({
            success: true,
            message: 'the question added'
          })
        }
      });
    } else {
      res.json({
        success: false,
        message: 'provide all fields'
      });
    }
  } catch (error) {
    console.log('err0', error)
    res.json({
      success: false,
      message: 'my error 0'
    });
  }
});


router.get('/get-questions-list', (req, res) => {
  db.newQuestion.find().then((d) => {
    res.json({
      success: true,
      questions: d
    });
  }).catch((e) => {
    res.json({
      success: false,
      message: 'my database error'
    })
  });
});


router.post('/get-quiz-result', (req, res) => {
  let correctAnswers = 0;
  let incorrectAnswers = 0;
 try {
  const quizList = req.body.quiz;
 
  if (Array.isArray(quizList)) {
    // console.log(quizList)
    quizList.forEach(async(q) => {
    var doc = await  db.newQuestion.findById(q.id)
        console.log('result, s', doc)
        if (doc.correct == q.answer) {
          correctAnswers++;
        } else {
          incorrectAnswers++;
        }
    })
    
  }
    setTimeout(() => {
      console.log('correct: ', correctAnswers);
      console.log('incorrect', incorrectAnswers)
      res.json({
        correct: correctAnswers,
        incorrect: incorrectAnswers
      })
    }, 1000)
  } catch (error) {
    console.log('myError rabie1', error)
  }
});

function isInLetter(c) {
  if ( !( ['A', 'B', 'C', 'D'].includes(c))) {
    return false;
  }
  return true;
}



module.exports = router;

