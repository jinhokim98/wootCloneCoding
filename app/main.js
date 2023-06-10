import styled from "styled-components/native";
import theme from "../style/theme";
import Button from "../components/Button";
import MainList from "../components/MainList";
import { useEffect, useState } from "react";
import { questionData } from "../data/question";

export default function Main({ navigation }) {
  const [allQuestions, setAllQuestions] = useState([]);
  const [myTypeQuestions, setMyTypeQuestions] = useState([]);

  const myType = "ESFJ";

  // dummy data에서 값을 불러와서 저장한다.
  useEffect(() => {
    setAllQuestions(questionData);
    setMyTypeQuestions(
      questionData.filter((question) => question.type === myType)
    );
  }, []);

  return (
    <MainContainer>
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
          <MainList
            title={`${myType}에게 도착한 질문`}
            navigation={navigation}
            contents={myTypeQuestions}
          />
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

const MainContainer = styled.View`
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
  color: #b4b4bd;
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
