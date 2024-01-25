import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const response = await axios.delete(`http://localhost:5000/dentist/appointment/${reqBody.idDentist}/delete`, {
            data: {
                idPatient: reqBody.idPatient,
                idDentist: reqBody.idDentist,
                date: reqBody.date,
                time: reqBody.time
            }
        })
        console.log('response data', response.data);

        const nextResponse = NextResponse.json({
            message: "Successful",
            success: true,
        });
        return nextResponse;
    } catch (error: any) {
        console.error("Error in login:", error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}