import { AuthRoutes } from "@/enum";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  try {
    const server_url = process.env.SERVER_URL;
    const api_root = process.env.API_ROOT;
    console.log("server_url", server_url);
    console.log("api_root", api_root);
    const reqBody = await request.json();
    // const { phoneNumber, password, role } = reqBody;
    const respone = await axios.post(
      `${server_url}${api_root}${AuthRoutes.LOGIN}`,
      reqBody
    );

    console.log("respone", respone);
    // console.log("respone data", respone.data);

    const response = NextResponse.json({
      message: "Successful",
      success: true,
      data: {
        userName: respone.data.userName,
        email: respone.data.email,
        phoneNumber: respone.data.phoneNumber,
      },
      accessToken: respone.data.accessToken,
    });

    response.cookies.set("refreshToken", respone.data.refreshToken, {
      httpOnly: true,
    });
    return response;
  } catch (error: any) {
    console.error("Error in login:", error);
    return NextResponse.json({ error: error.message }, { status: 404 });
  }
}
