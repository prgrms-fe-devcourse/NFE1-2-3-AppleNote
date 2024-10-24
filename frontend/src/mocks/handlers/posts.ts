// 임시 주석 처리(올바른 방식인지 확신이 서지 않음)

// import { BASE_URL } from "@common/api/fetch";
// import { http, HttpResponse, HttpResponseResolver } from "msw";

// type PostResponse = {
//   statusCode: number;
//   payload: {
//     postId: string;
//     title: string;
//     content: string;
//     images: string[];
//     authorId: string;
//     createAt: Date;
//     updateAt: Date;
//     category: {
//       categoryId: string;
//       name: string;
//     }[];
//   }[];
// };

// const handlePostRequest = (
//   url: string,
//   method: keyof typeof http,
//   resolver: HttpResponseResolver<never, never, PostResponse>
// ) => {
//   return http[method](url, resolver);
// };

// export const handlers = [
//   handlePostRequest(`${BASE_URL}/posts`, "get", async () => {
//     return HttpResponse.json({
//       statusCode: 200,
//       payload: [
//         {
//           postId: "3bce04e9-c0cb-4e7b-b878-4d4688916c27",
//           title: "My First Post",
//           content: "This is the content of the first post.",
//           images: ["https://picsum.photos/id/1/200/300", "https://picsum.photos/id/2/200/300"],
//           authorId: "e9b8b57c-b534-4d6c-bfba-9866e66823b3",
//           createAt: new Date("2024-01-01"),
//           updateAt: new Date("2024-01-02"),
//           category: [{ categoryId: "730d3c46-78ae-4e72-81e9-afc7411e530f", name: "Technology" }],
//         },
//         {
//           postId: "64538544-fdcb-4b78-9bee-fc9af935cf0b",
//           title: "Second Post",
//           content: "This is the content of the second post.",
//           images: ["https://picsum.photos/id/3/200/300", "https://picsum.photos/id/4/200/300"],
//           authorId: "8bcba12f-7280-4107-859e-6cfe5ff3baf6",
//           createAt: new Date("2024-02-01"),
//           updateAt: new Date("2024-02-02"),
//           category: [],
//         },
//         {
//           postId: "c6a60eb8-7d4b-4c0f-8f15-c250e09cbec7",
//           title: "Third Post",
//           content: "Here is the content of the third post.",
//           images: ["https://picsum.photos/id/5/200/300", "https://picsum.photos/id/6/200/300"],
//           authorId: "03891096-e466-4ab1-a572-c19c489d5eb3",
//           createAt: new Date("2024-03-01"),
//           updateAt: new Date("2024-03-02"),
//           category: [{ categoryId: "852c991a-de5b-429e-a51a-7b429af050e9", name: "Health" }],
//         },
//         {
//           postId: "e56fc432-742c-4569-b8f0-29da63b6fa6b",
//           title: "Fourth Post",
//           content: "Content of the fourth post goes here.",
//           images: ["https://picsum.photos/id/6/200/300"],
//           authorId: "9420e6c3-4ab3-404e-8e00-152d6d86f70a",
//           createAt: new Date("2024-04-01"),
//           updateAt: new Date("2024-04-02"),
//           category: [{ categoryId: "e55891fd-556c-47dd-938c-3114f7ebf808", name: "Education" }],
//         },
//         {
//           postId: "38473d4b-3709-43cb-bf98-d847ccca1ea2",
//           title: "Fifth Post",
//           content: "This is the content of the fifth post.",
//           images: [
//             "https://picsum.photos/id/7/200/300",
//             "https://picsum.photos/id/8/200/300",
//             "https://picsum.photos/id/9/200/300",
//           ],
//           authorId: "fac0d883-c53f-4253-8c33-12714a9ab64e",
//           createAt: new Date("2024-05-01"),
//           updateAt: new Date("2024-05-02"),
//           category: [{ categoryId: "e55891fd-556c-47dd-938c-3114f7ebf808", name: "Education" }],
//         },
//       ],
//     });
//   }),
// ];

import { http, HttpResponse } from "msw";

// 초기 포스트 데이터 (임시)
const posts = [
  {
    postId: "3bce04e9-c0cb-4e7b-b878-4d4688916c27",
    title: "My First Post",
    content: "This is the content of the first post.",
    images: ["https://picsum.photos/id/1/200/300", "https://picsum.photos/id/2/200/300"],
    authorId: "e9b8b57c-b534-4d6c-bfba-9866e66823b3",
    createAt: new Date("2024-01-01"),
    updateAt: new Date("2024-01-02"),
    category: [{ categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "Technology" }],
  },
  {
    postId: "64538544-fdcb-4b78-9bee-fc9af935cf0b",
    title: "Second Post",
    content: "This is the content of the second post.",
    images: ["https://picsum.photos/id/3/200/300", "https://picsum.photos/id/4/200/300"],
    authorId: "8bcba12f-7280-4107-859e-6cfe5ff3baf6",
    createAt: new Date("2024-02-01"),
    updateAt: new Date("2024-02-02"),
    category: [],
  },
  {
    postId: "c6a60eb8-7d4b-4c0f-8f15-c250e09cbec7",
    title: "Third Post",
    content: "Here is the content of the third post.",
    images: ["https://picsum.photos/id/5/200/300", "https://picsum.photos/id/6/200/300"],
    authorId: "03891096-e466-4ab1-a572-c19c489d5eb3",
    createAt: new Date("2024-03-01"),
    updateAt: new Date("2024-03-02"),
    category: [{ categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" }],
  },
  {
    postId: "e56fc432-742c-4569-b8f0-29da63b6fa6b",
    title: "Fourth Post",
    content: "Content of the fourth post goes here.",
    images: ["https://picsum.photos/id/6/200/300"],
    authorId: "9420e6c3-4ab3-404e-8e00-152d6d86f70a",
    createAt: new Date("2024-04-01"),
    updateAt: new Date("2024-04-02"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
  {
    postId: "38473d4b-3709-43cb-bf98-d847ccca1ea2",
    title: "Fifth Post",
    content: "This is the content of the fifth post.",
    images: [
      "https://picsum.photos/id/7/200/300",
      "https://picsum.photos/id/8/200/300",
      "https://picsum.photos/id/9/200/300",
    ],
    authorId: "fac0d883-c53f-4253-8c33-12714a9ab64e",
    createAt: new Date("2024-05-01"),
    updateAt: new Date("2024-05-02"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
];

// MSW 핸들러 설정
export const handlers = [
  // 포스트 목록 조회 핸들러
  http.get("http://localhost:3000/posts", async () => {
    return HttpResponse.json({
      statusCode: 200,
      payload: posts,
    });
  }),
];
