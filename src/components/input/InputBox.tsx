import React, { ChangeEvent } from 'react';


interface InputBoxProps {
    time: {
        hour: string;
        min: string;
        sec: string;
    };
    startTimer: boolean;
    setTime: React.Dispatch<React.SetStateAction<{
        hour: string;
        min: string;
        sec: string;
    }>>;
}

export default function InputBox({ time, setTime, startTimer }: InputBoxProps) {
    const hourInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (time.hour.length < 2) {
            setTime((prev) => ({ ...prev, hour: e.target.value }))
        }
        if (time.hour.length === 1) {
            document.getElementById('min')?.focus();
        }
    }
    const minInput = (e: ChangeEvent<HTMLInputElement>) => {
        let num = e.target.value;
        if (parseInt(num) < 60) {
            if (time.min.length < 2) {
                setTime((prev) => ({ ...prev, min: e.target.value }))
            }
            if (time.min.length === 1) {
                document.getElementById('sec')?.focus();
            }
        } else {
            setTime((prev) => ({ ...prev, min: '' }))
        }

    }
    const secInput = (e: ChangeEvent<HTMLInputElement>) => {
        let num = e.target.value;

        if (parseInt(num) < 60) {
            if (time.sec.length < 2) {
                setTime((prev) => ({ ...prev, sec: e.target.value }))
            }
            if (time.min.length === 1) {
                document.getElementById('sec')?.focus();
            }
        } else {
            setTime((prev) => ({ ...prev, sec: '' }))
        }

    }

    return (
        <div className={`flex items-center justify-center w-full gap-4 py-8 h-fit ${startTimer && 'pointer-events-none'}`}>
            <div className='flex flex-col items-center justify-center'>
                <label htmlFor="hour" className='text-[25px]'>HH</label>
                <input
                    type="number"
                    min={0}
                    id='hour'
                    className='w-[50px] h-16 text-gray-500 rounded-md text-[32px] px-2 customInput'
                    onChange={hourInput}
                    value={time.hour}
                    onFocus={() => {
                        setTime((prev) => ({ ...prev, hour: '' }))
                    }}
                />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <label htmlFor="min" className='text-[25px]'>MM</label>
                <input
                    type="number"
                    min={0}
                    id='min'
                    className='w-[50px] h-16 text-gray-500 rounded-md text-[32px] px-2 customInput'
                    onChange={minInput}
                    placeholder='00'
                    value={time.min}
                    onFocus={() => {
                        setTime((prev) => ({ ...prev, min: '' }))
                    }} />
            </div>
            <div className='flex flex-col items-center justify-center'>
                <label htmlFor="sec" className='text-[25px]'>SS</label>
                <input
                    type="number"
                    min={0}
                    id='sec'
                    className='w-[50px] h-16 text-gray-500 rounded-md text-[32px] px-2 customInput'
                    value={time.sec}
                    onChange={secInput}
                    placeholder='00'
                    onFocus={() => {
                        setTime((prev) => ({ ...prev, sec: '' }))
                    }}
                />
            </div>

        </div>
    )
}
