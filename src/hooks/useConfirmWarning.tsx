import { Modal, ModalFuncProps } from "antd";

export function useConfirmWarning({ props }: { props: ModalFuncProps }) {
  const { confirm } = Modal;
  return confirm({
    type: "warning",
    okText: "Sim",
    cancelText: "Não",
    ...props,
  });
}
