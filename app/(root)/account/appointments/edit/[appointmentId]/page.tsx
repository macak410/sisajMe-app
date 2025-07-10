import AppointmentForm from "@/components/forms/AppointmentForm";
import { getAppointment } from "@/lib/actions/appointment.action";
import { getCustomer, getLoggedInUser } from "@/lib/actions/customer.actions";

export const metadata = {
  title: "Edit Appointment | NextCut",
};

const EditAppointment = async ({
  params,
}: {
  params: { appointmentId: string };
}) => {
  const user = await getLoggedInUser();
  const customer = await getCustomer(user.$id);
  const appointment = await getAppointment(params.appointmentId);

  return (
    <div>
      <AppointmentForm
        userId={user.$id}
        customerId={customer.$id}
        appointmentToEdit={appointment}
      />
    </div>
  );
};

export default EditAppointment;
