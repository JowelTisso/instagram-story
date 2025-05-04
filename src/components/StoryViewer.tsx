import { useEffect, useRef, useState } from "react";
import { ModalWrapper } from "./StoryViewerStyles";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setOpenStory } from "../reducers/mainSlice";
import { AiOutlineEllipsis, AiOutlineClose } from "react-icons/ai";
import { COLORS } from "../styles";
import { FadeLoader } from "react-spinners";

const StoryViewer = () => {
  const openStory = useAppSelector((state) => state.openStory);
  const userStories = useAppSelector((state) => state.users);
  const currentStoryIndex = useAppSelector((state) => state.currentStoryIndex);

  const dispatch = useAppDispatch();

  const currentUser = userStories[currentStoryIndex ?? 0];

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [progressValue, setProgressValue] = useState(0);
  const intervalIdRef = useRef<NodeJS.Timeout>(null);
  const [isLoading, setIsLoading] = useState(true);

  //Status bar theme change when viewing story
  useEffect(() => {
    const metaThemeTag = document.querySelector('meta[name="theme-color"]');
    if (metaThemeTag) {
      metaThemeTag.setAttribute("content", COLORS.black);
    }

    return () => {
      if (metaThemeTag) {
        metaThemeTag.setAttribute("content", COLORS.white);
      }
    };
  }, []);

  const nextSlide = () => {
    const lastSlideIndex = currentUser.stories.length - 1;
    if (currentSlideIndex !== lastSlideIndex) {
      setCurrentSlideIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlideIndex !== 0) {
      setCurrentSlideIndex((prev) => prev - 1);
    }
  };

  const getProgressValue = (
    progressIndex: number,
    currentSlideIndex: number
  ) => {
    if (currentSlideIndex > progressIndex) {
      return 100;
    } else if (currentSlideIndex === progressIndex) {
      return progressValue;
    } else {
      return 0;
    }
  };

  // Clear interval on 5 second complete
  useEffect(() => {
    if (progressValue === 100 && intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      nextSlide();
    }
  }, [progressValue]);

  // Updating the progress bar for 5 seconds
  useEffect(() => {
    if (intervalIdRef.current) {
      clearInterval(intervalIdRef.current);
      setProgressValue(0);
    }

    const clearId = setInterval(() => {
      setProgressValue((prev) => prev + 1);
    }, 50);
    intervalIdRef.current = clearId;
  }, [currentSlideIndex]);

  return (
    <ModalWrapper isOpen={openStory}>
      <header data-testid="story-viewer">
        <div className="timeline">
          {currentUser?.stories?.map((user, pIndex) => (
            <progress
              key={user.id}
              value={getProgressValue(pIndex, currentSlideIndex)}
              max={100}
              className="progress-bar"
            />
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
              data-testid="btn-close"
              onClick={() => dispatch(setOpenStory(false))}
            />
          </div>
        </div>
      </header>
      <main className="content">
        <div
          className="btn-backdrop btn-left"
          onClick={prevSlide}
          data-testid="btn-left"
        ></div>
        <div className="story-wrapper">
          {currentUser?.stories?.map((story) => (
            <img
              className="img"
              key={story.id}
              src={story.image}
              alt="story content"
              loading="lazy"
              style={{
                translate: `-${100 * currentSlideIndex}%`,
              }}
              onLoad={() => {
                setIsLoading(false);
              }}
            />
          ))}
        </div>
        <div
          className="btn-backdrop btn-right"
          onClick={nextSlide}
          data-testid="btn-right"
        ></div>
        {isLoading && (
          <div className="loader-wrapper">
            <FadeLoader color={COLORS.story_gradient3} />
          </div>
        )}
      </main>
    </ModalWrapper>
  );
};

export default StoryViewer;
