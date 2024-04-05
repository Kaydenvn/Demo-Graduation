import { Card, List, Typography } from "antd";
import { Link } from "react-router-dom";

const { Title } = Typography;

const datasource = [
  {
    key: "1",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "2",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "3",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "4",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "5",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "6",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "7",
    url: "https://via.placeholder.com/300",
  },
  {
    key: "8",
    url: "https://via.placeholder.com/300",
  },
];

interface CardListProps {
  title: string;
  description: string;
}

const CardList = ({ title, description }: CardListProps) => {
  return (
    <section className="py-6 md:py-6 px-5">
      <div className="container mx-auto ">
        <div className="text-2xl font-medium mb-8 px-2">{title}</div>
        <p className="text-lg text-gray-600 mb-2 px-2">{description}</p>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            xxl: 5,
          }}
          pagination={{
            defaultCurrent: 1,
            total: 10,
            pageSize: 5,
            showSizeChanger: false,
            align: "center",
          }}
          style={{ width: "100%" }}
          dataSource={datasource}
          renderItem={(data: { key: string; url: string }) => (
            <List.Item>
              <Link to="/products">
                <Card
                  bordered={false}
                  key={data.key}
                  hoverable
                  cover={
                    <img
                      alt={"ALT"}
                      src={data.url}
                      style={{ padding: 20, borderRadius: 20 }}
                    />
                  }
                  style={{ width: 240 }}
                >
                  <Title level={5}>{"TITLE"}</Title>
                  {"BODY"}
                </Card>
              </Link>
            </List.Item>
          )}
        />
      </div>
    </section>
  );
};

export default CardList;
