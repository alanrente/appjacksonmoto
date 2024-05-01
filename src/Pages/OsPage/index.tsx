import "./style.css";

import { useOsPage } from "./hook";
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

export function OsPage() {
  const { RangePicker } = DatePicker;

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
      <RangePicker
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
      />
    </>
  );
}
