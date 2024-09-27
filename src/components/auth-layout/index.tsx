import { Col, Image, Row } from "antd";

type AuthenLayoutProps = {
  children: React.ReactNode;
};

function AuthenLayout({ children }: AuthenLayoutProps) {
  return (
    <div
      style={{
        width: "83%",
      }}
    >
      <div
        style={{
          maxWidth: "83%",
          height: "auto",
          display: "block",
          margin: "0 auto",
          padding: "20px",
        }}
      >
        <Row align={"middle"} gutter={30} style={{ padding: "20px" }}>
          <Col span={12}>
            <Image src="https://workflow.com.vn/wp-content/uploads/2023/01/single_pod.jpg" />
          </Col>
          <Col span={12}>{children}</Col>
        </Row>
      </div>
    </div>
  );
}

export default AuthenLayout;
