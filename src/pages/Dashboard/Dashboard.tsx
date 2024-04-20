import { Calendar, Col, Row } from "antd";
import TotalCountCard from "src/components/Dashboard/TotalCountCard";
import Text from "src/components/Text";

export default function Dashboard() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} xl={8}>
            <TotalCountCard
              resource="companies"
              isLoading={false}
              totalCount={14}
            />
          </Col>
          <Col xs={24} sm={24} xl={8}>
            <TotalCountCard
              resource="contacts"
              isLoading={false}
              totalCount={12}
            />
          </Col>
          <Col xs={24} sm={24} xl={8}>
            <TotalCountCard
              resource="deals"
              isLoading={false}
              totalCount={24}
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
