import "./style.css";

import { useOsPage } from "./hook";
import { ptBR } from "date-fns/locale";
import { ScrollContainerVertical } from "../../components/ScrollContainerWithButton";
import { Modal, Skeleton } from "antd";
import { OSFormCollection } from "../../components/OsFormCollection";

import { DayPicker } from "react-day-picker";
import { format } from "date-fns";

export function OsPage() {
  const {
    range,
    visible,
    autoComplete,
    showDatePicker,
    visibleSkeleton,
    mutationGetFiltered,
    handleOk,
    setRange,
    setvisible,
    setforminstance,
    handleClickInput,
    setdtInicioDtFim,
    setShowDatePicker,
    setvisibleSkeleton,
    retornaArrayElement,
  } = useOsPage({});

  return (
    <>
      <ScrollContainerVertical
        onClick={() => setvisible(true)}
        textButton="Nova Ordem de Serviço"
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
            defaultMonth={new Date()}
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
