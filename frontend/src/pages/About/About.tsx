import * as React from 'react'
import { Grid, Typography } from '@mui/material';
import { ContainerWrapper } from 'components/Wrappers/ContainerWrapper';
import Typewriter from 'typewriter-effect';

export default function About() {
  return (
    <ContainerWrapper>
      <Grid container justifyContent="center" style={{ paddingTop: 50 }}>
      <Typography variant="h1">
      <Typewriter
        options={{
          strings: ['Streamlining Insights, Powering Decisions'],
          autoStart: true,
          loop: true,
          deleteSpeed: 10
        }}
      />
      </Typography>
      </Grid>
      <Grid container style={{ padding: 100 }}>
        <Typography variant="subtitle1" align="center">
        FinFlow originated three years ago as a side project to tackle the challenge of fragmented economic data, eventually evolving into a premier platform centralizing alternative, 
        open-source data from sourcs such as FRED. Designed to democratize access to economic information, FinFlow aims to empowers users of all backgrounds to make informed decisions with ease. 
        By amalgamating diverse data sets into a user-friendly dashboard, we offer clarity and actionable insights for financial and general decision-making alike. 
        </Typography>
      </Grid>
    </ContainerWrapper>
  )
}
