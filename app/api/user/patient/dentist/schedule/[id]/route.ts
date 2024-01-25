import { NextApiRequest } from 'next';
import { NextResponse } from 'next/server';
import axios from 'axios';

export async function GET(request: NextApiRequest) {
  try {
    console.log('id', request.query);

    const { id } = request.query;

    if (!id) {
      throw new Error("Missing 'id' parameter");
    }

    const fetch = await axios.get(`http://localhost:5000/patient/schedule-dentist/${id}`);
    console.log('schedule of dentist', fetch.data);

    return NextResponse.json(fetch.data);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}