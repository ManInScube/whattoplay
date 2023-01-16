import { useRef, useState } from 'react'
import React, { useEffect } from "react"
import reactLogo from './assets/react.svg'
import './App.css'
import axios from "axios";
import { Select } from './UI/Select/Select';
import { CardList } from './CardList/CardList';


function App() {

  const [platformsArray, setPlatformsArray] = useState({});
  const [gamesArray, setGamesArray] = useState({});
  const [foundGame, setFoundGame] = useState();

  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [buttonCliked, setButtonCliked] = useState("filter");


  const [gamesList, setGamesList] = useState([]);

  const offset = ["0", "1", "2"];

  const platforms = {
    'Playstation 5': '176',
    'Playstation 4': '146',
    'Playstation 3': '35',
    'Playstation 2': '19',
    'Playstation': '22',
    'Nintendo Switch': '157'
  }

  const year = {
    "1997": "1997",
    "1998": "1998",
    "1999": "1999",
    "2006": "2006",
    "2007": "2007",
  }
  // const platforms = [
  //   'Playstation 5',
  //   'Playstation 4',
  //   'Playstation 3', //35
  //   'Playstation 2', //19
  //   'Playstation', //22
  //   'Nintendo Switch',
  //   'Gameboy', //3
  //   'Sega' //6
  // ]

  const genre = [
    'Action',
    'Adnventure',
    'Strategy',
    'Simulation',
    'Fighting',
    'Shooter',
    'Platformer'
  ]

  async function getPlatfrom(index){
    const response = await axios.get('/platforms/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&offset=1')
    .then(res=>{
      console.log(res.data.results)
      //setPlatformsArray(res.data.results)
      //console.log(platformsArray)
    }).catch(err=>{
      console.log(err)
    })
  }

  // async function getGamesByPlatform(value, selectYear){
  //   let reses = [];
  //   offset.forEach(async (item)=>{
  //     const response = await axios.get(`/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&offset=${item}&platforms=${value}`) //filter genre + itarate offset or get random offset
  //     .then(res=>{
  //       //console.log(res.data.results)
  //       //setGamesList([...gamesList, res.data.results]);
  //       reses.push(res.data.results)
  //       console.log(reses)
  //       //let filtered = res.data.results.filter(item=>item.original_release_date?.slice(0,4)==selectYear)
  //       //
  //       //setGamesList(filtered)
        
  //     }).catch(err=>{
  //       console.log(err)
  //     })
  //   })
  // }


  async function getGamesByPlatform(value, selectYear=null){
    
      const response = await axios.get(`/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&platforms=${value}`)   //&filter:original_release_date:${selectYear}-01-01|${selectYear}-12-12
      .then(res=>{
        console.log(res.data.results)
        selectYear==null ? setGamesList(res.data.results) : setGamesList(res.data.results.filter(item=>item.original_release_date?.slice(0,4)==selectYear))
      }).catch(err=>{
        console.log(err)
      })
    }

//Date filters: &filter=field:start value|end value (using datetime format) filter=original_release_date:1995-12-17|1999-12-17

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
    
  }

 function handlePlatform(platValue){
    setSelect1(platValue);
    console.log(platValue);
 }

 function handleYear(platValue){
  setSelect2(platValue);
  console.log(platValue);
}

function getButtonClicked(value){
  setButtonCliked(value);
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

    </div>
  )
}

export default App
