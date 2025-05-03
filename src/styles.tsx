import styled from "styled-components";

const COLORS = Object.freeze({
  story_gradient1: "#6228d7",
  story_gradient2: "#ee2a7b",
  story_gradient3: "#f9ce34",
  gray: "#d6d6d6",
  white: "#fff",
  modalBg: "#000",
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

export const UserStoryWrapper = styled.li<{ isSeen: boolean }>`
  list-style: none;
  border-radius: 50%;
  height: 107px;
  width: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => {
    return props.isSeen
      ? COLORS.gray
      : `linear-gradient(${COLORS.story_gradient1}, ${COLORS.story_gradient2}, ${COLORS.story_gradient3})`;
  }};
  .avatar {
    height: 100px;
    border-radius: 50%;
    padding: 4px;
    background-color: ${COLORS.white};
  }
`;
