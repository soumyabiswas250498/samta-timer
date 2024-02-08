import React, { useEffect, useState } from 'react'
import InputBox from './input/InputBox'
import Button from './button/Button'
export default function CountDown() {
    const [startTimer, setStartTimer] = useState(false);
    const [time, setTime] = useState({ hour: '00', min: '00', sec: '00' })
    const [ready, setReady] = useState(false);
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        // console.log(time)
        let temp = parseInt(time.hour) + parseInt(time.min) + parseInt(time.sec)
        console.log(temp > 0 && !isNaN(temp), '**temp')
        if (temp > 0 && !isNaN(temp)) {
            setReady(true)
        } else {
            setReady(false)
        }
    }, [time])

    useEffect(() => {
        const second = parseInt(time.hour) * 3600 + parseInt(time.min) * 60 + parseInt(time.sec);
        console.log(second)
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
        console.log(hour, min, sec)
    }, [timeLeft])

    console.log(timeLeft)

    return (
        <div className='h-fit w- full '>
            <InputBox time={time} setTime={setTime} />
            <Button setStartTimer={setStartTimer} startTimer={startTimer} ready={ready} />
        </div>
    )
}
