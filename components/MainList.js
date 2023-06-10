import styled from "styled-components/native";
import theme from "../style/theme";
import { useEffect, useState } from "react";
import MBTITag from "./MBTITag";
import ResponseButton from "./ResponseButton";

export default function MainList(props) {
  const { title, contents, navigation } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    setList(contents);
  }, []);

  return (
    <MainListContainer>
      <Header>
        <Title>{title}</Title>
        <More onPress={() => navigation.navigate("List")}>
          <MoreText>더 보기</MoreText>
        </More>
      </Header>
      <Body>
        {list.length > 0 &&
          list.map((item) => (
            <List key={`list_${item.questionId}`}>
              <MBTITag type={item.type} text={item.type} isWriterTag={false} />
              <ListContext numberOfLines={1} ellipsizeMode="tail">
                {item.context}
              </ListContext>
              <ResponseButton count={item.comments.length} icon="comment" />
            </List>
          ))}
      </Body>
    </MainListContainer>
  );
}

const MainListContainer = styled.View`
  margin-top: ${theme.margin.content};
`;

const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 10px;
`;

const Title = styled.Text`
  font-size: 20px;
  font-weight: 700;
  color: ${theme.ScreenColor.mainUI.body.text};
`;

const More = styled.Pressable``;

const MoreText = styled.Text`
  color: ${theme.ScreenColor.mainUI.body.more};
  font-size: 15px;
  font-weight: 700;
`;

const Body = styled.View``;

const List = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-color: #f4f5f9;
  border-bottom-width: 2px;
`;

const ListContext = styled.Text`
  width: 68%;
  color: ${theme.ScreenColor.mainUI.body.text};
  font-size: 15px;
  font-weight: 700;
`;
