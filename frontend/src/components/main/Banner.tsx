import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBannerImage } from "./bannerApi";
import { useBannerModal } from "@components/myPage/BannerModalContext";

const DEFAULT_BANNER_IMAGE = "/default-banner-image.png"; // 기본 배너 이미지 경로

const Banner: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const { isBannerModalOpen } = useBannerModal();

  // 배너 이미지 API 호출 및 설정
  useEffect(() => {
    const getBannerImage = async () => {
      try {
        const image = await fetchBannerImage();

        setBannerImage(image);
      } catch (error) {
        console.error("Failed to fetch banner image:", error);
      }
    };

    getBannerImage();
  }, [isBannerModalOpen]);

  return <StyledBanner src={bannerImage || DEFAULT_BANNER_IMAGE} alt="Banner Image" />;
};

const StyledBanner = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  margin-top: 1rem;
`;

export default Banner;
