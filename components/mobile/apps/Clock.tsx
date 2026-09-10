import React from "react";
import { HistoryView } from "@/components/desktop/apps/TaskManager";

const History = () => {
  return (
    <div className="flex-1 overflow-y-auto p-4 bg-background w-full h-full flex">
      <HistoryView />
    </div>
  );
};

export default History;
