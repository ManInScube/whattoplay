import React from "react"
import { Card } from "../Card/Card"


export const CardList = ({list}) =>{
    
    //refactor
    return(
        <div className={list.length==1 ? "w-full flex flex-row justify-center flex-wrap" : "w-full flex flex-row justify-between flex-wrap" }> 
            {list!=null&& list.map((item,index)=>
                <Card key={index} name={item.name} image={item.image.thumb_url} releaseDate={item.original_release_date} platforms={item.platforms}/>
            )}
        </div>
    )
}