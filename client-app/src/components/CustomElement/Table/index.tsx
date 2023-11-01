import styles from "./styles.module.css"

export interface ColumnType {
    name?: string,
    dataIndex: string,
    render?(text: string, row: any, array: any[]): any
}

interface PropsType {
    columns: ColumnType[],
    data: any[]
}

const Table = ({ columns, data }: PropsType) => {
    const getRow = (row: any) => {
        return <tr>
            {columns.map(col => {
                return <td>
                    <p>
                        {col?.render ? col.render(row[col.dataIndex], row, data) : row[col.dataIndex]}
                    </p>
                </td>
            })}
        </tr>
    }

    return <table className={styles.table}>
        <thead>
            <tr>

                {columns.map(col => {
                    return <th>
                        <p>
                            {col.name}
                        </p>
                    </th>
                })}
            </tr>
        </thead>
        <tbody>
            {data.map(r => getRow(r))}
        </tbody>
    </table>
}

export default Table