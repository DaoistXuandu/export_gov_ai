"use client"
import { Poppins, Noto_Sans, Roboto } from "next/font/google"
import { useEffect, useState, useRef } from "react"
import Item from "../components/item"
import ChatServer from "../components/chat_server"
import ChatClient from "../components/chat_client"
import { get_market_response } from "../controller/api"
import { RSC_SEGMENTS_DIR_SUFFIX } from "next/dist/lib/constants"

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

const data_markdown = `# Laporan Ekspor ke ASEAN: Produk Sawit

## SWOT Analysis

### Strengths
Industri sawit di Indonesia memiliki beberapa keunggulan yang signifikan. Pertama, kualitas dan produktivitas perkebunan sawit di Indonesia tergolong tinggi, menjadikannya salah satu produsen utama di dunia. Hal ini didukung oleh kebijakan pemerintah yang proaktif dalam mendukung industri sawit, termasuk kebijakan ekspor yang memfasilitasi akses ke pasar internasional. Selain itu, jaringan distribusi yang sudah mapan di negara-negara ASEAN memberikan keuntungan kompetitif bagi produk sawit Indonesia dalam menjangkau konsumen di kawasan tersebut.

### Weaknesses
Namun, industri sawit Indonesia juga menghadapi beberapa kelemahan. Salah satu isu utama adalah masalah lingkungan dan keberlanjutan yang dapat mempengaruhi citra produk sawit di pasar global. Selain itu, ketergantungan pada pasar tertentu dan fluktuasi harga menjadi tantangan yang harus dihadapi oleh para pelaku industri. Kurangnya sertifikasi internasional untuk produk sawit juga menjadi hambatan dalam meningkatkan daya saing di pasar internasional. Menurut [Warta Ekonomi](https://wartaekonomi.co.id/read541879/gppi-beberkan-tantangan-akbar-dalam-industri-sawit-indonesia), produktivitas yang dinilai masih rendah dan tantangan dalam rantai pasok juga menjadi perhatian utama.

### Opportunities
Di sisi lain, terdapat peluang besar bagi industri sawit Indonesia di pasar ASEAN. Permintaan yang meningkat untuk minyak sawit di negara-negara ASEAN membuka peluang ekspor yang lebih luas. Selain itu, terdapat kesempatan untuk menjalin kemitraan dengan perusahaan lokal di ASEAN, yang dapat memperkuat posisi produk sawit Indonesia di pasar tersebut. Potensi untuk diversifikasi produk turunan dari sawit juga memberikan peluang untuk meningkatkan nilai tambah dan daya saing produk di pasar internasional.

### Threats
Industri sawit Indonesia juga dihadapkan pada berbagai ancaman. Persaingan dari negara penghasil sawit lainnya, seperti Malaysia, menjadi tantangan yang harus dihadapi. Selain itu, regulasi ketat terkait keberlanjutan dan lingkungan di negara tujuan ekspor dapat mempengaruhi akses pasar. Perubahan kebijakan perdagangan internasional juga dapat berdampak pada akses pasar dan daya saing produk sawit Indonesia. Menurut [Eurasia Review](https://www.eurasiareview.com/01092024-indonesias-palm-oil-strategy-navigating-new-challenges-and-opportunities-analysis/), tantangan dari regulasi Uni Eropa terkait deforestasi menjadi salah satu isu yang harus diatasi untuk memastikan keberlanjutan industri sawit Indonesia.

## STP (Segmenting, Targeting, Positioning)
Dalam strategi pemasaran produk sawit di ASEAN, segmentasi pasar dilakukan berdasarkan kebutuhan dan preferensi konsumen di masing-masing negara. Targeting difokuskan pada segmen pasar yang paling menguntungkan, dengan mempertimbangkan faktor-faktor seperti permintaan dan daya beli konsumen. Positioning produk sawit Indonesia diarahkan untuk menonjolkan kualitas dan keberlanjutan, sehingga dapat menjadi pilihan utama bagi konsumen di pasar ASEAN. Dengan pendekatan ini, diharapkan produk sawit Indonesia dapat memperkuat posisinya di pasar regional dan meningkatkan volume ekspor.`


const avail_modul = ["Riset Pasar", "Regulasi dan Standar Mutu", "Riset Produk dan Pengembangan"]
const first_message = [
    "Ayo tanyakan kondisi pasar internasional disini!!!",
    "Bingung regulasi ekspor impor? Jangan ragu tanya disini!!",
    "Tulis deskripsi produkmu!! Langkah awal menaklukkan pasar dunia!"
]

export default function Chat() {
    const [wait, setWait] = useState(false)
    const [count, setCount] = useState(0)
    const [data, setData] = useState("")
    const [modul, setModul] = useState(-1)
    const [result, setResult] = useState<string[]>([])
    const [modal, setModal] = useState(false)
    const [chatHistory, setChatHistory] = useState<{ status: boolean, text: string, flag: boolean }[]>([])
    const containerRef = useRef<HTMLDivElement>(null);


    function handleModul(value: number) {
        setModul(value);
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
        console.log(chatHistory)
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