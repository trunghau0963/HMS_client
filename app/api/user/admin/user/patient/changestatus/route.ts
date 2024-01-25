import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { id } = reqBody;
        console.log('id:', id); 
        const dataToSend = { role: 'Patient' }; 
        const fetch = await axios.put(`http://localhost:5000/admin/changestatus/${id}`, dataToSend);
        console.log('patient change', fetch.data);
        const response = new NextResponse(fetch.data);
        return response;

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
