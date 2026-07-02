import React, { useState } from "react";
import { Menu, Wrench, History, ContactRound } from "lucide-react";
import { useWindow } from "@/hooks/useWindow";
import { skills, history, contacts } from "@/config/nonoro";
import { WindowSidebar } from "@/components/ui/custom/WindowSidebar";

function SkillsView() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {skills.map((skill) => (
        <div
          key={skill.name}
          className="flex gap-3 p-4 bg-card rounded-md border border-border"
        >
          <div className="p-2 bg-accent text-accent-foreground rounded-sm h-fit shrink-0 [&>svg]:size-4">
            {skill.icon}
          </div>
          <div>
            <h3 className="text-sm font-semibold">{skill.name}</h3>
            <p className="text-xs text-muted-foreground mt-1 font-mono">
              {skill.stack}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function HistoryView() {
  return (
    <div className="space-y-4 max-w-2xl">
      {history.map((job, idx) => (
        <div
          key={idx}
          className="p-4 bg-card rounded-md border border-border flex flex-col gap-2"
        >
          <div className="flex justify-between items-baseline text-xs text-muted-foreground font-mono">
            <span className="text-primary font-bold">{job.dates}</span>
            <span>{job.company}</span>
          </div>
          <h3 className="text-sm font-bold">{job.role}</h3>
          <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1">
            {job.highlights.map((h, i) => (
              <li key={i}>{h}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function ContactsView() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {contacts.map((contact) => (
        <div
          key={contact.name}
          className="flex gap-3 p-4 bg-card rounded-md border border-border"
        >
          <div className="flex items-center justify-center size-7 shrink-0 bg-accent text-accent-foreground rounded-sm [&>svg]:size-5">
            {contact.icon}
          </div>
          <div>
            <h3 className="justify-center text-md font-semibold">
              <a
                href={contact.link}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={contact.name}
              >
                {contact.name}
              </a>
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
}

const TaskManager: React.FC = () => {
  const { viewMode, navigateTo, goHome } = useWindow();

  const navItems = [
    { title: "Skills", value: "homepage", icon: <Wrench /> },
    { title: "Experience", value: "history-iframe", icon: <History /> },
    { title: "Contacts", value: "contacts-iframe", icon: <ContactRound /> },
  ];

  const [activeContentTab, setActiveContentTab] = useState<
    "history" | "contacts"
  >("history");

  const currentSidebarValue =
    viewMode === "homepage" ? "homepage" : `${activeContentTab}-iframe`;

  const handleSidebarChange = (value: string) => {
    if (value === "homepage") {
      goHome();
    } else if (value === "history-iframe") {
      setActiveContentTab("history");
      navigateTo("history");
    } else if (value === "contacts-iframe") {
      setActiveContentTab("contacts");
      navigateTo("contacts");
    }
  };

  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar */}
      <WindowSidebar
        items={navItems}
        activeItem={currentSidebarValue}
        onValueChange={handleSidebarChange}
        logo={<Menu className="size-5" />}
      />

      {/* Right Column*/}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Action Bar */}

        {/* Main Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          {viewMode === "homepage" ? (
            <SkillsView />
          ) : activeContentTab === "history" ? (
            <HistoryView />
          ) : (
            <ContactsView />
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskManager;
