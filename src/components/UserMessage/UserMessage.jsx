import { useContext } from "react"
import MessageContext from "../../contexts/Message"

function UserMessage (){
    const {responseMessage} = useContext(MessageContext)
    return <p>{responseMessage}</p>
}

export default UserMessage