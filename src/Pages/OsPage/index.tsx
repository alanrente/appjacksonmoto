import "./style.css";

import { useOsPage } from "./hook";
import { ptBR } from "date-fns/locale";
import { CardOSComponent } from "../../components/CardOS";
import { ScrollContainerWithButton } from "../../components/ScrollContainerWithButton";
import { FormInstance, Input, Modal, Skeleton } from "antd";
import { useState } from "react";
import { OSFormCollection } from "../../components/OsFormCollection";
import {
  TClienteCreate,
  TMecanicoCreate,
} from "../../interfaces/servico.interface";
import { DateRange, DayPicker } from "react-day-picker";
import { addDays, format } from "date-fns";

export function OsPage() {
  const month = new Date();

  const defaultSelected: DateRange = {
    from: month,
    to: addDays(month, 0),
  };

  const [range, setRange] = useState<DateRange | undefined>(defaultSelected);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [forminstance, setforminstance] = useState<FormInstance>();

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

  function handleClickInput() {
    setShowDatePicker(true);
    setvisible(true);
    setRange({ from: undefined, to: undefined });
  }

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
        title={!showDatePicker && "Nova Ordem de Serviço"}
      >
        {showDatePicker ? (
          <DayPicker
            mode="range"
            locale={ptBR}
            selected={range}
            defaultMonth={month}
            weekStartsOn={1}
            onSelect={(e) => {
              setRange(e);
              if (e && e.from && e.to) {
                setdtInicioDtFim({
                  dtInicio: e && e.from && format(e!.from!, "yyyy-MM-dd"),
                  dtFim: e && e.to && format(e!.to!, "yyyy-MM-dd"),
                });
                setvisibleSkeleton(true);
                mutationGetFiltered.mutate();
                setShowDatePicker(false);
                setvisible(false);
              }
            }}
          />
        ) : (
          <OSFormCollection
            onFinish={handleOk}
            valuesAutocomplete={autoComplete}
            onCancel={() => setvisible(false)}
            onFormInstanceReady={(instance) => {
              setforminstance(instance);
            }}
          />
        )}
      </Modal>
      {!showDatePicker && (
        <div
          style={{
            // backgroundColor: "#804545",
            width: "70%",
            height: "30px",
            overflowY: "scroll",
            display: "flex",
            flexDirection: "row",
            flexWrap: "nowrap",
            textWrap: "nowrap",
            alignItems: "center",
            gap: "4px",
            marginLeft: "40px",
          }}
        >
          <input
            value={
              range && range.from && range.to
                ? format(range.from, "dd/MM/yyyy") +
                  " - " +
                  format(range.to, "dd/MM/yyyy")
                : ""
            }
            style={{ width: "150px", textAlign: "center" }}
            onClick={handleClickInput}
          />
        </div>
      )}
    </>
  );
}
