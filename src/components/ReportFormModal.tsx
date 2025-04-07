import { Modal, Form, Input, Select, DatePicker } from "antd";
import { useEffect } from "react";
import dayjs from "dayjs";

const { Option } = Select;

interface ReportFormModalProps {
  visible: boolean;
  onCancel: () => void;
  onSubmit: (values: any) => void;
  initialValues?: any;
}

const ReportFormModal = ({
  visible,
  onCancel,
  onSubmit,
  initialValues,
}: ReportFormModalProps) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue({
        ...initialValues,
        interviewDate: dayjs(initialValues.interviewDate),
      });
    } else {
      form.resetFields();
    }
  }, [initialValues, form]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      values.interviewDate = values.interviewDate.toISOString();
      onSubmit(values);
    } catch (err) {
      // validation error
    }
  };

  return (
    <Modal
      open={visible}
      title={initialValues ? "Izmeni izveštaj" : "Novi izveštaj"}
      onCancel={onCancel}
      onOk={handleOk}
      okText={initialValues ? "Sačuvaj" : "Dodaj"}
    >
      <Form form={form} layout="vertical" name="report_form_modal">
        <Form.Item
          name="candidateName"
          label="Kandidat"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="companyName"
          label="Kompanija"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="interviewDate"
          label="Datum intervjua"
          rules={[{ required: true }]}
        >
          <DatePicker showTime style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item name="phase" label="Faza" rules={[{ required: true }]}>
          <Select>
            <Option value="cv">CV</Option>
            <Option value="hr">HR</Option>
            <Option value="tech">Tehnički</Option>
            <Option value="final">Finalni</Option>
          </Select>
        </Form.Item>
        <Form.Item name="status" label="Status" rules={[{ required: true }]}>
          <Select>
            <Option value="passed">Prošao</Option>
            <Option value="declined">Odbijen</Option>
          </Select>
        </Form.Item>
        <Form.Item name="note" label="Napomena">
          <Input.TextArea rows={3} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReportFormModal;
