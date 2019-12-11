export type ContextProps = {
  iframeGlobalSuffix?: string;
  shouldUseOldWidthProvider?: boolean;
  iframeWidthDetectorFallback?:
    | React.RefObject<HTMLDivElement>
    | null
    | undefined;
};

export type Props = {
  setWidth: (width: number) => void;
  children: React.ReactNode;
};
