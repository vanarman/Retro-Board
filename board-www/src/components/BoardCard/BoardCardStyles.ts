import { Grid, styled } from "@mui/material";

export const CardContainer = styled(Grid)(({ theme }) => ({
  justifyContent: "center",
  alignItems: "stretch",
}));

export const CardView = styled(Grid)(({ theme }) => ({
  color: "#efefef",
  backgroundColor: 'rgb(255, 255, 255, 0.2)', 
  width: "100%",
  padding: theme.spacing(1),
  marginTop: theme.spacing(1),
  borderRadius: "0.6em",
  boxShadow: "2px 2px 20px -3px rgba(0,0,0,0.5)"
}));

export const CardFooter = styled(Grid)(({ theme }) => ({
  justifyContent: "flex-end",
  paddingTop: theme.spacing(1),
  color: '#222',
  alignItems: "center"
}));
