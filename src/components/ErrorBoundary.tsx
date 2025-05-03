import * as React from "react";
import styled from "styled-components";

type ErrorProps = {
  fallback?: React.ReactNode | string;
  children: React.ReactNode;
};

type StateType = {
  hasError: boolean;
};

const ErrorBoundaryWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90%;
  flex-direction: column;

  .img-error {
    width: 50%;
  }
`;

export default class ErrorBoundary extends React.Component<
  ErrorProps,
  StateType
> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.log(error);

    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info.componentStack, React.captureOwnerStack());
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <ErrorBoundaryWrapper>
            <img src="/error.svg" alt="Error image" className="img-error" />
            <h2>Something went wrong!</h2>
          </ErrorBoundaryWrapper>
        )
      );
    }

    return this.props.children;
  }
}
