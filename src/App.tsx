import { useEffect, useTransition } from "react";
import "./App.css";
import { COLORS, Wrapper } from "./styles";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "./hooks";
import {
  setCurrentActiveStoryIndex,
  setOpenStory,
  setUsers,
} from "./reducers/mainSlice";
import StoryViewer from "./components/StoryViewer";
import { FadeLoader } from "react-spinners";
import UserStory from "./components/UserStory";

const storiesUrl =
  "https://run.mocky.io/v3/966b8e58-ae38-43fe-a51a-643213bca5c0";

const fetchUserStories = async () => {
  try {
    const response = await axios.get(storiesUrl);
    return response ? response.data : null;
  } catch (e) {
    console.log(e);
  }
};

function App() {
  const dispatch = useAppDispatch();
  const userStories = useAppSelector((state) => state.users);
  const openStory = useAppSelector((state) => state.openStory);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    startTransition(async () => {
      if (!userStories.length) {
        const response = await fetchUserStories();
        if (response) {
          dispatch(setUsers(response));
        }
      }
    });
  }, []);

  const openStoryViewer = (currentIndex: number) => {
    dispatch(setOpenStory(true));
    dispatch(setCurrentActiveStoryIndex(currentIndex));
  };

  if (isPending)
    return (
      <div className="loader-wrapper">
        <FadeLoader color={COLORS.story_gradient3} />
      </div>
    );

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
        <ul className="stories" data-testid="stories">
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
