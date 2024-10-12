
const ListDateStart = ({listDateStart}) => {
    return (
        <div>
            {listDateStart.map((date) => {
                return <p key={date.id}>{date.start_date.slice(0, 10)}</p>
            })}
        </div>
    )
}

export default ListDateStart