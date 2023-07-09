import React from "react";
import { Col, Tabs, Row } from "antd";
import Breadcrumb from "../components/Breadcrumd";
import { IoMdTimer } from "react-icons/io";
import MainTab1 from "./main-tabs/main-Tab1";
import MainTab2 from "./main-tabs/main-Tab2";

const { TabPane } = Tabs;

const Main = () => {
  const items = [
    { title: "AIR(매체 통합 리포트)", href: "/" },
    { title: "대시보드" },
  ];
  return (
    <>
      <Row className="title-Row">
        <Col xs={24}>
          <Breadcrumb items={items} />
        </Col>
        <Col xs={24}>
          <div className="active-title">
            <IoMdTimer className="title-icon" />
            <span className="title-text">대시보드</span>
          </div>
        </Col>
      </Row>
      <div>
        <Tabs>
          <TabPane tab="통합광고 대시보드" key="1">
            <MainTab1 />
          </TabPane>
          <TabPane tab="광고주/매체사별 요약 대시보드" key="2">
            {/* <MainTab2></MainTab2> */}
          </TabPane>
        </Tabs>
      </div>
    </>
  );
};
export default Main;
