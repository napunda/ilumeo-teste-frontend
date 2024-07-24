import { Link } from "react-router-dom";
import Button from "../../components/button";
import Clock from "./components/clock";
import Modal from "./components/modal";
import useWorklogs from "./hooks/use-worklogs";
import { format } from "date-fns";

const HomePage = () => {
  const {
    worklogs,
    isModalOpen,
    modalMessage,
    clockIn,
    setIsModalOpen,
    totalDuration,
  } = useWorklogs();

  return (
    <div className="pt-32 px-4 sm:px-0">
      <Clock />
      <div className="flex items-center justify-center">
        <div className="w-auto mt-8">
          <Button onClick={clockIn} className="w-full">
            Registrar ponto
          </Button>

          <div className="text-white flex justify-between font-bold gap-24 mt-9 text-sm sm:text-md">
            <span>Últimas marcações</span>
            <span>Horas de hoje: {totalDuration}</span>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            <div className="flex justify-between text-sm text-white -mb-3">
              <span>Entrada</span>
              <span>Saída</span>
            </div>
            {worklogs.length > 0 ? (
              worklogs.map((worklog) => (
                <div
                  key={worklog.id}
                  className="flex items-center justify-between bg-secondary-200 p-4 rounded-md text-white text-sm sm:text-md"
                >
                  <span>
                    {format(new Date(worklog.startTime), "dd/MM/yyyy - HH:mm")}
                  </span>
                  <span>
                    {worklog.endTime
                      ? format(new Date(worklog.endTime), "dd/MM/yyyy - HH:mm")
                      : "Em andamento"}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-white text-center bg-secondary-200 mt-2 p-1 text-sm">
                Nenhuma marcação realizada hoje.
              </div>
            )}

            <Link to="/shifts" className="mx-auto">
              <span className="text-secondary-100 text-sm text-center">
                Ver anteriores
              </span>
            </Link>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        message={modalMessage}
      />
    </div>
  );
};

export default HomePage;
