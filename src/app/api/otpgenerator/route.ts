import otpGenerator from 'otp-generator';
import { NextResponse } from "next/server";

export async function GET() {
    const otp = otpGenerator.generate(6, {
        digits: true,
        lowerCaseAlphabets: true,
        upperCaseAlphabets: true,
        specialChars: false,
    });
    
    return NextResponse.json({ otp }, {
        headers: {
        "Content-Type": "application/json",
        },
    });
}