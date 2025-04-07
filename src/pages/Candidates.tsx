import { useEffect, useState } from "react";
import { Table, Avatar } from "antd";
import api from "../api/axios";

interface Candidate {
  id: string;
  name: string;
  email: string;
  birthday: string;
  education: string;
  avatar: string;
}

const Candidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await api.get("/candidates");
        setCandidates(response.data);
      } catch (error) {
        console.error("Greška pri dohvatanju kandidata:", error);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <div style={{ padding: 24 }}>
      <h1>Kandidati</h1>
      <Table
        rowKey="id"
        dataSource={candidates}
        columns={[
          {
            title: "Avatar",
            dataIndex: "avatar",
            render: (avatar: string) => <Avatar src={avatar} />,
          },
          {
            title: "Ime i prezime",
            dataIndex: "name",
          },
          {
            title: "Email",
            dataIndex: "email",
          },
          {
            title: "Datum rođenja",
            dataIndex: "birthday",
          },
          {
            title: "Obrazovanje",
            dataIndex: "education",
          },
        ]}
      />
    </div>
  );
};

export default Candidates;
