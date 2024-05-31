import "./style.css";

import { useOsPage } from "./hook";
import { ScrollContainerVertical } from "../../components/ScrollContainerVertical";
import { Modal, Skeleton } from "antd";
import { OSFormCollection } from "../../components/OsFormCollection";

export function OsPage() {
  const {
    visible,
    autoComplete,
    visibleSkeleton,
    handleOk,
    setvisible,
    setforminstance,
    retornaArrayElement,
  } = useOsPage();

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
        title={"Nova Ordem de Serviço"}
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
