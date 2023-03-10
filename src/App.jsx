import axios from "axios";
import React, { useState } from "react";
import './App.css';
import { CardList } from './CardList/CardList';
import { PagesNav } from './PagesNav/PagesNav';
import { Select } from './UI/Select/Select';


function App() {

  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [buttonCliked, setButtonCliked] = useState("filter");
  const [pages, setPages] = useState();


  const [gamesList, setGamesList] = useState([]);

  const [offset, setOffset] = useState(0);


  const platforms = {
    'Playstation 5': '176',
    'Playstation 4': '146',
    'Playstation 3': '35',
    'Playstation 2': '19',
    'Playstation': '22',
    'Nintendo Switch': '157',
    'SNES': '9'
  }

  const year = {
    "1997": "1997",
    "1998": "1998",
    "1999": "1999",
    "2006": "2006",
    "2007": "2007",
  }

  /**
   * Function that request to API for games ust and sets data to gamesList
   * @param {string} value id of platform
   * @param {string} selectYear optional year value
   */
  async function getGamesByPlatform(value, selectYear=null){
    
      const response = await axios.get(`/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&field_list:id,name,image,original_release_date,platforms&offset=${offset}&platforms=${value}`)   //&filter:original_release_date:${selectYear}-01-01|${selectYear}-12-12
      .then(res=>{
        setPages(Math.floor(res.data.number_of_total_results / 100) + 1)
        console.log(res.data.results)
        selectYear==null ? setGamesList(res.data.results) : setGamesList(res.data.results.filter(item=>item.original_release_date?.slice(0,4)==selectYear))
      }).catch(err=>{
        console.log(err)
      })
    }

/**
 * Random game generation function
 */
  async function generateRandom(){
    let random = Math.floor(Math.random() * (82000 - 1) + 1)
    console.log(random)
    const response = await axios.get(`/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&filter=id:${random}`) 
    .then(res=>{
      console.log(res.data.results)
      setGamesList(res.data.results)
    }).catch(err=>{
      console.log(err)
    })
  }

  const onSubmit=(e)=>{
    e.preventDefault()
    buttonCliked=="filter" ? getGamesByPlatform(select1, select2) : generateRandom()
    setOffset(100)
  }

  /**
   * Takes a platform value from Select component
   * @param {string} platValue value of platform (id)
   */
 function handlePlatform(platValue){
    setSelect1(platValue);
    console.log(platValue);
    //setOffset(0)
 }

 /**
  * Takes a year value from Select component
  * @param {string} yearValue value of year
  */
 function handleYear(yearValue){
  setSelect2(yearValue);
  console.log(yearValue);
  //setOffset(0)
}

/**
 * function checks which button is clicked to send proper request
 * @param {string} value filter or random
 */
function getButtonClicked(value){
  setButtonCliked(value);
}

/**
 * function managing pages navigation
 * @param {string} value prev or next 
 */
function pageManager(value){
  value=="next" ? setOffset(offset+100) : setOffset(offset-100)
  console.log(offset)
  getGamesByPlatform(select1, select2)
}

  return (
    <div className="App">
      <form action="submit" onSubmit={onSubmit}>
        <div className='flex flex-row justify-start'>
          <Select name="platfrom" array={platforms} selectType={handlePlatform}/>
          <Select name="year" array={year} selectType={handleYear}/>
        </div>
       <div className='flex flex-col justify-center mb-5'>
          <button type='onSubmit' onClick={() => getButtonClicked("filter")} className='rounded-lg w-1/5 m-auto mb-10 border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400'>Generate List</button>
          <button type='onSubmit' onClick={() => getButtonClicked("random")} className='rounded-lg w-1/5 m-auto border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300'>Get Random Game</button>
       </div>
      </form>
      <CardList list={gamesList}/>
      {pages>1 && <PagesNav handler={pageManager} offset={offset} pages={pages}/>}

    </div>
  )
}

export default App
