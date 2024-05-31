import { Modal, ModalProps } from "antd";

export function ModalAntd({
  modalProps,
  children,
}: {
  modalProps: ModalProps;
  children?: any;
}) {
  return (
    <Modal
      {...modalProps}
      okButtonProps={{
        ...modalProps.okButtonProps,
        style: { backgroundColor: "var(--main-bg-color)" },
      }}
    >
      {children}
    </Modal>
  );
}
