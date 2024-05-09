import "./style.css";

export function ScrollContainerHorizontal({
  children,
}: {
  children: JSX.Element | JSX.Element[];
}) {
  const isArray = Array.isArray(children);

  return (
    <div
      className={`horizontal-container${
        !isArray ? " horizontal-container-children" : ""
      }`}
    >
      {children}
    </div>
  );
}
