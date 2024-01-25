import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log('data', reqBody);
        const data = await axios.post("http://localhost:5000/auth/signup", reqBody)
        console.log('response data', data.data);

        return NextResponse.json({
            message: "Successful",
            success: true,
            data: data.data,
        });
    } catch (error: any) {
        console.error("Error in login:", error);
        if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
        } else if (error.request) {
            console.log(error.request);
        } else {
            console.log('Error', error.message);
        }
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}