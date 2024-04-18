import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable";
import { Grid } from "@mui/material";

import { BoardColumnProps } from "./BoardColumnProps";
import { BoardSortableItem } from "..";
import { ColumnContainer } from "./BoardColumnStyles";



const BoardColumn = ({ id, items }: BoardColumnProps) => {

  const { setNodeRef } = useDroppable({id});

  return (
    <>
      <SortableContext
        id={id}
        items={items}
        strategy={verticalListSortingStrategy}
      >
        <ColumnContainer 
          container
          ref={setNodeRef} 
          onClick={(e) => {
            if (e.detail === 2) {
              console.log('double');
            }
          }}
        >
          <Grid item>
            {items.map((item) => (
              <BoardSortableItem key={item.id} item={item} />
            ))}
          </Grid>
        </ColumnContainer>
      </SortableContext>
      </>
  );
}

export default BoardColumn;
