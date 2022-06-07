
import copyImg from "../assets/images/copy.svg"
import "../styles/roomCode.scss"

type RoomCodeProps = {
  code: any ;

}

export function RoomCode(props: RoomCodeProps){

  function copyRoomCodeToCLipboard() {
    navigator.clipboard.writeText(props.code)
  }
  return(
    <button className="room-code" onClick={copyRoomCodeToCLipboard}>
      <div>
        <img src={copyImg} alt="Copy room code" />
      </div>

      <span>Sala #{props.code} </span>
    </button>
  )
}