"use client";

import {
  createAppointment,
  editAppointment,
} from "@/lib/actions/appointment.action";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { useForm, Controller } from "react-hook-form";
import Select, { StylesConfig } from "react-select";
import Button from "../Button";
import DateSelector from "../DateSelector";
import FormRow from "./FormRow";
import { Appointment, Customer } from "@/types/appwrite.types";

interface AppointmentProps {
  userId: string;
  customerId: string;
  customer: Customer;
  appointmentToEdit?: Appointment;
}

interface OptionType {
  value: string;
  label: string;
}

interface Inputs {
  barber: OptionType;
  service: OptionType;
}

const barberOptions: OptionType[] = [
  { value: "Ivo Ivić", label: "Ivo Ivić" },
  { value: "Marko Marić", label: "Marko Marić" },
  { value: "Maja Majić", label: "Maja Majić" },
];

const serviceOptions: OptionType[] = [
  { value: "Normalno kratko šišanje", label: "Normalno kratko šišanje" },
  { value: "Šišanje", label: "Šišanje" },
  { value: "Šišanje i bojanje", label: "Šišanje i bojanje" },
  { value: "Brijanje", label: "Brijanje" },
];

const selectStyles: StylesConfig<OptionType, false> = {
  singleValue: (provided) => ({
    ...provided,
    color: "white",
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#262626",
    borderRadius: "6px",
    height: "48px",
    borderColor: "#4F4F4F",
    boxShadow: "none",
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: "#262626",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#1D1D1D" : "#262626",
  }),
};

const AppointmentForm = ({
  userId,
  customerId,
  customer,
  appointmentToEdit,
}: AppointmentProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const router = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = async (data: Inputs) => {
    if (!startDate) return;

    setIsLoading(true);
    try {
      const appointmentPayload = {
        userId,
        customer: customerId,
        customerName: customer.fullName,
        barber: data.barber.value,
        serviceType: data.service.value,
        scheduleDate: startDate,
        status: "pending",
      };

      const response = appointmentToEdit
        ? await editAppointment(appointmentToEdit.$id, userId, appointmentPayload)
        : await createAppointment(appointmentPayload);

      if (response) {
        router.push(
          `/customers/${userId}/new-appointment/confirmed?appointmentId=${response.$id}`
        );
      }
    } catch (err: any) {
      console.error("Greška pri zakazivanju termina:", err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 space-y-6">
      {!appointmentToEdit && (
        <section className="mb-12 space-y-4">
          <h1 className="heading-h1">Zakažite svoj termin ✂️</h1>
          <p className="text-textGray-500">Pošaljite zahtjev za vaš termin</p>
        </section>
      )}

      <div className="space-y-5">
        <FormRow label="Frizeri" htmlFor="barber">
          <Controller
            name="barber"
            control={control}
            rules={{ required: "Odaberite frizera" }}
            render={({ field }) => (
              <Select
                {...field}
                styles={selectStyles}
                options={barberOptions}
                isDisabled={isLoading}
                placeholder="Odaberite frizera"
              />
            )}
          />
          {errors.barber && (
            <p className="text-red-500 text-sm mt-1">{errors.barber.message}</p>
          )}
        </FormRow>

        <FormRow label="Vrsta usluge" htmlFor="service">
          <Controller
            name="service"
            control={control}
            rules={{ required: "Odaberite uslugu" }}
            render={({ field }) => (
              <Select
                {...field}
                styles={selectStyles}
                options={serviceOptions}
                isDisabled={isLoading}
                placeholder="Odaberite vrstu usluge"
              />
            )}
          />
          {errors.service && (
            <p className="text-red-500 text-sm mt-1">{errors.service.message}</p>
          )}
        </FormRow>

        <FormRow label="Datum termina" htmlFor="appointmentDate">
          <DateSelector
            startDate={startDate}
            setStartDate={setStartDate}
            isLoading={isLoading}
            showError={!startDate}
          />
        </FormRow>
      </div>

      <Button
        size="full"
        disabled={isLoading || !startDate || Object.keys(errors).length > 0}
      >
        Pošalji
      </Button>
    </form>
  );
};

export default AppointmentForm;