import { useRef, useState } from 'react'
import React, { useEffect } from "react"

export const Select = ({name, array, selectType}) => {
    const [selected, setSelected] = useState();

    return(
        <select name="" id="" value={selected} onChange={e => selectType(e.target.value)} className="block w-1/4 mb-3 ml-2 h-10 rounded-md border-gray-300 shadow-sm focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50">
            <option value="null">Select {name}</option>
            {/* {array.map((item)=>
                <option key={item} value={item}>{item}</option>
            )} */}

            { Object.entries(array).map((key,index) => <option key={index} value={key[1]}>{key[0]}</option>) }          

        </select>
    )
}