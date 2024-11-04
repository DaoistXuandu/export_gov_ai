import { Poppins } from "next/font/google"

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})
export default function Item({ text, index, handleModul, desc }: { text: string, index: number, desc: string, handleModul: (value: number) => void }) {
    return (
        <div className={`
            rounded-xl 
            text-indigo-900
            bg-white
            hover:bg-gray-200
            min-w-40
            flex items-center md:items-start
            cursor-pointer 
            p-4 md:p-8 pt-4 pb-4 border-white
            shadow-lg
            gap-2
            flex
            flex-row
            md:flex-col
            ${poppins.className}`}
            onClick={e => handleModul(index)}
        >

            <img src="/image/search.svg" className="w-5 h-5 md:w-8 md:h-8" alt="" />
            <p className="font-bold text-2xl text-left">
                {text}
            </p>
            <p className="text-md">
                {desc}
            </p>
        </div>
    )
}