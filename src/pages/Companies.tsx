import { useEffect, useState } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import api from "../api/axios";

interface Company {
  id: string;
  name: string;
  email: string;
}

const Companies = () => {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [editingCompany, setEditingCompany] = useState<Company | null>(null);
  const [form] = Form.useForm();

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await api.get("/companies");
      setCompanies(response.data);
    } catch (error) {
      console.error("Greška prilikom dohvatanja kompanija:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await api.delete(`/companies/${id}`);
      setCompanies((prev) => prev.filter((c) => c.id !== id));
      message.success("Kompanija obrisana");
    } catch (error) {
      console.error("Greška prilikom brisanja kompanije:", error);
    }
  };

  const handleEdit = (company: Company) => {
    setEditingCompany(company);
    form.setFieldsValue(company);
    setIsModalVisible(true);
  };

  const handleAddNew = () => {
    setEditingCompany(null);
    form.resetFields();
    setIsModalVisible(true);
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      if (editingCompany) {
        const response = await api.put(
          `/companies/${editingCompany.id}`,
          values
        );
        setCompanies((prev) =>
          prev.map((c) => (c.id === editingCompany.id ? response.data : c))
        );
        message.success("Kompanija ažurirana");
      } else {
        const response = await api.post("/companies", values);
        setCompanies((prev) => [...prev, response.data]);
        message.success("Kompanija dodata");
      }
      setIsModalVisible(false);
    } catch (error) {
      console.error("Greška prilikom čuvanja kompanije:", error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Kompanije</h1>

      <Button
        type="primary"
        onClick={handleAddNew}
        style={{ marginBottom: 16 }}
      >
        + Dodaj kompaniju
      </Button>

      <Table
        rowKey="id"
        dataSource={companies}
        columns={[
          {
            title: "Naziv",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Akcije",
            render: (_, record) => (
              <>
                <Button type="link" onClick={() => handleEdit(record)}>
                  Izmeni
                </Button>
                <Button
                  type="link"
                  danger
                  onClick={() => handleDelete(record.id)}
                >
                  Obriši
                </Button>
              </>
            ),
          },
        ]}
      />

      <Modal
        open={isModalVisible}
        title={editingCompany ? "Izmeni kompaniju" : "Dodaj kompaniju"}
        onCancel={() => setIsModalVisible(false)}
        onOk={handleSave}
        okText={editingCompany ? "Sačuvaj" : "Dodaj"}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Naziv"
            rules={[{ required: true, message: "Naziv je obavezan." }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[{ required: true, message: "Email je obavezan." }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Companies;
