import styled from "styled-components/native";
import MBTITag from "./MBTITag";

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
  color: #c2c2ca;
`;
