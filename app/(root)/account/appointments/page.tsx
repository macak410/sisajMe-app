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
          Vaše rezervacije
        </h2>
        <p className="text-lg">
          Niste prijavljeni. Molimo vas da se prijavite kako biste vidjeli svoje termine.
        </p>
      </div>
    );
  }

  const appointments = await getCustomerAppointments(user.$id);

  return (
    <div className="w-full max-w-screen-xl mx-auto px-4 py-6">

      <div className="mb-4 flex justify-center">
        <BackButton />
      </div>

      <div className="mb-8 flex justify-center">
        <h2 className="font-semibold text-2xl text-accent-400 text-center">
          Vaše rezervacije
        </h2>
      </div>

      {appointments.length === 0 ? (
        <p className="text-lg text-center">Još nemate zakazanih termina</p>
      ) : (
        <AppointmentsList appointments={appointments} />
      )}
    </div>

  );
};

export default AppointmentPage;
