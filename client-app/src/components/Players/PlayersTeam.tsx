import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useEffect, useState } from "react";
import { getByTeamIdAction, addAction } from "./store/action";
import LocalLoader from "../CustomElement/Loader/LocalLoader";
import { DatePicker, Form, Modal } from "antd";
import CustomButton from "../CustomElement/Button";
import CustomInput from "../CustomElement/Input";
import { PlayerFormType, PlayerType } from "./types";
import Notifications from "@/helpers/Notifications";
import PlayerCard from "./PlayerCard";
import styles from "./styles.module.css"
import ManagePlayer from "./ManagePlayer";

interface PropsType {
  teamId: number;
}

const PlayersTeam = ({ teamId }: PropsType) => {
  const dispatch = useAppDispatch();
  const { players, isLoading, changed } = useAppSelector(
    (state) => state.PlayersReducer
  );
  const [form] = Form.useForm();
  const [open, setOpen] = useState(false);
  const [editPlayer, setEditPlayer] = useState<PlayerType>()

  const closeModal = () => {
    setOpen(false);
    form.resetFields();
    setEditPlayer(undefined)
  };

  const savePlayer = (values: PlayerFormType) => {
    dispatch(addAction({ ...values, teamId }));
  };

  useEffect(() => {
    if (teamId)
      dispatch(getByTeamIdAction({ teamId }));
  }, [teamId]);

  useEffect(() => {
    if (changed) {
      closeModal()
      dispatch(getByTeamIdAction({ teamId }));
      Notifications.success(changed, 10)
    }
  }, [changed]);

  return !isLoading ? (
    <div>
      <div className={styles.team_squad_wrapper}>
        Состав команды
        <div className={styles.team_squad}>
          {players ? (
            players?.map((player) => {
              return (
                <PlayerCard
                  player={player}
                  setEditPlayer={setEditPlayer}
                  setOpen={setOpen}
                />
              );
            })
          ) : (
            <h2>Ни одного игрока ещё не добавленно в команду </h2>
          )}
        </div>
      </div>
      <footer>
        <CustomButton onClick={() => setOpen(true)}>
          Добавить игрока в команду
        </CustomButton>
      </footer>
      <Modal
        open={open}
        onCancel={closeModal}
        closable={false}
        footer={null}
      >
        <ManagePlayer
          editPlayer={editPlayer}
          teamId={teamId}
        ></ManagePlayer>
      </Modal>
    </div>
  ) : (
    <>{LocalLoader}</>
  );
};

export default PlayersTeam;
