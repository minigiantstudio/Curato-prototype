import React, { createContext, useCallback, useContext, useRef, useState } from 'react';
import { principles } from '../data/principles';

export type Screen =
  | 'home'
  | 'capture_upload'
  | 'capture_reading'
  | 'capture_why'
  | 'capture_kept'
  | 'compare_upload'
  | 'compare_comparing'
  | 'compare_result'
  | 'compare_saved'
  | 'brand_upload'
  | 'brand_analyzing'
  | 'brand_verdict'
  | 'review_card'
  | 'review_confirmed';

type State = {
  screen: Screen;
  accountOpen: boolean;
  principlesConfirmed: number;

  captureHasImage: boolean;
  showKeepParticle: boolean;

  compareHasA: boolean;
  compareHasB: boolean;
  showSaveParticle: boolean;

  brandHasImage: boolean;
  brandSheetOpen: boolean;
  brandName: string;

  reviewIndex: number;
  lastConfirmedStatement: string;
};

const initialState: State = {
  screen: 'home',
  accountOpen: false,
  principlesConfirmed: 13,

  captureHasImage: false,
  showKeepParticle: false,

  compareHasA: false,
  compareHasB: false,
  showSaveParticle: false,

  brandHasImage: false,
  brandSheetOpen: false,
  brandName: 'Plural Café',

  reviewIndex: 0,
  lastConfirmedStatement: '',
};

type Ctx = State & {
  principles: typeof principles;
  currentPrinciple: (typeof principles)[number];
  isLastPrinciple: boolean;

  goHome: () => void;
  goCaptureUpload: () => void;
  goCaptureUploadReset: () => void;
  goCompareUpload: () => void;
  goBrandUpload: () => void;
  goBrandUploadReset: () => void;
  goReviewCard: () => void;

  openAccount: () => void;
  closeAccount: () => void;

  setCaptureImage: () => void;
  startReading: () => void;
  retakeCapture: () => void;
  rejectCapture: () => void;
  keepCapture: () => void;

  setCompareA: () => void;
  setCompareB: () => void;
  startComparing: () => void;
  saveCompareInsights: () => void;

  setBrandImage: () => void;
  openBrandSheet: () => void;
  closeBrandSheet: () => void;
  pickBrand: (name: string) => void;

  rejectPrinciple: () => void;
  confirmPrinciple: () => void;
  nextPattern: () => void;
};

const AppStateContext = createContext<Ctx | null>(null);

export function AppStateProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(initialState);
  const patch = useCallback((p: Partial<State>) => setState((s) => ({ ...s, ...p })), []);

  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const after = useCallback((ms: number, fn: () => void) => {
    const t = setTimeout(fn, ms);
    timers.current.push(t);
  }, []);

  const currentPrinciple = principles[state.reviewIndex];
  const isLastPrinciple = state.reviewIndex >= principles.length - 1;

  const value: Ctx = {
    ...state,
    principles,
    currentPrinciple,
    isLastPrinciple,

    goHome: () => patch({ screen: 'home', accountOpen: false, brandSheetOpen: false }),
    goCaptureUpload: () => patch({ screen: 'capture_upload' }),
    goCaptureUploadReset: () => patch({ screen: 'capture_upload', captureHasImage: false }),
    goCompareUpload: () => patch({ screen: 'compare_upload' }),
    goBrandUpload: () => patch({ screen: 'brand_upload' }),
    goBrandUploadReset: () => patch({ screen: 'brand_upload', brandHasImage: false }),
    goReviewCard: () => patch({ screen: 'review_card' }),

    openAccount: () => patch({ accountOpen: true }),
    closeAccount: () => patch({ accountOpen: false }),

    setCaptureImage: () => patch({ captureHasImage: true }),
    startReading: () => {
      if (!state.captureHasImage) return;
      patch({ screen: 'capture_reading' });
      after(1800, () => patch({ screen: 'capture_why' }));
    },
    retakeCapture: () => patch({ screen: 'capture_upload', captureHasImage: false }),
    rejectCapture: () => patch({ screen: 'home' }),
    keepCapture: () => {
      patch({ showKeepParticle: true });
      after(500, () => patch({ screen: 'capture_kept', showKeepParticle: false }));
    },

    setCompareA: () => patch({ compareHasA: true }),
    setCompareB: () => patch({ compareHasB: true }),
    startComparing: () => {
      if (!(state.compareHasA && state.compareHasB)) return;
      patch({ screen: 'compare_comparing' });
      after(1800, () => patch({ screen: 'compare_result' }));
    },
    saveCompareInsights: () => {
      patch({ showSaveParticle: true });
      after(500, () => patch({ screen: 'compare_saved', showSaveParticle: false }));
    },

    setBrandImage: () => patch({ brandHasImage: true }),
    openBrandSheet: () => {
      if (state.brandHasImage) patch({ brandSheetOpen: true });
    },
    closeBrandSheet: () => patch({ brandSheetOpen: false }),
    pickBrand: (name: string) => {
      patch({ brandSheetOpen: false, screen: 'brand_analyzing', brandName: name });
      after(1800, () => patch({ screen: 'brand_verdict' }));
    },

    rejectPrinciple: () => {
      if (isLastPrinciple) patch({ screen: 'home' });
      else patch({ reviewIndex: state.reviewIndex + 1 });
    },
    confirmPrinciple: () => {
      patch({
        screen: 'review_confirmed',
        principlesConfirmed: state.principlesConfirmed + 1,
        lastConfirmedStatement: currentPrinciple.statement,
      });
    },
    nextPattern: () => {
      if (isLastPrinciple) patch({ screen: 'home' });
      else patch({ screen: 'review_card', reviewIndex: state.reviewIndex + 1 });
    },
  };

  return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>;
}

export function useApp() {
  const ctx = useContext(AppStateContext);
  if (!ctx) throw new Error('useApp must be used within AppStateProvider');
  return ctx;
}
