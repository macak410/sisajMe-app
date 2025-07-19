"use client";

import { Appointment } from "@/types/appwrite.types";
import { format } from "date-fns";
import { hr } from "date-fns/locale";
import AppointmentAction from "../AppointmentAction";
import StatusMini from "../StatusMini";
import Table from "../Table";

const AppointmentTable = ({
  appointments,
}: {
  appointments: Appointment[];
}) => {
  return (
    <Table columns="0.6fr 2fr 1.4fr 2fr 1.4fr 0.2fr">
      <Table.Header>
        <div>#</div>
        <div>Ime i prezime</div>
        <div>Status</div>
        <div>Datum</div>
        <div>Frizer</div>
        <div>Radnje</div>
      </Table.Header>

      <Table.Body
        data={appointments}
        render={(appointment, i) => (
          <Table.Row key={appointment.$id}>
            <p>{i}</p>
            <div>
              <p>{appointment.customer?.fullName || "Nepoznato"}</p>
              <p className="text-sm text-textGray-400">{appointment.customer?.email}</p>
            </div>
            <StatusMini status={appointment.status} />
            <p>{format(new Date(appointment.scheduleDate), "d. MMMM yyyy. HH:mm", { locale: hr })}</p>
            <p>{appointment.barber}</p>
            <div className="flex items-center gap-2">
              <AppointmentAction
                disabled={appointment.status === "confirmed"}
                type="confirmed"
                appointment={appointment}
              />
              <AppointmentAction
                disabled={appointment.status === "declined"}
                type="declined"
                appointment={appointment}
              />
            </div>
          </Table.Row>
        )}
      />

      <Table.Footer>© ŠišajMe | All rights reserved</Table.Footer>
    </Table>
  );
};

export default AppointmentTable;
