import React from "react"


export const Card = ({name,image, releaseDate, platforms}) =>{
    
    return(
        <div className="flex flex-col justify-center w-1/5 mb-6 overflow-hidden rounded-lg bg-white shadow mr-1 ml-1">
            <h2 className="h-10 mb-2">{name}</h2>
            <div className="flex flex-row justify-center mb-2">
                <img src={image} alt="" />
            </div>
            <p className="text-sm text-primary-500">release date: {releaseDate}</p>
            <p>
            {platforms!=null && platforms.map((item,index)=>
                <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2 py-1 text-xs font-semibold text-blue-600" key={index}>{item.abbreviation} </span>
            )}
            </p>
        </div>
    )
}