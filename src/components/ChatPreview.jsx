import React, { useEffect, useRef, useState } from 'react'
import ChatMessage from './ChatMessage'

export default function ChatPreview({ chats, selectedChatId, user, onAddMassage }) {

    const [inputContent, setInputContent] = useState('')
    const chatRef = useRef()
    const textareaRef = useRef()
    const lastMassageDateRef = useRef(null)
    const [selectedChat, setSelectedChat] = useState(null)

    useEffect(() => {
        setSelectedChat(chats.find(chat => chat._id === selectedChatId))
    }, [selectedChatId, chats])

    useEffect(() => {
        if (chatRef && selectedChat) {
            chatRef.current.scrollTop = chatRef.current.scrollHeight;
        }
    }, [selectedChat])

    function handleInputChange({ target }) {
        setInputContent(target.value)
    }

    function handleSubmit() {
        onAddMassage(inputContent)
        setInputContent('')
        textareaRef.current.style.height = 'auto'
        textareaRef.current.style.height = `40px`
    }

    function updateLastMassageDate(date) {
        lastMassageDateRef.current = date
    }

    if (!selectedChatId || !selectedChat) return <section className='w-full h-full flex items-center justify-center'>Select chat</section>

    return (
        <section className='w-full h-full flex flex-col'>
            <section className='bg-[#E1DEDE] w-full h-[80px] shadow-md'></section>
            <section ref={chatRef} className='w-full h-full relative overflow-y-scroll '>
                {selectedChat.messages.map((message, idx) => {
                    return (
                        <ChatMessage key={message._id} idx={idx} message={message} prevMessage={selectedChat.messages[idx - 1] || null} user={user} />
                    )
                })}
            </section>
            <section className='w-full  bg-[#D3CFDE] flex shadow-[0_-3px_6px_rgba(0,0,0,0.15)] p-2 px-6'>
                <form className='w-full' onSubmit={handleSubmit}>
                    <textarea
                        ref={textareaRef}
                        rows={1}
                        className="bg-[#E1DEDE] w-full  rounded-md shadow-[inset_0_2px_6px_rgba(0,0,0,0.2)] p-2 resize-none overflow-y-auto max-h-[9rem]"
                        placeholder="Type your message..."
                        value={inputContent}
                        onChange={handleInputChange}
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                                e.preventDefault()
                                handleSubmit()
                            }
                        }}
                        onInput={(e) => {
                            textareaRef.current.style.height = 'auto'
                            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
                        }}
                    ></textarea>
                </form>
            </section>
        </section >
    )
}
