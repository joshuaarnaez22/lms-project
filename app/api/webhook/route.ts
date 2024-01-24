import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  try {
    const body = await req.text();
    const signature = headers().get("Stripe-Signature") as string;

    let event: Stripe.Event;
    try {
      event = Stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (error: any) {
      return new NextResponse(`Webhook error: ${error.message}`, {
        status: 500,
      });
    }
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session?.metadata?.userId;
    const courseId = session?.metadata?.courseId;

    if (event.type === "checkout.session.completed") {
      if (!userId || !courseId) {
        return new NextResponse("Webhook error missing metadata", {
          status: 400,
        });
      }

      await prisma.purchase.create({
        data: {
          userId,
          courseId,
        },
      });
    } else {
      return new NextResponse(`Unhandled event type: ${event.type}`, {
        status: 200,
      });
    }

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.log("[WEBHOOK_ERROR]", error);

    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
