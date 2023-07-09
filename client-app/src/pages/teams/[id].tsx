import OneTeamProfile from "@/components/Teams/OneTeamProfile";
import { useRouter } from "next/router";
const OneTeam = () => {
  const router = useRouter();
  return <OneTeamProfile id={Number(router.query?.id)}/>;
};

export default OneTeam;
