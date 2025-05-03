import styled from "styled-components";
import { COLORS } from "../styles";
import Modal from "react-modal";

export const ModalWrapper = styled(Modal)`
  background-color: ${COLORS.black};
  height: 100%;
  header {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
    background: linear-gradient(rgba(60, 60, 60, 0.5), rgba(238, 238, 238, 0));

    .timeline {
      display: flex;
      margin-top: 10px;
      gap: 5px;
      .progress-bar {
        background-color: transparent;
        height: 2px;
        width: 95%;

        &::-webkit-progress-value {
          background-color: ${COLORS.white};
        }

        &::-webkit-progress-bar {
          background-color: ${COLORS.gray2};
        }
      }
    }

    .info {
      width: 95%;
      display: flex;
      margin-top: 10px;
      margin-left: auto;
      margin-right: auto;

      .left {
        flex: 1;
        display: flex;
        gap: 20px;
        align-items: center;

        .avatar {
          height: 40px;
          border-radius: 50%;
        }

        .username {
          color: ${COLORS.white};
        }
      }

      .right {
        display: flex;
        gap: 20px;
      }
    }

    .icon-more {
      color: ${COLORS.white};
      font-size: 22px;
    }

    .icon-close {
      color: ${COLORS.white};
      font-size: 24px;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;

    .btn-backdrop {
      position: absolute;
      top: 100px;
      bottom: 0;
      width: 100px;
      z-index: 1;
    }

    .btn-left {
      left: 0;
    }

    .btn-left:active {
      background: linear-gradient(
        to right,
        rgba(173, 173, 173, 0.052),
        rgba(237, 237, 237, 0.001)
      );
    }

    .btn-right {
      right: 0;
    }

    .btn-right:active {
      background: linear-gradient(
        to left,
        rgba(173, 173, 173, 0.052),
        rgba(237, 237, 237, 0.001)
      );
    }

    .story-wrapper {
      display: flex;
      overflow: hidden;
      height: 100%;

      .img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: all 300ms ease-out;
      }
    }
  }
`;
