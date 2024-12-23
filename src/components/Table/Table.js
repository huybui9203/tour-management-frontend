import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component'
import { BiBorderRadius } from "react-icons/bi";
import LabelBookingStatus from "../LabelBookingStatus";


const customStyles = {
    // header: {
    //     style: {
    //         fontSize: "16px",
    //         fontWeight: "bold",
    //         color: "#000",
    //         backgroundColor: "#44546A",
    //     },
    // },

    // responsiveWrapper: {
    //     style: {
    //         overflow: 'visible',
    //         width: ''
    //         // borderRadius: '12px'
    //     }
    // },
    headCells: {
        style: {
            fontSize: "14px",
            fontWeight: "bold",
            backgroundColor: "#fff",
            color: "#000",
            borderBottomColor: 'red'
        },
    },
    headRow: {
		style: {
			borderBottomColor: '#ccc7c7',
		},
    },
    rows: {
        style: {
            fontSize: "13px",
            backgroundColor: "white", // Background color for all rows
            color: "#333", // Text color for all rows
            "&:nth-of-type(odd)": {
                backgroundColor: "#fff",
            },
            "&:hover": {
                cursor: "pointer",
                color: "#000",
                // boxShadow: '0 0 1.875rem rgba(19, 88, 70, .1)'
                backgroundColor: 'rgba(19, 88, 70, .1)'
            },
            '&:not(:last-of-type)': {
				borderBottomStyle: 'none',
                borderBottomWidth: '0'
			},
        },
    },
    pagination: {
        style: {

        },
        // pageButtonsStyle: {
        //     border: '1px solid #135846',
        //     borderRadius: '10%',
        //     margin: '4px',

        // }
    }
};

const Table = ({columns, data}) => {
    const [records, setRecords] = useState(data);
    const [searchText, setSearchText] = useState('')

    useEffect(() => {
        setRecords(data)
    }, [data])

    useEffect(() => {
        if(!data) {
            return  
        }
        const newData = data.filter(
            (row) => {
                for(const field in row) {
                    if(typeof row[field] === 'string' || typeof row[field] === 'number') {
                        if(row[field].toString().toLowerCase().includes(searchText.toLocaleLowerCase())) {
                            return true
                        }
                    }
                }
                return false
            }
        );
        setRecords(newData);
    }, [searchText])

    return (
        <div className="container mx-auto mt-10">
            {/* Search input container */}
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none"
                    placeholder="Search ..."
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
            </div>

            <DataTable
                columns={columns}
                data={records}
                selectableRows
                pagination
                paginationRowsPerPageOptions={[2, 5, 10, 15, 20, 25, 30]}
                striped
                customStyles={customStyles}
            />
        </div>
    );
};

export default Table;
