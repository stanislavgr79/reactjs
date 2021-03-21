import React from 'react';

const OopsText = (): JSX.Element => <h2>Something wrong</h2>;
const isEverythingOk = true;

export default function ErrorBoundary(props: { children?: React.ReactNode }): JSX.Element {
  return <>{isEverythingOk ? props.children : <OopsText />}</>;
}
