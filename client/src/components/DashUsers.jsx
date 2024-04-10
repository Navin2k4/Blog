import { Table, Modal, Button } from "flowbite-react";
import { useEffect, useState } from "react"
import { useSelector } from 'react-redux';
import { HiOutlineExclamationCircle } from 'react-icons/hi';
import { FaCheck, FaTimes } from 'react-icons/fa';

const DashUsers = () => {
    const { currentUser } = useSelector((state) => state.user);
    const [users, setUsers] = useState([]);
    const [showmore, setShowMore] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState('');

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await fetch(`/api/user/getusers`);
                const data = await res.json();
                if (res.ok) {
                    setUsers(data.users);
                    if (data.users.length < 9) {
                        setShowMore(false);
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };

        if (currentUser.isAdmin) {
            fetchUsers();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentUser._id]);

    const handleShowmore = async () => {
        const startIndex = users.length;
        try {
            const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => [...prev, ...data.users]);
                if (data.users.length < 9) {
                    setShowMore(false);
                }
            }
        } catch (error) {
            console.log(error);
        }
    }

    const handleDeleteUser = async () => {
        setShowModal(false);
        try {
            const res = await fetch(`/api/user/delete/${userIdToDelete}`,
                {
                    method: 'DELETE',
                }
            );
            const data = await res.json();
            if (res.ok) {
                setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
                setShowModal(false);
            } else {
                console.log(data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div className="table-auto overflow-x-scroll md:mx-auto p-3 pt-5 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 rounded-lg my-2 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500">
            {currentUser.isAdmin && users.length > 0 ? (
                <>
                    <Table hoverable className="shadow-lg border-gray-400 ">
                        <Table.Head>
                            <Table.HeadCell>Date Created</Table.HeadCell>
                            <Table.HeadCell>Date Updated</Table.HeadCell>
                            <Table.HeadCell>User Image</Table.HeadCell>
                            <Table.HeadCell>Username</Table.HeadCell>
                            <Table.HeadCell>Email</Table.HeadCell>
                            <Table.HeadCell>Admin</Table.HeadCell>
                            <Table.HeadCell>Delete</Table.HeadCell>
                        </Table.Head>
                        {users.map((user) => (
                            // eslint-disable-next-line react/jsx-key
                            <Table.Body className="divide-y" key={user._id}>
                                <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                    <Table.Cell>{new Date(user.createdAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>{new Date(user.updatedAt).toLocaleDateString()}</Table.Cell>
                                    <Table.Cell>
                                        <img
                                            src={user.profilePicture}
                                            alt={user.username}
                                            className=" w-10 h-10 rounded-full object-cover bg-gray-500"
                                        />
                                    </Table.Cell>
                                    <Table.Cell>{user.username}</Table.Cell>
                                    <Table.Cell>{user.email}</Table.Cell>
                                    <Table.Cell>
                                        {user.isAdmin ? (<FaCheck className="text-green-500" />) : (<FaTimes className="text-red-500" />)
                                        }</Table.Cell>

                                    <Table.Cell>
                                        <span onClick={() => {
                                            setShowModal(true);
                                            setUserIdToDelete(user._id);
                                        }}
                                            className="font-md text-red-500 hover:underline cursor-pointer">
                                            Delete
                                        </span>
                                    </Table.Cell>

                                </Table.Row>
                            </Table.Body>
                        ))}
                    </Table>
                    {
                        showmore && (
                            <button onClick={handleShowmore} className="w-full text-teal-500 self-center text-sm py-7">
                                Show More
                            </button>
                        )
                    }
                </>
            ) : (
                <p>You have No Users yet</p>
            )}
            <Modal show={showModal} onClose={() => setShowModal(false)} popup size='md' >
                <Modal.Header className="ml-2">Delete User</Modal.Header>
                <Modal.Body className="">
                    <div className="text-center">
                        <HiOutlineExclamationCircle className="h-14 w-14 text-gray-400 dark:text-gray-400 mb-4 mx-auto" />
                        <h3 className="mb-6 text-lg text-gray-500 dark:text-gray-400">Are you sure you want to delete this User?</h3>
                    </div>
                    <div className="flex gap-4 justify-center">
                        <Button color='failure' onClick={handleDeleteUser}>Yes, Delete</Button>
                        <Button onClick={() => setShowModal(false)}>Cancel</Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    )
}

export default DashUsers
