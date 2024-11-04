import { Poppins } from "next/font/google"

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})

export default function ChatClient({ text }: { text: any }) {
    return (
        <div className="flex flex-row gap-2 justify-end w-full">
            <div className={`w-fit bg-white rounded-sm p-3 ${poppins.className} shadow-lg`}>
                {text}
            </div>
            <div className="w-fit">
                <img src="https://github.com/DaoistXuandu.png" className="w-12 h-12 rounded-full" />
            </div>
        </div>
    )
}