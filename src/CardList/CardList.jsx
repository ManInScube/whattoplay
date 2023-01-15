import React from "react"
import { Card } from "../Card/Card"


export const CardList = ({list}) =>{
    
    return(
        <div className="w-full flex flex-row justify-between flex-wrap ">
            {list!=null&& list.map((item,index)=>
                <Card key={index} name={item.name} image={item.image.thumb_url} releaseDate={item.original_release_date} platforms={item.platforms}/>
            )}
{/* 
            {list!=null && list.filter(name => name.original_release_date.includes("2006")).map((item,index) => (
              
                <Card key={index} name={item.name} image={item.image.thumb_url} releaseDate={item.original_release_date}/>
               
            ))} */}
            
        </div>
    )
}