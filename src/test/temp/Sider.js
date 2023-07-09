import React from "react";
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { SelectPicker } from "rsuite";

import { Layout, Menu, Divider } from "antd";
const { Sider } = Layout;
const Adselect = () => {
  const data = [
    "Eugenia",
    "Bryan",
    "Linda",
    "Nancy",
    "Lloyd",
    "Alice",
    "Julia",
    "Albert",
  ].map((item) => ({ label: item, value: item }));
  return <SelectPicker data={data} style={{ width: 224 }} />;
};
const Lnb = ({ collapsed }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ height: "100vh" }}
    >
      <div className="demo-logo-vertical" />
      <div className="sider-selector">
        <span>광고주 선택</span>
        <Adselect />
      </div>
      <Divider style={{ borderColor: "#273240" }} />
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={["0"]}
        items={[
          {
            key: "0",
            icon: <UserOutlined />,
            label: <Link to="/">통합대시보드</Link>,
          },
          {
            key: "1",
            icon: <VideoCameraOutlined />,
            label: <Link to="/temp/dashboard">대시보드</Link>,
          },
          {
            key: "2",
            icon: <UploadOutlined />,
            label: <Link to="/temp/report-down">보고서 다운로드</Link>,
          },
          {
            key: "3",
            icon: <UploadOutlined />,
            label: <Link to="/temp/monitoring/alarm">모니터링 알람</Link>,
            children: [
              {
                key: "3-1",
                label: (
                  <Link to="/temp/monitoring/alarm-setting">알람 설정</Link>
                ),
              },
              {
                key: "3-2",
                label: (
                  <Link to="/temp/monitoring/alarm-story">
                    알람 실행 스토리
                  </Link>
                ),
              },
            ],
          },
          {
            key: "4",
            icon: <UploadOutlined />,
            label: <Link to="/temp/media/upload">매체 파일 업로드</Link>,
          },
          {
            key: "5",
            icon: <UploadOutlined />,
            label: <Link to="/temp/media/export">매체 데이터 내보내기</Link>,
          },
          {
            key: "6",
            icon: <UploadOutlined />,
            label: <Link to="/temp/media/download">매체 데이터 다운로드</Link>,
          },
        ]}
      />
    </Sider>
  );
};
export default Lnb;
