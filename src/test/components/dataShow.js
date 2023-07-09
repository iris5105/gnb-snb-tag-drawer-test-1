import React from "react";
import { Select } from "antd";
import { VscTriangleDown } from "react-icons/vsc";

const handleChange = (value) => {
  console.log(`selected ${value}`);
};
export const Datashow = () => (
  <div>
    <Select
      style={{ width: "100%" }}
      suffixIcon={<VscTriangleDown style={{ color: "black" }} />}
      size="small"
      defaultValue="1"
      onChange={handleChange}
      options={[
        {
          value: "1",
          label: "스크립트 전환 데이터 보기",
        },
        {
          value: "2",
          label: "매체 전환 데이터 보기",
        },
      ]}
    />
  </div>
);
