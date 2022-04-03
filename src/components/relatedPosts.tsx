import Link from "../components/link";
import Topics from "../components/topics";
import { getNDayBefore } from "../lib/date";
import { Typography, Box } from "@mui/material";
import { Container } from "@mui/material";
import config from "../site.config.json";

type Props = {
  posts: {
    slug: string;
    title: string;
    date: string;
    topics: string[];
    content: string;
  }[];
};

const RelatedPosts: React.FC<Props> = ({ posts }) => {
  return !posts.length ? (
    <></>
  ) : (
    <Container
      maxWidth="md"
      sx={{
        py: "20px",
      }}
    >
      <Typography component="h2" fontWeight="700" fontSize={27}>
        関連記事
      </Typography>
      <Box pt="30px">
        {posts.slice(0, config.relatedPostsMaxCount).map((post) => (
          <Box key={post.title}>
            <Link
              href="/posts/[slug]"
              as={`/posts/${post.slug}`}
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
                <Typography
                  component="h2"
                  variant="h5"
                  fontWeight="700"
                  gutterBottom
                >
                  {post.title}
                </Typography>
                <Typography fontSize={12} color="gray">
                  {getNDayBefore(post.date)}
                </Typography>
              </Box>
            </Link>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default RelatedPosts;
