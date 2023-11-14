import { auth } from "@clerk/nextjs";
import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const { userId } = auth();
    const { title } = await req.json();
    console.log(title);

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.create({
      data: {
        title,
        userId,
      },
    });
    return NextResponse.json({ message: "Course created", ...course });
  } catch (error) {
    console.log("creating courses error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
