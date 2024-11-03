import { Poppins } from "next/font/google"

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})
export default function Item({ text, index, handleModul }: { text: string, index: number, handleModul: (value: number) => void }) {
    return (
        <div className={`
            rounded-xl 
            text-indigo-900
            bg-white
            hover:bg-gray-200
            flex items-center
            cursor-pointer 
            p-4 md:p-8 pt-4 pb-4 border-white
            shadow-lg
            gap-2
            ${poppins.className}`}
            onClick={e => handleModul(index)}
        >

            <img src="/image/search.svg" className="w-5 h-5" alt="" />
            <p className="font-bold text-lg text-left gap-2">
                {text}
            </p>
        </div>
    )
}