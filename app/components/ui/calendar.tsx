"use client";

import * as React from "react";
import { DayPicker } from "react-day-picker";
import { format, addMonths, subMonths } from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "react-day-picker/dist/style.css";

export function Calendar({
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  const [month, setMonth] = React.useState(() => new Date());

  const goToNextMonth = () => setMonth((m) => addMonths(m, 1));
  const goToPreviousMonth = () => setMonth((m) => subMonths(m, 1));

  return (
    <div>
      {/* Custom navigation */}
      <div className="flex items-center justify-between px-2 py-1">
        <button
          type="button"
          onClick={goToPreviousMonth}
          aria-label="Previous month"
          className="p-1 rounded hover:bg-gray-200"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <span className="text-base font-semibold">
          {format(month, "MMMM yyyy")}
        </span>

        <button
          type="button"
          onClick={goToNextMonth}
          aria-label="Next month"
          className="p-1 rounded hover:bg-gray-200"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Calendar */}
      <DayPicker
        month={month}
        onMonthChange={setMonth}
        showOutsideDays={showOutsideDays}
        {...props}
        className="p-3"
        classNames={{
          months:
            "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
          month: "space-y-4",
          caption: "hidden", // Hide built-in caption/navigation
          table: "w-full border-collapse space-y-1",
          head_row: "flex",
          head_cell:
            "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
          row: "flex w-full mt-2",
          cell: "h-9 w-9 text-center text-sm p-0 relative",
          day: "h-9 w-9 p-0 font-normal aria-selected:opacity-100",
          // Make selected day green and hover green as well
          day_selected:
            "bg-green-500 text-white hover:bg-green-600 focus:bg-green-600",
          day_today: "bg-accent text-accent-foreground",
          day_outside:
            "text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
          day_disabled: "text-muted-foreground opacity-50",
          day_range_middle:
            "aria-selected:bg-accent aria-selected:text-accent-foreground",
          day_hidden: "invisible",
        }}
      />
    </div>
  );
}
