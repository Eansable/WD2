import { useRouter } from "next/router";

const OneChampionatPage = () => {
  const router = useRouter();
  return <div>{router.query?.id}</div>;
};

export default OneChampionatPage;
