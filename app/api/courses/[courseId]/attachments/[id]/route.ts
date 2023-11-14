import { auth } from "@clerk/nextjs";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    await prisma.attachment.delete({
      where: { id: params.id },
    });

    return NextResponse.json({ message: "Course attachment deleted" });
  } catch (error) {
    console.log("creating courses error", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
