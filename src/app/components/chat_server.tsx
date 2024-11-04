import { Poppins } from "next/font/google"
import { useEffect, useState } from "react";
import { remark } from 'remark';
import html from 'remark-html';

const poppins = Poppins({
    weight: '400',
    subsets: ['latin'],
})

export default function ChatServer({ text, flag, last }: { text: any, flag: boolean, last: boolean }) {
    const [data, setData] = useState<string>("")

    async function markdownToHtml(markdown: string) {
        const result = await remark().use(html).process(markdown);
        setData(result.toString())
    }

    useEffect(() => {
        if (text) {
            markdownToHtml(text)
        }
    }, [text])

    return (
        <div className="flex flex-row gap-2">
            <div className="w-fit">
                <img src="https://github.com/shadcn.png" className="w-12 h-12 rounded-full" />
            </div>
            <div className="w-fit">
                <div className={`${last && !flag ? ' ' : 'hidden'} font-bold text-red-400 ${poppins.className}`}>Pesan terakhir</div>
                {
                    flag ? (
                        <div className="loader"></div>
                    ) : (
                        <div
                            id="content"
                            dangerouslySetInnerHTML={{ __html: data }}
                            className={`bg-white rounded-sm p-3 ${poppins.className} shadow-lg`}
                        />
                    )
                }
            </div>
        </div>
    )
}
