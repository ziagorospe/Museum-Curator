import { useContext } from 'react'
import { Link } from 'react-router-dom'
import SavedArtworkContext from "../../contexts/SavedArtwork";
import MessageContext from "../../contexts/Message";
import FocusArtworkContext from '../../contexts/FocusArtwork';

function ArtworkList(props){
    const {savedArtworks} = useContext(SavedArtworkContext)
    const {setSavedArtworks} = useContext(SavedArtworkContext)
    const {setResponseMessage} = useContext(MessageContext)
    const {setFocusArtwork} = useContext(FocusArtworkContext)
    const {artworkList} = props
    const {sender} = props

    function setSelectedArtwork(artwork){
        setFocusArtwork(artwork)
    }

    function addToSavedCollection(artwork){
        let exists = false
        const tempArt = []
        savedArtworks.forEach((element,index)=>{
            tempArt.push(element)
            if(element.id == artwork.id){
                exists = true
            }
        })
        if (!exists){
            tempArt.push(artwork)
            setSavedArtworks(tempArt)
        } else {
            setResponseMessage("Artwork already exists in saved collection")
        }
    }

    function removeFromSavedCollection(artwork, index){
        const tempArr = [...savedArtworks]
        tempArr.splice(index,1)
        setSavedArtworks(tempArr)
        setResponseMessage("Artwork removed")
    }

    return <div>
        {
            artworkList.map((artwork, index)=>{
                return (
                <article key={index}>
                    <div className='artwork-img-container'>
                        <img src={artwork.image} alt={artwork.title} />
                    </div>
                    
                    <div className='artwork-info'>
                        <Link to={`/artwork/${artwork.id}`} onClick={()=>{setSelectedArtwork(artwork)}}>
                            <h2>{artwork.title}</h2>
                        </Link>
                        <div className='artwork-text-info'>
                            <h3>By: {artwork.author ? artwork.author : "Unknown"}</h3>
                            <h4>Country: {artwork.country}</h4>
                            <h4>Curated by: {artwork.museum}</h4>

                        </div>
                    </div>
                    {(sender=="home") ? <button onClick={()=>addToSavedCollection(artwork)}>Save to Collection</button> : <button onClick={()=>removeFromSavedCollection(artwork, index)}>Remove From Collection</button>}
                </article>)
            })
        }
    </div >
}

export default ArtworkList