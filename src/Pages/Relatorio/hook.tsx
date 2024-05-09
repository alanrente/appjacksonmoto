import { useState } from "react";
import { IOrdemServico, IRelatorio } from "../../interfaces/servico.interface";
import { DateRange } from "react-day-picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllOs } from "../../services/os.service";
import moment from "moment-timezone";
import { DATA } from "../../utils/constants.util";
import { Alert } from "antd";
import { format } from "date-fns";

export function useRelatorio() {
  const queryClient = useQueryClient();

  const [isLoading, setIsLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [ordem, setOrdem] = useState<IOrdemServico>();
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [range, setRange] = useState<DateRange | undefined>({
    from: new Date(moment().subtract(10, "days").format()),
    to: new Date(moment().format()),
  });

  function onSelectDayPicker(e: any) {
    setRange(e);

    if (e && e.from && e.to) {
      setIsLoading(true);
      setVisible(false);
      mutationFilter.mutate();
    }
  }

  function handleClickInput() {
    setRange({ from: undefined, to: undefined });
    setShowDatePicker(true);
    setVisible(true);
  }

  const { data: ordens } = useQuery({
    queryKey: ["ordens-relatorio"],
    queryFn: async () => {
      const ordens: IRelatorio = await getAllOs({
        dtInicio: format(range!.from!, DATA.US_dateFns),
        dtFim: format(range!.to!, DATA.US_dateFns),
        includeTotais: true,
      });
      return ordens;
    },
    gcTime: 0,
  });

  const mutationFilter = useMutation({
    mutationFn: async () => {
      queryClient.invalidateQueries({ queryKey: ["ordens-relatorio"] });
      return await getAllOs({
        dtInicio: format(range!.from!, DATA.US_dateFns),
        dtFim: format(range!.to!, DATA.US_dateFns),
        includeTotais: true,
      });
    },
    onError: (err) => {
      Alert({ type: "error", message: err.message });
    },
    onSuccess() {
      setShowDatePicker(false);
      setIsLoading(false);
    },
    gcTime: 0,
  });

  function calcValores(listaValores: number[]) {
    if (listaValores.length === 0) return 0;
    if (listaValores.length === 1) return listaValores[0];

    return listaValores.reduce((a, b) => Number(a) + Number(b));
  }

  function handleClick(ordem: IOrdemServico) {
    setOrdem(ordem);
    setVisible(true);
  }

  return {
    ordem,
    range,
    ordens,
    visible,
    isLoading,
    showDatePicker,
    setVisible,
    calcValores,
    handleClick,
    setIsLoading,
    handleClickInput,
    onSelectDayPicker,
  };
}
