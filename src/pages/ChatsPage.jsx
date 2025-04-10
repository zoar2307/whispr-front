import { MessageSquarePlus } from "lucide-react";

export function ChatsPage() {

    return (
        <section className={`bg-[#524A65] w-full h-[100vh]  flex items-center justify-center`} >
            <section className="bg-white w-[90%] h-[90%] rounded-2xl shadow-black overflow-hidden flex">

                <section className="h-full w-[30%] bg-gray-300 shadow z-10 flex">
                    {/* SideBar */}
                    <section className="w-[25%] h-full shadow z-10  bg-gray-400">

                    </section>
                    <section className="flex flex-col w-full h-full">
                        <section className="flex flex-col gap-3 p-4 ">
                            <section className='flex items-center justify-between'>
                                <h3 className="text-bold text-2xl">Chats</h3>
                                <MessageSquarePlus />
                            </section>


                            <input
                                type="text"
                                placeholder="Search by name or phone number"
                                className="bg-[#C8C6CD] p-2 w-full placeholder:text-sm rounded-md"
                            />
                        </section>


                        {/* Chats List */}
                    </section>
                    {/* Chat */}

                </section>
                {/* Chats preview */}
                <section className="h-full w-full bg-gray-200 ">

                </section>
            </section>
        </section>
    )
}
