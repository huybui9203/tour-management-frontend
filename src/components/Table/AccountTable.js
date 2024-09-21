import React, { useState } from "react";
import DataTable from 'react-data-table-component'
const columns = [
    {
        name: "Họ và tên (KH||NV)",
        selector: (row) => row.name,
        sortable: true,
    },
    {
        name: "Tên đăng nhập",
        selector: (row) => row.username,
        sortable: true,
    },
    {
        name: "Quyền",
        selector: (row) => row.role,
        sortable: true,
    },
];

const data = [
    { id: 1, name: "Lục Thanh Phong", username: "lucthanhphong", role: "Nhân viên" },
    { id: 2, name: "Nguyễn Văn An", username: "nguyenvanan", role: "Admin" },
    { id: 3, name: "Trần Thị Mai", username: "tranthimai", role: "Khách hàng" },
    { id: 4, name: "Lê Hoàng Nam", username: "lehoangnam", role: "Khách hàng" },
    { id: 5, name: "Phạm Minh Khang", username: "phamminhkhang", role: "Khách hàng" },
    { id: 6, name: "Nguyễn Thị Hằng", username: "nguyenthihang", role: "Khách hàng" },
    { id: 7, name: "Vũ Văn Bình", username: "vuvanbinh", role: "Admin" },
    { id: 8, name: "Hoàng Văn Tú", username: "hoangvantu", role: "Nhân viên" },
    { id: 9, name: "Đỗ Thị Hạnh", username: "dothihanh", role: "Khách hàng" },
    { id: 10, name: "Phan Minh Hải", username: "phanminhhai", role: "Nhân viên" },
    { id: 11, name: "Trần Minh Tuấn", username: "tranminhtuan", role: "Khách hàng" },
    { id: 12, name: "Lý Nhật Nam", username: "lynhatnam", role: "Khách hàng" },
    { id: 13, name: "Lê Thị Hà", username: "lethihaha", role: "Nhân viên" },
    { id: 14, name: "Nguyễn Hoàng Anh", username: "nguyenhoanganh", role: "Nhân viên" },
    { id: 15, name: "Phạm Văn Đức", username: "phamvanduc", role: "Khách hàng" },
];

const customStyles = {
    header: {
        style: {
            fontSize: "16px",
            fontWeight: "bold",
            color: "#000",
            backgroundColor: "#44546A",
        },
    },
    headCells: {
        style: {
            fontSize: "14px",
            fontWeight: "bold",
            backgroundColor: "#44546A",
            color: "white",
        },
    },
    rows: {
        style: {
            fontSize: "13px",
            backgroundColor: "white", // Background color for all rows
            color: "#333", // Text color for all rows
            "&:nth-of-type(odd)": {
                // Styles for odd rows (striped effect)
                backgroundColor: "#DDEBF7",
            },
            "&:hover": {
                // Styles for hover state
                backgroundColor: "#8EA9DB",
                cursor: "pointer",
                color: "white",
            },
        },
    },
};

const AccountsTable = () => {
    const [records, setRecords] = useState(data);

    function handleFilter(event) {
        const searchText = event.target.value.toLowerCase();
        const newData = data.filter(
            (row) =>
                row.name.toLowerCase().includes(searchText) ||
                row.username.toLowerCase().includes(searchText) ||
                row.role.toLowerCase().includes(searchText)
        );
        setRecords(newData);
    }

    return (
        <div className="container mx-auto mt-10">
            {/* Search input container */}
            <div className="flex justify-end mb-4">
                <input
                    type="text"
                    className="border border-gray-300 rounded-lg px-4 py-2 w-64 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                    placeholder="Search ..."
                    onChange={handleFilter}
                />
            </div>

            <DataTable
                columns={columns}
                data={records}
                selectableRows
                pagination
                paginationRowsPerPageOptions={[5, 10, 15, 20, 25, 30]}
                striped
                customStyles={customStyles}
            />
        </div>
    );
};

export default AccountsTable;
