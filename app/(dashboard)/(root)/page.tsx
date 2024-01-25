import { getDashboardCourse } from "@/actions/get-dashboard-courses";
import CourseList from "@/components/shared/course-list";
import { auth } from "@clerk/nextjs";
import { CheckCircle, Clock } from "lucide-react";
import { redirect } from "next/navigation";
import React from "react";
import InfoCard from "./_components/info-card";

const Dashboard = async () => {
  const { userId } = auth();
  if (!userId) {
    return redirect("/");
  }
  const { completedCourse, incompleteCourse } = await getDashboardCourse(
    userId
  );

  return (
    <div className="p-6 space-x-4">
      <div className="grid grid-cols-1 md:grid-cols-2 p-4 gap-x-4">
        <InfoCard
          numberOfCourse={incompleteCourse.length}
          icon={Clock}
          label="In Progress"
          type="default"
        />
        <InfoCard
          numberOfCourse={completedCourse.length}
          icon={CheckCircle}
          label="Completed"
          type="success"
        />
      </div>
      <CourseList items={[...incompleteCourse, ...completedCourse]} />
    </div>
  );
};

export default Dashboard;
