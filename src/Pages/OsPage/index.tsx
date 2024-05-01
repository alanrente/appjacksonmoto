import "./style.css";

import { useOsPage } from "./hook";
import { ptBR } from "date-fns/locale";
import { CardOSComponent } from "../../components/CardOS";
import { ScrollContainerWithButton } from "../../components/ScrollContainerWithButton";
import { DatePicker, FormInstance, Modal, Skeleton } from "antd";
import { useState } from "react";
import { OSFormCollection } from "../../components/OsFormCollection";
import {
  TClienteCreate,
  TMecanicoCreate,
} from "../../interfaces/servico.interface";
import pickerLocale from "../../utils/pickerLocale";
import { DateRange, DayPicker } from "react-day-picker";
import { addDays, format } from "date-fns";

export function OsPage() {
  const { RangePicker } = DatePicker;

  const month = new Date();

  const defaultSelected: DateRange = {
    from: month,
    to: addDays(month, 0),
  };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);

  const {
    visible,
    autoComplete,
    mutationOrdens,
    visibleSkeleton,
    mutationGetFiltered,
    setvisible,
    setdtInicioDtFim,
    setvisibleSkeleton,
    retornaArrayElement,
  } = useOsPage();

  const [forminstance, setforminstance] = useState<FormInstance>();

  function handleOk(e: TMecanicoCreate & TClienteCreate) {
    forminstance?.resetFields();
    mutationOrdens.mutate(e);
  }

  return (
    <>
      <ScrollContainerWithButton
        onClick={() => setvisible(true)}
        children={
          visibleSkeleton
            ? [<Skeleton active key={"skeleton-os-page"} />]
            : retornaArrayElement()
        }
      />
      <Modal
        open={visible}
        closeIcon={false}
        cancelButtonProps={{ style: { display: "none" } }}
        okButtonProps={{ style: { display: "none" } }}
        destroyOnClose
        title="Nova Ordem de Serviço"
      >
        <OSFormCollection
          onFinish={handleOk}
          valuesAutocomplete={autoComplete}
          onCancel={() => setvisible(false)}
          onFormInstanceReady={(instance) => {
            setforminstance(instance);
          }}
        />
      </Modal>
      <DayPicker
        mode="range"
        locale={ptBR}
        selected={range}
        defaultMonth={month}
        weekStartsOn={1}
        onSelect={(e) => {
          console.log(e && e.from && format(e!.from!, "yyyy-MM-dd"));
          console.log(e && e.to && format(e!.to!, "yyyy-MM-dd"));

          setRange(e);
        }}
      />
      {/* <RangePicker
        format={"DD/MM/YYYY"}
        locale={pickerLocale}
        onChange={(e) => {
          setvisibleSkeleton(true);
          e &&
            e.length > 0 &&
            setdtInicioDtFim({
              dtInicio: e![0]!.format("YYYY-MM-DD"),
              dtFim: e![1]!.format("YYYY-MM-DD"),
            });

          mutationGetFiltered.mutate();
        }}
      /> */}
    </>
  );
}
