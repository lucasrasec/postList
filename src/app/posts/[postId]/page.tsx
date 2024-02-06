"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Button, Box } from "@mui/material";
import { Post } from "../page";
import Link from "next/link";
import { useRouter } from "next/navigation";

const PostDetails = ({ params }: { params: { postId: string } }) => {
  const [post, setPost] = useState<Post | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${params.postId}`
        );
        const data = await response.json();
        setPost(data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    if (params.postId) {
      fetchPost();
    }
  }, [params.postId]);

  return (
    <Container>
      {post ? (
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            borderRadius: "10px 10px 10px 10px",
            backgroundColor: "#636e8a",
          }}
        >
          <Typography
            variant="h3"
            align="left"
            gutterBottom
            color="textPrimary"
            sx={{
              textAlign: "left",
              backgroundColor: "#091847",
              boxShadow: 2,
              borderRadius: "10px 10px 0 0",
              padding: "8px",
            }}
          >
            {post.title}
          </Typography>
          <Typography
            variant="body1"
            align="left"
            paragraph
            sx={{
              textAlign: "left",
              padding: 4,
            }}
          >
            {post.body}
          </Typography>
          <Button
            LinkComponent={Link}
            href="/posts"
            sx={{ backgroundColor: "#103155" }}
          >
            Voltar para Listagem
          </Button>
        </Box>
      ) : (
          <Typography variant="body1" align="left" padding={1} sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            color: "#fff",
        }}>
          Buscando...
          <Button
            LinkComponent={Link}
            href="/posts"
            sx={{ backgroundColor: "#103155" }}
          >
            Voltar para Listagem
          </Button>
        </Typography>
      )}
    </Container>
  );
};

export default PostDetails;
