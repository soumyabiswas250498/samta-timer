import React, { useEffect, useState } from 'react'
import InputBox from './input/InputBox'
import Button from './button/Button'
import { GoStopwatch } from "react-icons/go";



export default function CountDown() {
    const [startTimer, setStartTimer] = useState(false);
    const [time, setTime] = useState({ hour: '00', min: '00', sec: '00' })
    const [ready, setReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);
    const [error, setError] = useState('')

    useEffect(() => {

        let temp = parseInt(time.hour) + parseInt(time.min) + parseInt(time.sec)
        if (temp > 0 && !isNaN(temp)) {
            setReady(true)
        } else {
            setReady(false)
        }
    }, [time])

    useEffect(() => {
        const second = parseInt(time.hour) * 3600 + parseInt(time.min) * 60 + parseInt(time.sec);

        if (second) {
            setTimeLeft(second);
        }

        const interval = setInterval(() => {
            if (startTimer) {
                setTimeLeft(prevTimeLeft => prevTimeLeft - 1);
            } else {
                setTimeLeft(0)
            }

        }, 1000);
        return () => clearInterval(interval);
    }, [startTimer]);

    useEffect(() => {
        const hour = Math.floor(timeLeft / 3600)
        const min = Math.floor((timeLeft % 3600) / 60)
        const sec = timeLeft % 60;
        setTime({
            hour: String(hour).padStart(2, '0'), min: String(min).padStart(2, '0'), sec: String(sec).padStart(2, '0')
        })

        console.log(timeLeft)
        if(timeLeft <= 0 ){
            setStartTimer(false)
        }

    }, [timeLeft])

    useEffect(() => {
        const second = parseInt(time.hour) * 3600 + parseInt(time.min) * 60 + parseInt(time.sec);
        if (second === 0) {
            setError('Please set a time')
        } else {
            setError('')
        }
        if (isNaN(parseInt(time.hour))) {
            setError('Please set valid hour')
        }
        if (isNaN(parseInt(time.min))) {
            setError('Please set valid minute')
        }
        if (isNaN(parseInt(time.sec))) {
            setError('Please set valid second')
        }

    }, [time.hour, time.min, time.sec])



    return (
        <div className='h-fit w- full '>
            <div className='flex items-center justify-center w-full'>
                <GoStopwatch className={`text-[50px] ${startTimer && 'text-red-500'}`} />
            </div>
            <InputBox time={time} setTime={setTime} startTimer={startTimer} />
            <Button setStartTimer={setStartTimer} startTimer={startTimer} ready={ready} />
            <div className='flex items-center justify-center w-full py-8 h-11'>
                <p className='text-red-500'>{error}</p>
            </div>
        </div>
    )
}
