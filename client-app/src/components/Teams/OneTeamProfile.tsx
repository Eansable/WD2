"use client"

import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { OneTeamProfileType } from "./types";
import LocaleLoading from "../CustomElement/Loader/LocalLoader";
import { useEffect, useState } from "react";
import { getOneTeamAction } from "./store/actions";
import PlayersTeam from "../Players/PlayersTeam";
import CustomButton from "../CustomElement/Button";
import { DatePicker, Form, Modal } from "antd";
import CustomInput from "../CustomElement/Input";

const OneTeamProfile = ({ id }: OneTeamProfileType) => {
  const dispatch = useAppDispatch();
  const { oneTeam, isLoading } = useAppSelector((state) => state.teamReducer);


  useEffect(() => {
    if (id)
      dispatch(getOneTeamAction())
  }, [id])

  return !isLoading ? (
    <section>Team with id: {id}
      <PlayersTeam teamId={id}></PlayersTeam>

    </section>

  ) : (
    <>{LocaleLoading}</>
  );
};

export default OneTeamProfile;
