import { useRef, useState } from 'react'
import React, { useEffect } from "react"

export const Select = ({platforms}) => {


    return(
        <select name="" id="">
            {platforms.map((item)=>
                <option value={item}>{item}</option>
            )}
        </select>
    )
}