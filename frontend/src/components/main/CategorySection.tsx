import React from "react";
import styled from "styled-components";

interface CategorySectionProps {
  title: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({ title }) => <Title>{title}</Title>;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

export default CategorySection;
