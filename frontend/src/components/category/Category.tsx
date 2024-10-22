import React, { useEffect, useState } from "react";
import { BASE_URL } from "@common/api/fetch";

// API 호출을 위한 fetch 함수
const fetchCategories = async (): Promise<CategoryResponse> => {
  const response = await fetch(`${BASE_URL}/categories`);

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
};

// 카테고리 응답 타입 정의
type CategoryResponse = {
  statusCode: number;
  payload: {
    categoryId: string;
    name: string;
  }[];
};

// 카테고리 리스트 컴포넌트
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
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category) => (
          <li key={category.categoryId}>{category.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default Category;
