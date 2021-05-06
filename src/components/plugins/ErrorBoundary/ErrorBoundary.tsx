import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface ErrorState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
  hasError?: boolean;
}

class ErrorBoundary extends React.Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: undefined, errorInfo: undefined };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
      hasError: true,
    });
  }

  render() {
    if (this.state.hasError) {
      // eslint-disable-next-line no-console
      console.log(this.state.errorInfo);
      return (
        <div className="error-screen">
          <h2>An error has occured</h2>
          <details style={{ whiteSpace: 'pre-wrap' }}>
            {this.state.error && this.state.error.message.toString()}
            <br />
            {this.state.errorInfo && this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    return <React.Fragment>{this.props.children}</React.Fragment>;
  }
}

export default ErrorBoundary;
