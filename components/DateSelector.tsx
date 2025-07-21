"use client";

import {
  useEffect,
  useState,
  useMemo,
  type Dispatch,
  type SetStateAction,
} from "react";
import {
  format,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  addMonths,
  subMonths,
  isSameMonth,
  isSameDay,
  isWeekend,
  setHours,
  setMinutes,
  addMinutes,
} from "date-fns";
import { hr } from "date-fns/locale";
import { getAppointments } from "@/lib/actions/appointment.action";
import { type Appointment } from "@/types/appwrite.types";
import clsx from "clsx";

interface DateSelectorProps {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  isLoading: boolean;
}

const DateSelector = ({
  startDate,
  setStartDate,
  isLoading,
}: DateSelectorProps) => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());

  useEffect(() => {
    const fetchAppointmentDates = async () => {
      const appointments: Appointment[] = await getAppointments();
      setAppointments(appointments);
    };

    fetchAppointmentDates();
  }, []);

  const minTime = useMemo(() => setHours(setMinutes(new Date(), 0), 8), []);
  const maxTime = useMemo(() => setHours(setMinutes(new Date(), 0), 20), []);

  const bookedTimes = useMemo(() => {
    if (!appointments || !startDate) return [];
    return appointments
      .filter(
        (appointment) =>
          isSameDay(new Date(appointment.scheduleDate), startDate) &&
          appointment.status === "confirmed"
      )
      .map((appointment) => new Date(appointment.scheduleDate));
  }, [appointments, startDate]);

  const pendingTimes = useMemo(() => {
    if (!appointments || !startDate) return [];
    return appointments
      .filter(
        (appointment) =>
          isSameDay(new Date(appointment.scheduleDate), startDate) &&
          appointment.status === "pending"
      )
      .map((appointment) => new Date(appointment.scheduleDate));
  }, [appointments, startDate]);

  const handleDateSelect = (date: Date) => {
    setStartDate(date);
  };

  const renderHeader = () => (
    <div className="flex items-center justify-between mb-4">
      <button
        onClick={() => setCurrentMonth(subMonths(currentMonth, 1))}
        className="text-white hover:text-yellow-400"
      >
        ←
      </button>
      <h2 className="text-lg font-semibold text-white">
        {format(currentMonth, "MMMM yyyy", { locale: hr })}
      </h2>
      <button
        onClick={() => setCurrentMonth(addMonths(currentMonth, 1))}
        className="text-white hover:text-yellow-400"
      >
        →
      </button>
    </div>
  );

  const renderDays = () => {
    const start = startOfWeek(currentMonth, { weekStartsOn: 1 });

    return (
      <div className="grid grid-cols-7 mb-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="text-sm font-medium text-center text-gray-400">
            {format(addDays(start, i), "EEE", { locale: hr })}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const start = startOfWeek(monthStart, { weekStartsOn: 1 });
    const end = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = start;

    while (day <= end) {
      for (let i = 0; i < 7; i++) {
        const cloneDay = day;
        const isToday = isSameDay(day, new Date());
        const isSelected = startDate && isSameDay(day, startDate);
        const isDisabled = isWeekend(day) || day < new Date();

        days.push(
          <div
            key={day.toISOString()}
            tabIndex={0}
            title={isToday ? "Današnji dan" : ""}
            aria-label={`Datum: ${format(day, "d MMMM yyyy", { locale: hr })}`}
            className={clsx(
              "text-sm text-center py-2 rounded-md cursor-pointer transition-all",
              {
                "text-gray-500": !isSameMonth(day, monthStart),
                "bg-yellow-400 text-black font-bold": isSelected,
                "border border-yellow-400": isToday && !isSelected,
                "hover:bg-dark-400": !isSelected && !isDisabled,
                "text-white": isSameMonth(day, monthStart) && !isDisabled,
                "opacity-30 pointer-events-none": isDisabled,
              }
            )}
            onClick={() => !isDisabled && handleDateSelect(cloneDay)}
          >
            {format(day, "d")}
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toISOString()} className="grid grid-cols-7 gap-1">
          {days}
        </div>
      );
      days = [];
    }

    return <div className="space-y-1">{rows}</div>;
  };

  const renderTimeSelect = () => {
    const times: Date[] = [];
    let time = minTime;

    while (time <= maxTime) {
      times.push(time);
      time = addMinutes(time, 30);
    }

    if (!startDate) {
      return (
        <div className="flex items-center justify-center h-48 text-center">
          <p className="text-base text-gray-400 italic font-medium">
            👈 Prvo odaberite datum s kalendara
          </p>
        </div>
      );
    }

    return (
      <div>
        <h3 className="text-sm text-gray-400 mb-2">Odaberi vrijeme:</h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {times.map((time) => {
            const timeString = format(time, "HH:mm");
            const dateTime = new Date(startDate);
            dateTime.setHours(time.getHours(), time.getMinutes(), 0, 0);

            const isBooked = bookedTimes.some(
              (b) =>
                b.getHours() === dateTime.getHours() &&
                b.getMinutes() === dateTime.getMinutes()
            );

            const isPending = pendingTimes.some(
              (p) =>
                p.getHours() === dateTime.getHours() &&
                p.getMinutes() === dateTime.getMinutes()
            );

            const isSelected =
              startDate.getHours() === time.getHours() &&
              startDate.getMinutes() === time.getMinutes();

            const isDisabled = isBooked || isPending;

            return (
              <button
                key={timeString}
                disabled={isDisabled}
                onClick={() => handleDateSelect(dateTime)}
                title={
                  isBooked
                    ? "Zauzeto"
                    : isPending
                    ? "Čeka potvrdu"
                    : "Slobodan termin"
                }
                className={clsx(
                  "text-sm px-2 py-1 rounded-md border transition relative",
                  {
                    "bg-yellow-400 text-black font-semibold": isSelected,
                    "bg-blue-200 text-black font-medium": isPending,
                    "bg-dark-600 text-white hover:bg-dark-400":
                      !isDisabled && !isSelected,
                    "opacity-40 cursor-not-allowed": isBooked,
                  }
                )}
              >
                <span className={clsx({ "line-through": isBooked })}>
                  {timeString}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="bg-dark-500 text-white p-6 rounded-xl shadow-lg w-full max-w-4xl mx-auto flex flex-col md:flex-row gap-6">
      {/* Kalendar lijevo */}
      <div className="w-full md:w-2/3">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {/* Vrijeme desno */}
      <div className="w-full md:w-1/3 border-t md:border-t-0 md:border-l border-dark-700 pt-6 md:pt-0 md:pl-6">
        {renderTimeSelect()}
      </div>
    </div>
  );
};

export default DateSelector;