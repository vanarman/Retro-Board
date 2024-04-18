import { CSSProperties, HTMLAttributes } from "react"
import { Card } from "../../models"

export type BoardCardProps = {
    item: Card
    isOpacityEnabled?: boolean
    isDragging?: boolean
} & HTMLAttributes<HTMLDivElement>

export type CardViewProps = {
    item: Card,
    styles: CSSProperties,
}