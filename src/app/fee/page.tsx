"use client"
import { Poppins, Noto_Sans, Roboto } from "next/font/google"
import { it } from "node:test";
import { useEffect, useState } from "react";
import { get_data } from "../controller/api";

const poppins = Poppins({
    weight: '400',
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

const keys = [
    "hs_code",
    "kategori_barang",
    "deskripsi_produk",
    "tujuan_negara",
    "kota_asal",
    "provinsi_asal",
    "kuantitas",
    "volume_m3",
    "berat_kg",
    "hpp"
];

const options = [[
    '4802.56',
    '8421.39',
    '207.14',
    '2201.1',
    '6307.9',
],
[
    'Kertas',
    'Mesin pembersih udara',
    'Daging ayam',
    'Air mineral',
    'Masker medis'
], [
    'Kertas yang digunakan untuk menulis atau mencetak',
    'Mesin penyaring udara untuk keperluan domestik',
    'Daging ayam beku, potongan',
    'Air mineral dan air soda',
    'Masker pelindung untuk medis'
], [
    'Malaysia',
    'Filipina',
    'Kamboja',
    'Vietnam',
    'Singapura'
], [
    'Jakarta',
    'Yogyakarta',
    'Semarang',
    'Bogor',
    'Surabaya'
],
[
    'DKI Jakarta',
    'DI Yogyakarta',
    'Jawa Tengah',
    'Jawa Barat',
    'Jawa Timur'
]
]
const keyLabels = [
    ["hs_code", "HS Code"],
    ["kategori_barang", "Kategori Barang"],
    ["deskripsi_produk", "Deskripsi Produk"],
    ["tujuan_negara", "Tujuan Negara"],
    ["kota_asal", "Kota Asal"],
    ["provinsi_asal", "Provinsi Asal"],
    ["kuantitas", "Kuantitas"],
    ["volume_m3", "Volume (m³)"],
    ["berat_kg", "Berat (Kg)"],
    ["hpp", "HPP"]
];

const outputLabels = [
    ["asuransi", "Asuransi"],
    ["bank_charge", "Bank Charge"],
    ["bea_keluar", "Bea Keluar"],
    ["biaya_pengemasan", "Biaya Pengemasan"],
    ["bunga_pajak", "Bunga Pajak"],
    ["dokumen_ekspor", "Dokumen Ekspor"],
    ["forwarder", "Forwarder"],
    ["freight", "Freight"],
    ["komisi_broker", "Komisi Broker"],
    ["operasional_lainnya", "Operasional Lainnya"],
    ["pergudangan", "Pergudangan"],
    ["thc", "THC"],
    ["trucking", "Trucking"]
];


export default function Fee() {
    const [inputData, setInputData] = useState<(string | number)[]>([options[0][0], options[1][0], options[2][0], options[3][0], options[4][0], options[5][0], 0, 0, 0, 0])
    const [outputData, setOutputData] = useState<string[]>(["0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0", "0"])
    const [wait, setWait] = useState(false)

    async function handleClick(e: any) {
        e.preventDefault()
        setWait(true)
        const data = await get_data(inputData)
        if (!data.state) {
            alert("Input yang anda berikan harus valid, cek kembali HS Code, Kategori Barang dll")
            setWait(false)
            return
        }
        const result = data.data.data[0].data

        let items: any = []
        for (let key in result) {
            items.push(result[key])
        }
        setOutputData(items)

        setWait(false)
    }

    function handleInput(index: number, value: string) {
        setInputData(prev => {
            let items = [...prev]
            items[index] = value
            if (index == 4) {
                for (let i = 0; i < options[index].length; i++) {
                    if (options[index][i] == value) {
                        items[index + 1] = options[index + 1][i]
                    }
                }
            }
            return items;
        })
    }

    return (
        <div className={`
            bg-[url('/image/background_general.svg')]
            bg-cover
            bg-center
            relative 
            w-screen 
            min-h-screen 
            bg-gray-200 
            p-4 md:p-12 lg:pl-32 lg:pr-32 
            fixed
            flex flex-col-reverse md:flex-row
            gap-10
            `}>

            <div className={`relative md:w-1/2 bg-white shadow-lg rounded-2xl border h-fit ${noto_sans_m.className} flex flex-col gap-2`}>
                <div className={`${wait ? '' : 'hidden'} absolute w-full h-full bg-white rounded-2xl opacity-60 flex justify-center items-center`}>
                    <div className="loader"></div>
                </div>
                <div className="w-full flex  flex-row gap-8 p-10">
                    <div className="w-full flex flex-col gap-8">
                        <h1 className="font-bold text-3xl">Rencana Pembelian</h1>

                        <div className="flex flex-col gap-1">
                            {
                                keys.map((item, index) => (
                                    <div key={index} className={`flex flex-col ${index == 5 ? 'hidden' : ''}`}>
                                        <label className="text-md" htmlFor={item}>{keyLabels[index][1]}</label>
                                        {
                                            index < 6 ?
                                                <select onChange={e => handleInput(index, e.target.value)} key={index} className={`rounded-lg bg-gray-200 text-sm p-3 `} >
                                                    {options[index].map((item, index) => (
                                                        <option key={index} >{item}</option>
                                                    ))}
                                                </select>
                                                :
                                                <input value={inputData[index]}
                                                    onChange={e => handleInput(index, e.target.value)}
                                                    className="rounded-lg bg-gray-200 text-sm p-3"
                                                    placeholder={keyLabels[index][0]} required={true}
                                                    type='number'
                                                    id={item}
                                                    name={item} />
                                        }
                                    </div>
                                ))
                            }
                        </div>
                        <button disabled={wait} onClick={e => handleClick(e)} className={`${wait ? 'bg-blue-200' : ''} cursor-pointer p-3 bg-blue-400 font-bold text-white rounded-lg hover:scale-95`} >Prediksi Biaya</button>
                    </div>
                </div>
            </div>

            <div className={`md:w-1/2 bg-white shadow-lg rounded-2xl border h-fit p-10 ${noto_sans_m.className} flex flex-col gap-2`}>
                <div className="w-fit flex flex-col gap-4">
                    <div className="font-bold w-fit flex flex-col justify-start items-start">
                        <h1 className="text-xl">Estimasi total:</h1>
                        <p className={`text-5xl ${noto_sans_w.className} font-bold`}>{outputData[outputData.length - 1] == "0" ? "N/A" : `Rp ${outputData[outputData.length - 1]},00`}</p>
                    </div>
                    <div className="flex flex-col w-full">
                        {
                            outputLabels.map((item, index) => (
                                <div key={index} className="flex flex-row">
                                    <div className="w-1/2">
                                        {item[1]}
                                    </div>
                                    <div className="w-1/2">
                                        : Rp {outputData[index]},00
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>

        </div >
    )
}