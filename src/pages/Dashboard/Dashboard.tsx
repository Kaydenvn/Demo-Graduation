import { useQuery } from "@tanstack/react-query";
import { Badge, BadgeProps, Calendar, Col, Row, Spin } from "antd";
import { countSubject } from "src/api/Subject.api";
import TotalCountCard from "src/components/Dashboard/TotalCountCard";
import Text from "src/components/Text";
import { countModel } from "./../../api/Model.api";
import { countUser } from "./../../api/User.api";
import { Dayjs } from "dayjs";

const getListData = (value: Dayjs) => {
  let listData;
  const dateValue = value.format("DD/MM/YYYY");
  switch (dateValue) {
    case "31/05/2024":
      listData = [{ type: "success", content: "Bảo vệ đồ án" }];
      break;
    default:
  }
  return listData || [];
};

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

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData.map((item) => (
          <li key={item.content}>
            <Badge
              status={item.type as BadgeProps["status"]}
              text={item.content}
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="p-4 sm:ml-64">
      <div className="p-4">
        <Row gutter={[32, 32]}>
          <Col xs={24} sm={24} xl={8}>
            {countModelQuery.isLoading ? (
              <Spin />
            ) : (
              <TotalCountCard
                resource="companies"
                isLoading={false}
                totalCount={countModelQuery?.data}
              />
            )}
          </Col>
          <Col xs={24} sm={24} xl={8}>
            {countSubjectQuery.isLoading ? (
              <Spin />
            ) : (
              <TotalCountCard
                resource="contacts"
                isLoading={false}
                totalCount={countSubjectQuery?.data || 0}
              />
            )}
          </Col>
          <Col xs={24} sm={24} xl={8}>
            {countUserQuery.isLoading ? (
              <Spin />
            ) : (
              <TotalCountCard
                resource="deals"
                isLoading={false}
                totalCount={countUserQuery?.data || 0}
              />
            )}
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Text className="mt-12" size="lg">
            Thời Khoá Biểu:
          </Text>
          <Calendar cellRender={dateCellRender} />
        </Row>
      </div>
    </div>
  );
}
