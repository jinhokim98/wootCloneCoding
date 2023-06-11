import styled from "styled-components/native";
import ButtonIcon from "./ButtonIcon";

export default function ResponseButtonComment() {
  const { count, icon } = props;

  // 댓글 버튼을 눌렀을 때 아래 댓글 창이 열려야한다.
  const onPress = () => {};

  return (
    <ResponseButtonContainer>
      <ButtonIcon buttonType={icon} />
      <StateNumber>{count}</StateNumber>
    </ResponseButtonContainer>
  );
}

const ResponseButtonContainer = styled.Pressable`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StateNumber = styled.Text`
  margin-left: 7px;
  font-size: 18px;
  color: #696d79;
`;
