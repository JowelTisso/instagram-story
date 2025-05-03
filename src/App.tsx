import { useEffect } from "react";
import "./App.css";
import { UserStoryWrapper, Wrapper } from "./styles";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  setCurrentActiveStoryIndex,
  setOpenStory,
  setUsers,
} from "./reducers/mainSlice";
import { User } from "./types";
import { userStories } from "./data";
import StoryViewer from "./components/StoryViewer";

const fetchUserStories = async () => {
  try {
    const response = await axios.get(
      "https://run.mocky.io/v3/d6c21744-d620-4d5d-bbe4-9672e999d319"
    );
    return response ? response.data : null;
  } catch (e) {
    console.log(e);
  }
};

type UserStoryType = {
  user: User;
  onClick: (currentIndex: number) => void;
  currentIndex: number;
};

const UserStory = ({ user, onClick, currentIndex }: UserStoryType) => {
  return (
    <UserStoryWrapper
      className="user-story-wrapper"
      isSeen={user.isSeen}
      onClick={() => onClick(currentIndex)}
    >
      <img src={user.avatar} alt="avatar" className="avatar" />
    </UserStoryWrapper>
  );
};

function App() {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.users);
  const openStory = useAppSelector((state) => state.openStory);

  useEffect(() => {
    (async () => {
      if (!users.length) {
        const response = await fetchUserStories();
        dispatch(setUsers(response.stories));
      }
    })();
  }, []);

  const openStoryViewer = (currentIndex: number) => {
    dispatch(setOpenStory(true));
    dispatch(setCurrentActiveStoryIndex(currentIndex));
  };

  return (
    <Wrapper>
      <header>
        <img
          className="letter-logo"
          src="/instagram-text-icon.png"
          alt="instagram letter"
        />
      </header>
      <section className="stories-wrapper">
        <ul className="stories">
          {userStories?.map((user, index) => (
            <UserStory
              key={user.userId}
              user={user}
              currentIndex={index}
              onClick={openStoryViewer}
            />
          ))}
        </ul>
      </section>
      <main className="feed"></main>
      {openStory && <StoryViewer />}
    </Wrapper>
  );
}

export default App;
