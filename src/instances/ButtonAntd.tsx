import { Button, ButtonProps } from "antd";

export function ButtonAntd({
  props,
  children,
}: {
  props: ButtonProps;
  children?: any;
}) {
  return (
    <Button
      {...props}
      style={{
        backgroundColor: "var(--main-bg-color)",
        color: "var(--font-white-color)",
      }}
    >
      {children}
    </Button>
  );
}
