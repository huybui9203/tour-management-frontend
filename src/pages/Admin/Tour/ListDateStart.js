
const ListDateStart = ({listDateStart}) => {
    return (
        <div className="">
            {listDateStart.map((date, index) => {
                if(index ==2) {
                    return <p>...</p>
                } 
                if(index>2) return
                return <p className="" key={date.id}>{date.start_date.slice(0, 10)}</p>
            })}
        </div>
    )
}

export default ListDateStart