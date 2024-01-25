import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const { date, time } = reqBody;
        console.log(reqBody.idDentist, reqBody);
        const response = await axios.post(`http://localhost:5000/dentist/schedule/${reqBody.idDentist}`, {
            data: {
                date: date,
                time: time
            }
        })
        console.log('response data', response.data);

        const nextResponse = NextResponse.json({
            message: "Successful",
            success: true,
            data: {
                idDentist: response.data.idDentist,
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