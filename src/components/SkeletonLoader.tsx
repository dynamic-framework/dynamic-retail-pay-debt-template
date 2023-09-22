import { DSkeleton } from '@dynamic-framework/ui-react';

export default function SkeletonLoader() {
  return (
    <DSkeleton viewBox="0 0 320 355" backgroundColor="#e9e9ff" foregroundColor="#f8f8fb">
      <rect x="0" y="0" rx="8" ry="8" width="320" height="46" />
      <rect x="0" y="66" rx="8" ry="8" width="320" height="60" />
      <rect x="0" y="144" rx="8" ry="8" width="320" height="30" />
      <rect x="0" y="184" rx="8" ry="8" width="320" height="30" />
      <rect x="0" y="224" rx="8" ry="8" width="320" height="30" />
      <rect x="0" y="265" rx="8" ry="8" width="320" height="40" />
      <rect x="40%" y="320" rx="8" ry="8" width="65" height="30" />
    </DSkeleton>
  );
}
