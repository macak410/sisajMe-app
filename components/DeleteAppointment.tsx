"use client";

import { deleteAppointment } from "@/lib/actions/appointment.action";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import { Trash } from "lucide-react";
import { useState } from "react";

const DeleteAppointment = ({ appointmentId }: { appointmentId: string }) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const user = await getLoggedInUser();
      await deleteAppointment(appointmentId, user.$id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(true);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash className="h-5 text-yellow-500 hover:text-red-500" />
    </button>
  );
};

export default DeleteAppointment;
