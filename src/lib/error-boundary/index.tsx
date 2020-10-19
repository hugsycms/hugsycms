import React from 'react';
import PageWentWrong from '@/pages/system/exception/500';

export default class ErrorBoundary extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <PageWentWrong />;
    }

    return this.props.children;
  }
}
