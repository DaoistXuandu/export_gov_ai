async function get_inatrims_response(input: string) {
    const result = await fetch(`https://chat-app-django.vercel.app/inatrims/`, {
        method: 'POST',
        body: JSON.stringify({
            description: input
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    })
        .then(response => response.json())
        .then(data => data)

    return result
}

async function get_market_response(input: string) {
    const result = await fetch(`https://chat-app-django.vercel.app/market/`, {
        method: 'POST',
        body: JSON.stringify({
            description: input
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    })
        .then(response => response.json())
        .then(data => data)

    return result
}


async function get_product_respons(input: string) {
    const result = await fetch(`https://chat-app-django.vercel.app/product/`, {
        method: 'POST',
        body: JSON.stringify({
            description: input
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    })
        .then(response => response.json())
        .then(data => data)

    return result
}


async function get_distribution_response(input: string) {
    const result = await fetch(`${process.env.NEXT_PUBLIC_ENDPOINT}distributor/`, {
        method: 'POST',
        body: JSON.stringify({
            description: input
        }),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    })
        .then(response => response.json())
        .then(data => data)

    return result
}



async function get_data(input: (string | number)[]) {
    let data = {
        'hs_code': input[0],
        'kategori_barang': input[1],
        'deskripsi_produk': input[2],
        'tujuan_negara': input[3],
        'kota_asal': input[4],
        'provinsi_asal': input[5],
        'kuantitas': Number(input[6]),
        'volume_m3': Number(input[7]),
        'berat_kg': Number(input[8]),
        'hpp': Number(input[9])
    }

    const result = await fetch(`${process.env.NEXT_PUBLIC_PORT}api/fee`, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "GET,HEAD,OPTIONS,POST,PUT",
            "Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept, Authorization"
        }
    })
        .then(response => response.json())
        .then(data => data)

    return result
}


export { get_inatrims_response, get_market_response, get_product_respons, get_distribution_response, get_data }
