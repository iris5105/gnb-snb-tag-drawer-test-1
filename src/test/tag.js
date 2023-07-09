import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Tag, theme } from "antd";
import { useEffect, useState } from "react";
import { RiFilter2Line } from "react-icons/ri";

const FilterTagAdder = ({ selectedValue, onValueChange, onTagClick }) => {
  const { token } = theme.useToken();
  const [tagValue, setTagValue] = useState([]);

  useEffect(() => {
    setTagValue(selectedValue);
  }, [selectedValue]);

  const handleClose = () => {
    const updatedValue = {};
    setTagValue(updatedValue);
    onValueChange(updatedValue);
  };

  const handleTagClick = () => {
    onTagClick(true);
  };

  return (
    <>
      <div
        style={{
          marginBottom: 14,
          display: "flex",
          alignItems: "center",
        }}
      >
        {tagValue.length > 0 ? (
          <div>
            <RiFilter2Line
              onClick={handleTagClick}
              style={{
                fontSize: 15,
              }}
            />
            <Tag
              closable
              onClose={(e) => {
                e.preventDefault();
                handleClose();
              }}
            >
              {tagValue}
            </Tag>
          </div>
        ) : (
          <div>
            <Tag onClick={handleTagClick} style={{ borderStyle: "dashed" }}>
              필터 추가
              <PlusOutlined />
            </Tag>
          </div>
        )}
      </div>
    </>
  );
};
export default FilterTagAdder;
