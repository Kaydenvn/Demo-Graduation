import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import { List, Space } from "antd";
import React from "react";

const news = [
  {
    title: "Đăng ký đề tài KH&CN cấp ĐHQG-HCM năm 2025",
    description: "Đề tài KH&CN cấp ĐHQG-HCM năm 2025",
    content:
      "Thông báo v/v Đăng ký kế hoạch hoạt động KH&CN cấp ĐHQG-HCM năm 2025. Kính đề nghị Quý đơn vị thông báo rộng rãi đến Quý Thầy/Cô thuộc đơn vị mình tham gia đăng ký nhiệm vụ cấp ĐHQG-HCM, đồng thời tổng hợp và gửi danh sách đăng ký về Phòng KHCN&DA trước 11h30', ngày 15/4/2024 (theo biểu mẫu Danh sách đăng ký đính kèm).",
    photo: "https://fte.hcmut.edu.vn/assets/img/default.jpg",
    date: "09/04/2024",
  },
  {
    title: "Hội nghị Khoa học và Công nghệ OISP cho SV",
    description: "Hội nghị Khoa học và Công nghệ OISP cho SV",
    content:
      "Thông tin tổng quan về Hội nghị: Ngày diễn ra Hội nghị: Ngày 21/07/2024, Địa điểm dự kiến: Tòa nhà A4. Đối tượng tham dự: Tất cả SV, học viên của Trường Đại học Bách khoa",
    date: "05/04/2024",
    photo: "https://fte.hcmut.edu.vn/static/images/abc.png",
  },
  {
    title:
      "Các công trình nghiên cứu đặc tính động cơ đốt trong trên phần mềm AVL BOOST",
    description:
      "Các công trình nghiên cứu đặc tính động cơ đốt trong trên phần mềm AVL BOOST",
    content:
      "AVL BOOST là chương trình toàn diện để phát triển động cơ đốt trong trong môi trường ảo. Phần mềm cung cấp các mô hình mô phỏng chuyên sâu giúp phân tích hiệu suất động cơ, khí thải và đặc tính của quá trình cháy một cách chính xác. Với sự hỗ trợ của công ty AVL LIST GmbH (Áo), các sinh viên chuyên ngành kỹ thuật Ô tô tại Bộ môn Kỹ thuật Ô tô (Trường Đại học Bách khoa TP. HCM) đã có cơ hội sử dụng phần mềm BOOST trong các hoạt động học tập và nghiên cứu.",
    date: "06/12/2023",
    photo:
      "https://fte.hcmut.edu.vn/static/images/BM_O_to/AVL_logo_logotype.png",
  },
  {
    title: "HỘI NGHỊ KHOA HỌC TRẺ KỸ THUẬT GIAO THÔNG",
    description: "HỘI NGHỊ KHOA HỌC TRẺ KỸ THUẬT GIAO THÔNG",
    content:
      "Hội nghị Khoa học trẻ Kỹ thuật Giao thông lần thứ 2 (YTCSE 2024) là sự kiện hàng năm do Hội Khoa học và Kỹ thuật Giao thông Việt Nam (VAST) tổ chức. Hội nghị năm nay sẽ được tổ chức tại Trường Đại học Bách khoa TP. HCM vào ngày 26/10/2024.",
    date: "28/09/2023",
    photo:
      "https://fte.hcmut.edu.vn/static/images/news/THU_MOI_HOI_NGHI_11-2023.PNG",
  },
];

const IconText = ({ icon, text }: { icon: React.FC; text: string }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const News: React.FC = () => (
  <List
    itemLayout="vertical"
    size="large"
    pagination={{
      onChange: (page) => {
        console.log(page);
      },
      pageSize: 4,
    }}
    className="container mt-4 mx-auto"
    dataSource={news}
    renderItem={(item) => (
      <List.Item
        key={item.title}
        actions={[
          <IconText
            icon={StarOutlined}
            text="156"
            key="list-vertical-star-o"
          />,
          <IconText
            icon={LikeOutlined}
            text="156"
            key="list-vertical-like-o"
          />,
          <IconText
            icon={MessageOutlined}
            text="2"
            key="list-vertical-message"
          />,
        ]}
        extra={<img width={272} alt="logo" src={item.photo} />}
      >
        <List.Item.Meta
          title={<div>{item.title}</div>}
          description={item.description + " - " + item.date}
        />
        {item.content}
      </List.Item>
    )}
  />
);

export default News;
