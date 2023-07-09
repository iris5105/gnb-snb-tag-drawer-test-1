import React, { useState } from "react";
import "./index.css";
import { Button, Modal, Space } from "antd";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const showModal = (value) => {
    console.log("showModal value", value);
    setModalTitle(value);
    setIsModalOpen(true);
  };

  return (
    <Space>
      <Button onClick={() => showModal("delete")}>Confirm</Button>
      <Button onClick={() => showModal("update")}>Update</Button>
      <Modal
        style={{
          width: 10,
        }}
        title={modalTitle === "delete" ? "필터삭제" : "필터적용"}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <p>
          {modalTitle === "delete"
            ? "필터를 삭제하시겠습니까?"
            : "필터를 적용하시겠습니까?"}
        </p>
      </Modal>
    </Space>
  );
};

export default App;
