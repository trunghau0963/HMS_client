import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    console.log("sign out");
    const response = NextResponse.json({
      message: "Logout successful",
      success: true,
    });
    localStorage.set("refreshToken", "", {
      httpOnly: true,
      expires: new Date(0),
    });
    return response;
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
