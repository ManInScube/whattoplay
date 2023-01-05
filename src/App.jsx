import { useRef, useState } from 'react'
import React, { useEffect } from "react"
import reactLogo from './assets/react.svg'
import './App.css'
import axios from "axios";


function App() {

  const [charSearch, setCharSearch] = useState(null);
  const [charsArray, setCharsArray] = useState(0);
  const [platformsArray, setPlatformsArray] = useState({});
  const [gamesArray, setGamesArray] = useState({});
  const [test, setTest] = useState();

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
    const response = await axios.get('/platforms/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json')
    .then(res=>{
      console.log(res.data.results[index])
      setPlatformsArray(res.data.results)
      console.log(platformsArray)
    }).catch(err=>{
      console.log(err)
    })
  }

  async function getGames(index){
    const response = await axios.get('/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json')
    .then(res=>{
      console.log(res.data.results[index])
      setTest(res.data.results[index].name);
      setGamesArray(res.data.results)
      console.log(gamesArray)
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
  }



  // useEffect(function(){
  //   getData();
  // }, [])

  // useEffect(function(){
  //   getChar(charSearch)
  // }, [charSearch])


  return (
    <div className="App">

      <form action="submit" onSubmit={onSubmit}>
        <input onChange={e => setCharSearch(parseInt(e.target.value))} type="text" placeholder='0'/>
        <button type='onSubmit'>Сгенерировать</button>
      </form>
      <p>{test}</p>

    </div>
  )
}

export default App
