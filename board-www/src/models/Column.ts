import { DocumentReference } from "firebase/firestore"

export type Column = {
    id: string,
    name: string,
    color?: string,
    isHidden?: boolean,
    cardsRef?: DocumentReference[],
}