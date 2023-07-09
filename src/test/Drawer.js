import React, { useState } from "react";
import {
  Drawer,
  Input,
  Space,
  Layout,
  Select,
  Divider,
  Typography,
  TreeSelect,
  theme,
  Tag,
} from "antd";
import { CloseOutlined, PlusOutlined } from "@ant-design/icons";
import { FiTrash } from "react-icons/fi";
import { TfiCheck } from "react-icons/tfi";
import dayjs from "dayjs";

import "../index.css";
const { Text } = Typography;
const { Content } = Layout;
const currentDate = dayjs();

const includeOps = [
  {
    value: "1",
    label: "포함",
  },
  {
    value: "2",
    label: "미포함",
  },
];
const sessionOps = [
  {
    label: "Node1",
    value: "0-0",
    children: [
      //자식노드의 이름은 무조건 children
      {
        label: "Child Node1",
        value: "0-0-1",
      },
      {
        label: "Child Node2",
        value: "0-0-2",
      },
    ],
  },
  {
    label: "Node2",
    value: "0-1",
  },
];
const dateOps = [];
for (let i = 0; i < 30; i++) {
  var day = currentDate.subtract(i, "day");
  dateOps.push({
    value: i,
    label: day.format("YYYYMMDD"),
  });
}
const MyComponent = () => {
  const [visible, setVisible] = useState(false);
  const { token } = theme.useToken();
  const [filter, setFilter] = useState({});

  const showDrawer = () => {
    setVisible(true);
  };

  const closeDrawer = () => {
    setVisible(false);
    resetFilter();
  };

  const closeButtonStyle = {
    position: "absolute",
    top: "8px",
    right: "8px",
  };
  const resetFilter = () => {
    setFilter({
      include: "포함",
      session: "첫번째 세션",
      date: currentDate.format("YYYYMMDD"),
    });
  };
  const findNodeByValue = (nodes, targetValue) => {
    const foundNode = nodes.find((node) => node.value === targetValue);
    //targetValue와 동일한 node가 있다면?
    if (foundNode) {
      return foundNode;
    }
    //targetValue와 동일한 node가 부모node에 없다면 자식node를 탐색
    //nodes는 부모노드, node는 부모노드의 요소
    for (const node of nodes) {
      //자식노드 중 children이라는 이름의 배열을 호출
      if (node.children) {
        const nestedNode = findNodeByValue(node.children, targetValue);
        //자식  node에 해당하는 값이 있다면 for문 break
        if (nestedNode) {
          return nestedNode;
        }
      }
    }
    return null;
  };
  const FilterSet = (mode, value) => {
    if (mode === "include") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        include: includeOps[value - 1].label,
      }));
    } else if (mode === "session") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        session: findNodeByValue(sessionOps, value).label,
      }));
    } else if (mode === "date") {
      setFilter((prevFilter) => ({
        ...prevFilter,
        date: dateOps[value].label,
      }));
    }
  };
  const saveFilter = () => {
    setVisible(false);
  };

  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };

  return (
    <div>
      <Tag onClick={showDrawer} style={tagPlusStyle}>
        <PlusOutlined /> 필터 추가
      </Tag>
      <Input
        value={`${filter.include || ""} ${
          filter.session ? `= ${filter.session}` : ""
        } ${filter.date || ""}`}
      />
      <Drawer
        className="FilterDrawer"
        title={
          <div>
            <TfiCheck
              style={{ marginLeft: -40, marginRight: 110 }}
              onClick={saveFilter}
            />
            필터구성
          </div>
        }
        open={visible}
        onClose={closeDrawer}
        mask={false} // Disable the mask layer
        maskClosable={false} // Prevent closing the drawer when clicking outside
        closeIcon={<CloseOutlined style={closeButtonStyle} />} // Apply custom style to the close button
        headerStyle={{
          height: "30px",
        }}
      >
        <div>
          <Content
            style={{
              margin: "-17px -10px -20px",
              paddingBottom: "10px",
              height: "auto",
              background: "white",
              justifyContent: "space-between",
              alignItems: "center",
              borderRadius: "8px 8px 8px 8px", // 모서리를 둥글게.
              border: "1px solid #ccc",
            }}
          >
            <div
              style={{
                margin: "5px 10px 10px",
              }}
            >
              <Text
                style={{
                  fontSize: "10px",
                }}
                type="secondary"
              >
                조건(최대 5개 설정)
              </Text>
            </div>
            <Divider style={{ marginTop: "-5px" }}></Divider>
            <div
              style={{
                marginTop: -15,
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* 포함 여부 셀렉트 */}
              <Space wrap>
                <Select
                  size="small"
                  value={filter.include}
                  defaultValue="포함"
                  onChange={(value) => FilterSet("include", value)}
                  style={{
                    width: 70,
                  }}
                  bordered={false}
                  options={includeOps}
                />
              </Space>
              <Text
                style={{
                  marginTop: 1,
                  marginLeft: -200,
                }}
              >
                {" "}
                측정기준{" "}
              </Text>
              <FiTrash
                style={{ fontSize: 20, marginRight: 10, marginTop: 3 }}
                onClick={resetFilter}
              />
            </div>
            <div>
              {/* 세션 셀렉트 */}
              <Space wrap>
                <TreeSelect
                  defaultValue="첫 번째 세션"
                  size="small"
                  style={{
                    marginLeft: 10,
                    paddingTop: 5,
                    width: 200,
                  }}
                  dropdownStyle={{
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                  value={filter.session}
                  treeDefaultExpandAll
                  treeData={sessionOps}
                  onChange={(value) => FilterSet("session", value)}
                  options={sessionOps}
                />
              </Space>
            </div>
            <div
              style={{
                marginLeft: 11,
                marginTop: 10,
              }}
            >
              <Text style={{}}>측정 기준 값</Text>
            </div>
            <div>
              <Space wrap>
                <Select
                  defaultValue="20230623"
                  size="small"
                  style={{
                    marginLeft: 10,
                    paddingTop: 5,
                    width: 200,
                  }}
                  value={filter.date}
                  onChange={(value) => FilterSet("date", value)}
                  options={dateOps}
                />
              </Space>
            </div>
          </Content>
          <div
            style={{
              marginTop: 20,
              paddingTop: 10,
            }}
          >
            <Text>요약</Text>
            <div>
              <Input
                placeholder="Basic usage"
                value={`${filter.include || ""} ${
                  filter.session ? `${filter.session} = ` : ""
                } ${filter.date || ""}`}
                readOnly
              />
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default MyComponent;
