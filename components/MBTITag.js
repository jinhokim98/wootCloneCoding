import styled from "styled-components/native";
import theme from "../style/theme";

const typeColorDefinition = {
  // _NF_
  ENFP: theme.MBTIColors._NF_,
  INFP: theme.MBTIColors._NF_,
  ENFJ: theme.MBTIColors._NF_,
  INFJ: theme.MBTIColors._NF_,
  // _NT_
  ENTP: theme.MBTIColors._NT_,
  INTP: theme.MBTIColors._NT_,
  ENTJ: theme.MBTIColors._NT_,
  INTJ: theme.MBTIColors._NT_,
  // _S_J
  ESFJ: theme.MBTIColors._S_J,
  ISFJ: theme.MBTIColors._S_J,
  ESTJ: theme.MBTIColors._S_J,
  ISTJ: theme.MBTIColors._S_J,
  // _S_P
  ESFP: theme.MBTIColors._S_P,
  ISFP: theme.MBTIColors._S_P,
  ESTP: theme.MBTIColors._S_P,
  ISTP: theme.MBTIColors._S_P,
};

export default function MBTITag(props) {
  const { type, text, isWriterTag } = props;
  return (
    <MBTITagText isWriterTag={isWriterTag} type={type}>
      {text}
    </MBTITagText>
  );
}

const MBTITagText = styled.Text`
  align-self: flex-start;
  padding: ${(props) => (props.isWriterTag ? "2px 8px" : "5px 10px")};
  background-color: ${(props) => typeColorDefinition[props.type]};
  border-radius: ${(props) => (props.isWriterTag ? "5px" : "20px")};

  color: white;
  font-size: ${(props) => (props.isWriterTag ? "12px" : "15px")};
  font-weight: 900;
`;
