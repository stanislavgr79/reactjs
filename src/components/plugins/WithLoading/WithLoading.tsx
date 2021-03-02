import React from 'react';

interface WithLoadingProps {
  isLoading: boolean;
}

function WithLoading(Component: any) {
  const LoadingIndication = (): JSX.Element => <h2>Just a moment... Almost there</h2>;

  return function WithLoadingComponent({
    isLoading,
    ...props
  }: WithLoadingProps): React.ReactElement {
    if (!isLoading) return <Component {...props} />;
    return <LoadingIndication />;
  };
}

export default WithLoading;
