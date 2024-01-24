import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma";
import { currentUser } from "@clerk/nextjs";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";

export async function POST(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  try {
    const user = await currentUser();

    if (!user || !user?.id || !user.emailAddresses?.[0].emailAddress) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const course = await prisma.course.findUnique({
      where: {
        id: params.courseId,
        isPublished: true,
      },
    });

    const purchase = await prisma.purchase.findUnique({
      where: {
        courseId_userId: {
          userId: user.id,
          courseId: params.courseId,
        },
      },
    });

    if (purchase) {
      return new NextResponse("Already purchase", { status: 400 });
    }
    if (!course) {
      return new NextResponse("Not found", { status: 404 });
    }

    const stripeParams: Stripe.Checkout.SessionCreateParams = {
      mode: "payment",
      line_items: [
        {
          quantity: 1,
          price_data: {
            currency: "USD",
            product_data: {
              name: course.title,
              description: course.description!,
            },
            unit_amount: Math.round(course.price! * 100),
          },
        },
      ],
      success_url: `${process.env.NEXT_PUBLIC_API_URL}/courses/${course.id}?success=1`,
      cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/courses/${course.id}?canceled=1`,
      metadata: {
        courseId: course.id,
        userId: user.id,
      },
    };

    let stripeCustomer = await prisma.stripCustomer.findUnique({
      where: {
        userId: user.id,
      },
      select: {
        stripeCustomerId: true,
      },
    });

    if (!stripeCustomer) {
      const stripeParams: Stripe.CustomerCreateParams = {
        email: user.emailAddresses[0].emailAddress,
      };
      const customer = await stripe.customers.create(stripeParams);

      stripeCustomer = await prisma.stripCustomer.create({
        data: {
          userId: user.id,
          stripeCustomerId: customer.id,
        },
      });
    }

    const checkoutSession: Stripe.Checkout.Session =
      await stripe.checkout.sessions.create(stripeParams);

    return NextResponse.json({ result: checkoutSession, ok: true });
  } catch (error) {
    console.log("purchase courses error", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
