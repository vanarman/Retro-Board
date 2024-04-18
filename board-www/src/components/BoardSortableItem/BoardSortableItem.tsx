import { HTMLAttributes } from "react"
import { useSortable } from "@dnd-kit/sortable"
import { CSS } from "@dnd-kit/utilities"
import { BoardCard } from "../"
import { Card } from "../../models"

type Props = {
  item: Card
} & HTMLAttributes<HTMLDivElement>

const BoardSortableItem = ({ item }: Props) => {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: item.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || undefined,
  };

  return (
      <BoardCard 
        item={item}
        isOpacityEnabled={isDragging}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      />
  );
}

export default BoardSortableItem
