import { UniqueIdentifier } from "@dnd-kit/core"

export type Card = {
    id: UniqueIdentifier,
    text: string,
    authorId: string,
    likedByIds?: string[],
};
