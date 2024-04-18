import { Grid, styled } from "@mui/material";

export const ColumnContainer = styled(Grid)(({ theme }) => ({
  padding: theme.spacing(1),
  display: "flex" ,
  alignItems: "stretch",
  flexDirection: "column" ,
}));
