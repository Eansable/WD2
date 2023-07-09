import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { OneTeamProfileType } from "./types";
import LocaleLoading from "../CustomElement/Loader/LocalLoader";
import { useEffect } from "react";
import { getOneTeamAction } from "./store/actions";

const OneTeamProfile = ({ id }: OneTeamProfileType) => {
  const dispatch = useAppDispatch();
  const { oneTeam, isLoading } = useAppSelector((state) => state.teamReducer);

  useEffect(() => {
    dispatch(getOneTeamAction())
  }, [])
  
  return !isLoading ? (
    <section>Team with id: {id}</section>
  ) : (
    <>{LocaleLoading}</>
  );
};

export default OneTeamProfile;
