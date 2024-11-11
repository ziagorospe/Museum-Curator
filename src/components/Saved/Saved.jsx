import { useContext, useEffect, useState } from 'react'
import SavedArtworkContext from "../../contexts/SavedArtwork";
import MessageContext from "../../contexts/Message";
import ArtworkList from "../Artworks/ArtworkList";
import { useNavigate } from 'react-router-dom';

function Saved(){
    const {savedArtworks} = useContext(SavedArtworkContext)
    const {setSavedArtworks} = useContext(SavedArtworkContext)
    const [isLoading, setIsLoading] = useState(false)
    const {setResponseMessage} = useContext(MessageContext)
    const savedList = [...savedArtworks]

    useEffect(()=>{
        if(savedList.length > 0){
            setResponseMessage("Nice Collection!")
        } else {
            setResponseMessage("Go to the search page to add items")
        }
        
    }, [])

    return (<>
        {isLoading ? <p>Loading...</p> : <ArtworkList artworkList={savedList} setArtworkList={setSavedArtworks} sender={'saved'}/>}
    </>)
}

export default Saved