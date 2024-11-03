"use client"
import { Roboto, Noto_Sans, Poppins } from 'next/font/google'
import { useRouter } from 'next/navigation'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

const poppins = Poppins({
  weight: '400',
  subsets: ['latin'],
})


const noto_sans = Noto_Sans({
  weight: '700',
  subsets: ['latin'],
})

export default function Home() {
  const router = useRouter()

  return (
    <div className="bg-cover bg-center bg-gray-100 w-screen h-screen bg-[url('/image/background_general.svg')]">
      <div className={`text-white w-full md:text-black sm:${noto_sans.className} md:${poppins.className} h-full flex flex-col justify-center p-10 md:p-20 gap-8 md:gap-6`}>
        <div className='w-fit mx-auto md:mx-0'>
          <div className="font-bold flex flex-row justify-start items-start text-5xl text-center md:text-left md:text-8xl animate-type">Sobat UMKM</div>
          <p className="animate-bounce text-center text-lg md:text-md md:text-left md:text-3xl font-medium">Bantu UMKM, Taklukkan Pasar Global</p>
        </div>
        <div className='sm:w-full md:w-fit flex sm:mx-auto md:mx-0'>
          <button onClick={e => router.push("/chat")} className={`
          animate-bounce
          rounded-sm 
          p-10
          pt-4 pb-4
          md:pt-2 md:pb-2
          w-full
          border-indigo-500 
          bg-indigo-500 text-white 
          font-bold 
          border-2 
          transition hover:scale-105 overflow-hidden
          whitespace-nowrap overflow-hidden text-ellipsis
          shadow-lg
          ${noto_sans.className} `}>
            Mulai Percakapan
          </button  >
        </div>
      </div>
    </div>
  );
}
