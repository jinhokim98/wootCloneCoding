import styled from "styled-components/native";
import ListContentDetail from "../components/ListContentDetail";
import { useEffect, useState } from "react";

export default function List({ navigation }) {
  return (
    <ListContainer>
      <ListContentDetail />
    </ListContainer>
  );
}

const ListContainer = styled.View`
  max-width: 500px;
  margin-top: 40px;
`;
