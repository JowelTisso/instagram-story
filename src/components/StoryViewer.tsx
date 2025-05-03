import { useEffect, useState } from "react";
import { ModalWrapper } from "./StoryViewerStyles";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setOpenStory } from "../reducers/mainSlice";
import { AiOutlineEllipsis, AiOutlineClose } from "react-icons/ai";
import { userStories } from "../data";

const StoryViewer = () => {
  const openStory = useAppSelector((state) => state.openStory);
  const currentStoryIndex = useAppSelector((state) => state.currentStoryIndex);

  const dispatch = useAppDispatch();
  //TODO:change to data from api call
  const currentUser = userStories[currentStoryIndex ?? 0];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);

  useEffect(() => {
    const metaThemeTag = document.querySelector('meta[name="theme-color"]');
    if (metaThemeTag && openStory) {
      metaThemeTag.setAttribute("content", "#000");
    }

    return () => {
      if (metaThemeTag) {
        metaThemeTag.setAttribute("content", "#fff");
      }
    };
  }, [openStory]);

  const nextSlide = () => {
    const lastSlideIndex = currentUser.stories.length - 1;
    console.log(
      "nextSlide",
      currentSlideIndex,
      lastSlideIndex,
      currentUser.stories
    );
    if (currentSlideIndex !== lastSlideIndex) {
      console.log("click");

      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex !== 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  console.log(currentSlideIndex);

  return (
    <ModalWrapper isOpen={openStory}>
      <header>
        <div className="timeline">
          {currentUser?.stories.map((user) => (
            <progress key={user.id} value={0.5} className="progress-bar" />
          ))}
        </div>
        <div className="info">
          <div className="left">
            <img src={currentUser?.avatar} alt="avatar" className="avatar" />
            <div>
              <p className="username">{currentUser?.username}</p>
            </div>
          </div>
          <div className="right">
            <AiOutlineEllipsis className="icon-more" />
            <AiOutlineClose
              className="icon-close"
              onClick={() => dispatch(setOpenStory(false))}
            />
          </div>
        </div>
      </header>
      <main className="content">
        <div className="btn-backdrop btn-left" onClick={prevSlide}></div>
        <div className="story-wrapper">
          {currentUser?.stories.map((story) => (
            <img
              className="img"
              key={story.id}
              src={story.image}
              alt="story content"
              loading="lazy"
              style={{
                translate: `-${100 * currentSlideIndex}%`,
              }}
            />
          ))}
        </div>
        <div className="btn-backdrop btn-right" onClick={nextSlide}></div>
      </main>
    </ModalWrapper>
  );
};

export default StoryViewer;
