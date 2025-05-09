import { MessageSquarePlus } from "lucide-react";
import { ChatsList } from "../components/ChatsList";
import ChatPreview from "../components/ChatPreview";
import { useEffect, useState } from "react";
import { userChatsService } from "../services/userChats.service";
import { SideBar } from "../components/SideBar";

export function ChatsPage() {

    const connectedUser = {
        _id: 'u101',
        displayName: 'Zohar',
        pNumber: '0533393504',
        imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
    }

    const [selectedChatId, setSelectedChatId] = useState()
    // const [localChats, setLocalChats] = useState([
    //     {
    //         _id: 'c101',
    //         members: [
    //             {
    //                 _id: 'u101',
    //                 displayName: 'Zohar',
    //                 pNumber: '0533393504',
    //                 imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
    //             },
    //             {
    //                 _id: 'u102',
    //                 displayName: 'Itzik',
    //                 pNumber: '1111',
    //                 imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1727762539/samples/look-up.jpg'
    //             }
    //         ],
    //         messages: Array.from({ length: 100 }, (_, i) => ({
    //             _id: `m${i + 101}`,
    //             writer: {
    //                 _id: 'u101',
    //                 displayName: 'Zohar',
    //                 pNumber: '0533393504',
    //                 imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
    //             },
    //             creationTime: Date.now() - i * 60000 * 60 * 12,
    //             content: `Message number ${i + 1}`,
    //             isSeen: false
    //         })).sort((m1, m2) => m1.creationTime - m2.creationTime)
    //     },
    //     {
    //         _id: 'c102',
    //         members: [
    //             {
    //                 _id: 'u101',
    //                 displayName: 'Zohar',
    //                 pNumber: '0533393504',
    //                 imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
    //             },
    //             {
    //                 _id: 'u103',
    //                 displayName: 'Haim',
    //                 pNumber: '22222',
    //                 imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1727762540/samples/man-portrait.jpg'
    //             }
    //         ],
    //         messages: Array.from({ length: 100 }, (_, i) => {
    //             const members = [
    //                 {
    //                     _id: 'u101',
    //                     displayName: 'Zohar',
    //                     pNumber: '0533393504',
    //                     imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
    //                 },
    //                 {
    //                     _id: 'u103',
    //                     displayName: 'Haim',
    //                     pNumber: '22222',
    //                     imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1727762540/samples/man-portrait.jpg'
    //                 }
    //             ]

    //             const randomWriter = members[Math.floor(Math.random() * members.length)];

    //             return {
    //                 _id: `m${i + 101}`,
    //                 writer: randomWriter,
    //                 creationTime: Date.now() - i * 60000 * 60 * 12,
    //                 content: `Message number ${i + 1}`,
    //                 isSeen: false
    //             }
    //         }).sort((m1, m2) => m1.creationTime - m2.creationTime)
    //     }
    // ])


    const [userChats, setUserChats] = useState([])

    function onSelectChat(chatId) {
        setSelectedChatId(chatId)
    }

    useEffect(() => {
        const fetchChats = async () => {
            try {
                const userChats = await userChatsService.query()
                setUserChats(...userChats)
            } catch (err) {
                console.error('Failed to fetch chats:', err)
            }
        }
        fetchChats()
    }, [])

    useEffect(() => {
        if (selectedChatId) {
            setUserChats(prev => prev.map(chat => {
                if (chat._id === selectedChatId) {
                    return { ...chat, messages: chat.messages.map((message => ({ ...message, isSeen: true }))) }
                }
                return chat
            }))
        }
    }, [selectedChatId])

    function onAddMassage(content) {
        const newMessage = {
            _id: Date.now(),
            writer: connectedUser,
            creationTime: Date.now(),
            content,
            isSeen: false
        }
        setUserChats(prev => prev.map(chat => {
            if (chat._id === selectedChatId) {
                return { ...chat, messages: [...chat.messages, newMessage] }
            }
            return chat
        }))
    }

    return (
        <section className={`bg-[#524A65] w-full h-[100vh] 
            grid 
            [grid-template-rows:40px_1fr_40px]
            [grid-template-columns:120px_1fr_120px]
            font-poppins
            `} >

            <section className="rounded-2xl shadow-black overflow-hidden flex col-start-2 row-start-2">

                <section className=" min-w-[445px] max-w-[445px] h-full bg-[#E1DEDE] shadow-[2px_0_5px_rgba(0,0,0,0.2)] z-10 flex">
                    {/* SideBar */}
                    <SideBar chats={userChats} user={connectedUser} selectedChatId={selectedChatId} />
                    <section className="flex flex-col w-full h-full">
                        <section className="flex flex-col gap-3 p-4 ">
                            <section className='flex items-center justify-between'>
                                <h3 className="font-semibold text-xl ">chats</h3>
                                <MessageSquarePlus className="w-5 h-5 cursor-pointer" />
                            </section>


                            <input
                                type="text"
                                placeholder="Search by name or phone number"
                                className="flex items-center bg-[#CCCCCC] h-10 p-3 w-full placeholder:text-[#727272] rounded-md font-light text-sm focus:outline-[#524A65] focus:outline-1"
                            />
                        </section>


                        {/* Chats List */}
                        <ChatsList chats={userChats} user={connectedUser} selectedChatId={selectedChatId} onSelectChat={onSelectChat} />
                    </section>
                    {/* Chat */}

                </section>
                {/* Chats preview */}
                <section className="h-full w-full bg-[#EEEEEE] ">
                    <ChatPreview chats={userChats} selectedChatId={selectedChatId} user={connectedUser} onAddMassage={onAddMassage} />
                </section>
            </section>
        </section>
    )
}
