import { BASE_URL } from "@common/api/fetch";
import { http, HttpResponse } from "msw";

// Post 타입 정의
type Post = {
  postId: string;
  title: string;
  content: string;
  images: string[];
  authorId: string;
  createAt: Date;
  updateAt: Date;
  category: { categoryId: string; name: string }[];
};

const posts: Post[] = [
  {
    postId: "3bce04e9-c0cb-4e7b-b878-4d4688916c27",
    title: "My First Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/1/200/300", "https://picsum.photos/id/2/200/300"],
    authorId: "e9b8b57c-b534-4d6c-bfba-9866e66823b3",
    createAt: new Date("2024-01-01"),
    updateAt: new Date("2024-01-02"),
    category: [{ categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "Technology" }],
  },
  {
    postId: "64538544-fdcb-4b78-9bee-fc9af935cf0b",
    title: "Second Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/3/200/300", "https://picsum.photos/id/4/200/300"],
    authorId: "8bcba12f-7280-4107-859e-6cfe5ff3baf6",
    createAt: new Date("2024-02-01"),
    updateAt: new Date("2024-02-02"),
    category: [],
  },
  {
    postId: "c6a60eb8-7d4b-4c0f-8f15-c250e09cbec7",
    title: "Third Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/5/200/300", "https://picsum.photos/id/6/200/300"],
    authorId: "03891096-e466-4ab1-a572-c19c489d5eb3",
    createAt: new Date("2024-03-01"),
    updateAt: new Date("2024-03-02"),
    category: [{ categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" }],
  },
  {
    postId: "e56fc432-742c-4569-b8f0-29da63b6fa6b",
    title: "Fourth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/6/200/300"],
    authorId: "9420e6c3-4ab3-404e-8e00-152d6d86f70a",
    createAt: new Date("2024-04-01"),
    updateAt: new Date("2024-04-02"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
  {
    postId: "38473d4b-3709-43cb-bf98-d847ccca1ea2",
    title: "Fifth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
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

  // 더미 데이터 추가
  {
    postId: "abe2563d-fccc-401a-bba8-d5688c02a2bb",
    title: "Sixth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/10/200/300", "https://picsum.photos/id/11/200/300"],
    authorId: "0a3bc7ad-e145-4f11-8f27-563fc5c239fe",
    createAt: new Date("2024-05-10"),
    updateAt: new Date("2024-05-10"),
    category: [{ categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "Technology" }],
  },
  {
    postId: "21eabfdc-d94d-4bc2-81b4-81b639dd9fc5",
    title: "Seventh Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/12/200/300"],
    authorId: "5c8f3d3d-2cf7-4f3b-bd9b-d498573d8493",
    createAt: new Date("2024-05-16"),
    updateAt: new Date("2024-05-16"),
    category: [],
  },
  {
    postId: "519f17a7-f5bc-429a-8c24-0e5a2c7fa9c7",
    title: "Eighth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/13/200/300", "https://picsum.photos/id/14/200/300"],
    authorId: "cd5dbf1a-b9b0-4ed3-84e0-8366fd7b2cfe",
    createAt: new Date("2024-05-22"),
    updateAt: new Date("2024-05-25"),
    category: [{ categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "Technology" }],
  },
  {
    postId: "c093d547-62e1-4e1a-b7de-3748d96e40f3",
    title: "Ninth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/15/200/300", "https://picsum.photos/id/16/200/300"],
    authorId: "f8a99cb8-e601-4c95-a63e-9873bfa2a4e4",
    createAt: new Date("2024-05-28"),
    updateAt: new Date("2024-05-29"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
  {
    postId: "f91874df-9294-47a6-b328-9f4b4e2bc597",
    title: "Tenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/17/200/300"],
    authorId: "aa3b8f7d-281b-4671-9175-4348390f7dd3",
    createAt: new Date("2024-06-03"),
    updateAt: new Date("2024-06-06"),
    category: [{ categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" }],
  },
  {
    postId: "2d1b4f71-7e37-40b7-a0d1-2fb8439d7a9c",
    title: "Eleventh Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/18/200/300", "https://picsum.photos/id/19/200/300"],
    authorId: "5e2b5c09-3dd4-49a9-9c5b-fd913e9d7e61",
    createAt: new Date("2024-06-09"),
    updateAt: new Date("2024-06-11"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
  {
    postId: "ec891b17-6d18-44b4-8851-421db87e44a4",
    title: "Twelfth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/20/200/300"],
    authorId: "d0187c7e-caad-4311-8e9f-71c8b80fa26e",
    createAt: new Date("2024-06-15"),
    updateAt: new Date("2024-06-17"),
    category: [{ categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" }],
  },
  {
    postId: "8f5c55b7-fb72-4c28-8e67-8e69f68f5a7d",
    title: "Thirteenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/21/200/300", "https://picsum.photos/id/22/200/300"],
    authorId: "e5f8b9cf-4aa9-4236-8777-82d9b67497f3",
    createAt: new Date("2024-06-21"),
    updateAt: new Date("2024-06-21"),
    category: [{ categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "Technology" }],
  },
  {
    postId: "dc1877fb-726a-4f89-89fc-44b1f9bcf759",
    title: "Fourteenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: [
      "https://picsum.photos/id/23/200/300",
      "https://picsum.photos/id/24/200/300",
      "https://picsum.photos/id/25/200/300",
    ],
    authorId: "b5b832af-5a5c-42b1-8e42-77abf2392d5d",
    createAt: new Date("2024-07-03"),
    updateAt: new Date("2024-07-03"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
  {
    postId: "ebbc94a2-53d6-45f3-92cf-8f2e0e0ef693",
    title: "Fifteenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/26/200/300"],
    authorId: "cc8571b9-d425-4c4b-a921-bd69f0e39164",
    createAt: new Date("2024-07-09"),
    updateAt: new Date("2024-07-11"),
    category: [{ categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" }],
  },
  {
    postId: "d2f3e33c-3a1b-4fae-8e26-847d5e23a0d1",
    title: "Sixteenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/27/200/300"],
    authorId: "fac0d883-c53f-4253-8c33-12714a9ab64e",
    createAt: new Date("2024-07-15"),
    updateAt: new Date("2024-07-15"),
    category: [],
  },
  {
    postId: "d6a8f9e4-2357-4b71-a8c4-78ed98a541a2",
    title: "Seventeenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/28/200/300"],
    authorId: "9420e6c3-4ab3-404e-8e00-152d6d86f70a",
    createAt: new Date("2024-07-27"),
    updateAt: new Date("2024-07-27"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
  {
    postId: "f4b6a7e9-35e4-4c4e-91e6-d9f8a89e074b",
    title: "Eighteenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/29/200/300"],
    authorId: "0a3bc7ad-e145-4f11-8f27-563fc5c239fe",
    createAt: new Date("2024-08-02"),
    updateAt: new Date("2024-08-05"),
    category: [],
  },
  {
    postId: "f14f2f8c-1f5b-47e6-8a5f-4124e8b5a079",
    title: "Nineteenth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/30/200/300"],
    authorId: "cd5dbf1a-b9b0-4ed3-84e0-8366fd7b2cfe",
    createAt: new Date("2024-08-14"),
    updateAt: new Date("2024-08-17"),
    category: [{ categoryId: "0192aa1b-1e1c-7775-ab3a-99a65a243e0f", name: "Technology" }],
  },
  {
    postId: "b8b1fced-7c6b-47b7-bb34-072f4e89f3f9",
    title: "Twentieth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/31/200/300"],
    authorId: "03891096-e466-4ab1-a572-c19c489d5eb3",
    createAt: new Date("2024-08-20"),
    updateAt: new Date("2024-08-23"),
    category: [],
  },
  {
    postId: "c7d44c5a-f5cb-494e-b232-034eb1ab87e1",
    title: "Twenty-First Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/32/200/300"],
    authorId: "e9b8b57c-b534-4d6c-bfba-9866e66823b3",
    createAt: new Date("2024-08-26"),
    updateAt: new Date("2024-08-27"),
    category: [{ categoryId: "d8249a93-ecfd-4f4b-922c-2b034b75c1fe", name: "Diary" }],
  },
  {
    postId: "3c1e0e58-1d8e-46ab-b973-219f9469a32c",
    title: "Twenty-Second Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/33/200/300"],
    authorId: "5e2b5c09-3dd4-49a9-9c5b-fd913e9d7e61",
    createAt: new Date("2024-09-01"),
    updateAt: new Date("2024-09-04"),
    category: [],
  },
  {
    postId: "59f7c312-4456-4c64-b89c-96b824f2437f",
    title: "Twenty-Third Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/34/200/300"],
    authorId: "9420e6c3-4ab3-404e-8e00-152d6d86f70a",
    createAt: new Date("2024-09-07"),
    updateAt: new Date("2024-09-09"),
    category: [{ categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" }],
  },
  {
    postId: "cc4231e6-d4b5-41f7-9ff2-8e92e61f5cfa",
    title: "Twenty-Fourth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/35/200/300"],
    authorId: "fac0d883-c53f-4253-8c33-12714a9ab64e",
    createAt: new Date("2024-09-13"),
    updateAt: new Date("2024-09-16"),
    category: [],
  },
  {
    postId: "0fe5d644-3c57-4b8c-869d-1d8b4c5a813b",
    title: "Twenty-Fifth Post",
    content:
      "Lorem ipsum odor amet, consectetuer adipiscing elit. Per a magnis et vivamus himenaeos porta convallis dolor. Tincidunt enim hendrerit natoque sed facilisi; sem hac. Malesuada nunc consequat erat scelerisque nam. Quam vivamus neque tincidunt sociosqu vestibulum erat condimentum! Fusce sociosqu maecenas arcu pulvinar et aliquet dolor. Aliquam nunc nec orci lectus ex mi nisi vivamus. Elit euismod habitant consectetur; aliquet laoreet iaculis. Curae dapibus consectetur imperdiet dui tortor malesuada. Risus ultrices nullam nulla urna nisi vivamus at nunc? Proin pharetra iaculis turpis tellus; aliquam nulla. Ultrices nisl varius auctor urna tristique quis. Tincidunt nunc bibendum pulvinar class; tortor non convallis. Vehicula curae odio ut nec integer erat. Ac porttitor nec quisque ipsum vulputate. Augue himenaeos montes massa magnis sodales odio. Fusce tortor nostra pellentesque, commodo euismod velit convallis netus. Imperdiet nam quis urna hac mauris justo turpis bibendum. Sodales ligula donec massa in semper fames habitasse nisl amet. Senectus taciti arcu pulvinar proin velit magna. Aliquet proin porttitor penatibus montes augue. Penatibus nibh pellentesque vel facilisi semper eget. Aliquet tincidunt ex fames montes per nam tempus cubilia curabitur. Nam penatibus id vestibulum dapibus nec convallis vestibulum.",
    images: ["https://picsum.photos/id/36/200/300"],
    authorId: "cc8571b9-d425-4c4b-a921-bd69f0e39164",
    createAt: new Date("2024-10-01"),
    updateAt: new Date("2024-10-03"),
    category: [{ categoryId: "0192aa1b-7277-7425-849f-eb52f8ca081c", name: "Schedules" }],
  },
];

// 핸들러 정의
export const handlers = [
  // 특정 카테고리별 포스트 필터링 핸들러
  http.get(`${BASE_URL}/categories/:categoryId`, (req) => {
    const { categoryId } = req.params;

    const filteredPosts = posts.filter((post) =>
      post.category.some((cat) => String(cat.categoryId) === String(categoryId))
    );

    if (filteredPosts.length === 0) {
      return HttpResponse.json(
        { statusCode: 404, message: "No posts found for this category" },
        { status: 404 }
      );
    }

    return HttpResponse.json({ statusCode: 200, payload: { posts: filteredPosts } });
  }),

  // 전체 포스트 목록 조회
  http.get(`${BASE_URL}/posts`, () => {
    return HttpResponse.json({
      statusCode: 200,
      payload: posts,
    });
  }),
];
