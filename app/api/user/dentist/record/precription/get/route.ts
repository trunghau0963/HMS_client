import axios from "axios";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";


export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;
        const fetch = await axios.get(`http://localhost:5000/dentist/record/precription/${id}`);
        console.log('prescription of record', fetch.data);

        return NextResponse.json(fetch.data);

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
