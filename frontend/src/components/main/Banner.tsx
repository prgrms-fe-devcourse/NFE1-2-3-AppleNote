import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { fetchBannerImage } from "@components/main/bannerApi";
import { useModal } from "@components/myPage/Context/ModalContext";

const DEFAULT_BANNER_IMAGE = "/default-banner-image.png"; // 기본 배너 이미지 경로

const Banner: React.FC = () => {
  const [bannerImage, setBannerImage] = useState<string | null>(null);
  const { isOpen } = useModal();

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
  }, [isOpen]);

  return (
    <BannerContainer>
      <StyledBanner src={bannerImage || DEFAULT_BANNER_IMAGE} alt="Banner Image" />
    </BannerContainer>
  );
};

const BannerContainer = styled.div`
  width: 100%;
  height: clamp(200px, 20vw, 300px); /* 최소 높이 200px, 최대 높이 300px */
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledBanner = styled.img`
  width: auto;
  height: 100%;
  object-fit: cover;
  display: block;
`;

export default Banner;
