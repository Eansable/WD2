import OneChampionat from "@/components/Championats/OneChampionat";
import { useRouter } from "next/router";

const OneChampionatPage = () => {
  const router = useRouter();
  return (
    <div>
      {router.query?.id}
      <OneChampionat id={Number(router.query?.id)}></OneChampionat>
    </div>
  );
};

export default OneChampionatPage;
