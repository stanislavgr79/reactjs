import React from 'react';
import './WithLoading.scoped.less';

interface WithLoadingProps {
  isLoading: boolean;
}

export default function WithLoading(Component: React.FC) {
  const LoadingIndication = (): JSX.Element => <h2>Just a moment... Movies are loading...</h2>;

  return function WithLoadingComponent({
    isLoading,
    ...props
  }: WithLoadingProps): React.ReactElement {
    return isLoading ? <LoadingIndication /> : <Component {...props} />;
  };
}
