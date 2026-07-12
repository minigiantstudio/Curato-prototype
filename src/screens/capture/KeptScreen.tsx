import React from 'react';
import { MomentScreen } from '../../components/MomentScreen';
import { useApp } from '../../state/AppState';

export function CaptureKeptScreen() {
  const app = useApp();

  return (
    <MomentScreen
      headline="Kept."
      description="Added to your taste model. That's your 6th earth-tone serif — Curato is watching this pattern form."
      stats={[
        { value: 35, label: 'Captures' },
        { value: 6, label: 'This Pattern' },
      ]}
      primaryLabel="Capture another →"
      onPrimary={app.goCaptureUploadReset}
      onSecondary={app.goHome}
    />
  );
}
