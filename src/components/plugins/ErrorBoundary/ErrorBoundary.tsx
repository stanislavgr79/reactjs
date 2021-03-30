import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface ErrorState {
  error?: Error;
  errorInfo?: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<Props, ErrorState> {
  constructor(props: Props) {
    super(props);
    this.state = { error: undefined, errorInfo: undefined };
  }

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({
      error: error,
      errorInfo: errorInfo,
    });
    // You can also log error messages to an error reporting service here
    // eslint-disable-next-line no-console
    console.log('error: ' + error);
    // eslint-disable-next-line no-console
    console.log('errorInfo: ' + JSON.stringify(errorInfo));
    // eslint-disable-next-line no-console
    console.log('componentStack: ' + errorInfo.componentStack);
  }

  render() {
    if (this.state.error) {
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
