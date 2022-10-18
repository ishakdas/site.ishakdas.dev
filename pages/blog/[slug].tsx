import Head from 'next/head';
import dynamic from 'next/dynamic';
import { GetStaticPaths, GetStaticPropsResult, NextPage } from 'next';
import { NotionRenderer } from 'react-notion-x';
import { NotionAPI } from 'notion-client';

import { getPageInfo, Page } from '@posts/notion';
import { Container, Text } from '@components';
import { ComponentProps } from 'react';
import BlogDataService from '../../services/blog_services';
import PostModel from 'types/post_model';
const Code = dynamic(
  async () => (await import('react-notion-x/build/third-party/code')).Code,
);

interface BlogProps {
  page: Page;
  recordMap: ComponentProps<typeof NotionRenderer>['recordMap'];
}

const Blog: NextPage<BlogProps> = ({ page, recordMap}) => (
  <Container width={['100%', 1200]} maxWidth="100vw">
    <Head>
      <title>{page.title}</title>
      <meta property="og:title" content={page.title} />
    </Head>
    <NotionRenderer
      fullPage
      className="notion-container"
      recordMap={recordMap}
      components={{
        Code,
      }}
    />
    <Container textAlign="center" gridGap=".4rem" my="3rem">
      <Text margin={0}>{page.author}</Text>
      <small>{page.date}</small>
    </Container>
  </Container>
);
export function function_name(){}

type Params = {
  params: {
    slug: keyof typeof String;
  };
};

const notion = new NotionAPI();

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {

  return {
      paths: [], //indicates that no page needs be created at build time
      fallback: 'blocking' //indicates the type of fallback
  }
}
export const getStaticProps = async ({
  params: { slug },
}: Params): Promise<GetStaticPropsResult<BlogProps>> => { 
  
   var posts:PostModel;
  await BlogDataService.getBlogBySlug(slug)
  .then((response: any) => {
     posts =response.data;
  })
  .catch((e: Error) => {
    console.log(e);
  });
  const { uri, date,author } ={
    date: posts!.date,
    uri: posts!.notion_link,
    author:posts!.author
  };
  const recordMap = await notion.getPage(uri);
  const pageInfo = getPageInfo(recordMap);
  const page: Page = {
    ...pageInfo,
    uri,
    date,
    author
  };

  return {
    props: {
      page,
      recordMap
    },
  };
};

export default Blog;
