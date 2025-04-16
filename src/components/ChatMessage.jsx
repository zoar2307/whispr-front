import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';

export default function ChatMessage({ idx, message, user, prevMessage }) {
    const pRef = useRef(null)
    const [isMultiline, setIsMultiline] = useState(false)

    useEffect(() => {
        if (pRef.current && 24 < pRef.current.clientHeight) {
            setIsMultiline(true)
        } else {
            setIsMultiline(false)
        }
    }, [])

    return (
        <>
            {((idx === 0) || (new Date(message.creationTime).toLocaleDateString() !== new Date(prevMessage.creationTime).toLocaleDateString())) &&
                <section className='flex w-full  justify-center p-2'>
                    <section className='flex justify-center items-center w-28 h-5 bg-gray-500  rounded-full  '>
                        <span className=' text-white text-sm'>
                            {new Date().toLocaleDateString() === new Date(message.creationTime).toLocaleDateString() ?
                                'Today'
                                :
                                `
                        ${new Date(message.creationTime).toString().split(' ')[2]}
                        ${new Date(message.creationTime).toString().split(' ')[1]} ,
                        ${new Date(message.creationTime).toString().split(' ')[3].slice(2)}`}</span>
                    </section>
                </section>
            }
            <section key={message._id} className={`flex  ${message.writer._id === user._id ? 'flex-row' : 'flex-row-reverse'} gap-4 p-3`}>
                <img src={message.writer.imgUrl} alt="" className='w-8 h-8 object-cover rounded-full ' />

                <section className={`relative flex flex-row-reverse justify-between gap-2 min-w-24 ${message.writer._id === user._id ? 'bg-[#D3CFDE] rounded-tl-none' : 'bg-[#E1DEDE] rounded-tr-none'} rounded-xl p-2 ${isMultiline && 'pb-5'} `}>
                    <p ref={pRef} className='max-w-md  break-words whitespace-pre-wrap w-full '>
                        {message.content}
                    </p>
                    <section className={` flex gap-1 items-center ${isMultiline && 'absolute left-2 bottom-1'} `}>
                        <p className='text-xs text-gray-600'>
                            {new Date(message.creationTime).toString().split(' ')[4].slice(0, 5)}
                        </p>
                        {message.isSeen && message.writer._id === user._id &&
                            <Eye className="w-3.5 h-3.5  text-blue-400" />
                        }
                        {!message.isSeen && message.writer._id === user._id &&
                            <EyeOff className="w-3.5  h-3.5  text-gray-400" />
                        }
                    </section>
                </section>
            </section>
        </>
    )
}
