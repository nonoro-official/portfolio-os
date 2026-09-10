import React from "react";
import { ContactsView } from "@/components/desktop/apps/TaskManager";

const Contacts = () => {
  return (
    <div className="flex-1 overflow-y-auto p-6 bg-background w-full h-full items-center justify-center flex">
      <ContactsView />
    </div>
  );
};

export default Contacts;
