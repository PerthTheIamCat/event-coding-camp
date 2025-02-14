import otpGenerator from 'otp-generator';
import { NextResponse } from "next/server";

export async function GET() {
    
    for (let i = 0; i < 20; i++) {
        const otp = otpGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: true,
            specialChars: false,
        });
        console.log(i+1," : ",otp);
    }

    return NextResponse.json({}, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}