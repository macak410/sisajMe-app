import { getAppointments } from "@/lib/actions/appointment.action";
import { filterTime } from "@/lib/utils";
import { type Appointment } from "@/types/appwrite.types";
import { isSameDay, isWeekend } from "date-fns";
import { useEffect, useState, type Dispatch, type SetStateAction } from "react";
import DatePicker from "react-datepicker";

interface DateSelectorProps {
  startDate: Date | null;
  setStartDate: Dispatch<SetStateAction<Date | null>>;
  isLoading: boolean;
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
    <DatePicker
      name="scheduleDate"
      className="w-full bg-dark-500 border border-dark-700 h-12 rounded-md pl-2.5"
      wrapperClassName="w-full"
      selected={startDate}
      placeholderText="Select date..."
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
  );
};

export default DateSelector;
