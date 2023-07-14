"use client";

import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import LocaleLoading from "../CustomElement/Loader/LocalLoader";
import Plus from "../../img/plus";
import TeamCard from "./TeamCard";
import styles from "./styles.module.css";
import { useEffect, useState } from "react";
import { Modal } from "antd";
import CustomInput from "../CustomElement/Input";
import CustomButton from "../CustomElement/Button";
import { addTeamAction, getAllTeamAction } from "./store/actions";
import FileLoader from "../CustomElement/FileLoader";
import { TeamInterface } from "./types";
import { editTeamAction } from "./store/actions";

const ListTeam = () => {
  const dispatch = useAppDispatch();
  const { teams, isLoading, changed } = useAppSelector(
    (state) => state.teamReducer
  );
  const { roles } = useAppSelector((state) => state.accountReducer);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editTeam, setEditTeam] = useState<TeamInterface>()
  const [logo, setLogo] = useState<File>()

  const showModal = () => {
    setVisible(true);
  };

  const closeModal = () => {
    setName("");
    setDescription("");
    setVisible(false);
    setEditTeam(undefined);
    setLogo(undefined)
  };

  const saveTeam = () => {

    const formData = new FormData()
    formData.append("Name", name)
    if (description) {
      formData.append("Description", description)
    }
    if (logo) {
      formData.append("Logo", logo)
    }
    if (editTeam) {
      formData.append("Id", String(editTeam.id))
      dispatch(
        editTeamAction(formData)
      );
    } else {
      dispatch(
        addTeamAction(formData)
      );
    }
  };

  useEffect(() => {
    dispatch(getAllTeamAction());
  }, []);

  useEffect(() => {
    if (changed) {
      dispatch(getAllTeamAction());
      closeModal();
    }
  }, [changed]);

  useEffect(() => {
    if (editTeam) {
      setVisible(true)
      setName(editTeam.name)
      setDescription(editTeam.description)
    }
  }, [editTeam]);

  return !isLoading ? (
    <section className={styles.list}>
      {teams.map((team) => {
        return <TeamCard team={team} key={team.id} setEditTeam={setEditTeam}></TeamCard>;
      })}
      {roles.includes("admin") ? (
        <>
          <button className={styles.button__add} onClick={showModal}>
            {Plus}
          </button>
          <Modal
            open={visible}
            footer={null}
            closable={false}
            onCancel={closeModal}
          >
            <div className={styles.modal__wrapper}>
              <h2>Создать команду</h2>
              <label>
                Название команды:
                <CustomInput
                  id="nameTeam"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Название команды"
                />
              </label>
              <label>
                Описание:
                <CustomInput
                  id="descriptionTeam"
                  value={description}
                  placeholder="Описание команды"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </label>
              <label>
                Выберите лого:
                <FileLoader
                  onChange={(e) => e.target.files?.length ? setLogo(e.target.files[0]) : setLogo(undefined)}
                ></FileLoader>
              </label>
              <footer className={styles.modal__footer}>
                <CustomButton onClick={saveTeam} disabled={!Boolean(name)}>Сохранить</CustomButton>
              </footer>
            </div>
          </Modal>
        </>
      ) : null}
    </section>
  ) : (
    <>{LocaleLoading}</>
  );
};

export default ListTeam;
