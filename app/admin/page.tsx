import { Images, Home, Briefcase, Settings } from "lucide-react";

import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
} from "@/app/components/ui/card";

const Dashboard = () => {
  const stats = [
    {
      value: "12",
      icon: Images,
      color: "text-blue-600",
      title: "Portfolio Events",
    },
    {
      value: "4",
      icon: Home,
      color: "text-green-600",
      title: "Homepage Sections",
    },
    {
      value: "8",
      icon: Briefcase,
      title: "Services",
      color: "text-purple-600",
    },
    { title: "Settings", value: "1", icon: Settings, color: "text-orange-600" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Welcome to EventsOC Content Management System
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-sm text-muted-foreground">
            • Manage portfolio events from the Portfolio section
          </p>
          <p className="text-sm text-muted-foreground">
            • Update homepage content including hero section and copy
          </p>
          <p className="text-sm text-muted-foreground">
            • Add or edit services offered by EventsOC
          </p>
          <p className="text-sm text-muted-foreground">
            • Configure site settings like contact details and quick links
          </p>
        </CardContent>
      </Card>
    </div>
  );
};

export default Dashboard;
