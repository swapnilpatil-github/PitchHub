import connectDB from "@/app/database/connectDB";
import StartupModel from "@/app/models/Pitch";
import { connection } from "mongoose";
import { NextResponse } from "next/server";

export async function GET(request,{params}){

    try {
        connectDB()
        const {id} =await params
        const singlePitch = await StartupModel.findById(id)

        if (!singlePitch) {
            return NextResponse.json(
              { message: "Pitch not found" },
              { status: 404 }
            );
          }
        
        return NextResponse.json({
            data:singlePitch,
            message:"Pitch found successfully",
        })
    } catch (error) {
        // console.error("Error fetching pitch:", error.message);
        return NextResponse.json(
          { message: "Failed to fetch pitch", error: error.message },
          { status: 500 }
        );
      }
    }

  export async function DELETE(request,{params}){
    const {id} = await params
    try {
      connectDB()
      const pitch = await StartupModel.findByIdAndDelete(id)
      if(!pitch){
        return NextResponse.json({
          message:"Pitch not found",
        })
      }
      return NextResponse.json({
        message:"Pitch deleted successfully",
        status:200
      })
    } catch (error) {
      // console.error("Error fetching pitch:", error.message);
      return NextResponse.json(
        { message: "Failde to Delete pitch", error: error.message },
        { status: 500 }
      );
    }
  }