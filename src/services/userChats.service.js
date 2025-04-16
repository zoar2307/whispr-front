import { storageService } from "./async-storage.service"

export const userChatsService = {
    query
}

const STORAGE_KEY = "userChatsDB"
_createUserChats()

async function query(filterBt = {}) {
    let userChats = await storageService.query(STORAGE_KEY)

    return userChats
}

async function _createUserChats() {
    let userChats = await storageService.query(STORAGE_KEY)
    if (!userChats || !userChats.length) {
        await storageService.post(STORAGE_KEY,
            [{
                _id: 'c101',
                members: [
                    {
                        _id: 'u101',
                        displayName: 'Zohar',
                        pNumber: '0533393504',
                        imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
                    },
                    {
                        _id: 'u102',
                        displayName: 'Itzik',
                        pNumber: '1111',
                        imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1727762539/samples/look-up.jpg'
                    }
                ],
                messages: Array.from({ length: 100 }, (_, i) => ({
                    _id: `m${i + 101}`,
                    writer: {
                        _id: 'u101',
                        displayName: 'Zohar',
                        pNumber: '0533393504',
                        imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
                    },
                    creationTime: Date.now() - i * 60000 * 60 * 12,
                    content: `Message number ${i + 1}`,
                    isSeen: false
                })).sort((m1, m2) => m1.creationTime - m2.creationTime)
            },
            {
                _id: 'c102',
                members: [
                    {
                        _id: 'u101',
                        displayName: 'Zohar',
                        pNumber: '0533393504',
                        imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
                    },
                    {
                        _id: 'u103',
                        displayName: 'Haim',
                        pNumber: '22222',
                        imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1727762540/samples/man-portrait.jpg'
                    }
                ],
                messages: Array.from({ length: 100 }, (_, i) => {
                    const members = [
                        {
                            _id: 'u101',
                            displayName: 'Zohar',
                            pNumber: '0533393504',
                            imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1744285013/meTemp_zrcaup.jpg'
                        },
                        {
                            _id: 'u103',
                            displayName: 'Haim',
                            pNumber: '22222',
                            imgUrl: 'https://res.cloudinary.com/sey-app/image/upload/v1727762540/samples/man-portrait.jpg'
                        }
                    ]

                    const randomWriter = members[Math.floor(Math.random() * members.length)];

                    return {
                        _id: `m${i + 101}`,
                        writer: randomWriter,
                        creationTime: Date.now() - i * 60000 * 60 * 12,
                        content: `Message number ${i + 1}`,
                        isSeen: false
                    }
                }).sort((m1, m2) => m1.creationTime - m2.creationTime)
            }])
    }
}