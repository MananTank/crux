import { createContext } from 'react';
import { Mode } from './types';

type ModeCtxValue = [mode: Mode, setMode: (newMode: Mode) => void];

// @ts-ignore
export const ModeCtx = createContext<ModeCtxValue>();
