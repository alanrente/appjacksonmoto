import "./style.css";
import { useOsPage } from "./hook";
import { CardOSComponent } from "../../components/CardOS";
import { ScrollContainerWithButton } from "../../components/ScrollContainerWithButton";
import { Fragment } from "react/jsx-runtime";
import { FormInstance, Modal } from "antd";
import { useState } from "react";
import { OSFormCollection } from "../../components/OsFormCollection";

export function OsPage() {
  const { ordensServico, setvisible, visible, autoComplete } = useOsPage();

  const [forminstance, setforminstance] = useState<FormInstance>();

  function handleOk(e: any) {
    forminstance?.resetFields();
    console.log(e);
    setvisible(false);
  }

  return (
    <>
      <ScrollContainerWithButton
        onClick={() => setvisible(true)}
        children={
          ordensServico.length > 0
            ? ordensServico.map((os, i) => (
                <CardOSComponent os={os} key={i.toString()} />
              ))
            : [<Fragment key={"empty"}></Fragment>]
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
