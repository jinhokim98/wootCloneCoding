import styled from "styled-components/native";
import theme from "../style/theme";
import Button from "../components/Button";
import MainList from "../components/MainList";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { RefreshControl } from "react-native";
import { questionData } from "../data/question";

export default function Main({ navigation }) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [myTypeQuestions, setMyTypeQuestions] = useState([]);
  const [screenRefresh, setScreenRefresh] = useState(false);

  const myType = "ESFJ";

  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("questionData");
      const data = JSON.parse(jsonData);
      setAllQuestions(data);
      setMyTypeQuestions(data.filter((question) => question.type === myType));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // 새로고침 및 다시 데이터를 불러올 시 유지
  const refreshData = useCallback(() => {
    fetchData();
  }, []);

  const handleScreenRefresh = useCallback(() => {
    setScreenRefresh(true);
    fetchData();
    setScreenRefresh(false);
  }, []);

  useFocusEffect(refreshData);

  // 초기 데이터가 있나 확인하는 함수
  useEffect(() => {
    const storageSaveQuestion = async () => {
      try {
        const data = JSON.stringify(questionData);
        await AsyncStorage.setItem("questionData", data);
      } catch (error) {
        console.log(error);
      }
    };
    const checkAsyncStorage = async () => {
      try {
        const jsonData = await AsyncStorage.getItem("questionData");
        if (jsonData === null || jsonData === undefined) {
          throw "null data";
        }
      } catch (err) {
        storageSaveQuestion();
      }
    };
    checkAsyncStorage();
  }, []);

  return (
    <MainContainer
      refreshControl={
        <RefreshControl
          refreshing={screenRefresh}
          onRefresh={handleScreenRefresh}
        />
      }
    >
      <Header>
        <Title>
          <SubTitleContainer>
            <AskTitle>애스크</AskTitle>
            <Beta>beta</Beta>
          </SubTitleContainer>
          <AskPersonalityTypeTitle>
            성격 유형에게 물어보세요
          </AskPersonalityTypeTitle>
        </Title>
        <ButtonContainer>
          <Button title="질문하기" />
        </ButtonContainer>
      </Header>
      {allQuestions.length > 0 && (
        <>
          {myTypeQuestions.length > 0 && (
            <MainList
              title={`${myType}에게 도착한 질문`}
              navigation={navigation}
              contents={myTypeQuestions}
            />
          )}

          <MainList
            title="모든 유형의 질문"
            navigation={navigation}
            contents={allQuestions}
          />
        </>
      )}
    </MainContainer>
  );
}

const MainContainer = styled.ScrollView`
  max-width: 500px;
  margin-top: 40px;
  padding: 0 20px;
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  height: 70px;
`;

const ButtonContainer = styled.View`
  margin-top: 20px;
`;

const Title = styled.View`
  width: 80%;
  height: 100px;
`;

const SubTitleContainer = styled.View`
  position: relative;
`;

const AskTitle = styled.Text`
  margin-bottom: 5px;
  color: ${theme.ScreenColor.mainUI.header.askTitle};
  font-size: 18px;
  font-weight: 700;
`;

const Beta = styled.Text`
  position: absolute;
  left: 18%;
  color: ${theme.ScreenColor.mainUI.header.beta};
  font-size: 10px;
  font-weight: 700;
`;

const AskPersonalityTypeTitle = styled.Text`
  color: ${theme.ScreenColor.mainUI.header.askPersonalityTypeTitle};
  font-size: 25px;
  font-weight: 800;
`;
