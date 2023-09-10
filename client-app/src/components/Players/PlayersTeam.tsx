import { useAppDispatch, useAppSelector } from "@/helpers/hooks";
import { useEffect, useState } from "react";
import { getByTeamIdAction, addAction } from "./store/action";
import LocalLoader from "../CustomElement/Loader/LocalLoader";
import { DatePicker, Form, Modal } from "antd";
import CustomButton from "../CustomElement/Button";
import CustomInput from "../CustomElement/Input";
import { PlayerFormType } from "./types";
import Notifications from "@/helpers/Notifications";
import PlayerCard from "./PlayerCard";
import styles from "./styles.module.css"

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

  const closeModal = () => {
    setOpen(false);
    form.resetFields();
  };

  const savePlayer = (values: PlayerFormType) => {
    dispatch(addAction({ ...values, teamId }));
  };

  useEffect(() => {
    dispatch(getByTeamIdAction({ teamId }));
  }, []);

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
                <PlayerCard player={player} />
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
        <Form form={form} onFinish={savePlayer}>
          <Form.Item name="name" label="Имя">
            <CustomInput></CustomInput>
          </Form.Item>
          <Form.Item name="secondName" label="Фамилия">
            <CustomInput></CustomInput>
          </Form.Item>
          <Form.Item name="middleName" label="Отчество">
            <CustomInput></CustomInput>
          </Form.Item>
          <Form.Item name="birthday" label="Имя">
            <DatePicker></DatePicker>
          </Form.Item>
          <CustomButton type="submit">Сохранить</CustomButton>
        </Form>
      </Modal>
    </div>
  ) : (
    <>{LocalLoader}</>
  );
};

export default PlayersTeam;
