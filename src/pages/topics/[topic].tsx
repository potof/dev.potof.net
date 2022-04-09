import type { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts, getTopicCountMap } from "../../lib/api";
import MainContent from "../../components/mainContent";
import Header from "../../components/header";
import SlugCard from "../../components/slugCard";
import { Box, Stack, Typography } from "@mui/material";
import Meta from "../../components/meta";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticPaths = async () => {
  const topics = await getTopicCountMap();
  return {
    paths: Object.keys(topics).map((topic) => ({ params: { topic } })),
    fallback: false,
  };
};

export const getStaticProps = async ({ params }: any) => {
  const currentTopic = params.topic;
  const allPosts = getAllPosts(currentTopic);
  return {
    props: { allPosts, currentTopic },
  };
};

const Topic: NextPage<Props> = ({ allPosts, currentTopic }) => {
  return (
    <>
      <Meta
        title={`${currentTopic} 記事一覧`}
        path={`/topics/${currentTopic}`}
      />
      <Box>
        <Header />
        <MainContent>
          <Box textAlign="center" py="50px">
            <Typography variant="h3" lineHeight="52px" fontWeight="700">
              {currentTopic}
            </Typography>
          </Box>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={2}
          >
            {allPosts.map((post) => (
              <SlugCard
                slug={post.slug}
                title={post.title}
                date={post.date}
                topics={post.topics}
                icon={post.icon}
                key={post.slug}
              />
            ))}
          </Stack>
        </MainContent>
      </Box>
    </>
  );
};

export default Topic;
