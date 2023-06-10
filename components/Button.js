import styled from "styled-components/native";
import theme from "../style/theme";

export default function Button(props) {
  const { title } = props;
  return (
    <ButtonContainer>
      <ButtonText>{title}</ButtonText>
    </ButtonContainer>
  );
}

const ButtonContainer = styled.Pressable`
  height: 30px;
  background-color: ${theme.ScreenColor.mainUI.header.askButton};
  border-radius: 20px;
`;

const ButtonText = styled.Text`
  padding: 5px 12px;
  color: white;
  font-weight: 500;
`;
