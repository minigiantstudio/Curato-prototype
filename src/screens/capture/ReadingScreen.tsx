import React from 'react';
import { DimmedLoading } from '../../components/DimmedLoading';
import { PulsingFacet } from '../../components/Facet';

export function CaptureReadingScreen() {
  return (
    <DimmedLoading backgroundColors={['#b5895a', '#7a5636']} caption="Reading what you saw…">
      <PulsingFacet size={26} />
    </DimmedLoading>
  );
}
