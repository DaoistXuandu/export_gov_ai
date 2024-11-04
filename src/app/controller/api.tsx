async function get_inatrims_response(input: string) {
    const result = await fetch(`https://chat-app-django.vercel.app/inatrims/`, {
        method: 'POST',
        body: JSON.stringify({
            description: input
        }),
        headers: {
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data)

    return result
}

async function get_market_response(input: string) {
    const result = await fetch(`https://chat-app-django.vercel.app/market/`, {
        // const result = await fetch(`http://localhost:8000/market/`, {
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
        // const data = await result.text();
        // console.log("RESULT", data)
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
            'content-type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => data)

    return result
}

export { get_inatrims_response, get_market_response, get_product_respons }