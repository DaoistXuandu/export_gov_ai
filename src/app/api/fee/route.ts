import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { Client } from "@gradio/client";

export async function POST(request: NextRequest) {
    try {
        const data = await request.json()
        // console.log("TS", data)
        const client = await Client.connect("cavalierplance/fee-calculator");
        const result = await client.predict("/predict", {
            name: data
        });

        return NextResponse.json({
            message: "succes",
            data: result,
            state: true
        }, { status: 200 })
    }
    catch (err) {
        return NextResponse.json({
            message: "Err: " + err,
            data: null,
            state: false
        }, { status: 400 })
    }
}