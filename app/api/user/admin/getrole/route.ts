import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export function GET(request: NextRequest, response: NextResponse) {
    try {
        const refreshToken = request.cookies.get("refreshToken");
        console.log('refreshToken', refreshToken)
        const data = axios.post("http://localhost:5000/auth/role", refreshToken);
        console.log('response data', data);

        const response = NextResponse.json({
            message: "Successful get role",
            success: true,
            data: data,
        });
        return response;
    } catch (error: any) {
        console.error("Error get Role :", error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}
