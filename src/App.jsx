import { useRef, useState } from 'react'
import React, { useEffect } from "react"
import reactLogo from './assets/react.svg'
import './App.css'
import axios from "axios";
import { Select } from './UI/Select/Select';
import { CardList } from './CardList/CardList';
import { Button } from './UI/Button/Button';


function App() {

  const [platformsArray, setPlatformsArray] = useState({});

  const [select1, setSelect1] = useState();
  const [select2, setSelect2] = useState();
  const [buttonCliked, setButtonCliked] = useState("filter");
  const [pages, setPages] = useState();


  const [gamesList, setGamesList] = useState([]);

  const [offset, setOffset] = useState();


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
    
      const response = await axios.get(`/games/?api_key=b0527010c30e3356d5845bbf608b6df316d3f75a&format=json&field_list:id,name,image,original_release_date,platforms&offset=${offset}&platforms=${value}`)   //&filter:original_release_date:${selectYear}-01-01|${selectYear}-12-12
      .then(res=>{
        setPages(Math.floor(res.data.number_of_total_results / 100) + 1)
        console.log(res.data.results)
        selectYear==null ? setGamesList(res.data.results) : setGamesList(res.data.results.filter(item=>item.original_release_date?.slice(0,4)==selectYear))
      }).catch(err=>{
        console.log(err)
      })
    }


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
    setOffset(0)
    buttonCliked=="filter" ? getGamesByPlatform(select1, select2) : generateRandom()
    
  }

 function handlePlatform(platValue){
    setSelect1(platValue);
    console.log(platValue);
    //setOffset(0)
 }

 function handleYear(platValue){
  setSelect2(platValue);
  console.log(platValue);
  //setOffset(0)
}

function getButtonClicked(value){
  setButtonCliked(value);
}

function nextPage(){
  setOffset(offset+100)
  getGamesByPlatform(select1, select2)
}

function prevPage(){
  setOffset(offset-100)
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
         { /*offset==0&&*/ <button type='onSubmit' onClick={() => getButtonClicked("filter")} className='rounded-lg w-1/5 m-auto mb-10 border border-gray-300 bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-100 focus:ring focus:ring-gray-100 disabled:cursor-not-allowed disabled:border-gray-100 disabled:bg-gray-50 disabled:text-gray-400'>Generate List</button>} 
          <button type='onSubmit' onClick={() => getButtonClicked("random")} className='rounded-lg w-1/5 m-auto border border-yellow-500 bg-yellow-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-yellow-700 hover:bg-yellow-700 focus:ring focus:ring-yellow-200 disabled:cursor-not-allowed disabled:border-yellow-300 disabled:bg-yellow-300'>Get Random Game</button>
       </div>
        
      </form>
      
      <CardList list={gamesList}/>
      { pages > 1 && <a onClick={() => (nextPage())} className="items-cente inline-flex space-x-2 rounded-md border border-gray-300 bg-white px-4 py-2 font-medium text-gray-500 hover:bg-gray-50">
          <span>Next</span>
          <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
            <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
          </svg>
      </a> }
    </div>
  )
}

export default App
