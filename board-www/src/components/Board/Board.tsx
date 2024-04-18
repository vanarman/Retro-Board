import { useState } from "react";
import { Button, Grid } from "@mui/material";
import {
  DndContext,
  DragOverlay,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverEvent,
  DragStartEvent,
  DragEndEvent,
  UniqueIdentifier,
  closestCenter,
} from "@dnd-kit/core";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import demoItems from '../../data/demoItems.json';

import { BoardColumn, BoardCard } from "../";
import { Card } from "../../models";
import { AddCircle } from "@mui/icons-material";

const Board = () => {
  const [items, setItems] = useState({
    container0: demoItems.slice(0, 3) as Card[],
    container1: demoItems.slice(3, 4) as Card[],
    container2: demoItems.slice(4, 6) as Card[],
    container3: demoItems.slice(6, 11) as Card[],
  });

  // for drag overlay
  const [activeItem, setActiveItem] = useState<Card>()

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  );

  return (
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragOver={handleDragOver}
        onDragEnd={handleDragEnd}
      >
        <Grid container flexDirection="row" display="flex" minHeight="100vh">
          {
            Object.keys(items).map((key) => {
              return (
                <Grid item md={true} key={`board-container-${key}`} sx={{ backgroundColor:  'rgba(22, 121, 171)', marginX: "0.25em" }}>
                  <Button variant="contained" fullWidth startIcon={<AddCircle />} onClick={() => addCardHandler(key)}>Add New Card</Button>
                  <BoardColumn id={key} items={items[key as keyof typeof items]} />
                </Grid>
            )})
          }
        </Grid>
        <DragOverlay>{activeItem ? <BoardCard item={activeItem} /> : null}</DragOverlay>
      </DndContext>
  );

  function addCardHandler(key: string) {
    setItems((prev) => {
      return { ...prev, [key as keyof typeof items]: [ 
      ...prev[key as keyof typeof items],
      {
        "id": (Math.random() + 1).toString(36).substring(7),
        "text": "Reprehenderit consectetur voluptate consectetur ex irure dolor amet ex cillum elit amet quis."
      },
    ]}});
  }

  function findContainer(id: UniqueIdentifier) {
    if (Object.keys(items).includes(id as string)) return id;
    return Object.keys(items).find(
      (key) => (items[key as keyof typeof items]).find(
        (item) => item.id === id
      )
    );
  }

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const containerId = findContainer(active.id) as keyof typeof items;
    setActiveItem(items[containerId].find((item) => item.id === active.id))
  }

  function handleDragOver(event: DragOverEvent) {
    const { active, over } = event;
    if (!over) return;

    // Find the containers
    const activeContainerId = findContainer(active.id) as keyof typeof items;
    const overContainerId = findContainer(over.id) as keyof typeof items;

    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId === overContainerId
    ) {
      return;
    }

    setItems((prev) => {
      const activeItems: Card[] = prev[activeContainerId];
      const overItems: Card[] = prev[overContainerId];

      const activeIndex = activeItems.findIndex((item) => item.id === active.id);
      const overIndex = overItems.findIndex((item) => item.id === over.id);

      let newIndex;
      if (over.id in Object.keys(items)) {
        // We're at the root droppable of a container
        newIndex = overItems.length + 1;
      } else {
        const isBelowLastItem =
          overIndex === overItems.length - 1 &&
          active.rect.current.translated?.top && 
          active.rect.current.translated?.top + active.rect.current.translated?.height > over.rect.top + over.rect.height;

        const modifier = isBelowLastItem ? 1 : 0;

        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainerId]: [
          ...prev[activeContainerId].filter((item) => item.id !== active.id)
        ],
        [overContainerId]: [
          ...prev[overContainerId].slice(0, newIndex),
          items[activeContainerId][activeIndex],
          ...prev[overContainerId].slice(newIndex, prev[overContainerId].length)
        ]
      };
    });

    setActiveItem(undefined);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over) return;
    // Find the containers
    const activeContainerId = findContainer(active.id) as keyof typeof items;
    const overContainerId = findContainer(over.id) as keyof typeof items;

    if (
      !activeContainerId ||
      !overContainerId ||
      activeContainerId !== overContainerId
    ) {
      return;
    }

    const activeItems: Card[] = items[activeContainerId];
    const overItems: Card[] = items[overContainerId];

    const activeIndex = activeItems.findIndex((item) => item.id === active.id);
    const overIndex = overItems.findIndex((item) => item.id === over.id);

    if (activeIndex !== overIndex) {
      setItems((items) => ({
        ...items,
        [overContainerId]: arrayMove(items[overContainerId], activeIndex, overIndex)
      }));
    }

    setActiveItem(undefined);
  }
}

export default Board;