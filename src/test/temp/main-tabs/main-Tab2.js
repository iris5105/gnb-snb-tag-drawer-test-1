import React, { useState } from "react";
import { Space, Typography } from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleChevronRight } from "@fortawesome/free-solid-svg-icons";
import { isEqual } from "lodash";
import { Datashow } from "../../components/Datashow";
import Calendar from "../../components/calendar.js";
import { Adfilter, Mdfilter, AdSitefilter } from "../../components/filter.js";

const { Text } = Typography;

const MainTad2 = () => {
  const dispop = 10;
  const [adList, setAdList] = useState([]);
  const [mdList, setMdList] = useState([]);
  const [adsiteList, setAdStieList] = useState([]);
  // 광고주 선택 옵션
  const adoptions = [
    { label: "롯데푸드몰-PeopleDB", value: "롯데푸드몰-PeopleDB" },
    { label: "모바일미샤", value: "모바일미샤" },
    { label: "비즈스프링_대행사", value: "비즈스프링_대행사" },
    { label: "A 비즈스프링", value: "A 비즈스프링" },
    {
      label: "옥경화_네스프레소_광고주 생성",
      value: "옥경화_네스프레소_광고주 생성",
    },
    { label: "옥경화_라이프하우스", value: "옥경화_라이프하우스" },
    { label: "진실 테스트 220726", value: "진실 테스트 220726" },
    { label: "국가대표광고", value: "국가대표광고" },
    { label: "재홍 테스트 230103", value: "재홍 테스트 230103" },
    { label: "oniontest", value: "oniontest" },
    { label: "(주)교육지대", value: "(주)교육지대" },
    { label: "미샤 에이블씨엔씨", value: "미샤 에이블씨엔씨" },
  ];
  // 광고 사이트 옵션
  const adsiteoptions = [
    { label: "족보닷컴", value: "족보닷컴" },
    { label: "족보닷컴 모바일", value: "족보닷컴 모바일" },
    { label: "에이블샵", value: "에이블샵" },
    { label: "미샤 모바일", value: "미샤 모바일" },
    { label: "족보클라우드", value: "족보클라우드" },
    { label: "비즈스프링_대행사", value: "BIZSPRING 웹사이트" },
    { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
    { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
    { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
    { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
    { label: "BIZSPRING 웹사이트", value: "BIZSPRING 웹사이트" },
  ];
  // 광고매체사 옵션
  const mdoptions = [
    { label: "네이버", value: "네이버" },
    { label: "카카오", value: "카카오" },
    { label: "페이스북", value: "페이스북" },
    { label: "ADN PC", value: "ADN PC" },
    { label: "DABLE", value: "DABLE" },
    { label: "모비온", value: "모비온" },
    { label: "구글", value: "트구글위터" },
    { label: "FACEBOOK", value: "FACEBOOK" },
  ];

  const adChange = (value) => {
    const AdfilteredValue = value.filter((option) => option !== "selectAll");
    //제거하지 말것 selectAll 삭제 후 setAdList에 추가할 때 무한 루프에 들어감.
    if (!isEqual(AdfilteredValue, adList)) {
      setAdList(AdfilteredValue);
    }
  };
  const mdChange = (value) => {
    const MdfilteredValue = value.filter((option) => option !== "selectAll");
    //제거하지 말것 selectAll 삭제 후 setAdList에 추가할 때 무한 루프에 들어감.
    if (!isEqual(MdfilteredValue, mdList)) {
      setMdList(MdfilteredValue);
    }
  };

  const adsiteChange = (value) => {
    const AdSitefilteredValue = value.filter(
      (option) => option !== "selectAll"
    );
    //제거하지 말것 selectAll 삭제 후 setAdList에 추가할 때 무한 루프에 들어감.
    if (!isEqual(AdSitefilteredValue, adsiteList)) {
      setAdStieList(AdSitefilteredValue);
    }
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Calendar />
      </div>
      <div style={{ border: "1px solid #e8ecee", padding: "25px" }}>
        <Space size="large">
          <Text strong level={4}>
            분석대상 선택&nbsp;
            <FontAwesomeIcon icon={faCircleChevronRight} />
          </Text>

          <Adfilter options={adoptions} onValueChange={adChange} />
          <AdSitefilter options={adsiteoptions} onValueChange={adsiteChange} />
          <Mdfilter options={mdoptions} onValueChange={mdChange} />
          <Datashow />
        </Space>
      </div>
      <div>
        <br />
        <h4 className="selected-analysis-targer">선택한 분석 대상</h4>
        <div className="selected-analysis-targer-div">
          <span className="selected-analysis-targer-span">광고주 </span>
          {adList.length <= dispop ? (
            <p className="selected-analysis-targer-p">{adList.join(" / ")}</p>
          ) : (
            <>
              <p>{`${adList.slice(0, dispop).join(" / ")} 외 ${
                adList.length - dispop
              }개`}</p>
            </>
          )}
          <span className="selected-analysis-targer-span">매체 </span>
          {mdList.length <= dispop ? (
            <p className="selected-analysis-targer-p">{mdList.join(", ")}</p>
          ) : (
            <>
              <p>{`${mdList.slice(0, dispop).join(" / ")} 외 ${
                mdList.length - dispop
              }개`}</p>
            </>
          )}
        </div>
      </div>
    </>
  );
};
export default MainTad2;
