import { useRef, useState } from 'react'
import React, { useEffect } from "react"
import reactLogo from './assets/react.svg'
import './App.css'
import axios from "axios";
import { Select } from './UI/Select/Select';


function App() {

  const [charSearch, setCharSearch] = useState(null);
  const [charsArray, setCharsArray] = useState(0);
  const [platformsArray, setPlatformsArray] = useState({});
  const [gamesArray, setGamesArray] = useState({});
  const [foundGame, setFoundGame] = useState();

  const [select1, setSelect1] = useState();


  const platforms = {
    'Playstation 3': '35',
    'Playstation 2': '19',
    'Playstation': '22'
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

  async function getGames(index){
    const response = await axios.get('/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&offset=2')
    .then(res=>{
      console.log(res.data.results[index])
      setFoundGame(res.data.results[index].name);
      setGamesArray(res.data.results)
      console.log(gamesArray)
    }).catch(err=>{
      console.log(err)
    })
  }

  async function getGamesByPlatform(value){
    const response = await axios.get(`/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&platforms=${value}`)
    .then(res=>{
      console.log(res.data.results)
    }).catch(err=>{
      console.log(err)
    })

  }

  function getChar(index){
    if(charSearch!=null) return charsArray[index]
    console.log(index)
    return 0

  }

  const onSubmit=(e)=>{
    e.preventDefault()
    getGames(charSearch)
    //getPlatfrom(1)
    getGamesByPlatform(select1);
  }

 function handlePlatform(platValue){
    setSelect1(platValue);
    console.log(platValue);
 }

  return (
    <div className="App">

      <form action="submit" onSubmit={onSubmit}>
        {/* <input onChange={e => setCharSearch(parseInt(e.target.value))} type="text" placeholder='0'/> */}
        <Select array={platforms} selectPlatform={handlePlatform}/>
        {/* <Select array={genre}/> */}

        <button type='onSubmit'>Сгенерировать</button>
      </form>
      <p>{foundGame}</p>

    </div>
  )
}

export default App
