import React from 'react';
import { MomentScreen } from '../../components/MomentScreen';
import { useApp } from '../../state/AppState';

export function ReviewConfirmedScreen() {
  const app = useApp();
  const leftCount = Math.max(app.principles.length - app.reviewIndex - 1, 0);

  return (
    <MomentScreen
      headline="Principle"
      headlineAccent="confirmed."
      description={`"${app.lastConfirmedStatement}" is now part of your taste model.`}
      stats={[
        { value: app.principlesConfirmed, label: 'Principles' },
        { value: leftCount, label: 'Left To Review' },
      ]}
      primaryLabel={app.isLastPrinciple ? 'Done →' : 'Next pattern →'}
      onPrimary={app.nextPattern}
      onSecondary={app.goHome}
    />
  );
}
