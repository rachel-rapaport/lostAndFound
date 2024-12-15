// // src/store.ts
// import {create} from 'zustand';

// interface AppState {
//   vercelUrl: string;
//   isVercelUrlSet: boolean; // This flag ensures we only set vercelUrl once
//   setVercelUrl: (url: string) => void;
// }

// export const useAppStore = create<AppState>((set) => ({
//   vercelUrl: localStorage.getItem("vercelUrl") || "", // Try to load from localStorage if available
//   isVercelUrlSet: localStorage.getItem("vercelUrl") !== null, // If vercelUrl exists in localStorage, it's already set
//   setVercelUrl: (url: string) =>
//     set((state) => {
//       if (!state.isVercelUrlSet) {
//         // Only set if it's not set yet
//         localStorage.setItem("vercelUrl", url); // Persist to localStorage
//         return { vercelUrl: url, isVercelUrlSet: true };
//       }
//       return state; // Do nothing if already set
//     }),
// }));
