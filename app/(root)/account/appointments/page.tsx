import AppointmentsList from "@/components/AppointmentsList";
import BackButton from "@/components/BackButton";
import { getCustomerAppointments } from "@/lib/actions/appointment.action";
import { getLoggedInUser } from "@/lib/actions/customer.actions";

export const metadata = {
  title: "Appointments",
};

const AppointmentPage = async () => {
  const user = await getLoggedInUser();

  if (!user || !user.$id) {
    return (
      <div>
        <BackButton />
        <h2 className="font-semibold text-2xl text-accent-400 mb-7">
          Your reservations
        </h2>
        <p className="text-lg">
          You are not logged in. Please log in to view your appointments.
        </p>
      </div>
    );
  }

  const appointments = await getCustomerAppointments(user.$id);

  return (
    <div>
      <BackButton />
      <h2 className="font-semibold text-2xl text-accent-400 mb-7">
        Your reservations
      </h2>

      {appointments.length === 0 ? (
        <p className="text-lg">You have no appointments yet</p>
      ) : (
        <AppointmentsList appointments={appointments} />
      )}
    </div>
  );
};

export default AppointmentPage;
