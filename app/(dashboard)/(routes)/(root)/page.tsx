import { getDashBoardCourses } from "@/actions/get-dashboard-courses";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import CourseList from "../search/_components/courses-list";
import { CheckCircle, Clock } from "lucide-react";
import InfoCard from "./_components/info-card";

export default async function Dashboard() {
  const {userId} = auth();

  if (!userId) return redirect('/');

  const {completedCourses,courseInProgress} = await getDashBoardCourses(userId);


  return (
    <div className="p-6 space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard
          icon={Clock}
          label="In Progress"
          numberOfItems={courseInProgress.length}
        />
        <InfoCard
          icon={CheckCircle}
          label="Completed"
          numberOfItems={completedCourses.length}
          variant="success"
        />
      </div>
      <CourseList
        items={[...courseInProgress,...completedCourses]}
      />
    </div>
  );
}
