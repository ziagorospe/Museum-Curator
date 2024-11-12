import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from 'react-router-dom'
import MessageContext from "../../contexts/Message";
import SearchListContext from "../../contexts/SearchList";
import PreviousSearchContext from '../../contexts/PreviousSearch';

function SearchBar(props){
  const [currentSort, setCurrentSort] = useState('relevance')
  const [searchText, setSearchText] = useState('')
  const {setResponseMessage} = useContext(MessageContext)
  const {searchList} = useContext(SearchListContext)
  const {setSearchList} = useContext(SearchListContext)
  const {previousSearch} = useContext(PreviousSearchContext)
  const {setPreviousSearch} = useContext(PreviousSearchContext)
  const [searchParams, setSearchParams] = useSearchParams();
  const {artworkList} = props
  const {setArtworkList} = props
  const {isLoading} = props
  const {setIsLoading} = props
  const {currentMuseum} = props
  const {setCurrentMuseum} = props
  const {isError} = props
  const {setIsError} = props

  useEffect(()=>{
    if(searchParams.get("id") && searchList.length == 0){
      setSearchParams()
    }
    setIsError(false)
    if (searchParams.get("museum") && searchParams.get("searchtext") && searchParams.get("sort") && searchList.length == 0){
      const tempSort = searchParams.get("sort")
      if(tempSort == 'relevance' || tempSort == 'title' || tempSort == 'artist'){
        queryAdvanced("qexists")
        setCurrentMuseum(searchParams.get("museum"))
      } else {
        setIsError(true)
        setResponseMessage("Can't sort by whatever that is in the search bar pal")
      }
      
    } else if (searchList.length > 0){
      setSearchParams({...previousSearch})
    } else if (!searchParams.get("museum") && !searchParams.get("searchtext") && !searchParams.get("sort")){
      setResponseMessage("waiting for search")
    } else {
      setIsError(true)
      setResponseMessage("Something weird is going on in the search bar")
    }
  },[])

  function changeSort(event){
    setCurrentSort(event.target.value)
  }

  function changeMuseum(event){
    setCurrentMuseum(event.target.value)
  }

  function queryAdvanced(event){
    setIsLoading(true)
    setResponseMessage("")
    let searchTextQ = "";
    let currentMuseumQ = "";
    let currentSortQ = "";
    if(event == "qexists"){
      currentSortQ = searchParams.get("sort")
      currentMuseumQ = searchParams.get("museum")
      searchTextQ = searchParams.get("searchtext")
    }
    else{
      event.preventDefault();
      currentSortQ = currentSort
      currentMuseumQ = currentMuseum
      searchTextQ = searchText
    }
    const collectionArray = []
    let museumQuery = "";
    if(!searchTextQ){
      setIsError(true)
      setResponseMessage("Need to enter Search Text")
      setIsLoading(false)
    } else if(currentMuseumQ=='artic'){
      // for smithsonian (couldnt get media in the api call -need to email api dept about it) museumQuery = 'https://api.si.edu/openaccess/api/v1.0/search?api_key=8jZLzIzZG619jAraEq2a8qy0xbdfH7jsgfCZ9jzH' + '&q=' + searchText + '&media=true'
      
      let str = searchTextQ
      searchTextQ = str.replace(/\s+/g, '+')
      museumQuery = 'https://api.artic.edu/api/v1/artworks/search?q=' + searchTextQ + '&fields=id,title,artist_title,thumbnail,api_link,gallery_title,image_id&limit=100'
      axios.get(museumQuery)
      .then((response)=>{
        setIsLoading(false)
        setIsError(false)
        setResponseMessage("hint: try including keywords like 'painting' or 'sculpture'")
        setPreviousSearch({'museum': currentMuseumQ, 'sort': currentSortQ, 'searchtext': searchTextQ})
        response.data.data.forEach((element)=>{
          const tempObj = {}
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
          collectionArray.push(tempObj)
        })
      }).then(()=>{
        switch(currentSortQ){
          case 'relevance':
            break;
          case 'title':
            collectionArray.sort((a,b)=>a.title.localeCompare(b.title))
            break;
          case 'artist':
            collectionArray.sort((a,b)=>a.author.localeCompare(b.author))
            break;
        }
        setSearchParams({'museum': currentMuseumQ, 'sort': currentSortQ, 'searchtext': searchTextQ})
        setSearchList(collectionArray)
        setArtworkList(collectionArray)
      }).catch((err)=>{
        if(err){
          setIsError(true)
          setIsLoading(false)
          const tempSearchParams = new URLSearchParams()
          setSearchParams(tempSearchParams)
        }
      })
      
    } else if (currentMuseumQ=='europeana'){
      let str = searchTextQ
      searchTextQ = str.replace(/\s+/g, '+')
      museumQuery = 'https://api.europeana.eu/record/v2/search.json?wskey=steeductona' + '&query=' + searchTextQ + '&type=object&rows=100&media=true'

      axios.get(museumQuery)
      .then((response)=>{
        setIsLoading(false)
        setIsError(false)
        setResponseMessage("hint: try including keywords like 'painting' or 'sculpture'")
        setPreviousSearch({'museum': currentMuseum, 'sort': currentSort, 'searchtext': searchTextQ})
        response.data.items.forEach((element)=>{
          const tempObj = {}
          if(element.dcTitleLangAware.en){
            tempObj.title = element.dcTitleLangAware.en[0]
          } else {
            tempObj.title = element.title[0]
          }
          if(element.dcCreator){
            tempObj.author = element.dcCreator[0]
          }else{
            tempObj.author = 'Unknown'
          }
          if(element.edmPreview){
            tempObj.image = element.edmPreview[0]
          }else if (element.edmIsShownBy){
            tempObj.image = element.edmIsShownBy[0]
          }
          
          tempObj.country = element.country[0]
          tempObj.museum = element.dataProvider[0]
          tempObj.id = element.id.slice(1).replace(/\//g, '%2F') //what a nightmare, why does europeana put slashes in their object ids????
          //tempObj.id = element.edmDatasetName[0] might need this later
          if(element.dcDescriptionLangAware&&element.dcDescriptionLangAware.en){
            tempObj.info = element.dcDescriptionLangAware.en[0]
          }else if(element.dcDescription){
            tempObj.info = element.dcDescription[0]
          }else{
            tempObj.info = "No description"
          }
          tempObj.link = element.guid
          
          collectionArray.push(tempObj)
        })
      }).then(()=>{
        switch(currentSortQ){
          case 'relevance':
            break;
          case 'title':
            collectionArray.sort((a,b)=>a.title.localeCompare(b.title))
            break;
          case 'artist':
            collectionArray.sort((a,b)=>a.author.localeCompare(b.author))
            break;
          default:
            setIsError(true)
        }
        setSearchParams({'museum': currentMuseumQ, 'sort': currentSortQ, 'searchtext': searchTextQ})
        setSearchList(collectionArray)
        setArtworkList(collectionArray)
      })
      .catch((err)=>{
        if(err){
          setIsError(true)
          setIsLoading(false)
          const tempSearchParams = new URLSearchParams()
          setSearchParams(tempSearchParams)
        }
      })
    }
  }

  return (
    <div className="search-bar">
      <form onSubmit={queryAdvanced}>
        <div className="museum-select-div">
          <label htmlFor="select-museum">Pick a museum:</label>
          <select id="select-museum" value={currentMuseum} onChange={changeMuseum} name="museum">
            <option value="artic">Art Institute of Chicago</option>
            <option value="europeana">Europeana</option>
          </select>
        </div>
        <div className="search-text-div">
          <input type="text" name="search-input" placeholder="Enter Keywords" 
            onChange={
              (event)=>{
                setSearchText(event.target.value)
              }
            }
          />
        </div>
      <div className="sort-div">
        <label htmlFor="select-sort">Sort By:</label>
        <select id="select-sort" value={currentSort} onChange={changeSort} name="Sort Adv">
          <option value={(`relevance`)}>Most Relevant</option>
          <option value={(`title`)}>Title A-Z</option>
          <option value={(`artist`)}>Artist A-Z</option>
        </select>
      </div>
        <div className="search-button-div">
          <input className="btn" type="submit" value="Search!"/>
        </div>
      </form>
    </div>
  )
}

export default SearchBar;