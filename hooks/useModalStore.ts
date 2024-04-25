import { create } from "zustand";

type modalType = "instant-meeting" | "schedule-meeting" | "join-meeting";

interface modalStore {
  type: modalType | null;
  isOpen: boolean;
  onOpen: (type: modalType) => void;
  onClose: () => void;
}

const useModalStore = create<modalStore>((set) => ({
  type: null,
  isOpen: false,
  additionalData: {},
  onOpen: (type) => {
    set({ isOpen: true, type });
  },
  onClose: () => set({ type: null, isOpen: false }),
}));

export default useModalStore;
