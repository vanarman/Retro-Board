import { CSSProperties, forwardRef } from "react"
import { Grid, IconButton, Typography } from "@mui/material"
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { BoardCardProps, CardViewProps } from "./BoardCardProps";
import { CardContainer, CardFooter, CardView } from "./BoardCardStyles";

const BoardItem = forwardRef<HTMLDivElement, BoardCardProps>(
  ({ item, isOpacityEnabled, isDragging, style, ...props }, ref) => {
    const styles: CSSProperties = {
      opacity: isOpacityEnabled ? "0.4" : "1",
      cursor: isDragging ? "grabbing" : "grab",
      lineHeight: "0.5",
      transform: isDragging ? "scale(1.05)" : "scale(1)",
      ...style,
    }

    return (
      <CardContainer container ref={ref} {...props} style={style}>
        <CardViewContainer styles={styles} item={item} />
      </CardContainer>
    )
  }
);

export default BoardItem;

const CardViewContainer = ({styles, item}: CardViewProps) => {
  return (
    <CardView item sx={{...styles}}>
      <Grid container>
        <Typography>{item.text}</Typography>
      </Grid>
      <CardFooter container>
        {
          !item.authorId ? null : 
          <Typography mr={2} variant="caption">Author: {item.authorId}</Typography>
        }
        <IconButton size="small">
          <ThumbUpOffAltIcon />
          {item.likedByIds?.length ? item.likedByIds.length : 0}
        </IconButton>
      </CardFooter>
    </CardView>
  );
};
