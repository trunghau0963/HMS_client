import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";
import { jwtConstants } from "@/constant";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("accessToken")?.value || "";
    console.log("token in getDataFromToken: ", token);
    const verify: any = jwt.verify(
      token,
      process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY!
    );
    console.log("verify in getDataFromToken: ", verify);
    return verify;
  } catch (error: any) {
    console.log("error in getDataFromToken: ", error.message);
    throw new Error(error.message);
  }
};

export const getDataFromAccessToken = (accessToken: string) => {
  const token = accessToken || "";
  console.log("token in getDataFromToken: ", token);
  console.log("access token: ", jwtConstants.access);
  const verify = jwt.verify(accessToken, jwtConstants.access);
  console.log("verify in getDataFromToken: ", verify);
  return verify;
};
