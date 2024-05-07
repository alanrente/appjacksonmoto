import "./style.css";

export function ScrollContainerHorizontal({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  return <div className="horizontal-container">{children}</div>;
}
