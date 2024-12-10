import connectDB from "../../database/connectDB";
import StartupModel from "@/app/models/Pitch";
import axios from "axios";
import { getToken } from "next-auth/jwt";
// import { getSession } from "next-auth/react";

import { NextResponse } from "next/server";

export async function POST(request) {
  const secret = process.env.NEXTAUTH_SECRET;
  const token = await getToken({req:request,secret});
  // console.log(token)
  if (!token) {
    // console.log("check bro")
    return NextResponse.json({ message: "You must be logged in to create a pitch" },{status:201});
  }
  
  try {
    
    
    connectDB()
    const {title,description,category,pitchArticle,imgURL} =await request.json()
    // const userEmail = session.user.email;
    const userEmail = token.email
    if(!title || !description || !category || !pitchArticle || !imgURL){
      return NextResponse.json({
        message: "Please fill All the fields" ,
         status: 400 }
      )
    }

    const newPitch = new StartupModel({
      title,
      description,
      category,
      pitchArticle,
      imgURL,
      userEmail
    })
    const response = await newPitch.save()
    // console.log("post saved")
    
    return NextResponse.json({
      message:"Pitch created Successfully",
      data:response
    },{
      status:201
    })
  } catch (error) {
    // Handle any errors and return an appropriate response
    // console.error("Error creating pitches:", error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}

export async function GET(request){
  try {
    connectDB();
    const pitches = await StartupModel.find();
    return NextResponse.json({
      data:pitches,
      message:"Data Fetched Successfully"
    })
    
  } catch (error) {
    // console.error("Error creating pitch:", error.message);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error.message,
      },
      { status: 500 }
    );
  }
}