import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Poor_Story, Poppins } from "next/font/google"

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})

export default function ChatClient({ text }: { text: string }) {
    return (
        <div className="flex flex-row gap-2 justify-end">
            <div className={`bg-white rounded-sm p-3 ${poppins.className} shadow-lg`}>
                {text}
            </div>
            <div>
                <img src="https://github.com/DaoistXuandu.png" className="w-12 h-12 rounded-full" />
            </div>
        </div>
    )
}