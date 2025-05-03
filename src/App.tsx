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
  "https://run.mocky.io/v3/0c78e16c-d83c-42df-be4b-fb5f885ba7f6";

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
      <div
        style={{
          display: "flex",
          height: "100%",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <FadeLoader color={COLORS.story_gradient2} />
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
