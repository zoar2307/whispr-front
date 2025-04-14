import React from 'react'
import ChatItem from './ChatItem'

export function ChatsList({ chats, user, selectedChatId, onSelectChat }) {
    return (
        <>
            {chats.map((chat) => {
                return (
                    <ChatItem key={chat._id} chat={chat} user={user} selectedChatId={selectedChatId} onSelectChat={onSelectChat} />
                )
            })}

        </>
    )
}
