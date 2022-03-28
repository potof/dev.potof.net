import type { NextPage, InferGetStaticPropsType } from "next";
import Head from "next/head";
import Link from "../../components/link";
import { getAllPosts, getTopicCountMap } from "../../lib/api";
import MainContent from "../../components/mainContent";
import Header from "../../components/header";
import Topics from "../../components/topics";
import { Box, Stack, Typography } from "@mui/material";
import config from "../../site.config.json";

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
      <Head>
        <title>{config.title}</title>
        <meta name="description" content={config.description} />
      </Head>
      <Box>
        <Header />

        <MainContent>
          <Box textAlign="center" py="50px">
            <Typography variant="h3" lineHeight="52px">
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
              <>
                <Link
                  href="/posts/[slug]"
                  as={`/posts/${post.slug}`}
                  key={post.title}
                  color="inherit"
                  underline="none"
                >
                  <Box
                    sx={{
                      "&:hover": {
                        opacity: 0.5,
                      },
                    }}
                  >
                    <Typography component="h2" variant="h5" gutterBottom>
                      {post.title}
                    </Typography>
                    <Typography color="gray">{post.date}</Typography>
                  </Box>
                </Link>
                <Box>
                  <Topics topics={post.topics} />
                </Box>
              </>
            ))}
          </Stack>
        </MainContent>
      </Box>
    </>
  );
};

export default Topic;
