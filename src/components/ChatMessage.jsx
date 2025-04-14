import { Eye, EyeOff } from 'lucide-react'
import { useEffect, useRef, useState } from 'react';

export default function ChatMessage({ message, user }) {
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
        <section key={message._id} className={`flex  ${message.writer._id === user._id ? 'flex-row' : 'flex-row-reverse'} gap-4 p-4`}>
            <img src={message.writer.imgUrl} alt="" className='w-8 h-8 object-cover rounded-full ' />

            <section className={`relative flex flex-row-reverse justify-between gap-2 min-w-24 ${message.writer._id === user._id ? 'bg-[#D3CFDE] rounded-tl-none' : 'bg-[#E1DEDE] rounded-tr-none'} rounded-xl p-2 ${isMultiline && 'pb-5'} `}>
                <p ref={pRef} className='max-w-md  break-words whitespace-pre-wrap w-full '>
                    {message.content}
                </p>
                <section className={` flex gap-1 items-center ${isMultiline && 'absolute left-2 bottom-1'} `}>
                    <p className='text-xs text-gray-600'>{new Date(message.creationTime).toLocaleDateString()}</p>
                    {message.isSeen && message.writer._id === user._id &&
                        <Eye className="w-3.5 h-3.5  text-blue-400" />
                    }
                    {!message.isSeen && message.writer._id === user._id &&
                        <EyeOff className="w-3.5  h-3.5  text-gray-400" />
                    }
                </section>
            </section>
        </section>
    )
}
