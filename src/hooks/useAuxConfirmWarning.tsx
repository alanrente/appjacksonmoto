import { Fragment } from "react/jsx-runtime";

type props = {
  label: string;
  value: string;
};

export function useAuxConfirmWarning(content: props[]) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        width: "40%",
      }}
    >
      {content.map(({ label, value }, i) => (
        <Fragment key={i}>
          <label>{label}</label>
          <span>{value}</span>
        </Fragment>
      ))}
    </div>
  );
}
