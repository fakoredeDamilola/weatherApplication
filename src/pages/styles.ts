import { Box } from "@mui/material";
import styled from "styled-components";

export const HomeTabs = styled(Box)<{ tabs: number }>`
  display: grid;
  grid-template-columns: ${({ tabs }) => `repeat(${tabs}, 1fr)`};
  text-align: center;
  width: 100%;
  background-color: #fff;
`;
export const Tab = styled(Box)<{ selected?: boolean }>`
  padding: 14px 12px 14px 12px;
  cursor: pointer;
  transition: 0.3s all;
  background: ${({ selected }) => (selected ? "#383838" : "transparent")};
  color: ${({ selected }) => (selected ? "white" : "#383838")};
  &:hover {
    background: #383838;
    color: white;
  }
`;
