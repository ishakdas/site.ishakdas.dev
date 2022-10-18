import Head from 'next/head';
import styled from 'styled-components';
import { GetStaticPropsResult, NextPage } from 'next';
import { NotionAPI } from 'notion-client';

import { getPageInfo, Page, POSTS } from '@posts/notion';
import { Title, Link, Container, Grid, Card, Image, Text } from '@components';
import BlogDataService from '../../services/blog_services';
import PostModel from 'types/post_model';

interface BlogProps {
  pages: Page[];
}

const BlogImage = styled(Image)`
  border-radius: 5px;
`;

const Blog: NextPage<BlogProps> = ({ pages }) => {
  return (
    <Container maxWidth={1200}>
      <Head>
        <title>Blog - Antoine Ordonez</title>
        <meta property="og:title" content="Blog – Antoine Ordonez" />
      </Head>
      <Container mb="3rem">
        <Title>Blog</Title>
        <Text textAlign="center">
          Posts about code, projects and various other things.
        </Text>
      </Container>
      <Grid gridTemplateColumns={['1fr', '1fr 1fr']} gridGap={['3rem', '2rem']}>
        {pages.map(({ title, uri, date, cover }, i) => (
          <Link key={i} href={uri}>
            <Card padding={[0]} margin={[0]}>
              <Grid
                gridTemplateColumns={'1fr'}
                justifyItems={['center', 'flex-start']}
                gridGap="1rem"
              >
                {cover && (
                  <BlogImage
                    src={cover}
                    width="100%"
                    height="auto"
                    alt={title}
                  />
                )}
                <Container
                  gridGap=".5rem"
                  alignItems={['center', 'flex-start']}
                >
                  <Title
                    as="h2"
                    fontSize="1.5rem"
                    textAlign={['center', 'left']}
                    margin={0}
                  >
                    {title}
                  </Title>
                  <Text margin={0} fontWeight="initial" fontSize=".9rem">
                    {date}
                  </Text>
                </Container>
              </Grid>
            </Card>
          </Link>
        ))}
      </Grid>
    </Container>
  );
};


const notion = new NotionAPI();
var posts:Array<PostModel>;
  
 
export const getStaticProps = async (): Promise<
  GetStaticPropsResult<BlogProps>
> => {
  const pages: Page[] = [];
 await BlogDataService.getAll().then((response: any) => {
    posts=response.data;
 })
 .catch((e: Error) => {
   console.log(e);
 });
 await Promise.all(
  Object.keys(posts).map(async (key)=> {
    var _p=posts[Number(key)];
    const page = await notion.getPage(_p.notion_link);
    if (page) {
      const info = getPageInfo(page);
      if (info.title !== 'Blog') {
        pages.push({
          ...info,
          date:_p.date,
          uri: `/blog/${_p.slug}`,
          author: _p.author,
          cover:_p.image,
          title:_p.title
        });
      }
    }
  }),
);

  return {
    props: {
      pages: pages.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      ),
    },
  };
};

export default Blog;
