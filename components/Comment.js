import styled from "styled-components/native";
import WriterInfo from "./WriterInfo";
import ButtonIcon from "./ButtonIcon";
import ResponseButton from "./ResponseButton";

export default function Comment(props) {
  const { comment } = props;
  return (
    <CommentContainer>
      <CommentWriter>
        <WriterInfo type={comment.writerType} writer={comment.writer} />
      </CommentWriter>
      <CommentContext>{comment.context}</CommentContext>
      <LikeAndSetting>
        <ResponseButton count={comment.likeCount} icon="comment" />
        <ButtonIcon buttonType="dot" />
      </LikeAndSetting>
    </CommentContainer>
  );
}

const CommentContainer = styled.View`
  margin: 20px 0;
`;

const CommentWriter = styled.View``;

const CommentContext = styled.Text`
  margin: 15px 0;
`;

const LikeAndSetting = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const LikeFeat = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StateNumber = styled.Text`
  margin-left: 3px;
  font-size: 18px;
`;
