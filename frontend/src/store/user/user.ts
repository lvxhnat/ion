import { create } from "zustand";

export interface FirebaseUserData {
    aud: string
    auth_time: number
    email: string
    email_verified: boolean
    exp: number
    firebase: any // We wont be using this
    iat: number
    iss: string
    name: string
    picture: string
    sub: string
    uid: string
    user_id: string
}
/**
 * Stores the ticker data that is shown on the grid (i.e. The ticker time series)
 */
export interface FirebaseUserDataStoreTypes {
    user: FirebaseUserData | null;
    setUser: (user: FirebaseUserData) => void;
}

export const useFirebaseUserStore = create<FirebaseUserDataStoreTypes>((set) => ({
    user: null,
    setUser: (user: FirebaseUserData) => set({ user: user })
}))
