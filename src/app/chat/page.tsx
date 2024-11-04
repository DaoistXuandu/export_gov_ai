"use client"
import { Poppins, Noto_Sans, Roboto } from "next/font/google"
import { useEffect, useState, useRef } from "react"
import Item from "../components/item"
import ChatServer from "../components/chat_server"
import ChatClient from "../components/chat_client"
import { get_distribution_response, get_inatrims_response, get_market_response, get_product_respons } from "../controller/api"
import { useRouter } from "next/navigation"

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

const agent =
    [
        '[INFO] 📝 Memulai proses perencanaan (Planner)',
        '[INFO] ✅ Planner selesai menghasilkan outline',
        '[INFO] 🔍 Memulai perencanaan pencarian informasi (Web Planner)',
        '[INFO] 📋 Web Planner menghasilkan query pencarian',
        '[INFO] 🌐 Memulai proses pengambilan data dari web (Web Retriever)',
        '[INFO] 🔗 Web Retriever berhasil memperbarui konteks',
        '[INFO] 📊 Memulai proses penilaian (Grader)',
        '[INFO] ⏹️ Iterasi maksimum tercapai. Menghentikan proses iterasi.',
        '[INFO] ✍️ Memulai proses penulisan laporan akhir (Writer)'
    ]

const avail_modul = [
    "Agent Market Research",
    "Tanya Regulasi",
    "Agent Product R&D",
    "Tanya Pengiriman",
    "Prediksi Biaya"
]
const avail_modul_desc = [
    "Dapatkan analisis untuk memahami pasar dengan tepat",
    "Pastikan produk Anda mematuhi regulasi dan standar mutu di negara tujuan",
    "Dapatkan analisis untuk memahami pasar dengan tepat",
    "Tanya tentang pengiriman untuk ekspor Anda",
    "Perkirakan total biaya ekspor disini"
]

const first_message = [
    "Agent Market Research memudahkan Anda melakukan analisis SWOT (Strength, Weakness, Opportunities, Threats) dan STP (Segmenting, Targeting, Positioning) dengan bantuan AI yang bekerja secara otomatis. Proses ini mencari informasi di berbagai sumber, mengumpulkan data relevan, dan menyusunnya menjadi laporan lengkap tanpa perlu usaha manual. Anda hanya perlu memasukkan deskripsi produk Anda, dan laporan strategi yang komprehensif mencakup kekuatan, kelemahan, peluang, ancaman, serta segmentasi, penargetan, dan pemosisian pasar akan tersedia untuk membantu Anda memahami pasar dan mengambil keputusan terbaik.",
    "TanyaRegulasi memastikan produk Anda mematuhi regulasi dan standar mutu di negara tujuan. Terintegrasi dengan sumber resmi Inatrims, fitur ini menyediakan jawaban cepat dan akurat terkait regulasi dan standar mutu ekspor di negara tujuan, sehingga Anda dapat memastikan kepatuhan tanpa kerumitan. Dapatkan informasi yang Anda butuhkan untuk memastikan produk Anda siap menembus pasar internasional dengan mudah dan aman.",
    "TanyaRegulasi memastikan produk Anda mematuhi regulasi dan standar mutu di negara tujuan. Terintegrasi dengan sumber resmi Inatrims, fitur ini menyediakan jawaban cepat dan akurat terkait regulasi dan standar mutu ekspor di negara tujuan, sehingga Anda dapat memastikan kepatuhan tanpa kerumitan. Dapatkan informasi yang Anda butuhkan untuk memastikan produk Anda siap menembus pasar internasional dengan mudah dan aman.",
    "TanyaPengiriman memudahkan Anda menemukan solusi pengiriman ekspor terbaik. Dengan teknologi AI, fitur ini menyediakan informasi terkini dan daftar lokasi ekspor terdekat untuk mendukung pengiriman ekspor Anda.",
    "Estimasi Biaya membantu Anda merencanakan ekspor dengan lebih baik. Dengan Machine Learning, fitur ini membantu Anda mengestimasi total biaya ekspor."
]

