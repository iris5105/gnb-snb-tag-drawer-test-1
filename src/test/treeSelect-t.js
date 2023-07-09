import React, { useState } from "react";
import { TreeSelect } from "antd";

const treeData = [
  {
    title: "Node1",
    value: "0-0",
    children: [
      //자식노드의 이름은 무조건 children
      {
        title: "Child Node1",
        value: "0-0-1",
      },
      {
        title: "Child Node2",
        value: "0-0-2",
      },
    ],
  },
  {
    title: "Node2",
    value: "0-1",
  },
];

const App = () => {
  const [value, setValue] = useState();

  //선택된 nodes의 value를 이용하여 해당하는 value가 treeData에 존재하는지 확인하는 함수
  const isOptionIncluded = (nodes, targetValue) => {
    return nodes.some((node) => {
      if (node.value === targetValue) {
        return true;
      }
      if (node.children) {
        return isOptionIncluded(node.children, targetValue);
      }
      return false;
    });
  };

  //treeSlect의 value 변경시에 해당하는 value를 변경하고 해당하는 value의 title을 출력하고 treedata에 존재하는지 확인.
  const onChange = (newValue) => {
    const selectedNode = findNodeByValue(treeData, newValue);
    if (selectedNode) {
      console.log("Selected option:", selectedNode.title);
    }
    setValue(newValue);
    const isOptionIncludedInTree = isOptionIncluded(treeData, newValue);
    console.log("Is option included in treeData:", isOptionIncludedInTree);
  };

  //선택된 nodes의 value를 이용하여 해당하는 value와 동일한 node를 찾아서 반환.
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

  return (
    <TreeSelect
      style={{
        width: "100%",
      }}
      value={value}
      dropdownStyle={{
        maxHeight: 400,
        overflow: "auto",
      }}
      treeData={treeData}
      placeholder="Please select"
      treeDefaultExpandAll
      onChange={onChange}
    />
  );
};

export default App;
