import { useEffect, useState} from 'react';
import { Routes, Route, useLocation} from 'react-router-dom';
import Home from "./components/Home/Home";
import Artwork from "./components/Artworks/Artwork";
import NotFoundPage from "./components/NotFound/NotFoundPage";
import Navbar from "./components/Navbar/Navbar";
import Saved from "./components/Saved/Saved";
import './App.css';
import MessageContext from "./contexts/Message";
import UserMessage from "./components/UserMessage/UserMessage";
import SavedArtworkContext from './contexts/SavedArtwork';
import SearchListContext from './contexts/SearchList';
import FocusArtworkContext from './contexts/FocusArtwork';
import PreviousSearchContext from './contexts/PreviousSearch';
import museumlogo from '../public/museum-curator-logo.png'

function App() {

  const [searchList, setSearchList] = useState([])
  const [savedArtworks, setSavedArtworks] = useState([])
  const [focusArtwork, setFocusArtwork] = useState({})
  const [previousSearch, setPreviousSearch] = useState({'museum': '', 'sort': '', 'relevance': ''})
  const [responseMessage, setResponseMessage] = useState("")
  const location = useLocation();

  useEffect(()=>{
    
  },[location])

  return (
    <div className='body'>
      <div className='marquee'>
        <p><span id="warning">WARNING:</span> Refreshing the site will wipe your Saved Collection. Please maintain your session to keep progress.</p>
      </div>
      <img id="main-logo" src={museumlogo} alt="Museum Curator MVP"/>
      
      <Navbar />
      <MessageContext.Provider value={{responseMessage, setResponseMessage}}>
        <UserMessage />
        <SearchListContext.Provider value={{searchList, setSearchList}}>
        <SavedArtworkContext.Provider value={{savedArtworks, setSavedArtworks}}>
        <FocusArtworkContext.Provider value={{focusArtwork, setFocusArtwork}}>
        <PreviousSearchContext.Provider value={{previousSearch, setPreviousSearch}}>
          <Routes>
          
            <Route path="/" element={
              <Home />
            }/>
            <Route path="artwork" element={
              <Artwork />
            } />
            <Route path="saved" element={
              <Saved/>
            }/>
            <Route path="*" element={
              <NotFoundPage/>
            }/>
          </Routes>
        </PreviousSearchContext.Provider>
        </FocusArtworkContext.Provider>
        </SavedArtworkContext.Provider>
        </SearchListContext.Provider>
      </MessageContext.Provider>
    </div>
  )
}

export default App
