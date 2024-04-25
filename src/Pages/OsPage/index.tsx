import "./style.css";
import { useOsPage } from "./hook";
import { CardOSComponent } from "../../components/CardOS";
import { ScrollContainerWithButton } from "../../components/ScrollContainerWithButton";
import { FormInstance, Modal, Skeleton } from "antd";
import { useState } from "react";
import { OSFormCollection } from "../../components/OsFormCollection";
import {
  TClienteCreate,
  TMecanicoCreate,
} from "../../interfaces/servico.interface";

export function OsPage() {
  const { ordens, setvisible, visible, autoComplete, mutationOrdens } =
    useOsPage();

  const [forminstance, setforminstance] = useState<FormInstance>();

  function handleOk(e: TMecanicoCreate & TClienteCreate) {
    forminstance?.resetFields();
    mutationOrdens.mutate(e);
  }

  function retornaArrayElement() {
    if (!ordens) return [<Skeleton active />];
    if (ordens && ordens.length > 0)
      return ordens.map((os, i) => (
        <CardOSComponent os={os} key={i.toString()} />
      ));

    return [<>Não ha ordens cadastradas!</>];
  }

  return (
    <>
      <ScrollContainerWithButton
        onClick={() => setvisible(true)}
        children={retornaArrayElement()}
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
    </>
  );
}
