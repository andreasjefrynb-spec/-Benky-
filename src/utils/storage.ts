import { CardItem, UserItemProgress, UserStats } from '../types';

const PROGRESS_KEY = 'nihongo_progress_v1';
const STATS_KEY = 'nihongo_stats_v1';
const CUSTOM_CARDS_KEY = 'nihongo_custom_cards_v1';

export function getStoredProgress(): Record<string, UserItemProgress> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = localStorage.getItem(PROGRESS_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

export function saveStoredProgress(progress: Record<string, UserItemProgress>) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
}

export function getStoredStats(): UserStats {
  const defaultStats: UserStats = {
    streakDays: 1,
    lastStudyDate: new Date().toISOString().split('T')[0],
    totalCardsReviewed: 0,
    quizCompleted: 0,
    masteredCount: 0,
  };

  if (typeof window === 'undefined') return defaultStats;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) return defaultStats;
    const data = JSON.parse(raw) as UserStats;

    // Check streak
    const today = new Date().toISOString().split('T')[0];
    if (data.lastStudyDate !== today) {
      const lastDate = new Date(data.lastStudyDate);
      const currentDate = new Date(today);
      const diffDays = Math.round((currentDate.getTime() - lastDate.getTime()) / (1000 * 3600 * 24));
      
      if (diffDays === 1) {
        data.streakDays += 1;
        data.lastStudyDate = today;
      } else if (diffDays > 1) {
        data.streakDays = 1;
        data.lastStudyDate = today;
      }
      localStorage.setItem(STATS_KEY, JSON.stringify(data));
    }

    return data;
  } catch {
    return defaultStats;
  }
}

export function updateStoredStats(updater: (prev: UserStats) => UserStats) {
  if (typeof window === 'undefined') return;
  try {
    const current = getStoredStats();
    const updated = updater(current);
    localStorage.setItem(STATS_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Failed to update stats:', e);
  }
}

export function getStoredCustomCards(): CardItem[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(CUSTOM_CARDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveStoredCustomCards(cards: CardItem[]) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(CUSTOM_CARDS_KEY, JSON.stringify(cards));
  } catch (e) {
    console.error('Failed to save custom cards:', e);
  }
}
