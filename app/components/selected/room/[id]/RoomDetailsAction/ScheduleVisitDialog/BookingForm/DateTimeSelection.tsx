"use client";

import {
  format,
  isToday,
  addDays,
  // addMonths,
} from "date-fns";
import React, { useState, useEffect, useCallback } from "react";
import { CalendarIcon, Clock, CheckCircle2 } from "lucide-react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { cn } from "@/app/lib/utils";
import { Label } from "@/app/components/ui/label";
import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";

interface DateTimeSelectionProps {
  selectedDate?: Date;
  selectedTime: string;
  onTimeSelect: (time: string) => void;
  onDateSelect: (date: Date | undefined) => void;
}

export const DateTimeSelection: React.FC<DateTimeSelectionProps> = ({
  selectedDate,
  selectedTime,
  onDateSelect,
  onTimeSelect,
}) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimeDropdownOpen, setIsTimeDropdownOpen] = useState(false);

  const timeSlots = [
    "09:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "01:00 PM",
    "02:00 PM",
    "03:00 PM",
    "04:00 PM",
    "05:00 PM",
    "06:00 PM",
    "07:00 PM",
  ];

  const handleDateSelect = (date: Date | undefined) => {
    onDateSelect(date);
    setIsCalendarOpen(false);
  };

  const handleTimeSelect = (time: string) => {
    onTimeSelect(time);
    setIsTimeDropdownOpen(false);
  };

  const isTimeSlotDisabled = useCallback(
    (timeSlot: string) => {
      if (!selectedDate || !isToday(selectedDate)) {
        return false;
      }

      const now = new Date();
      const currentHour = now.getHours();
      const currentMinute = now.getMinutes();

      // Convert time slot to 24-hour format
      const [time, period] = timeSlot.split(" ");
      const [hours, minutes] = time.split(":").map(Number);
      let slotHour = hours;

      if (period === "PM" && hours !== 12) {
        slotHour += 12;
      } else if (period === "AM" && hours === 12) {
        slotHour = 0;
      }

      // Add 2-hour buffer from current time
      const bufferHour = currentHour + 2;
      const bufferMinute = currentMinute;

      // Compare slot time with buffered current time
      if (slotHour < bufferHour) {
        return true;
      } else if (slotHour === bufferHour && minutes <= bufferMinute) {
        return true;
      }

      return false;
    },
    [selectedDate]
  );

  const getDateDisplayText = () => {
    if (!selectedDate) return "Select visit date";
    if (isToday(selectedDate)) return "Today";
    return format(selectedDate, "EEEE, MMM dd, yyyy");
  };

  // Clear selected time if it becomes invalid when date changes to today
  useEffect(() => {
    if (selectedDate && isToday(selectedDate) && selectedTime) {
      if (isTimeSlotDisabled(selectedTime)) {
        onTimeSelect("");
      }
    }
  }, [selectedDate, selectedTime, onTimeSelect, isTimeSlotDisabled]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-green-600" />
          Select Date
        </Label>

        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12 sm:h-14 px-3 sm:px-4 border-2 transition-colors text-sm sm:text-base",
                !selectedDate &&
                  "text-muted-foreground border-gray-200 hover:border-green-300",
                selectedDate &&
                  "border-green-300 bg-green-50 text-green-900 hover:border-green-400"
              )}
              onClick={() => setIsCalendarOpen(true)}
            >
              <CalendarIcon className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />

              <span className="flex-1 truncate text-xs sm:text-sm lg:text-base">
                {getDateDisplayText()}
              </span>

              {selectedDate && (
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 ml-1" />
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            side="bottom"
            sideOffset={4}
            className="w-auto p-0 shadow-xl border z-[9999]"
          >
            <Calendar
              autoFocus
              mode="single"
              selected={selectedDate}
              onSelect={handleDateSelect}
              disabled={{
                before: new Date(),
                after: addDays(new Date(), 7),
                // after: addMonths(new Date(), 1),
              }}
              className="p-3 pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="space-y-3">
        <Label className="text-sm font-semibold text-gray-900 flex items-center gap-2">
          <Clock className="h-4 w-4 text-green-600" />
          Choose Time
        </Label>

        <Popover open={isTimeDropdownOpen} onOpenChange={setIsTimeDropdownOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal h-12 sm:h-14 px-3 sm:px-4 border-2 transition-colors",
                !selectedTime &&
                  "text-muted-foreground border-gray-200 hover:border-green-300",
                selectedTime &&
                  "border-green-300 bg-green-50 text-green-900 hover:border-green-400"
              )}
              onClick={() => setIsTimeDropdownOpen(true)}
            >
              <Clock className="mr-2 sm:mr-3 h-4 sm:h-5 w-4 sm:w-5 flex-shrink-0" />

              <span className="flex-1 truncate text-xs sm:text-sm lg:text-base">
                {selectedTime || "Select time"}
              </span>

              {selectedTime && (
                <CheckCircle2 className="h-4 w-4 text-green-600 flex-shrink-0 ml-1" />
              )}
            </Button>
          </PopoverTrigger>

          <PopoverContent
            align="start"
            side="bottom"
            sideOffset={4}
            className="w-auto min-w-[200px] p-2 shadow-xl border z-[9999] bg-white"
          >
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {timeSlots.map((time) => {
                const isDisabled = isTimeSlotDisabled(time);
                return (
                  <Button
                    key={time}
                    variant="ghost"
                    disabled={isDisabled}
                    className={cn(
                      "w-full justify-start font-normal text-left px-3 py-2 h-auto text-sm",
                      selectedTime === time && "bg-green-50 text-green-900",
                      isDisabled &&
                        "opacity-50 cursor-not-allowed text-gray-400"
                    )}
                    onClick={() => !isDisabled && handleTimeSelect(time)}
                  >
                    <div className="flex items-center gap-3">
                      <Clock
                        className={cn(
                          "h-4 w-4",
                          isDisabled ? "text-gray-300" : "text-gray-400"
                        )}
                      />

                      <span>{time}</span>

                      {isDisabled && selectedDate && isToday(selectedDate) && (
                        <span className="text-xs text-gray-400 ml-auto">
                          Not available
                        </span>
                      )}
                    </div>
                  </Button>
                );
              })}
            </div>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
