import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(request: NextRequest,  response: NextResponse) {
    try {
        const refreshTokenFromCookie: string = request.cookies.get("refreshToken")?.value || "";
        console.log('token', refreshTokenFromCookie);

        const user: any = await new Promise((resolve) => {
            jwt.verify(
                refreshTokenFromCookie,
                process.env.REFRESH_TOKEN_KEY || "",
                (err: any, user: any) => {
                    if (err) {
                        return resolve(null); // Resolve with null if there's an error
                    }
                    resolve(user);
                }
            );
        });
        console.log('user', user.sub);
        const fetch = await axios.get(`http://localhost:5000/dentist/appointment/${user.sub}`);
        console.log('appointment of dentist', fetch.data);

        return NextResponse.json(fetch.data);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
