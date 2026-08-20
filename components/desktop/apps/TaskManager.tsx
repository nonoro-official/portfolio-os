import React, { useState } from "react";
import { Menu, Wrench, History, ContactRound } from "lucide-react";
import { useWindow } from "@/hooks/useWindow";
import { skills, history, contacts } from "@/config/nonoro";
import { WindowSidebar } from "@/components/ui/custom/WindowSidebar";
import { InfoGrid, InfoCard } from "@/components/ui/custom/InfoCard";

function SkillsView() {
  return (
    <InfoGrid>
      {skills.map((skill) => (
        <InfoCard
          key={skill.name}
          title={skill.name}
          icon={skill.icon}
          description={skill.stack}
        />
      ))}
    </InfoGrid>
  );
}

function HistoryView() {
  return (
    <div className="space-y-4 max-w-2xl font-sans">
      {history.map((job, idx) => {
        const subtitle = [job.company, job.project, job.location]
          .filter(Boolean)
          .join(" — ");

        return (
          <div
            key={idx}
            className="p-4 bg-card rounded-lg border border-border flex flex-col gap-3 shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Dates & Status Badge */}
            <div className="flex justify-between items-center text-xs text-muted-foreground font-medium">
              <span className="text-primary font-semibold">{job.dates}</span>
              {job.status && (
                <span className="px-2 py-0.5 text-[11px] rounded-full bg-muted border border-border text-foreground font-medium">
                  {job.status}
                </span>
              )}
            </div>

            {/* Core Job Title & Context */}
            <div className="space-y-0.5">
              <h3 className="text-base font-bold tracking-tight text-foreground">
                {job.role}
              </h3>
              {subtitle && (
                <p className="text-xs text-muted-foreground font-medium">
                  {subtitle}
                </p>
              )}
            </div>

            {/* Bullet Points */}
            <ul className="list-disc pl-4 text-xs text-muted-foreground space-y-1.5 leading-relaxed">
              {job.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
}

function ContactsView() {
  return (
    <InfoGrid>
      {contacts.map((contact) => (
        <InfoCard
          key={contact.name}
          title={contact.name}
          icon={contact.icon}
          link={contact.link}
        />
      ))}
    </InfoGrid>
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
