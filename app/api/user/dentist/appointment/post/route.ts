import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const response = await axios.post(`http://localhost:5000/dentist/add-appointment`, reqBody)
        console.log('response data', response.data);

        const nextResponse = NextResponse.json({
            message: "Successful",
            success: true,
            data: {
                idDentist: response.data.idDentist,
                idPatient: response.data.idPatient,
                dateOfAppointment: response.data.dateOfAppointment,
                timeOfAppointment: response.data.timeOfAppointment,
            },
        });
        return nextResponse;
    } catch (error: any) {
        console.error("Error in login:", error);
        return NextResponse.json({ error: error.message }, { status: 404 });
    }
}