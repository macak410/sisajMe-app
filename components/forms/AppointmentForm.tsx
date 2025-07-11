"use client";

import {
  createAppointment,
  editAppointment,
} from "@/lib/actions/appointment.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm } from "react-hook-form";
import Select, {
  type CSSObjectWithLabel,
  type OptionProps,
} from "react-select";
import Button from "../Button";
import DateSelector from "../DateSelector";
import FormRow from "./FormRow";
import { Appointment } from "@/types/appwrite.types";

interface AppointmentProps {
  userId: string;
  customerId: string;
  appointmentToEdit?: Appointment;
}

interface Inputs {
  barber: string;
  service: string;
  date: string;
}

interface OptionType {
  value: string;
  label: string;
}

const barberOptions = [
  { value: "Ivo Ivić", label: "Ivo Ivić" },
  { value: "Marko Marić", label: "Marko Marić" },
  { value: "Maja Majić", label: "Maja Majić" },
];

const serviceOptions = [
  { value: "Normalno kratko šišanje", label: "Normalno kratko šišanje" },
  { value: "Šišanje", label: "Šišanje" },
  { value: "Šišanje i bojanje", label: "Šišanje i bojanje" },
  { value: "Brijanje", label: "Brijanje" },
];

const selectStyles = {
  singleValue: (provided: CSSObjectWithLabel) => ({
    ...provided,
    color: "white",
  }),
  control: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#262626",
    borderRadius: "6px",
    height: "48px",
    borderColor: "#4F4F4F",
    boxShadow: "none",
  }),
  menu: (provided: CSSObjectWithLabel) => ({
    ...provided,
    backgroundColor: "#262626",
  }),
  option: (provided: CSSObjectWithLabel, state: OptionProps) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#1D1D1D" : "#262626",
  }),
};

const AppointmentForm = ({
  userId,
  customerId,
  appointmentToEdit,
}: AppointmentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [barberOption, setBarberOption] = useState<OptionType | null>(null);
  const [serviceOption, setServiceOption] = useState<OptionType | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const router = useRouter();
  const { handleSubmit } = useForm<Inputs>();

  const onSubmit = async () => {
    setIsLoading(true);
    try {
      if (appointmentToEdit && barberOption && serviceOption && startDate) {
        const appointment = {
          userId,
          customer: customerId,
          barber: barberOption.value,
          serviceType: serviceOption.value,
          scheduleDate: startDate,
          status: "pending",
        };

        const editedAppointment = await editAppointment(
          appointmentToEdit.$id,
          userId,
          appointment
        );

        if (editedAppointment)
          router.push(
            `/customers/${userId}/new-appointment/confirmed?appointmentId=${editedAppointment.$id}`
          );
      } else if (barberOption && serviceOption && startDate) {
        const appointment = {
          userId,
          customer: customerId,
          barber: barberOption.value,
          serviceType: serviceOption.value,
          scheduleDate: startDate,
          status: "pending",
        };

        const newAppointment = await createAppointment(appointment);

        if (newAppointment)
          router.push(
            `/customers/${userId}/new-appointment/confirmed?appointmentId=${newAppointment.$id}`
          );
      }
    } catch (err: any) {
      console.error(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6">
      {!appointmentToEdit && (
        <section className="mb-12 space-y-4">
          <h1 className="heading-h1">Zakažite svoju termin ✂️</h1>
          <p className="text-textGray-500">
           Pošaljite zahtjev za vaš termin
          </p>
        </section>
      )}

      <div className="space-y-5">
        <FormRow label="Available barbers" htmlFor="barber">
          <Select
            name="barber"
            styles={selectStyles}
            options={barberOptions}
            isDisabled={isLoading}
            onChange={(option) => setBarberOption(option as OptionType)}
          />
        </FormRow>

        <FormRow label="Service type" htmlFor="service">
          <Select
            name="serviceType"
            options={serviceOptions}
            styles={selectStyles}
            isDisabled={isLoading}
            onChange={(option) => setServiceOption(option as OptionType)}
          />
        </FormRow>

        <FormRow label="Appointment date" htmlFor="appointmentDate">
          <DateSelector
            startDate={startDate}
            setStartDate={setStartDate}
            isLoading={isLoading}
          />
        </FormRow>
      </div>

      <Button size="full" disabled={isLoading}>
        Pošalji
      </Button>
    </form>
  );
};

export default AppointmentForm;
