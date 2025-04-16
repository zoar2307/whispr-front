import { MessageSquare, Settings } from 'lucide-react'
import React, { useEffect, useState } from 'react'

export function SideBar({ chats, user, selectedChatId }) {

    const [unreadMessages, setUnreadMessages] = useState(0)

    useEffect(() => {
        setUnreadMessages(0)
        chats.forEach(chat => {
            setUnreadMessages(prev => prev + chat.messages.reduce((acc, message) => {
                if (message.writer._id !== user._id && !message.isSeen) acc++
                return acc
            }, 0))
        })
    }, [chats, selectedChatId])

    return (
        <section className="flex flex-col justify-between items-center w-[75px] h-full shadow-[2px_0_5px_rgba(0,0,0,0.2)] z-10  bg-[#D9D9D9]">

            <section className='flex w-full h-full justify-center items-start mt-6 '>
                <button className='relative flex justify-center items-center w-[80%] aspect-square rounded-full cursor-pointer bg-[rgba(160,150,185,0.5)]'>
                    {unreadMessages > 0 &&
                        <section className="flex items-center justify-center bg-[black] h-3.5 p-1  rounded-full absolute -right-0 top-0">
                            <span className="text-xs font-light text-white ">
                                {unreadMessages > 99 ? '99+' : unreadMessages}
                            </span>
                        </section>}
                    <MessageSquare className='w-full ' />
                </button>
            </section>

            <section className='flex flex-col h-full w-full items-center justify-end  gap-3'>
                <button className='flex justify-center items-center w-[80%] aspect-square rounded-full object-cover  hover:bg-[rgba(160,150,185,0.5)] duration-300 cursor-pointer'>
                    <Settings />
                </button>
                <button className='flex justify-center w-full'>
                    <img src={user.imgUrl} alt='user image' className='w-[80%] aspect-square rounded-full object-cover mb-4 border-2 border-gray-500 hover:scale-105 duration-300 cursor-pointer' />
                </button>
            </section>

        </section>
    )
}
