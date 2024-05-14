import { useQuery } from "@tanstack/react-query";
import { Calendar, Col, Row } from "antd";
import { countSubject } from "src/api/Subject.api";
import TotalCountCard from "src/components/Dashboard/TotalCountCard";
import Text from "src/components/Text";
import { countModel } from "./../../api/Model.api";
import { countUser } from "./../../api/User.api";

export default function Dashboard() {
  const countSubjectQuery = useQuery({
    queryKey: ["countSubject"],
    queryFn: () => countSubject(),
  });

  const countModelQuery = useQuery({
    queryKey: ["countModel"],
    queryFn: () => countModel(),
  });

  const countUserQuery = useQuery({
    queryKey: ["countUser"],
    queryFn: () => countUser(),
  });

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} xl={8}>
            <TotalCountCard
              resource="companies"
              isLoading={false}
              totalCount={countModelQuery?.data}
            />
          </Col>
          <Col xs={24} sm={24} xl={8}>
            <TotalCountCard
              resource="contacts"
              isLoading={false}
              totalCount={countSubjectQuery?.data || 0}
            />
          </Col>
          <Col xs={24} sm={24} xl={8}>
            <TotalCountCard
              resource="deals"
              isLoading={false}
              totalCount={countUserQuery?.data || 0}
            />
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Text className="mt-12" size="lg">
            Thời Khoá Biểu:
          </Text>
          <Calendar />
        </Row>
      </div>
    </div>
  );
}
