import { useEffect } from "react";
import "./App.css";
import { UserStoryWrapper, Wrapper } from "./styles";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./hooks";
import { setStories } from "./reducers/mainSlice";
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

const UserStory = ({ user }: { user: User }) => {
  return (
    <UserStoryWrapper className="user-story-wrapper" isSeen={user.isSeen}>
      <img src={user.avatar} alt="avatar" className="avatar" />
    </UserStoryWrapper>
  );
};

function App() {
  const dispatch = useAppDispatch();
  const stories = useAppSelector((state) => state.stories);

  useEffect(() => {
    (async () => {
      if (!stories.length) {
        const response = await fetchUserStories();
        dispatch(setStories(response.stories));
      }
    })();
  }, []);

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
          {userStories?.map((user) => {
            return <UserStory key={user.userId} user={user} />;
          })}
        </ul>
      </section>
      <main className="feed"></main>
      <StoryViewer />
    </Wrapper>
  );
}

export default App;
