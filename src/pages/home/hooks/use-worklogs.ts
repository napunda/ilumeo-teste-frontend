import { useEffect, useState } from "react";
import { axiosService } from "../../../services/axios.service";
import { Worklog } from "../../../interfaces/worklog";
import { Shift } from "../../../interfaces/shifts";

const useWorklogs = () => {
  const [worklogs, setWorklogs] = useState<Worklog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [lastShift, setLastShift] = useState<Shift | null>(null);

  const getLastWorkLogs = async () => {
    try {
      const params = { limit: 4 };
      const response = await axiosService.get("/worklogs", { params });
      setWorklogs(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getLastShift = async () => {
    try {
      const response = await axiosService.get("/shifts/last");
      setLastShift(response.data.shift);
    } catch (error) {
      console.error(error);
    }
  };

  const clockIn = async () => {
    try {
      await axiosService.get("/clock-in");
      setModalMessage("Ponto registrado com sucesso!");
      setIsModalOpen(true);
      await getLastWorkLogs();
      await getLastShift();
    } catch (error) {
      console.error(error);
      setModalMessage("Falha ao registrar ponto.");
      setIsModalOpen(true);
    }
  };

  const calculateTotalDuration = (workLogs: Worklog[]) => {
    return workLogs.reduce((totalDuration, workLog, index, array) => {
      if (workLog.endTime) {
        return totalDuration + (workLog.duration || 0);
      } else if (index === array.length - 1) {
        const startTime = new Date(workLog.startTime).getTime();
        const now = Date.now();
        const duration = Math.floor((now - startTime) / (1000 * 60)); // Converte para minutos
        return totalDuration + duration;
      } else {
        return totalDuration;
      }
    }, 0);
  };

  const formatDuration = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${String(hours).padStart(2, "0")}h${String(minutes).padStart(
      2,
      "0"
    )}m`;
  };

  useEffect(() => {
    getLastWorkLogs();
    getLastShift();
  }, []);

  return {
    worklogs,
    lastShift,
    isModalOpen,
    modalMessage,
    clockIn,
    setIsModalOpen,
    totalDuration: lastShift
      ? formatDuration(calculateTotalDuration(lastShift.workLogs))
      : "00h00m",
  };
};

export default useWorklogs;
