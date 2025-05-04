import styled from "styled-components";

export const COLORS = Object.freeze({
  story_gradient1: "#6228d7",
  story_gradient2: "#ee2a7b",
  story_gradient3: "#f9ce34",
  gray: "#d6d6d6",
  gray2: "rgba(209, 209, 209, 1)",
  white: "#fff",
  black: "#000",
});

export const Wrapper = styled.div`
  padding: 5px 10px;
  .letter-logo {
    width: 120px;
    margin: 10px 10px 0 10px;
  }

  .stories-wrapper {
    display: flex;
    overflow-x: scroll;
    width: 100%;
    height: 50%;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  .stories {
    min-height: 120px;
    display: flex;
    align-items: center;
    gap: 20px;
  }
`;
