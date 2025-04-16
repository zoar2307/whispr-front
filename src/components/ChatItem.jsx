import { Eye, EyeOff } from "lucide-react"
import { useEffect, useState } from "react"

export default function ChatItem({ chat, user, selectedChatId, onSelectChat }) {

    const [unreadMessages, setUnreadMessages] = useState(0)

    useEffect(() => {
        setUnreadMessages(chat.messages.reduce((acc, message) => {
            if (message.writer._id !== user._id && !message.isSeen) acc++
            return acc
        }, 0))
    }, [chat])

    return (
        <section
            onClick={() => onSelectChat(chat._id)}
            className={`group flex items-center gap-4 p-4 py-2 h-[70px] shadow-[0_-1px_1px_rgba(0,0,0,0.2)] overflow-hidden select-none ${selectedChatId === chat._id ? 'bg-[#D3CFDE]' : ' bg-[#D9D9D9]'} cursor-pointer  hover:bg-[#D3CFDE] duration-300`}>
            <section className="relative w-12 ">
                <img src={chat.members.find(member => member.pNumber !== user.pNumber).imgUrl} className="w-full aspect-square rounded-full object-cover" />
                {unreadMessages > 0 &&
                    <section className="flex items-center justify-center bg-[#9F99AE]  h-3.5 p-1  rounded-full absolute -right-0 -top-1">
                        <span className="text-xs font-light text-white ">
                            {unreadMessages > 99 ? '99+' : unreadMessages}
                        </span>
                    </section>}
            </section>
            <section className="flex flex-col justify-between w-full">
                <h3 className="font-medium text-lg" >{chat.members.find(member => member.pNumber !== user.pNumber).displayName}</h3>
                <section className="flex  items-center justify-between gap-2">
                    <p className="text-sm font-light text-[#8F8F8F] line-clamp-1 ">{chat.messages[chat.messages.length - 1].content}</p>
                    {chat.messages[chat.messages.length - 1].isSeen ?
                        <Eye className="w-3.5 h-3.5  text-blue-400" />
                        : <EyeOff className="w-3.5  h-3.5  text-gray-400" />}
                </section>
            </section>
        </section >
    )
}
