import { useContext } from "react"
import MessageContext from "../../contexts/Message"

function UserMessage (){
    const {responseMessage} = useContext(MessageContext)
    return <p className="user-message">{responseMessage}</p>
}

export default UserMessage