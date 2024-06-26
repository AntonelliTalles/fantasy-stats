import create from 'zustand';

interface FantasyStatsState {
  points: number;
  increasePoints: () => void;
}

export const useStore = create<FantasyStatsState>((set) => ({
  points: 0,
  increasePoints: () => set((state) => ({ points: state.points + 1 })),
}));
