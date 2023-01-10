import { useRef, useState } from 'react'
import React, { useEffect } from "react"

export const Select = ({array, selectPlatform}) => {
    const [selected, setSelected] = useState();

    return(
        <select name="" id="" value={selected} onChange={e => selectPlatform(e.target.value)}>
            {/* {array.map((item)=>
                <option key={item} value={item}>{item}</option>
            )} */}

            { Object.entries(array).map((key,index) => <option key={index} value={key[1]}>{key[0]}</option>) }          

        </select>
    )
}