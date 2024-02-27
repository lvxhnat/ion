import * as React from "react";
import * as S from "./style";
import { Grid, Typography } from "@mui/material";
import { ContainerWrapper } from "components/Wrappers/ContainerWrapper";
import Typewriter from "typewriter-effect";
import Author from "../../assets/people/author.jpeg";

const TEXT = {
  SLOGAN: "Streamlining Insights, Powering Decisions",
  ABOUT: `
        FinFlow originated three years ago as a side project to tackle the challenge of fragmented economic data, eventually evolving into a premier platform centralizing alternative, 
        open-source data from sourcs such as FRED. Designed to democratize access to economic information, FinFlow aims to empowers users of all backgrounds to make informed decisions with ease. 
        By amalgamating diverse data sets into a user-friendly dashboard, we offer clarity and actionable insights for financial and general decision-making alike. 
        `,
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
        <Grid container style={{ padding: 100 }}>
          <Typography variant="body2" align="center">
            {TEXT.ABOUT}
          </Typography>
        </Grid>
        <Grid container style={{ padding: 100, paddingTop: 0 }}>
          <Grid item xs={6} display="flex" justifyContent={"center"}>
            <img
              src={Author}
              width={400}
              height={400}
              style={{ borderRadius: 500 }}
            />
          </Grid>
          <Grid item xs={6}>
            <Typography> Passion </Typography>
          </Grid>
        </Grid>
      </S.AboutWrapper>
    </ContainerWrapper>
  );
}
