import { useState } from 'react';
import './App.css';

function App() {

  const [currentQuestion, setCurrentQuestion] = useState(0);
  // フィードバック画面のstate管理
  const [next, setNext] = useState(false);
  // ユーザーの回答履歴のstate管理
  const [answers,setAnswers] = useState([]);
  // scoreの管理
  const [score,setScore] = useState(0);
  // マルかバツか管理
  const [ feedback, setFeedback] = useState(null);
  // スコア画面の管理　trueに代わるとscoreぺーじを表示
  const [showScore, setShowScore] = useState(false);

  const handleAnswer = (answer) => {
    // console.log(answer)
    // ユーザーの回答履歴
    const newAnswer = {
      // 問題
      question: quizData[currentQuestion].question,
      // 自分の回答
      answer: answer,
      // 回答の成否 ユーザーの回答とquizDataのcorrectが同じならtrue
      correct: answer === quizData[currentQuestion].correct,
    };
    // console.log(newAnswer);
    // 問題が正解していた場合スコア＋1
    if (newAnswer.correct){
    // 同じ意味　以下の書き方が推奨
    setScore((prevScore) => prevScore + 1);
    setFeedback("〇");
    } else {
      // 不正解の場合
      setFeedback("×");
    }
    setAnswers([...answers, newAnswer]);
    console.log(answers);
    // フィードバック画面のstateをfalseからtrueに変更
    setNext(true);
  };

  const goToNextQuestion = () => {
    const nextQuestion = currentQuestion +1
    // 次の問題がある場合
    if (nextQuestion < quizData.length) {
      setCurrentQuestion(nextQuestion);
    }else {
      // 次問題がない場合はscoreページを表示
      setShowScore(true);
    }
    // 次へ進んだ際はフィードバック画面を非表示にする
    setNext(false)
  }
    return (
    <div className="quiz-container">
      {showScore ? (
        <div className='score-section'>
          <h1>スコア</h1>
          <h2>{score}/{quizData.length}</h2>
          {/* スコアテーブルを表示 */}
          <table className='answer-table'>
            <thead>
              <tr>
                <td>質問</td>
                <td>回答</td>
                <td>成否</td>
              </tr>
            </thead>
            <tbody>
              {answers.map((item)=>(
                <tr className={item.correct ? 'correct' : 'wrong'}> 
                  <td>{item.question}</td>
                  <td>{item.answer}</td>
                  <td>{item.correct ? "〇" : "×"}</td>
                </tr>         
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className='question-section'>
          <h1>問題{currentQuestion +1}/{quizData.length}</h1>
          <h2>{quizData[currentQuestion].question}</h2>
        
          {next ? (
            <div className='feedback-section'>
              {/* 合否を表示 */}
              <h2 className='large-feedback'>{feedback}</h2>
              <p>正解は</p>
              <p>{quizData[currentQuestion].correct}</p>
              <button onClick={goToNextQuestion}>次の問題へ</button>
            </div>
        ) : (
          <div className='answer-question'>
            {quizData[currentQuestion].options.map((item,index)=>(
              <button 
                key={index} 
                onClick={() => handleAnswer(item)}
                className={`quiz-option-button option-${index}`}>
                {item}
              </button>
            ))}
          </div>
        )}
        </div>
      )}
    </div>
  );
}

export default App;


const quizData = [
  {
    question: "太陽系で最も大きい惑星はどれですか？",
    options:["地球","火星","金星","木星"],
    correct: "木星",
  },
  {
    question: "次のうち、哺乳類ではない動物はどれですか",
    options:["カンガルー","ゴリラ","ペンギン","カバ"],
    correct: "ペンギン",
  },
  {
    question: "モナ・リザを描いた画家は誰ですか？",
    options:["レオナルド・ダ・ウィンチ","ミケランジェロ","フィンセント・ファン・ゴッホ","クロード・モネ"],
    correct: "レオナルド・ダ・ウィンチ",
  },
  {
    question: "以下の食材の中で、一般的には果物として認識されていないものはどれですか？",
    options:["トマト","りんご","ブロッコリー","バナナ"],
    correct: "ブロッコリー"},
];