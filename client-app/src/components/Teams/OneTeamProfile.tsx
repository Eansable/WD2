"use client"

import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { OneTeamProfileType } from "./types";
import LocaleLoading from "../CustomElement/Loader/LocalLoader";
import { useEffect, useState } from "react";
import { getOneTeamAction } from "./store/actions";
import PlayersTeam from "../Players/PlayersTeam";
import styles from "./styles.module.css"

const OneTeamProfile = ({ id }: OneTeamProfileType) => {
  const dispatch = useAppDispatch();
  const { oneTeam, isLoading } = useAppSelector((state) => state.teamReducer);


  // useEffect(() => {
  //   if (id)
  //     dispatch(getOneTeamAction())
  // }, [id])

  return !isLoading ? (
    <section className={styles.one_team_wrapper}>
      <PlayersTeam teamId={id}></PlayersTeam>

    </section>

  ) : (
    <>{LocaleLoading}</>
  );
};

export default OneTeamProfile;
