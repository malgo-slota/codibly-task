type RowProps = {
  id: number,
  name: string,
  year: number,
  color: string,
  expandData: (id: number) => void,
}

export default function Row ({ id, name, year, color, expandData }: RowProps): JSX.Element {

  return (
    <tr style={{background: `${color}`}} onClick={()=>expandData(id)}>
        <td>{id}</td>
        <td>{name}</td>
        <td>{year}</td>
    </tr>
  )
}
