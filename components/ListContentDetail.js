import styled from "styled-components/native";
import MBTITag from "./MBTITag";
import ButtonIcon from "./ButtonIcon";
import WriterInfo from "./WriterInfo";
import Comment from "./Comment";
import ResponseButton from "./ResponseButton";
import { useEffect, useState } from "react";
import { Text } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import theme from "../style/theme";

export default function ListContentDetail() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [loadCount, setLoadCount] = useState(null);
  const [commentText, setCommentText] = useState("");

  const myType = "ESFJ";

  const handlePullDownRefresh = () => {
    console.log("hi");
  };

  const onSubmit = (questionId) => {
    saveComment(questionId - 1);
    setCommentText("");
  };

  const saveComment = async (index) => {
    try {
      // 삭제 없다고 가정, 이미 댓글이 몇 개 있다고 가정 (댓글이 없는 경우는 없음)
      const newAllQuestions = allQuestions;
      const commentNewIndex = allQuestions[index].comments.length;

      newAllQuestions[index].comments.push({
        commentId: commentNewIndex + 1,
        writerType: myType,
        writer: "익명",
        context: commentText,
        likeCount: 0,
      });

      setAllQuestions(newAllQuestions);

      const jsonData = JSON.stringify(newAllQuestions);

      await AsyncStorage.setItem("questionData", jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  // 초기에만 호출
  const fetchData = async () => {
    try {
      const jsonData = await AsyncStorage.getItem("questionData");
      const data = JSON.parse(jsonData);

      // 질문 삭제는 우선 없다고 가정해서 질문 수와 id 최댓값은 동일
      const showData = data
        .filter(
          (question) =>
            question.questionId <= data.length &&
            question.questionId > data.length - 4
        )
        .sort((a, b) => b.questionId - a.questionId);

      setAllQuestions(data);
      setQuestions(showData);
      setLoadCount(data.length - 4);
    } catch (error) {
      console.log(error);
    }
  };

  // 이어서 데이터를 로드하는 함수
  const proceedLoadData = (loadCount) => {
    const proceedData = allQuestions
      .filter(
        (question) =>
          question.questionId <= loadCount &&
          question.questionId > loadCount - 4
      )
      .sort((a, b) => b.questionId - a.questionId);

    setLoadCount((prev) => prev - 4);

    return proceedData;
  };

  // 스크롤이 끝에 도달했을 때 실행하는 함수
  const onEndReached = () => {
    if (!isLoading) {
      setIsLoading(true);
      setTimeout(() => {
        const proceedData = proceedLoadData(loadCount);
        setQuestions((prev) => [...prev, ...proceedData]);
        setIsLoading(false);
      }, 2000);
    }
  };

  // 일단은 4개만 불러온다.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <InfinityScrollView
      data={questions}
      renderItem={(item) =>
        renderItem(item, commentText, setCommentText, onSubmit)
      }
      keyExtractor={(item) => item.questionId}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.8}
      ListFooterComponent={isLoading && <Text>loading...</Text>}
      refreshing={isLoading}
      onRefresh={handlePullDownRefresh}
    />
  );
}

function renderItem({ item }, commentText, setCommentText, onSubmit) {
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
          <MakeCommentInput
            placeholder="댓글 남기기"
            onChangeText={(text) => setCommentText(text)}
            value={commentText}
            onSubmitEditing={() => {
              onSubmit(question.questionId);
            }}
          />
        </MakeCommentContainer>
      </ListContentDetailInner>
    </ListContentDetailContainer>
  );
}

const InfinityScrollView = styled.FlatList``;

const ListContentDetailContainer = styled.View`
  margin-top: 20px;
  padding: 0 20px;
  border-color: ${theme.ScreenColor.listUI.border};
  border-bottom-width: 20px;
`;

const ListContentDetailInner = styled.View`
  padding-bottom: 20px;
`;

const ListContext = styled.Text`
  margin: 15px 0;
  font-size: 17px;
`;

const ListStatusBar = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 15px 0;
  border-color: ${theme.ScreenColor.listUI.border};
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
  color: ${theme.ScreenColor.listUI.moreButton};
`;

const MakeCommentContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 50px;
  padding: 8px 12px;
  background-color: ${theme.ScreenColor.listUI.commentBar};
  border-radius: 10px;
`;

const CommentIcon = styled.Image`
  width: 20px;
  height: 20px;
  margin-right: 10px;
`;

const MakeCommentInput = styled.TextInput`
  width: 80%;
  height: 50px;
`;
