import { createContext } from 'react';
import { Mode } from './types';

type ModeCtxValue = [mode: Mode, setMode: (newMode: Mode) => void];

export const ModeCtx = createContext<ModeCtxValue>(['url', () => null]);
