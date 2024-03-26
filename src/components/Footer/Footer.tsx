import { Layout } from "antd";
import { CSSProperties } from "react";
import { Link } from "react-router-dom";

const { Footer: FooterAntd } = Layout;
interface Props {
  colorBgContainer: string;
  className?: string;
  style?: CSSProperties | undefined;
}

export default function Footer({ colorBgContainer, style, className }: Props) {
  return (
    <FooterAntd
      style={{ textAlign: "center", background: colorBgContainer, ...style }}
      className={className}
    >
      2024 ©{" "}
      <Link to="https://github.com/Kaydenvn/" target="_blank">
        Kaydenvn
      </Link>
      . All rights reserved.
    </FooterAntd>
  );
}
