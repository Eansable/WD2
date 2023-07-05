import { Table } from "antd";

const SmallTable = () => {
  return (
    <Table>
      <Table.Column dataIndex="name" key="name" title="Команда" />
      <Table.Column dataIndex="gameCount" key="gameCount" title="И" />
      <Table.Column dataIndex="winCount" key="winCount" title="В" />
      <Table.Column dataIndex="drawCount" key="drawCount" title="н" />
      <Table.Column dataIndex="loseCount" key="loseCount" title="П" />
      <Table.Column dataIndex="points" key="points" title="О" />
    </Table>
  );
};

export default SmallTable;
