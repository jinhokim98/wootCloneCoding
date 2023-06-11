import styled from "styled-components/native";
import MBTITag from "./MBTITag";
import theme from "../style/theme";

export default function WriterInfo(props) {
  const { type, writer } = props;
  return (
    <WriterInfoContainer>
      <MBTITag type={type} text={type} isWriterTag={true} />
      <Writer>{writer}</Writer>
    </WriterInfoContainer>
  );
}

const WriterInfoContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const Writer = styled.Text`
  margin-left: 5px;
  color: ${theme.ScreenColor.listUI.writer};
`;
