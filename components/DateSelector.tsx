"use client";

import { getAppointments } from "@/lib/actions/appointment.action";
import { filterTime } from "@/lib/utils";
import { type Appointment } from "@/types/appwrite.types";
import { isSameDay, isWeekend } from "date-fns";
import {
  useEffect,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";
import DatePicker from "react-datepicker";

interface DateSelectorProps {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  isLoading: boolean;
  showError?: boolean;
}

const getBookedTimes = (appointments: Appointment[], selectedDate: Date) => {
  return appointments
    .filter((appointment) => isSameDay(appointment.scheduleDate, selectedDate))
    .map((appointment) => appointment.scheduleDate);
};

const DateSelector = ({
  startDate,
  setStartDate,
  isLoading,
  showError = false,
}: DateSelectorProps) => {
  const [appointments, setAppointments] = useState<Appointment[] | null>(null);

  useEffect(() => {
    const fetchAppointmentDates = async () => {
      const appointments: Appointment[] = await getAppointments();
      setAppointments(appointments);
    };

    if (startDate) fetchAppointmentDates();
  }, [startDate]);

  return (
    <div className="space-y-2">
      <DatePicker
        name="scheduleDate"
        className="w-full bg-dark-500 border border-dark-700 h-12 rounded-md px-4 text-white placeholder:text-gray-400"
        wrapperClassName="w-full"
        selected={startDate}
        placeholderText="Izaberite datum i vrijeme"
        filterDate={(date) => !isWeekend(date)}
        filterTime={filterTime}
        minDate={new Date()}
        disabled={isLoading}
        excludeTimes={
          startDate && appointments
            ? getBookedTimes(appointments, startDate)
            : undefined
        }
        onChange={(date) => setStartDate(date)}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={30}
        dateFormat="dd-MM-yyyy HH:mm"
      />

      {showError && !startDate && (
        <p className="text-red-500 text-sm">Datum termina je obavezan</p>
      )}
    </div>
  );
};

export default DateSelector;