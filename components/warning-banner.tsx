type WarningBannerProps = {
  message: string;
};

export function WarningBanner({ message }: WarningBannerProps) {
  return (
    <div className="warning-banner" role="status" aria-live="polite">
      <strong>Warning</strong>
      <span>{message}</span>
    </div>
  );
}
