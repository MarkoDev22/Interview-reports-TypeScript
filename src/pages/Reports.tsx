// Reports.tsx
import { useEffect, useState } from "react";
import { Table, Button, message, Popconfirm, Space } from "antd";
import api from "../api/axios";
import ReportFormModal from "../components/ReportFormModal";

interface Report {
  id?: string;
  candidateName: string;
  companyName: string;
  interviewDate: string;
  phase: string;
  status: string;
  note?: string;
}

const Reports = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const response = await api.get("/reports");
        setReports(response.data);
      } catch (error) {
        console.error("Greška prilikom dohvatanja izveštaja:", error);
      }
    };
    fetchReports();
  }, []);

  const handleAddReport = async (values: Report) => {
    try {
      const response = await api.post("/reports", values);
      setReports((prev) => [...prev, response.data]);
      setIsModalVisible(false);
      message.success("Izveštaj uspešno dodat!");
    } catch (error) {
      console.error("Greška prilikom dodavanja izveštaja:", error);
    }
  };

  const handleDelete = async (id?: string) => {
    try {
      await api.delete(`/reports/${id}`);
      setReports((prev) => prev.filter((report) => report.id !== id));
      message.success("Izveštaj je uspešno obrisan.");
    } catch (error) {
      message.error("Greška prilikom brisanja izveštaja.");
      console.error(error);
    }
  };

  return (
    <div style={{ padding: 24 }}>
      <h1>Izveštaji o intervjuima</h1>

      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginBottom: 16 }}
      >
        + Novi izveštaj
      </Button>

      <Table
        rowKey="id"
        dataSource={reports}
        columns={[
          { title: "Kandidat", dataIndex: "candidateName" },
          { title: "Kompanija", dataIndex: "companyName" },
          { title: "Datum intervjua", dataIndex: "interviewDate" },
          { title: "Faza", dataIndex: "phase" },
          { title: "Status", dataIndex: "status" },
          {
            title: "Akcija",
            render: (_, record) => (
              <Space>
                <Popconfirm
                  title="Da li ste sigurni da želite da obrišete ovaj izveštaj?"
                  onConfirm={() => handleDelete(record.id)}
                  okText="Da"
                  cancelText="Ne"
                >
                  <Button danger type="link">
                    Obriši
                  </Button>
                </Popconfirm>
              </Space>
            ),
          },
        ]}
      />

      <ReportFormModal
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        onSubmit={handleAddReport}
      />
    </div>
  );
};

export default Reports;
