import React from 'react';

// default.tsx file to potentially resolve parallel route warnings
// See: https://nextjs.org/docs/app/building-your-application/routing/parallel-routes#defaultjs
export default function Default({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
