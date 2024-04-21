import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { Form, Input, Typography } from "antd";
import { useForm } from "antd/es/form/Form";

export function HomePage() {
  const [form] = useForm();
  return (
    <Form
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 22 }}
      form={form}
      name="dynamic_form_complex"
      initialValues={{ items: [{}] }}
    >
      <Form.List name="items">
        {(fields, { add, remove }) =>
          fields.map((field, index) => (
            <div
              key={field.key}
              style={{ display: "flex", gap: "5px", flexDirection: "row" }}
            >
              <Form.Item name={[field.name, "name"]}>
                <Input placeholder="Name" />
              </Form.Item>
              <Form.Item name={[field.name, "value"]}>
                <Input placeholder="value" />
              </Form.Item>
              {index > 0 && <CloseOutlined onClick={() => remove(index)} />}
              <PlusOutlined onClick={() => add()} />
            </div>
          ))
        }
      </Form.List>

      <Form.Item noStyle shouldUpdate>
        {() => (
          <Typography>
            <pre>{JSON.stringify(form.getFieldsValue(), null, 2)}</pre>
          </Typography>
        )}
      </Form.Item>
    </Form>
  );
}
