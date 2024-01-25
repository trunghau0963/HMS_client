import axios from "axios";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        const fecth = await axios.get('http://localhost:5000/drug/unavailable');
        console.log('drug unavailable list', fecth.data);
        const response = NextResponse.json(fecth.data);
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
