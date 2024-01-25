import axios from "axios";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";



export async function GET(request: NextApiRequest) {
    try {

        console.log('request.query', request.query);
        
        const { id } = request.query;

        if (!id) {
            throw new Error("Missing 'id' parameter");
        }

        const fetch = await axios.get(`http://localhost:5000/patient/schedule-dentist/${id}`);
        console.log('schedule of dentist', fetch.data);

        const response = NextResponse.json(fetch.data);
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
