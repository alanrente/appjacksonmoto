import { Input, Space } from "antd";
import { CardServico } from "../../components/CardServico";
import { ScrollContainerVertical } from "../../components/ScrollContainerVertical";
import { useServicosPage } from "./hook";
import { ModalAntd } from "../../instances/ModalAntd";
import { RepositoryIcons } from "../../assets/icons/repository";

export function ServicosPage() {
  const { servs, states, setStates, handleChange } = useServicosPage();
  const { Service } = RepositoryIcons();
  return (
    <>
      <ScrollContainerVertical
        // textButton="Novo Serviço"
        showButton={false}
        key={ServicosPage.name}
      >
        <>
          {servs &&
            servs.map((servico, index) => (
              <CardServico
                key={index.toString()}
                servico={servico}
                onclick={() => {
                  setStates({ ...states, openModal: true, servico });
                }}
              />
            ))}
        </>
      </ScrollContainerVertical>
      {states.openModal && (
        <ModalAntd
          modalProps={{
            title: (
              <Space>
                <Service />
                {states.servico?.idServico}
              </Space>
            ),
            open: states.openModal,
            destroyOnClose: true,
            okText: "Salvar",
            cancelText: "Cancelar",
            closeIcon: false,
            onCancel: () => {
              setStates({ ...states, openModal: false });
            },
          }}
        >
          <Input
            id="servico"
            type="text"
            value={states.servico?.servico}
            onChange={handleChange}
          />
          <Input
            id="valor"
            type="number"
            value={states.servico?.valor}
            onChange={handleChange}
          />
          <Input
            id="porcentagem"
            type="number"
            status={states.inputPorcentagem}
            value={states.servico!.porcentagem}
            onChange={handleChange}
          />
        </ModalAntd>
      )}
    </>
  );
}
