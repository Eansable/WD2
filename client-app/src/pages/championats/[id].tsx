import OneChampionat from "@/components/Championats/OneChampionat";
import { useRouter } from "next/router";

const OneChampionatPage = () => {
  const router = useRouter();
  return (
    <>
      <OneChampionat id={Number(router.query?.id)}></OneChampionat>
    </>
  );
};

export default OneChampionatPage;
