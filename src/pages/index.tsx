import type { NextPage, InferGetStaticPropsType } from "next";
import { getAllPosts } from "../lib/api";
import MainContent from "../components/mainContent";
import Header from "../components/header";
import SlugCard from "../components/slugCard";
import { Box, Stack } from "@mui/material";
import Meta from "../components/meta";

type Props = InferGetStaticPropsType<typeof getStaticProps>;

export const getStaticProps = async () => {
  const allPosts = getAllPosts();
  return {
    props: { allPosts },
  };
};

const Home: NextPage<Props> = ({ allPosts }) => {
  return (
    <>
      <Meta />
      <Box>
        <Header />
        <MainContent>
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="stretch"
            spacing={3}
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

export default Home;
