import { useRef, useState } from 'react'
import React, { useEffect } from "react"
import reactLogo from './assets/react.svg'
import './App.css'
import axios from "axios";
import { Select } from './UI/Select/Select';
import { CardList } from './CardList/CardList';



function App() {

  const [charSearch, setCharSearch] = useState(null);
  const [charsArray, setCharsArray] = useState(0);
  const [platformsArray, setPlatformsArray] = useState({});
  const [gamesArray, setGamesArray] = useState({});
  const [foundGame, setFoundGame] = useState();

  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();


  const [gamesList, setGamesList] = useState();
  const [filtered, setFiltered] = useState();


  const platforms = {
    'Playstation 3': '35',
    'Playstation 2': '19',
    'Playstation': '22'
  }

  const year = {
    "2006": "2006",
    "2007": "2007"
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

  async function getCharachter(index){

    const response =axios.get('/chars/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json')
    .then(res=>{
      console.log(res.data.results[index])
      //setCharsArray(res.data.results)
    }).catch(err=>{
      console.log(err)
    })

  }

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

  // async function getGames(index){
  //   const response = await axios.get('/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&offset=2')
  //   .then(res=>{
  //     console.log(res.data.results[index])
  //     setFoundGame(res.data.results[index].name);
  //     setGamesArray(res.data.results)
  //     console.log(gamesArray)
  //   }).catch(err=>{
  //     console.log(err)
  //   })
  // }



  async function getGamesByPlatform(value){
    const response = await axios.get(`/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&platforms=${value}`) //filter genre + itarate offset or get random offset
    .then(res=>{
      console.log(res.data.results)
      setGamesList(res.data.results);
    }).catch(err=>{
      console.log(err)
    })
  }

  // function filterByGenre(genre){
  //   gamesList.filter((item)=>{
  //     if(item.)
  //   })
  // }



  const onSubmit=(e)=>{
    e.preventDefault()
    //getGames(charSearch)
    //getPlatfrom(1)
    getGamesByPlatform(select1)
  }

 function handlePlatform(platValue){
    setSelect1(platValue);
    console.log(platValue);
 }

 function handleYear(platValue){
  setSelect2(platValue);
  console.log(platValue);
}

  return (
    <div className="App">
      <form action="submit" onSubmit={onSubmit}>
        {/* <input onChange={e => setCharSearch(parseInt(e.target.value))} type="text" placeholder='0'/> */}
        <Select array={platforms} selectPlatform={handlePlatform}/>
        {/* <Select array={genre}/> */}
        <Select array={year} selectPlatform={handleYear}/>
        <button type='onSubmit' className='rounded-lg border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400'>Сгенерировать</button>
      </form>
      {/* <p>{foundGame}</p> */}
      <CardList list={gamesList}/>

    </div>
  )
}

export default App
