import { create } from 'zustand';

interface Device {
    name: string;
    place: string;
    command: string;
    color: string;
}

interface DevicesStore {
    devices: Device[];
    addDevice: (device: Device) => void;
    setDevices: (devices: Device[]) => void;
}

export const useDevicesStore = create<DevicesStore>((set) => ({
    devices: [],
    addDevice: (device: Device) =>
        set((state) => ({
            devices: [...state.devices, device],
        })),
    setDevices: (devices: Device[]) => set({ devices }),
}));
