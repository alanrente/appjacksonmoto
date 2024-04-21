// import { message } from "antd";
import { message } from "antd";
import { JointContent } from "antd/es/message/interface";

type Props = {
  content: JointContent;
  duration?: number | VoidFunction | undefined;
  onClose?: VoidFunction | undefined;
  type: "success" | "error" | "warning" | "info";
};

export function useMessageAntd({ content, duration, onClose, type }: Props) {
  return message[type](content, duration, onClose);
}
