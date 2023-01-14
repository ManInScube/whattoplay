import React from "react"


export const Card = ({name,image, releaseDate}) =>{
    
    return(
        <div className="flex flex-col justify-center w-1/5 mb-6 overflow-hidden rounded-lg bg-white shadow">
            <h2 className="h-10 mb-2">{name}</h2>
            <div className="flex flex-row justify-center mb-2">
                <img src={image} alt="" />
            </div>
            <p className="text-sm text-primary-500">release date: {releaseDate}</p>
        </div>
    )
}