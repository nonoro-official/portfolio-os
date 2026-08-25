import React from "react";
import { HistoryView } from "@/components/desktop/apps/TaskManager";

const History = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background w-full h-full items-center justify-center flex">
      <HistoryView />
    </div>
  );
};

export default History;
