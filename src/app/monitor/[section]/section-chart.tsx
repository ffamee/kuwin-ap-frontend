import { ExInteractiveChart } from "@/components/chart/example-interactive-chart";
import {
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Line,
  Tooltip,
  Legend,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

export const clientData = [
  { time: "08:00", c24: 15, "5GHz": 10, "6GHz": 4 },
  { time: "08:05", c24: 18, "5GHz": 12, "6GHz": 5 },
  { time: "08:10", c24: 20, "5GHz": 13, "6GHz": 6 },
  { time: "08:15", c24: 22, "5GHz": 15, "6GHz": 7 },
  { time: "08:20", c24: 19, "5GHz": 14, "6GHz": 5 },
  { time: "08:25", c24: 17, "5GHz": 13, "6GHz": 4 },
  { time: "08:30", c24: 21, "5GHz": 15, "6GHz": 6 },
  { time: "08:35", c24: 23, "5GHz": 16, "6GHz": 7 },
  { time: "08:40", c24: 25, "5GHz": 17, "6GHz": 8 },
  { time: "08:45", c24: 24, "5GHz": 18, "6GHz": 9 },
  { time: "08:50", c24: 26, "5GHz": 19, "6GHz": 9 },
  { time: "08:55", c24: 28, "5GHz": 18, "6GHz": 10 },
  { time: "09:00", c24: 27, "5GHz": 17, "6GHz": 9 },
  { time: "09:05", c24: 25, "5GHz": 16, "6GHz": 8 },
  { time: "09:10", c24: 23, "5GHz": 15, "6GHz": 7 },
  { time: "09:15", c24: 22, "5GHz": 14, "6GHz": 6 },
  { time: "09:20", c24: 20, "5GHz": 13, "6GHz": 5 },
  { time: "09:25", c24: 19, "5GHz": 12, "6GHz": 4 },
  { time: "09:30", c24: 18, "5GHz": 11, "6GHz": 3 },
  { time: "09:35", c24: 17, "5GHz": 10, "6GHz": 3 },
  { time: "09:40", c24: 16, "5GHz": 9, "6GHz": 2 },
  { time: "09:45", c24: 15, "5GHz": 9, "6GHz": 2 },
  { time: "09:50", c24: 14, "5GHz": 8, "6GHz": 2 },
  { time: "09:55", c24: 13, "5GHz": 8, "6GHz": 2 },
  { time: "10:00", c24: 14, "5GHz": 9, "6GHz": 3 },
  { time: "10:05", c24: 16, "5GHz": 10, "6GHz": 4 },
  { time: "10:10", c24: 18, "5GHz": 11, "6GHz": 5 },
  { time: "10:15", c24: 20, "5GHz": 13, "6GHz": 6 },
  { time: "10:20", c24: 21, "5GHz": 14, "6GHz": 7 },
  { time: "10:25", c24: 22, "5GHz": 15, "6GHz": 8 },
];

export default function SectionChart() {
  // const [timeRange, setTimeRange] = useState("7d");
  const timeRange = "7d";
  const filteredData = clientData.filter((item) => {
    // const date = new Date(item.date);
    // const referenceDate = new Date("2024-06-30");
    // let daysToSubtract = 90;
    // if (timeRange === "30d") {
    //   daysToSubtract = 30;
    // } else if (timeRange === "7d") {
    //   daysToSubtract = 7;
    // }
    // const startDate = new Date(referenceDate);
    // startDate.setDate(startDate.getDate() - daysToSubtract);
    // return date >= startDate;
    return item;
  });
  return (
    <div className="w-full h-fit">
      <Card className="h-fit">
        <CardHeader className="flex flex-row justify-between">
          <div className="">
            <CardTitle>Section Chart</CardTitle>
            <CardDescription>Total Clients in {timeRange}</CardDescription>
          </div>
          <div className="flex">
            {/* <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger>
                <SelectValue>7d</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
              </SelectContent>
            </Select> */}
          </div>
        </CardHeader>
        <CardContent className="h-fit">
          <ResponsiveContainer className="w-full h-fit">
            <LineChart data={clientData} className="h-5/6">
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="c24" stroke="#000000" />
              <Line type="monotone" dataKey="5GHz" stroke="#999999" />
              <Line type="monotone" dataKey="6GHz" stroke="#AAAAAA" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
      {/* <ExInteractiveChart /> */}
    </div>
  );
}
