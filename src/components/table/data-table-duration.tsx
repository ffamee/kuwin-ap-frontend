"use client";

import { formatDuration } from "@/lib/formatter";
import { useEffect, useState } from "react";

export const DataTableDuration = ({ d }: { d: Date }) => {
  const [now, setNow] = useState<Date>(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 990);
    return () => clearInterval(interval);
  }, []);
  return <div>{formatDuration(d, now)}</div>;
};

export default DataTableDuration;
