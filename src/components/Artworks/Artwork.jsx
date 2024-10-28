import { useContext, useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import FocusArtworkContext from "../../contexts/FocusArtwork"
import MessageContext from "../../contexts/Message"


function Artwork(props){
    const {focusArtwork} = useContext(FocusArtworkContext)
    const {setResponseMessage} = useContext(MessageContext)
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState()

    useEffect(()=>{
      setIsLoading(false)
      if(Object.keys(focusArtwork).length>0){
        setResponseMessage("")
      }else{
        setResponseMessage("Return to the search page") 
      }
           
    },[])

    function goBack(event){
        navigate(-1)
    }

    return isLoading ? <p>Loading...</p> : Object.keys(focusArtwork).length>0 ? (
    <div className="artwork-page">
        <button onClick={goBack}>Back</button>
        <article>
            <div className='artwork-img-container'>
                <img src={focusArtwork.image} alt={focusArtwork.title} />
            </div>
            
            <div className='artwork-info'>
                <Link to={focusArtwork.link} target="_blank" rel="noopener noreferrer">
                    <h2>{focusArtwork.title}</h2>
                </Link>
                <div className='artwork-text-info'>
                    <h3>By: {focusArtwork.author ? focusArtwork.author : "Unknown"}</h3>
                    <h4>Country: {focusArtwork.country}</h4>
                    <h4>Curated by: {focusArtwork.museum}</h4>
                    <p>{focusArtwork.info}</p>
                </div>
            </div>
        </article>
    </div>) : <>{isError}<Link to="/" ><p>Return Home</p></Link></>
}
export default Artwork