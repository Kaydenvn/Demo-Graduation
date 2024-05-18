import { Table } from "antd";
import React, { Fragment } from "react";
import Text from "src/components/Text";

const columns = [
  {
    title: "Mã lỗi",
    dataIndex: "code",
    key: "code",
    width: "20%",
  },
  {
    title: "Mô tả",
    dataIndex: "description",
    key: "description",
  },
];

const data = [
  {
    key: "1",
    code: "P0253",
    description: `Mã lỗi P0253 là mã lỗi cho vấn đề về điều khiển đo lường nhiên liệu bơm tiêm "A" thấp (Cam/Rotor/Injector). Mã lỗi này chỉ xuất hiện trên các động cơ diesel và chỉ được lưu trữ trên PCM (Powertrain Control Module) của xe. Nó có nghĩa là PCM của xe đã phát hiện sự không nhất quán giữa điện áp tín hiệu của bộ điều khiển nhiên liệu điện tử được gửi đi và tín hiệu được trả về bởi bộ điều khiển cảm biến đo lường nhiên liệu.`,
  },
  {
    key: "2",
    code: "P2111",
    description:
      "Mã lỗi P2112 trên xe diesel có nghĩa là hệ thống điều khiển bộ điều khiển ga không thể mở; đây là một mã lỗi liên quan đến hệ thống ga, cùng với mã lỗi P2111, chỉ ra rằng hệ thống không thể đóng. Hệ thống này liên quan đến động cơ ga, nơi di chuyển bản lề ga để mô-đun điều khiển động cơ (PCM) có thể điều chỉnh lượng không khí vào động cơ, tùy thuộc vào nhu cầu của người dùng.",
  },
  {
    key: "3",
    code: "P0101",
    description:
      "Mã lỗi P0101 là một mã sự cố chẩn đoán trong hệ thống ô tô, viết tắt của sự cố cảm biến lưu lượng khí khối (MAF). Khi máy tính trên ô tô phát hiện số đọc không hợp lý hoặc nằm ngoài phạm vi từ cảm biến MAF, nó sẽ ghi lại mã lỗi P0101",
  },
  {
    key: "4",
    code: "P0473",
    description:
      "Mã lỗi P0473 là một mã lỗi chẩn đoán trong hệ thống ô tô, liên quan đến cảm biến áp suất khí xả (Exhaust Pressure Sensor). Khi máy tính trên ô tô phát hiện giá trị áp suất khí xả không hợp lý hoặc nằm ngoài phạm vi từ cảm biến, nó sẽ ghi lại mã lỗi P0473.",
  },
  {
    key: "5",
    code: "P2113",
    description:
      "Mã lỗi P2113 là một mã lỗi chẩn đoán trong hệ thống ô tô, liên quan đến cảm biến điều khiển động cơ (ETC - Electronic Throttle Control). Khi máy tính trên ô tô phát hiện giá trị không hợp lý hoặc nằm ngoài phạm vi từ cảm biến ETC, nó sẽ ghi lại mã lỗi P2113.",
  },
];

export default function OBD() {
  return (
    <Fragment>
      <div className="container px-10 py-6">
        <Text size="xxl" className="font-bold">
          Mã lỗi OBD-II lấy trực tiếp trên mô hình
        </Text>
        <p className="mt-2">Tên mô hình Hyundai D4ea Commonrail</p>
      </div>
      <div className="px-6">
        <Table columns={columns} dataSource={data} />
      </div>
    </Fragment>
  );
}
