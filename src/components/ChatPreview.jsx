import { Eye, EyeOff } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'

export default function ChatPreview({ chats, selectedChatId, user }) {

    const chatRef = useRef()
    const [selectedChat, setSelectedChat] = useState(null)

    useEffect(() => {
        setSelectedChat(chats.find(chat => chat._id === selectedChatId))
    }, [selectedChatId, chats])

    useEffect(() => {
        if (chatRef && selectedChat) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [selectedChat])

    if (!selectedChatId || !selectedChat) return <section className='w-full h-full flex items-center justify-center'>Select chat</section>

    return (
        <section className='w-full h-full flex flex-col'>
            <section className='bg-[#E1DEDE] w-full h-[80px] shadow-md'></section>
            <section ref={chatRef} className='w-full h-full relative overflow-y-scroll '>
                {selectedChat.messages.map(message => {
                    return (
                        <section key={message._id} className={`flex ${message.writer._id === user._id ? 'flex-row' : 'flex-row-reverse'} gap-4 p-4`}>
                            <img src={message.writer.imgUrl} alt="" className='w-8 h-8 object-cover rounded-full ' />

                            <section className={`relative ${message.writer._id === user._id ? 'bg-[#D3CFDE] rounded-tl-none' : 'bg-[#E1DEDE] rounded-tr-none'} rounded-xl p-2 pb-5 `}>
                                <p className='max-w-md  break-words whitespace-pre-wrap'>
                                    {message.content}
                                </p>
                                <section className='absolute flex gap-2 items-center right-2 bottom-1'>
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
                })}
            </section>
            <section className='w-full  bg-[#D3CFDE] flex shadow-[0_-3px_6px_rgba(0,0,0,0.15)] p-2 px-6'>
                <textarea
                    rows={1}
                    className="bg-[#E1DEDE] w-full rounded-md shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] p-2 resize-none overflow-y-auto"
                    placeholder="Type your message..."
                ></textarea>
            </section>
        </section>
    )
}
