import React from 'react';
import { MomentScreen } from '../../components/MomentScreen';
import { useApp } from '../../state/AppState';

export function CompareSavedScreen() {
  const app = useApp();

  return (
    <MomentScreen
      headline="Insights"
      headlineAccent="saved."
      description="Added 2 comparisons to your taste model."
      stats={[
        { value: 35, label: 'Captures' },
        { value: 8, label: 'Comparisons' },
      ]}
      primaryLabel="Review more →"
      onPrimary={app.goReviewCard}
      onSecondary={app.goHome}
    />
  );
}
