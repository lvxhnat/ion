import * as React from "react";
import * as S from "./style";
import { Grid, Typography } from "@mui/material";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";
import Typewriter from "typewriter-effect";
import Author from "../../assets/people/author.jpeg";
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';

const TEXT = {
  SLOGAN: "Streamlining Insights, Powering Decisions",
  ABOUT: `
        FinFlow originated three years ago as a side project to tackle the challenge of fragmented economic data, eventually evolving into a premier platform centralizing alternative, 
        open-source data from sourcs such as FRED. Designed to democratize access to economic information, FinFlow aims to empowers users of all backgrounds to make informed decisions with ease. 
        By amalgamating diverse data sets into a user-friendly dashboard, we offer clarity and actionable insights for financial and general decision-making alike. 
        `,
  CREATOR_ABOUT: `
      A problem-solver by nature, I am passionate in working on data driven applications, from both software and model development perspectives.
      `
};

export default function About() {
  return (
    <ContainerWrapper>
      <S.AboutWrapper>
        <Grid container justifyContent="center" style={{ paddingTop: 50 }}>
          <Typography variant="h1">
            <Typewriter
              options={{
                strings: [TEXT.SLOGAN],
                autoStart: true,
                loop: true,
                deleteSpeed: 10,
              }}
            />
          </Typography>
        </Grid>
        <Grid container style={{ padding: 75 }}>
          <Typography  lineHeight={2} variant="body2" align="center">
            {TEXT.ABOUT}
          </Typography>
        </Grid>
        <Grid container style={{ padding: 100, paddingTop: 0 }}>
          <Grid item xs={6} display="flex" justifyContent={"center"}>
            <img
              alt="author"
              src={Author}
              width={400}
              height={400}
              style={{ borderRadius: 500 }}
            />
          </Grid>
          <Grid item xs={6} display="flex" flexDirection="column" justifyContent="center" rowSpacing={10}>
          <FormatQuoteIcon style={{ transform: 'rotate(180deg)', marginLeft: -5 }} fontSize="large"/> 
            <Typography variant="body2" lineHeight={2} style={{ paddingBottom: 20}}> {TEXT.CREATOR_ABOUT}</Typography>
            <Typography variant="h2" style={{ paddingBottom: 10 }}> YI KUANG </Typography>
            <Typography variant="subtitle1"> Finflow Creator </Typography>
          </Grid>
        </Grid>
      </S.AboutWrapper>
    </ContainerWrapper>
  );
}