export default function Chat() {
    const [wait, setWait] = useState(false)
    const [count, setCount] = useState(0)
    const [data, setData] = useState("")
    const [modul, setModul] = useState(-1)
    const [modal, setModal] = useState(false)
    const [chatHistory, setChatHistory] = useState<{ status: boolean, text: string, flag: boolean }[]>([])
    const containerRef = useRef<HTMLDivElement>(null);

    const router = useRouter()

    function handleModul(value: number) {
        setModul(value);
        if (value == 4) {
            router.push("/fee")
        }
    }

    async function handleAdd() {
        setWait(true)
        setModal(true)
        let current = data
        setChatHistory(prev => [
            ...prev,
            { status: false, text: data, flag: false }
        ])
        setData("")

        const interval = setInterval(() => {
            setCount(count => count + 1)
        }, 5000)


        setChatHistory(prev => [
            ...prev,
            { status: true, text: "", flag: true }
        ])

        // console.log(modul)
        if (modul == 0) {
            try {
                // console.log("Initiate response")
                await get_market_response(current).then(response => {
                    setChatHistory(prevItems => prevItems.slice(0, -1));
                    setChatHistory(prev => [
                        ...prev,
                        { status: true, text: response.writer.result, flag: false }
                    ])
                })
            } catch (error) {
                console.error("Error in getting response:", error);
            } finally {
                clearInterval(interval);
                setCount(0);
                setModal(false)
                setWait(false);
            }
        }
        else if (modul == 1) {
            try {
                // console.log("Initiate response")
                await get_inatrims_response(current).then(response => {
                    setChatHistory(prevItems => prevItems.slice(0, -1));
                    setChatHistory(prev => [
                        ...prev,
                        { status: true, text: response.result, flag: false }
                    ])
                })
            } catch (error) {
                console.error("Error in getting response:", error);
            } finally {
                clearInterval(interval);
                setCount(0);
                setModal(false)
                setWait(false);
            }
        }
        else if (modul == 2) {
            try {
                await get_product_respons(current).then(response => {
                    setChatHistory(prevItems => prevItems.slice(0, -1));
                    setChatHistory(prev => [
                        ...prev,
                        { status: true, text: response.writer.result, flag: false }
                    ])
                })
            } catch (error) {
                console.error("Error in getting response:", error);
            } finally {
                clearInterval(interval);
                setCount(0);
                setModal(false)
                setWait(false);
            }
        }
        else if (modul == 3) {
            try {
                await get_distribution_response(current).then(response => {
                    setChatHistory(prevItems => prevItems.slice(0, -1));
                    setChatHistory(prev => [
                        ...prev,
                        { status: true, text: response.result, flag: false }
                    ])
                })
            } catch (error) {
                console.error("Error in getting response:", error);
            } finally {
                clearInterval(interval);
                setCount(0);
                setModal(false)
                setWait(false);
            }
        }
        else {
            setTimeout(() => {
                setChatHistory(prevItems => prevItems.slice(0, -1));
                setChatHistory(prev => [
                    ...prev,
                    { status: true, text: "Sedang ada kendala!! Mohon mencoba sesaat lagi", flag: false }
                ])
                clearInterval(interval);
                setCount(0);
                setModal(false)
                setWait(false);
            }, 3000)
        }
    }

    const scroll = () => {
        const container = containerRef.current;
        if (!container) return;
        // Check if content overflows container
        if (container.scrollHeight > container.clientHeight) {
            // Scroll to the bottom
            container.scrollTo({
                top: container.scrollHeight,
                behavior: 'smooth'
            });
        }
    };

    useEffect(() => {
        scroll()
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
            <div className={`${(wait && modal) ? '' : 'hidden'} fixed z-100  bottom-32 right-2 md:right-20 transition ease-in-out duration-700  p-8 pt-6 pb-6 w-96 rounded-xl h-fit shadow-2xl bg-white ${poppins.className} flex flex-col gap-4`}>
                <div onClick={e => setModal(false)} className="rounded-full p-3 absolute -top-16 left-0 bg-white hover:scale-95 cursor-pointer shadow-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
                    </svg>
                </div>
                <h1 className="font-bold text-lg">Apa yang AI sedang lakukan??</h1>
                <div className="text-sm flex flex-col gap-1">
                    {
                        agent.map((item, index) =>
                            <div className={`${index > count ? 'hidden' : ''}  ${index == count ? 'text-red-400' : ''} `} key={index}>{item}</div>
                        )
                    }
                </div>
            </div>

            {
                modul == -1 ?
                    <div className="md:p-20 p-3 pt-12 flex flex-col space-y-10 justify-center items-center h-full">
                        <div className="flex text-white flex-col items-center gap-2 animate-bounce">
                            <h1 className={`font-bold text-4xl md:text-6xl ${noto_sans_w.className}`}>Halo, Sobat UMKM</h1>
                            <p className={`text-2xl md:text-4xl ${noto_sans.className}`}>Apa yang ingin anda tanyakan?</p>
                        </div>
                        <div className="flex flex-col md:flex-row w-full flex-wrap justify-center gap-3">
                            {
                                avail_modul.map((item, index) => (
                                    <Item key={index} desc={avail_modul_desc[index]} text={item} index={index} handleModul={handleModul} />
                                ))
                            }
                        </div>
                    </div>
                    :
                    <div className="h-full">
                        <div ref={containerRef} className="h-5/6 p-4 md:p-20 pt-12 flex flex-col gap-8 overflow-y-scroll">
                            <h1 className={`font-bold text-4xl ${roboto.className} animate-bounce text-center text-white md:text-black md:text-left`}>{avail_modul[modul]}</h1>
                            <div className="flex flex-col gap-8">
                                <ChatServer key={-1} flag={false} text={first_message[modul]} last={false} />
                                {
                                    chatHistory != undefined && chatHistory.length > 0 ?
                                        chatHistory.map((item, index) => (
                                            item.status ? <ChatServer key={index} flag={item.flag} text={item.text} last={index == chatHistory.length - 1} /> : <ChatClient key={index} text={item.text} />
                                        ))
                                        :
                                        ""
                                }
                            </div>
                        </div>


                        <div className="h-1/6 z-50 w-full p-4 md:p-10 md:pl-20 md:pr-20 flex flex-row flex items-center">
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