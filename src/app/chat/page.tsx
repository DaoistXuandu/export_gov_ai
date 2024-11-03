"use client"
import { Poppins, Noto_Sans, Roboto } from "next/font/google"
import { useEffect, useState, useRef } from "react"
import Item from "../components/item"
import { babelIncludeRegexes } from "next/dist/build/webpack-config"
import ChatServer from "../components/chat_server"
import ChatClient from "../components/chat_client"
import { time } from "console"
import { text } from "stream/consumers"

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})

const roboto = Roboto({
    weight: '500',
    subsets: ['latin'],
})

const noto_sans = Noto_Sans({
    weight: '300',
    subsets: ['latin'],
})

const noto_sans_m = Noto_Sans({
    weight: '500',
    subsets: ['latin'],
})


const noto_sans_w = Noto_Sans({
    weight: '800',
    subsets: ['latin'],
})

const avail_modul = ["Riset Pasar", "Regulasi dan Standar Mutu", "Riset Produk dan Pengembangan"]
const dummy_mini = 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. '
const dummy_short = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
`
const dummy = `What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.

Why do we use it?
It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).


Where does it come from?
Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.

The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.

Where can I get some?
There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.`

export default function Chat() {
    const [wait, setWait] = useState(false)
    const [data, setData] = useState("")
    const [modul, setModul] = useState(-1)
    const [result, setResult] = useState<string[]>([])
    const [chatHistory, setChatHistory] = useState<{ status: boolean, text: string, flag: boolean }[]>([])
    const containerRef = useRef<HTMLDivElement>(null);


    function handleModul(value: number) {
        setModul(value);
    }

    function handleAdd() {
        setWait(true)
        setChatHistory(prev => [
            ...prev,
            { status: false, text: data, flag: false }
        ])
        setData("")

        setChatHistory(prev => [
            ...prev,
            { status: true, text: "", flag: true }
        ])


        setTimeout(() => {
            setChatHistory(prevItems => prevItems.slice(0, -1));
            setChatHistory(prev => [
                ...prev,
                { status: true, text: dummy, flag: false }
            ])
            setWait(false)
        }, 1000)
    }

    useEffect(() => {
        const container = containerRef.current;
        if (!container) return;
        const scroll = () => {
            // Check if content overflows container
            if (container.scrollHeight > container.clientHeight) {
                // Scroll to the bottom
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        };

        scroll()
        // chat.scrollTop = chat.scrollHeight;
    }, [chatHistory])

    return (

        <div className={`
            bg-[url('/image/background_general.svg')]
            bg-cover
            bg-center
            relative 
            w-screen 
            h-screen 
            bg-gray-200`}>
            {
                modul == -1 ?
                    <div className="md:p-20 p-3 pt-12 flex flex-col space-y-10 justify-center items-center h-full">
                        <div className="flex text-white flex-col items-center gap-2 animate-bounce">
                            <h1 className={`font-bold text-4xl md:text-6xl ${noto_sans_w.className}`}>Halo, Sobat UMKM</h1>
                            <p className={`text-2xl md:text-4xl ${noto_sans.className}`}>Apa yang ingin anda tanyakan?</p>
                        </div>
                        <div className="flex flex-col md:flex-row w-full justify-center gap-3">
                            {
                                avail_modul.map((item, index) => (
                                    <Item key={index} text={item} index={index} handleModul={handleModul} />
                                ))
                            }
                        </div>
                        {/* <div className="loader"></div> */}

                    </div>
                    :
                    <div className="h-full">
                        <div ref={containerRef} className="h-5/6 p-4 md:p-20 pt-12 flex flex-col gap-8 overflow-y-scroll">
                            <h1 className={`font-bold text-4xl ${roboto.className} animate-bounce text-center text-white md:text-black md:text-left`}>{avail_modul[modul]}</h1>
                            <div className="flex flex-col gap-8">
                                {
                                    chatHistory != undefined && chatHistory.length > 0 ?
                                        chatHistory.map((item, index) => (
                                            item.status ? <ChatServer key={index} flag={item.flag} text={item.text} /> : <ChatClient key={index} text={item.text} />
                                        ))
                                        :
                                        ""
                                }
                            </div>
                        </div>


                        <div className="h-1/6 z-100 w-full p-4 md:p-10 md:pl-20 md:pr-20 flex flex-row flex items-center">
                            <form className="relative w-full flex items-center">
                                <input
                                    disabled={wait}
                                    onChange={e => setData(e.target.value)}
                                    value={data}
                                    placeholder="Apa yang bisa dibantu?"
                                    className={`border border-1 shadow-lg w-full p-5 pt-3 pb-3 pr-12 rounded-full ${noto_sans_m.className}`} type="text" />

                                <button
                                    disabled={wait}
                                    onClick={e => { e.preventDefault(); handleAdd() }}
                                    className="w-fit h-fit absolute right-3">
                                    <img src="/image/send_icon.svg" className="w-8 h-8 flex justify-center items-center" alt="" />
                                </button>
                            </form>
                        </div>
                    </div>
            }
        </div >
    )
}