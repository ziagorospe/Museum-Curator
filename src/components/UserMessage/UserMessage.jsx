import { useContext } from "react"
import MessageContext from "../../contexts/Message"
import './UserMessage.css'
import mascot from '../../../public/mascot-no-bg.png'

function UserMessage (){
    const {responseMessage} = useContext(MessageContext)
    let userMessage = ""
    if(responseMessage){
        userMessage = responseMessage
    } else {
        userMessage = "I'm speechless"
    }
    return <div className="user-message-container">
            <div className="box triangle">
                <p className="user-message">{userMessage}</p>
            </div>
            <img id="mascot" src={mascot}/>
        </div>
}

export default UserMessage