import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

import { Container, Title, Button, Grid, Link, Text } from '@components';
import styles from '@styles/Home.module.css';
import { NextPage,GetStaticPropsResult } from 'next';
import HomeDataService from '../services/home_services ';
import HomeModel from 'types/home_model';
interface HomeProps {
  pages: HomeModel;
}
const Home: React.FunctionComponent<HomeProps> = (props) => {
  return (
    <Container>
    <Container
      justifyContent="center"
      alignContent="center"
      alignItems="center"
      textAlign="center"
      paddingY="25px"
      paddingBottom="40px"
      gridGap="4rem"
    >
      <Container alignItems="center" alignContent="center">
        <Image
          src="/me.webp"
          alt={props.pages.name}
          width="120px"
          height="120px"
          objectFit="cover"
          className={styles.image}
        />
        <Title>{props.pages.name}</Title>
        <Title
          fontSize="2rem"
          color="rgba(0, 0, 0, 0.6)"
          fontWeight="500"
          as="h2"
        >
          {props.pages.shortDescription}
        </Title>
      </Container>
      <Container maxWidth="700px" gridGap="3rem">
        <Container>
          <Text textAlign="center">
          {props.pages.description}
          </Text>
        </Container>
        <Link href="/about">
          <Button>More about me &rarr;</Button>
        </Link>
      </Container>
    </Container>

    <Container alignItems="center" paddingY="4rem">
      <Container maxWidth="600px" alignItems="center" alignContent="center">
        <Title fontSize="3rem" as="h3">
          Get in touch
        </Title>
        <Text textAlign="center">
          Although I&apos;m not actively looking for job opportunities, my inbox
          is still open for you. Feel free to ask me anything!
        </Text>
        <Grid
          gridGap="2rem"
          marginTop="2rem"
          gridTemplateColumns={['1fr', 'repeat(2, 1fr)']}
          justifyItems="stretch"
          alignItems="stretch"
        >
          <Link href="mailto:hello@shellbear.me">
            <Button width="100%">
              <motion.span
                initial={{ display: 'inline-block' }}
                animate={{ rotate: [0, 14, -8, 14, -4, 10, 0, 0] }}
                transition={{
                  repeat: Infinity,
                  repeatType: 'reverse',
                  duration: 2.5,
                }}
              >
                👋
              </motion.span>{' '}
              Say hello
            </Button>
          </Link>
          <Link
            target="_blank"
            href="https://calendly.com/antoine-ordonez/intro"
          >
            <Button
              width="100%"
              backgroundColor="rgb(226,232,240)"
              color="black"
              variant="secondary"
            >
              Schedule a meeting
            </Button>
          </Link>
        </Grid>
      </Container>
    </Container>
  </Container>
  );
    
  
}
  export async function getStaticProps() {
    const res = await HomeDataService.getAll()
    var posts = await res.data
    console.log(posts)
    return {
      props: {
        pages:posts,
        revalidate: false,
      },
    }
  }




export default Home;
