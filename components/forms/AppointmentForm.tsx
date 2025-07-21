"use client";

import { createAppointment, editAppointment } from "@/lib/actions/appointment.action";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "react-datepicker/dist/react-datepicker.css";
import { Appointment, Customer } from "@/types/appwrite.types";
import Select, { CSSObjectWithLabel, OptionProps } from "react-select";
import type { StylesConfig, GroupBase } from "react-select";
import Button from "../Button";
import DateSelector from "../DateSelector";
import FormRow from "./FormRow";

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

const selectStyles: StylesConfig<OptionType, false, GroupBase<OptionType>> = {
  singleValue: (provided) => ({ ...provided, color: "white" }),
  control: (provided) => ({
    ...provided,
    backgroundColor: "#262626",
    borderRadius: "6px",
    height: "48px",
    borderColor: "#4F4F4F",
    boxShadow: "none",
  }),
  menu: (provided) => ({ ...provided, backgroundColor: "#262626" }),
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
  const [barberOption, setBarberOption] = useState<OptionType | null>(null);
  const [serviceOption, setServiceOption] = useState<OptionType | null>(null);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (appointmentToEdit) {
      const existingBarber = barberOptions.find((opt) => opt.value === appointmentToEdit.barber);
      const existingService = serviceOptions.find(
        (opt) => opt.value === appointmentToEdit.serviceType
      );
      setBarberOption(existingBarber || null);
      setServiceOption(existingService || null);
      setStartDate(new Date(appointmentToEdit.scheduleDate));
    }
  }, [appointmentToEdit]);

  const handleSubmit = async () => {
    if (!barberOption || !serviceOption || !startDate) return;

    setIsLoading(true);
    try {
      const payload = {
        userId,
        customer: customerId,
        customerName: customer.fullName,
        barber: barberOption.value,
        serviceType: serviceOption.value,
        scheduleDate: startDate,
        status: "pending",
      };

      const response = appointmentToEdit
        ? await editAppointment(appointmentToEdit.$id, userId, payload)
        : await createAppointment(payload);

      if (response) {
        router.push(
          `/customers/${userId}/new-appointment/confirmed?appointmentId=${response.$id}`
        );
      }
    } catch (error) {
      console.error("Greška pri zakazivanju:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex-1 space-y-6">
      {!appointmentToEdit && (
        <section className="mb-12 space-y-4">
          <h1 className="heading-h1">Zakažite svoj termin ✂️</h1>
          <p className="text-textGray-500">Pošaljite zahtjev za vaš termin</p>
        </section>
      )}

      <div className="space-y-5">
        <FormRow label="Frizeri" htmlFor="barber">
          <Select
            name="barber"
            styles={selectStyles}
            options={barberOptions}
            value={barberOption}
            onChange={(option) => setBarberOption(option as OptionType)}
            isDisabled={isLoading}
            placeholder="Odaberite frizera"
          />
        </FormRow>

        <FormRow label="Vrsta usluge" htmlFor="service">
          <Select
            name="serviceType"
            options={serviceOptions}
            styles={selectStyles}
            value={serviceOption}
            onChange={(option) => setServiceOption(option as OptionType)}
            isDisabled={isLoading}
            placeholder="Odaberite uslugu"
          />
        </FormRow>

        <FormRow label="Datum termina" htmlFor="appointmentDate">
          <DateSelector startDate={startDate} setStartDate={setStartDate} isLoading={isLoading} />
          
          <div className="mt-6 space-y-2">
            <h4 className="text-sm font-semibold text-white">Legenda:</h4>
            <div className="flex items-center gap-3 text-sm text-white">
              <span className="w-4 h-4 bg-blue-200 rounded border border-white" />
              <span>Termin u čekanju odobrenja</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white">
              <div className="relative w-4 h-4 bg-dark-600 rounded border border-white opacity-40">
                <div className="absolute left-0 top-1/2 w-full h-[2px] bg-white rotate-0 -translate-y-1/2" />
              </div>
              <span>Termin zauzet (potvrđen)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-white">
              <span className="w-4 h-4 bg-yellow-400 rounded border border-white" />
              <span>Vaš odabrani termin</span>
            </div>
          </div>

        </FormRow>
      </div>

      <Button
        size="full"
        disabled={isLoading || !barberOption || !serviceOption || !startDate}
        onClick={handleSubmit}
      >
        {!appointmentToEdit ? "Pošalji" : "Spremi izmjene"}
      </Button>
    </div>
  );
};

export default AppointmentForm;