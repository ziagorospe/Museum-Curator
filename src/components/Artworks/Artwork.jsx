import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import FocusArtworkContext from "../../contexts/FocusArtwork"
import MessageContext from "../../contexts/Message"
import SearchListContext from "../../contexts/SearchList";
import NotFoundPage from '../NotFound/NotFoundPage'


function Artwork(props){
    const {searchList} = useContext(SearchListContext)
    const {focusArtwork} = useContext(FocusArtworkContext)
    const {setFocusArtwork} = useContext(FocusArtworkContext)
    const {setResponseMessage} = useContext(MessageContext)
    const [searchParams, setSearchParams] = useSearchParams();
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState()

    useEffect(()=>{
      setIsLoading(true)
      setResponseMessage("")
      if(Object.keys(focusArtwork).length>0){
        //flavour text to be added about art being cool
      } else if(searchParams.get("museum") && searchParams.get("id")){
        const museum = searchParams.get("museum")
        const id = searchParams.get("id")
        let existingQuery = ""
        if (museum=='artic'){
            existingQuery += 'https://api.artic.edu/api/v1/artworks/' + id 
        } else if (museum=='europeana'){
            existingQuery += 'https://api.europeana.eu/record/v2/' + id + '.json?wskey=steeductona'
        } 
        setIsLoading(true)
        const tempObj = {}
        tempObj.id = id
        axios.get(existingQuery)
        .then((response)=>{
            if (museum=='artic'){
                const element = response.data.data
                
                tempObj.title = element.title
                if(element.artist_title){
                    tempObj.author = element.artist_title
                } else {
                    tempObj.author = "Unknown"
                }
                
                tempObj.image = `https://www.artic.edu/iiif/2/${element.image_id}/full/400,/0/default.jpg`
                tempObj.country = 'USA, Chicago'
                tempObj.museum = 'Art Institute of Chicago'
                tempObj.id = element.id
                tempObj.info = element.thumbnail.alt_text
                tempObj.link = element.api_link
                setFocusArtwork(tempObj)
            } else if (museum=='europeana'){
                const element = response.data.object
                tempObj.image = element.europeanaAggregation.edmPreview
                tempObj.country = element.europeanaAggregation.edmCountry.def[0]
                tempObj.link = element.europeanaAggregation.edmLandingPage
                element.organizations.forEach((el)=>{
                    if(!tempObj.museum){
                        if(el.prefLabel){
                            if(el.prefLabel.en){
                                tempObj.museum = el.prefLabel.en[0]
                            } else if (!tempObj.museumbackup){
                                tempObj.museum = Object.keys(el.prefLabel)[0]
                            }
                        }
                    }
                })
                element.proxies.forEach((el)=>{
                    if(!tempObj.title){
                        if(el.dcTitle){
                            if (el.dcTitle.en){
                                tempObj.title = el.dcTitle.en[0]
                            } else if (!tempObj.titlebackup){
                                tempObj.titlebackup = Object.keys(el.dcTitle)[0]
                            }     
                        }
                    }
                    if(!tempObj.author){
                        if(el.dcCreator){
                            if(el.dcCreator[0]){
                                tempObj.author = el.dcCreator[0]
                            } else if (el.dcCreator.en){
                                tempObj.author = el.dcCreator.en[0]
                            } else if (!tempObj.authorbackup){
                                tempObj.authorbackup = el.dcCreator[Object.keys(el.dcCreator)[0]]
                            }
                        }
                    }
                    if(!tempObj.museum){
                        if(el.dctermsProvenance && el.dctermsProvenance.en){
                            tempObj.museum = el.dctermsProvenance.en[0]
                        }
                    }
                    if(!tempObj.info){
                        if(el.dcDescription && el.dcDescription.en){
                            tempObj.info = el.dcDescription.en[0]
                        }
                    }
                    

                })
                if(!tempObj.title){
                    if(tempObj.titlebackup){
                        tempObj.title = tempObj.titlebackup
                    } else {
                        tempObj.title = "Untitled"
                    }
                    
                }
                if(!tempObj.author){
                    if(tempObj.authorbackup){
                        tempObj.author = tempObj.authorbackup
                    } else {
                        tempObj.author = "Unknown"
                    }
                    
                }
                if(!tempObj.country){
                    tempObj.country = "Unknown"
                }
                if(!tempObj.museum){
                    if(tempObj.museumbackup){
                        tempObj.museum = tempObj.museumbackup
                    } else {
                        tempObj.museum = "Unknown"
                    }
                    
                }
                if(!tempObj.info){
                    tempObj.info = "No description"
                }
                setFocusArtwork(tempObj)
            }

        })
        .then(()=>{
            setIsLoading(false)
        })
        .catch((err)=>{
            console.log(err)
            setIsLoading(false)
            setIsError(true)
        })
      } else{
        setResponseMessage("The Artwork you are trying to find does not exist, you shouldn't be here") 
      }
      
      setIsLoading(false)
           
    },[])

    function goBack(event){
        navigate(-1)
    }

    return isLoading ? <p>Loading...</p> : Object.keys(focusArtwork).length>0 ? (
    <div className="artwork-page">
        {(searchList.length>0) ? <button onClick={goBack}>Back</button> : <></>}
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
                    <h4>Location: {focusArtwork.country}</h4>
                    <h4>Curated by: {focusArtwork.museum}</h4>
                    <p>{focusArtwork.info}</p>
                </div>
            </div>
        </article>
    </div>) : <NotFoundPage/>
}
export default Artwork