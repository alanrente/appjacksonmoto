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

  return (
    <>
      <ScrollContainerWithButton
        onClick={() => setvisible(true)}
        children={
          ordens && ordens.length > 0
            ? ordens.map((os, i) => (
                <CardOSComponent os={os} key={i.toString()} />
              ))
            : [<Skeleton active />]
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
    </>
  );
}
