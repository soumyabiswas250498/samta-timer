import React from 'react'
import { IoPlaySharp } from "react-icons/io5";
import { ImStop2 } from "react-icons/im";

export default function Button(props: any) {
    const { startTimer, setStartTimer, ready } = props;

    return (
        <div className='flex items-center justify-center w-full py-8 h-fit'>
            {
                ready ?
                    startTimer ? <div className='flex items-center justify-center w-12 h-12 bg-red-600 rounded-md cursor-pointer' onClick={() => setStartTimer(false)}>
                        <ImStop2 />
                    </div>
                        :
                        <div className='flex items-center justify-center w-12 h-12 bg-green-600 rounded-md cursor-pointer' onClick={() => setStartTimer(true)}>
                            <IoPlaySharp />
                        </div>
                    :
                    <div className='flex items-center justify-center w-12 h-12 bg-gray-500 rounded-md cursor-pointer' >

                    </div>
            }

        </div>
    )
}
