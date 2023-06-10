import styled from "styled-components/native";
import theme from "../style/theme";

import { like, comment, dot } from "./Image";

const buttonTypeDefinition = {
  like: like,
  comment: comment,
  dot: dot,
};

export default function ButtonIcon(props) {
  const { buttonType } = props;
  return (
    <ButtonContainer>
      <ButtonIconImage source={buttonTypeDefinition[buttonType]} />
    </ButtonContainer>
  );
}

const ButtonContainer = styled.Pressable``;

const ButtonIconImage = styled.Image`
  width: 25px;
  height: 25px;
`;
