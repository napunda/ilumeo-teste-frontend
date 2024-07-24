import { axiosService } from "../../services/axios.service";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import Button from "../../components/button";

interface Shift {
  id: string;
  date: string;
  duration: number;
}

const ShiftsPage = () => {
  const [shifts, setshifts] = useState<{ data: Shift[] }>({ data: [] });

  const getLastshifts = async () => {
    try {
      const params = {
        limit: 4,
      };
      const response = await axiosService.get("/shifts", { params });
      setshifts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getLastshifts();
  }, []);

  return (
    <div className="pt-32">
      <div className="flex items-center justify-center px-4 sm:px-0">
        <div className="w-full mt-8 sm:w-[433px]">
          <Button type="button" className="w-full cursor-default focus:ring-0">
            Lista de expedientes
          </Button>
          <div className="text-white flex justify-between font-bold gap-24 mt-9">
            <span>Data</span>
            <span>Duração total</span>
          </div>

          <div className="flex flex-col gap-4 mt-4">
            {shifts.data && shifts.data.length > 0 ? (
              shifts.data.map((shift) => (
                <div
                  key={shift.id}
                  className="flex items-center justify-between bg-secondary-200 p-4 rounded-md text-white"
                >
                  <span>{format(new Date(shift.date), "dd/MM/yyyy")}</span>
                  <span>
                    {shift.duration
                      ? Math.floor(shift.duration / 60) +
                        "h" +
                        (shift.duration % 60) +
                        "m"
                      : "Em andamento"}
                  </span>
                </div>
              ))
            ) : (
              <div className="text-white text-center bg-secondary-200 mt-2 p-1 text-sm">
                Nenhuma marcação realizada.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShiftsPage;
