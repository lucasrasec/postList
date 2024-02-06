"use client";

import { useEffect, useState } from "react";
import { Container, Typography, Button } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import Link from "next/link";

export interface Post {
  userId: number;
  id: number;
  body: string;
  title: string;
}

const PostsPage = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts"
        );
        const data = await response.json();
        setAllPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        justifyContent: "center",
        height: "100%",
        backgroundColor: "#636e8a",
        borderRadius: "5px",
        padding: 2,
      }}
    >
      <Typography variant="h3" align="left" gutterBottom>
        Listagem de Posts
      </Typography>

      <Grid2
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "center",
          minHeight: "max-content",
        }}
      >
        {currentPosts.map((post: Post) => (
          <Grid2
            key={post.id}
            xs={12}
            sm={6}
            md={3}
            sx={{
              border: "1px solid gray",
              display: "flex",
              backgroundColor: "#091847",
              borderRadius: "10px",
              margin: "8px",
              textAlign: "center",
              justifyContent: "center",
              cursor: "pointer",
              boxShadow: 3,
              minHeight: "150px",
            }}
          >
            <Link href={`/posts/${post.id}`} legacyBehavior>
              <a
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  width: "100%",
                }}
              >
                <Typography gutterBottom variant="h6" color="textPrimary">
                  {post.title}
                </Typography>
              </a>
            </Link>
          </Grid2>
        ))}
      </Grid2>

      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "20px", gap: "16px" }}
      >
        <Button onClick={handlePrevPage} disabled={currentPage === 1} sx={{ backgroundColor: "#103155" }}>
          Página Anterior
        </Button>
        <Button
          onClick={handleNextPage}
          disabled={allPosts.length <= indexOfLastPost}
          sx={{ backgroundColor: "#103155" }}
        >
          Próxima Página
        </Button>
      </div>
    </Container>
  );
};

export default PostsPage;
