import { useContext, useEffect, useState } from 'react'
import SavedArtworkContext from "../../contexts/SavedArtwork";
import MessageContext from "../../contexts/Message";
import ArtworkList from "../Artworks/ArtworkList";

function Saved(){
    const {savedArtworks} = useContext(SavedArtworkContext)
    const {setSavedArtworks} = useContext(SavedArtworkContext)
    const [isLoading, setIsLoading] = useState(false)
    const [isError, setIsError] = useState()
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
        {isLoading ? <p>Loading...</p> : ( !isError ? <ArtworkList artworkList={savedList} setArtworkList={setSavedArtworks} sender={'saved'}/> : <>{isError}<a href="" onClick={reRender}>Something went wrong</a></>)}
    </>)
}

export default Saved