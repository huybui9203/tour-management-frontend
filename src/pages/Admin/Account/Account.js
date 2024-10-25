import { createContext, useContext, useEffect, useMemo, useState } from "react";
import axios from "axios";
import Table from "../../../components/Table";
import ButtonMore from "./ButtonMore";
import CreateAccount from "./CreateEditAccount";
import Auth, { AuthContext } from "../../../context/Auth";
const columns = [
    {
        name: "Id",
        selector: (row) => row.id,
        sortable: true,
        button: true,
    },
    {
        name: "Username",
        selector: (row) => row.username,
        sortable: true,
    },
    {
        name: "Email",
        selector: (row) => row.email,
        sortable: true,
    },
    {
        name: "Quyền",
        selector: (row) => row.role,
        sortable: true,
    },

    {
        // name: "Trạng thái",
        // selector: (row) => row.orderStatus,
        name: "More",
        button: true,
        cell: (row) => <ButtonMore id={row.id} />,
    },
];

export const AccountContext = createContext();

const Account = () => {
    const [listAccounts, setListAccounts] = useState([]);
    const [stale, setStale] = useState(false);
    const [tab, setTab] = useState(0);
    const [isOpenCreateForm, setIsOpenCreateForm] = useState(false);

  const {user} = useContext(AuthContext)
    const getTableData = useMemo(() => {
        const tableData = [];
        listAccounts.map((item) => {
            if (item.role.ele_id == tab || tab == 0) {
              if(user.username == item.username) {
                return
              }
                const record = {
                    id: item.id,
                    username: item.username,
                    email: item.email,
                    role: item.role.ele_name,
                    roleId: item.role.ele_id,
                };
                tableData.push(record);
            }
        });
        return tableData;
    }, [listAccounts, tab]);

    useEffect(() => {
        const fetchListAccounts = async () => {
            const data = await axios
                .get(process.env.REACT_APP_URL + "/admin/accounts", {
                    withCredentials: true,
                })
                .then((res) => res.data)
                .catch((err) => console.log(err));
            if (!data) {
                return;
            }
            setListAccounts(data);
            if (stale) {
                setStale(false);
            }
        };

        fetchListAccounts();
    }, [stale]);

    return (
        <AccountContext.Provider value={[setStale, getTableData]}>
            <div className="relative">
                <ul className="flex absolute left-0 top-1">
                    {["Tất cả", "Amin", "Khách hàng"].map((label, index) => {
                        return (
                            <li
                                key={index}
                                className={`mx-2 cursor-pointer font-bold border-neutral-950 ${
                                    tab == index ? "border-b-2 text-neutral-950" : "text-neutral-500"
                                }`}
                                onClick={() => setTab(index)}
                            >
                                {label}
                            </li>
                        );
                    })}
                </ul>
                <Table columns={columns} data={getTableData} />
                <button className="bg-blue-500 text-white rounded-md px-4 py-2 mt-4" onClick={() => setIsOpenCreateForm(true)}>Thêm mới</button>
                <CreateAccount open={isOpenCreateForm} onClose={() => setIsOpenCreateForm(false)} />
            </div>
        </AccountContext.Provider>
    );

};

export default Account;
