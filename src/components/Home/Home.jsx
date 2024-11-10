import { useContext, useEffect, useState } from "react";
import ArtworkList from "../Artworks/ArtworkList";
import SearchBar from "./SearchBar";
import MessageContext from "../../contexts/Message";
import { Link } from 'react-router-dom';
import SearchListContext from "../../contexts/SearchList";

function Home(){
  const [artworkList, setArtworkList] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [currentMuseum, setCurrentMuseum] = useState("europeana")
  const [isError, setIsError] = useState()
  const {setResponseMessage} = useContext(MessageContext)
  const {searchList} = useContext(SearchListContext)
  
  useEffect(()=>{
      setIsLoading(true)
      
      if(searchList.length>0){
        setArtworkList([...searchList])
        setIsLoading(false)
        setResponseMessage("Submit keywords for a new search")
      } else {
        setResponseMessage("waiting for search")
        setIsLoading(false)
      }
  }, [])
  
  return (<>
      <SearchBar currentMuseum={currentMuseum} setCurrentMuseum={setCurrentMuseum} isError={isError} setIsError={setIsError} isLoading={isLoading} setIsLoading={setIsLoading} artworkList={artworkList} setArtworkList={setArtworkList}/>
      {isLoading ? <p>Loading...</p> : ( !isError ? <ArtworkList artworkList={artworkList} setArtworkList={setArtworkList} sender={'home'}/> : <>{isError}<p>Invalid Search</p></>)}
  </>)

}

export default Home;