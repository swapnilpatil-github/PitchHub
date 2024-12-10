import StartupModel from "@/app/models/Pitch"
import { NextResponse } from "next/server";


export async function POST(request,{params}){
    const { id } = await params  // Access query parameter using nextUrl.searchParams
    
    // console.log(id)
    try {
        const startup = await StartupModel.findById(id);
        if(!startup){
            return NextResponse.json({
                message:"Pitch Not Found",
                status:404
            })
        }
        startup.views += 1
        await startup.save()
        return NextResponse.json({
            message: "Document updated successfully",
            updatedCount: startup.views,
          });
    } catch (error) {
        // console.error("Error updating views:", error);
        return res.status(500).json({ message: "Failed to update views" });
      }
} 
  