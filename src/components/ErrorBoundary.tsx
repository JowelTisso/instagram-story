import * as React from "react";

type ErrorProps = {
  fallback?: React.ReactNode | string;
  children: React.ReactNode;
};

type StateType = {
  hasError: boolean;
};

export default class ErrorBoundary extends React.Component<
  ErrorProps,
  StateType
> {
  constructor(props: ErrorProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Update state so the next render will show the fallback UI.
    console.log(error);

    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.log(error, info.componentStack, React.captureOwnerStack());
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return this.props.fallback;
    }

    return this.props.children;
  }
}
