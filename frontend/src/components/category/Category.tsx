import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchCategories, CategoryResponse } from "./categoryApi"; // CategoryResponse 타입도 가져옴

const Category: React.FC = () => {
  const [categories, setCategories] = useState<CategoryResponse["payload"]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadCategories = async () => {
      try {
        const data = await fetchCategories();

        setCategories(data.payload);
      } catch (error) {
        setError((error as Error).message);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Container>
      <Title>Categories</Title>
      <List>
        {categories.map((category) => (
          <ListItem key={category.categoryId}>{category.name}</ListItem>
        ))}
      </List>
    </Container>
  );
};

export default Category;

// 스타일링된 컴포넌트 정의
const Container = styled.div`
  padding: 0px;
  background-color: none;
  border-radius: 8px;
  width: 180px;
`;

const Title = styled.h1`
  font-size: 20px;
  font-weight: 600;
  text-align: center;
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
  font-size: 16px;
`;

const ListItem = styled.li`
  padding: 5px;
  background-color: none;
  transition: background-color 0.3s;

  &:hover {
    opacity: 50%;
  }
`;
