import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg"
import checkImg from "../assets/images/check.svg"
import answerImg from "../assets/images/answer.svg"
import { Button } from "../components/Button";
import { RoomCode } from "../components/RoomCode";
import {useParams,useNavigate} from "react-router-dom"
import "../styles/room.scss"
import { Question } from "../components/Question";
import { useRoom } from "../hooks/useRoom";
//import { useAuth } from "../hooks/useAuth";

import {database} from "../services/firebase"



type RoomParams = {
  id: string ;
}



export function AdminRoom() {
  //const {user} = useAuth()
  const params = useParams<RoomParams>();
  const roomId = params.id
  const history = useNavigate()
  
  const {title, questions} = useRoom(roomId)
 

async function handleEndRoom() {
   await database.ref(`rooms/${roomId}`).update({
     endedAt: new Date(),
   })

   history("/")
}

async function handleDeleteQuestion(questionID: string){
   if (window.confirm("Tem certeza excluir essa pergunta?")){
    await database.ref(`rooms/${roomId}/questions/${questionID}`).remove()
   }
 }

async function handleCheckQuestionAsAnswered(questionID: string){
  await database.ref(`rooms/${roomId}/questions/${questionID}`).update({
    isAnswered: true,
  })
}


async function handleHighLightQuestion(questionID: string){
  await database.ref(`rooms/${roomId}/questions/${questionID}`).update({
    isHighlighted: true,
  })
}

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="LetmeAsk" />
          <div>
            <RoomCode code={roomId}></RoomCode>
            <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
          </div>
        </div>
      </header>

      <main >
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} perguntas</span>}
        </div>

       

        <div className="question-list">
        {questions.map(question =>{
          return(
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered = {question.isAnswered}
              isHighlighted = {question.isHighlighted}
            >
              {!question.isAnswered && ( 
              <>
                <button
                  type="button"
                  onClick={()=> handleCheckQuestionAsAnswered(question.id)}
                >
                  <img src={checkImg} alt="Marcar pergunta como respondida " />
                </button>
                <button
                  type="button"
                  onClick={()=> handleHighLightQuestion(question.id)}
                >
                  <img src={answerImg} alt="Dar destaque à pergunta" />
                </button>
              </>

)}
              <button
                type="button"
                onClick={()=> handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>

            </Question>
          );
        })}
        </div>
      </main>
    </div>
  )
}