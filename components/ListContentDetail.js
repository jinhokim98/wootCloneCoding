import styled from "styled-components/native";
import MBTITag from "./MBTITag";
import ButtonIcon from "./ButtonIcon";
import WriterInfo from "./WriterInfo";
import Comment from "./Comment";
import ResponseButton from "./ResponseButton";
import { useEffect, useState } from "react";
import { questionData } from "../data/question";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ListContentDetail() {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(NaN); // 절대 나올 수 없는 값을 초기값으로

  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("questionData");
      const data = JSON.parse(jsonData);

      const loadIndex = loadCount === NaN ? data.length : loadCount;

      // 질문 삭제는 우선 없다고 가정해서 질문 수와 id 최댓값은 동일
      const showData = data.filter(
        (question) =>
          question.questionId <= loadIndex &&
          question.questionId > loadIndex - 4
      );

      setQuestions(showData);

      // loadCount 조정
      loadCount === NaN
        ? setLoadCount(data.length - 4)
        : setLoadCount((prev) => prev - 4);
    } catch (error) {
      console.log(error);
    }
  };

  // 이어서 데이터를 로드하는 함수
  const proceedLoadData = (loadCount) => {
    const proceedData = questionData.filter(
      (question) =>
        question.questionId <= loadCount + 4 && question.questionId > loadCount
    );
    setLoadCount((prev) => prev + 4);

    return proceedData;
  };

  // 스크롤이 끝에 도달했을 때 실행하는 함수
  const onEndReached = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        setQuestions((prev) => [...prev, ...proceedLoadData(loadCount)]);
        setIsLoading(false);
      }, 2000);
    }
  };

  // 일단은 4개만 불러온다.
  useEffect(() => {
    const data = questionData.filter((question) => question.questionId <= 4);
    setQuestions(data);
    setLoadCount(data.length);
  }, []);

  // 로드 정상적인지 확인하기 위해
  useEffect(() => {
    const data = questions.map((item) => item.questionId);
    console.log(data);
  }, [questions]);

  return (
    <InfinityScrollView
      data={questions}
      renderItem={renderItem}
      keyExtractor={(item) => item.questionId}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      ListFooterComponent={isLoading && <Text>loading...</Text>}
      refreshing={isLoading}
    />
  );
}

function renderItem({ item }) {
  const question = item;
  return (
    <ListContentDetailContainer>
      <ListContentDetailInner>
        <MBTITag
          type={question.type}
          text={`${question.type}에게 질문`}
          isWriterTag={false}
        />
        <ListContext>{question.context}</ListContext>
        <WriterInfo type={question.writerType} writer={question.writer} />
        <ListStatusBar>
          <LikeAndCommentIcon>
            <ResponseButton count={question.likeCount} icon="like" />
            <ResponseButton count={question.comments.length} icon="comment" />
          </LikeAndCommentIcon>
          <ButtonIcon buttonType="dot" />
        </ListStatusBar>
        <ShowAllCommentButton>
          <ShowAllCommentButtonText>
            댓글 {question.comments.length}개 모두 보기
          </ShowAllCommentButtonText>
        </ShowAllCommentButton>
        {question.comments.length > 0 &&
          question.comments.map((comment) => (
            <Comment key={`comment_${comment.commentId}`} comment={comment} />
          ))}
        <MakeCommentContainer>
          <CommentIcon source={require("../assets/icons/chat.png")} />
          <MakeCommentInput placeholder="댓글 남기기"></MakeCommentInput>
        </MakeCommentContainer>
      </ListContentDetailInner>
    </ListContentDetailContainer>
  );
}

const InfinityScrollView = styled.FlatList``;

const ListContentDetailContainer = styled.View`
  margin-top: 20px;
  padding: 0 20px;
  border-color: #f2f4f7;
  border-bottom-width: 20px;
`;

const ListContentDetailInner = styled.View`
  padding-bottom: 20px;
`;

const ListContext = styled.Text`
  margin: 15px 0;
  font-size: 17px;
`;

// border color 변경
const ListStatusBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0;
  border-color: #f4f5f9;
  border-bottom-width: 2px;
`;

const LikeAndCommentIcon = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 30%;
`;

const ShowAllCommentButton = styled.Pressable`
  margin-top: 20px;
`;

const ShowAllCommentButtonText = styled.Text`
  color: #9c9ca9;
`;

const MakeCommentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 8px 12px;
  background-color: #f7f8fa;
  border-radius: 10px;
`;

const CommentIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const MakeCommentInput = styled.TextInput`
  width: 100%;
  height: 50px;
`;
