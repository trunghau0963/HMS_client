import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json();
        const { phoneNumber, password, role } = reqBody;
        console.log(reqBody);
        const respone = await axios.post("http://localhost:5000/auth/login", reqBody)
        console.log('respone data', respone.data);

        const response = NextResponse.json({
            message: "Successful",
            success: true,
            data: {
                userName: respone.data.userName,
                email: respone.data.email,
                phoneNumber: respone.data.phoneNumber,
            },
            accessToken: respone.data.accessToken
        });

        response.cookies.set("refreshToken", respone.data.refreshToken, {
            httpOnly: true,
        });
        return response;
    } catch (error: any) {
        console.error("Error in login:", error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
