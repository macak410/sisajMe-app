"use client";

import { useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { cancelAppointment } from "@/lib/actions/appointment.action";
import Button from "./Button";
import ModalWrapper from "./ModalWrapper";

interface Props {
  appointmentId: string;
  iconSize?: number;
}

const DeleteAppointment = ({ appointmentId, iconSize = 20 }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [reason, setReason] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  // ✅ Scroll lock i scrollBar kompenzacija
  useEffect(() => {
    if (isOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    } else {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    }

    return () => {
      document.body.style.overflow = "auto";
      document.body.style.paddingRight = "0px";
    };
  }, [isOpen]);

  const handleCancel = async () => {
    if (!reason.trim()) return;

    setIsLoading(true);
    try {
      await cancelAppointment(appointmentId, reason.trim());
      setIsOpen(false);
      router.refresh();
    } catch (error) {
      console.error("Greška pri otkazivanju:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        title="Otkaži termin"
        onClick={() => setIsOpen(true)}
        className="hover:text-red-600 transition-transform hover:scale-110"
      >
        <Trash2 className={`h-[${iconSize}px] w-[${iconSize}px]`} />
      </button>

      {isOpen && (
        <ModalWrapper>
          <div className="fixed inset-0 z-[100] bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center min-h-screen">
            <div className="bg-dark-500 border border-dark-700 text-white rounded-xl w-[90%] max-w-md p-6 shadow-2xl transition-all duration-200">
              <h2 className="text-xl font-bold text-center mb-2">Otkaži termin</h2>

              <p className="text-sm text-textGray-400 text-center mb-4">
                Molimo unesite razlog za otkazivanje:
              </p>

              <textarea
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={4}
                placeholder="Razlog otkazivanja..."
                className="w-full p-3 rounded-md bg-dark-600 border border-gray-500 text-black resize-none placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              />

              <div className="mt-6 flex justify-center gap-4">
                <Button
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="hover:bg-yellow-500 hover:text-black transition-all"
                >
                  Odustani
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleCancel}
                  disabled={isLoading || !reason.trim()}
                  className="hover:bg-red-600 hover:text-white transition-all"
                >
                  Potvrdi otkazivanje
                </Button>
              </div>
            </div>
          </div>
        </ModalWrapper>
      )}
    </>
  );
};

export default DeleteAppointment;