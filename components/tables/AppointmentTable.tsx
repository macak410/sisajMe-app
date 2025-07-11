"use client";

import { Appointment } from "@/types/appwrite.types";
import { format } from "date-fns";
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
            <p>{appointment.customer.fullName}</p>
            <StatusMini status={appointment.status} />
            <p>{format(appointment.scheduleDate, "MMMM dd, yyyy HH:mm")}</p>
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
