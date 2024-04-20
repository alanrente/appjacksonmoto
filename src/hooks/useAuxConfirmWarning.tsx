import { Fragment } from "react/jsx-runtime";
import { PropsAuxConfirm } from "../interfaces/hooks.interface";

export function useAuxConfirmWarning(content: PropsAuxConfirm[]) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        marginLeft: "16px",
        width: "40%",
      }}
    >
      {content.map(({ label, value }, i) => (
        <Fragment key={i}>
          <label>{label}</label>
          <span>{value}</span>
          <div
            style={{
              backgroundColor: "var(--grey-light)",
              height: "0.5px",
              width: "80%",
            }}
          ></div>
        </Fragment>
      ))}
    </div>
  );
}
