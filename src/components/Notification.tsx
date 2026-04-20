type Props = {
  message: string;
  type: 'success' | 'error';
};

export function Notification({ message, type }: Props) {
  return (
    <div className={`notification notification-${type}`} role="alert" aria-live="assertive">
      {message}
    </div>
  );
}
