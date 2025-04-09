import { create } from "zustand";
import { FormValues } from "./form-schema";
import { createJSONStorage, persist } from "zustand/middleware";

type formDataStore = Partial<FormValues> &{
    setFromData: (data: Partial<FormValues>) => void;
}

export const useFormDataStore = create<formDataStore>()(
    persist(
        (set) => ({
            setFromData: (data) => set(data),
        }),
        {   
            name: "form-data-storage", // unique name
            storage: createJSONStorage(() => localStorage) // (optional) by default the 'localStorage' is used
        }
    )
)