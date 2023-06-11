import styled from "styled-components/native";
import ButtonIcon from "./ButtonIcon";
import theme from "../style/theme";

export default function ResponseButton(props) {
  const { count, setCount, icon } = props;
  return (
    <ResponseButtonContainer>
      <ButtonIcon buttonType={icon} />
      <StateNumber>{count}</StateNumber>
    </ResponseButtonContainer>
  );
}

const ResponseButtonContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const StateNumber = styled.Text`
  margin-left: 7px;
  font-size: 18px;
  color: ${theme.ScreenColor.listUI.stateNumber};
`;
