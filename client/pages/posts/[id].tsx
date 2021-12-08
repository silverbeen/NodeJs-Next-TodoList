import { NextPage } from "next";
import { useRouter } from "next/dist/client/router";

const PostDetailPage = () => {
  const router = useRouter();

  console.log(router);

  return <div>Post Id : {router.query.id}</div>;
};

export default PostDetailPage;
