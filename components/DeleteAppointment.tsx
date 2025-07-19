"use client";

import { deleteAppointment } from "@/lib/actions/appointment.action";
import { getLoggedInUser } from "@/lib/actions/customer.actions";
import { Trash } from "lucide-react";
import { useState } from "react";

interface DeleteAppointmentProps {
  appointmentId: string;
  iconSize?: number;
}

const DeleteAppointment = ({ appointmentId, iconSize = 20 }: DeleteAppointmentProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleDelete = async () => {
    setIsLoading(true);
    try {
      const user = await getLoggedInUser();
      await deleteAppointment(appointmentId, user.$id);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={isLoading}
      className="disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Trash
        style={{ width: iconSize, height: iconSize }}
        className="text-yellow-500 hover:text-red-500"
      />
    </button>
  );
};

export default DeleteAppointment;