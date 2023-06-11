import styled from "styled-components/native";
import theme from "../style/theme";
import { useEffect, useState } from "react";
import MBTITag from "./MBTITag";
import ResponseButton from "./ResponseButton";

export default function MainList(props) {
  const { title, contents, navigation } = props;
  const [list, setList] = useState([]);

  useEffect(() => {
    // 메인화면에서 보이는 컨텐츠는 모든 게시글 중 최신 게시물 3개만 보여준다.
    const threeLatestContents = contents
      .filter((content) => content.questionId > contents.length - 3)
      .sort((a, b) => b.questionId - a.questionId);

    setList(threeLatestContents);
  }, [contents]);

  return (
    <MainListContainer>
      <Header>
        <Title>{title}</Title>
        <More onPress={() => navigation.navigate("List")}>
          <MoreText>더 보기</MoreText>
        </More>
      </Header>
      {/* 바디에 링크 걸어버리면 된다. */}
      <Body onPress={() => navigation.navigate("List")}>
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

const Body = styled.Pressable``;

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
