export interface ErrorInfo {
  componentStack: any,
  [key: string]: any
}

export interface FallbackComponentProps {
  error: Error,
  info: ErrorInfo,
};
