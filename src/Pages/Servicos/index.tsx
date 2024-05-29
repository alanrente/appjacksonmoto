import { Input, Space } from "antd";
import { CardServico } from "../../components/CardServico";
import { ScrollContainerVertical } from "../../components/ScrollContainerVertical";
import { useServicosPage } from "./hook";
import { ModalAntd } from "../../instances/ModalAntd";
import { RepositoryIcons } from "../../assets/icons/repository";

export function ServicosPage() {
  const {
    servs,
    states,
    setStates,
    handleChange,
    handleOk,
    porcentagemIsValid,
  } = useServicosPage();
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
            onOk: handleOk,
            okText: "Salvar",
            okButtonProps: {
              disabled:
                states.servico &&
                !porcentagemIsValid(states.servico.porcentagem),
            },
            confirmLoading: states.loading,
            open: states.openModal,
            destroyOnClose: true,
            cancelText: "Cancelar",
            closeIcon: false,
            onCancel: () => {
              setStates({ ...states, openModal: false });
            },
          }}
        >
          <Space direction="vertical">
            <label htmlFor="servico">Servico</label>
            <Input
              id="servico"
              type="text"
              value={states.servico?.servico}
              onChange={handleChange}
            />
            <label htmlFor="valor">Valor</label>
            <Input
              id="valor"
              type="number"
              value={states.servico?.valor}
              onChange={handleChange}
            />
            <label htmlFor="porcentagem">Repasse(%)</label>
            <Input
              id="porcentagem"
              type="number"
              status={
                states.servico &&
                !porcentagemIsValid(states.servico.porcentagem)
                  ? "error"
                  : ""
              }
              value={states.servico!.porcentagem}
              onChange={handleChange}
            />
          </Space>
        </ModalAntd>
      )}
    </>
  );
}
