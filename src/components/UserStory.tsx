import styled from "styled-components";
import { COLORS } from "../styles";
import { UserStoryType } from "../types";

export const UserStoryWrapper = styled.li<{ $isSeen: boolean }>`
  list-style: none;
  border-radius: 50%;
  height: 107px;
  width: 107px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${(props) => {
    return props.$isSeen
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

const UserStory = ({ user, onClick, currentIndex }: UserStoryType) => {
  return (
    <UserStoryWrapper
      className="user-story-wrapper"
      $isSeen={user.isSeen}
      onClick={() => onClick(currentIndex)}
    >
      <img src={user.avatar} alt="avatar" className="avatar" loading="lazy" />
    </UserStoryWrapper>
  );
};

export default UserStory;
