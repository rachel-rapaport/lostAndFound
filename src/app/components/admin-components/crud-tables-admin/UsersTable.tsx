"use client";
import {
  createUser,
  deleteUserById,
  getUsers,
  updateUserById,
} from "@/app/services/api/userService";
import { User } from "@/app/types/props/user";
import { Types } from "mongoose";
import React, { useEffect, useState } from "react";
// import Swal from "sweetalert2";

export const UsersTable = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [newUser, setNewUser] = useState<User>({
    _id: new Types.ObjectId(0),
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  const [updateUser, setupdateUser] = useState<User>({
    _id: new Types.ObjectId(0),
    fullName: "",
    email: "",
    password: "",
    phone: "",
  });
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const usersData = await getUsers();
        if (usersData) {
          setUsers(usersData.data);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, [users]);

  const handleDelete = async (id: string) => {
    await deleteUserById(id);
    setUsers(users.filter((user) => user._id?.toString() !== id));
  };

  const handleEdit = async (id: string, updatedUser: User) => {
    console.log("user edit", updateUser);

    await updateUserById(id, updatedUser);
    setUsers(
      users.map((user) =>
        user._id?.toString() === id ? { ...user, ...updatedUser } : user
      )
    );
    setIsEditing(null);
  };

  const handleAdd = async () => {
    console.log("user add ", newUser);

    const response = await createUser(newUser);
    if (response) {
      const createdUser = await response;
      setUsers([...users, createdUser]);
      setNewUser({
        _id: new Types.ObjectId(),
        fullName: "",
        email: "",
        password: "",
        phone: "",
      });
    } else {
    }
  };

  const handleIsEditing = (user: User) => {
    if (user._id) {
      setIsEditing(user._id.toString());
      setupdateUser({
        _id: user._id,
        fullName: user.fullName,
        phone: user.phone,
        password: user.password,
        email: user.email,
      });
    }
  };

  return (
    <div className="p-6">
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 hidden md:table">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Full Name
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Email
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Password
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Phone
              </th>
              <th className="border border-gray-300 px-4 py-2 text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr
                key={user._id.toString()}
                className="hover:bg-gray-100 even:bg-gray-50"
              >
                {isEditing === user._id?.toString() ? (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        defaultValue={user.fullName}
                        className="w-full p-2 border rounded"
                        onChange={(e) =>
                          setupdateUser((prev) => ({
                            ...prev,
                            fullName: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="email"
                        defaultValue={user.email}
                        className="w-full p-2 border rounded"
                        onChange={(e) =>
                          setupdateUser((prev) => ({
                            ...prev,
                            email: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        defaultValue={
                          user.password
                            ? user.password[0] +
                              "*".repeat(user.password.length - 1)
                            : ""
                        }
                        className="w-full p-2 border rounded"
                        disabled
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      <input
                        type="text"
                        defaultValue={user.phone}
                        className="w-full p-2 border rounded"
                        onChange={(e) =>
                          setupdateUser((prev) => ({
                            ...prev,
                            phone: e.target.value,
                          }))
                        }
                      />
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center">
                      <button
                        className="px-4 py-2 mr-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={() => {
                          if (user._id)
                            handleEdit(user._id.toString(), updateUser);
                        }}
                      >
                        Save
                      </button>
                      <button
                        className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                        onClick={() => setIsEditing(null)}
                      >
                        Cancel
                      </button>
                    </td>
                  </>
                ) : (
                  <>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.fullName}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.email}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {user.password
                        ? user.password[0] +
                          "*".repeat(user.password.length - 1)
                        : ""}
                    </td>

                    <td className="border border-gray-300 px-4 py-2">
                      {user.phone}
                    </td>
                    <td className="border border-gray-300 px-4 py-2 text-center flex justify-evenly">
                      <button
                        className="px-4 py-2 mr-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                        onClick={() => handleIsEditing(user)}
                      >
                        Edit
                      </button>
                      <button
                        className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                        onClick={() =>
                          user._id && handleDelete(user._id.toString())
                        }
                      >
                        Delete
                      </button>
                    </td>
                  </>
                )}
              </tr>
            ))}
            <tr className="bg-gray-100">
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  placeholder="Full Name"
                  value={newUser.fullName || ""}
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    setNewUser({ ...newUser, fullName: e.target.value })
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="email"
                  placeholder="Email"
                  value={newUser.email || ""}
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    setNewUser({ ...newUser, email: e.target.value })
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  placeholder="Password"
                  value={newUser.password || ""}
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    setNewUser({ ...newUser, password: e.target.value })
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <input
                  type="text"
                  placeholder="Phone"
                  value={newUser.phone || ""}
                  className="w-full p-2 border rounded"
                  onChange={(e) =>
                    setNewUser({ ...newUser, phone: e.target.value })
                  }
                />
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                <button
                  className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                  onClick={handleAdd}
                >
                  Add
                </button>
              </td>
            </tr>
          </tbody>
        </table>

        <div className="block md:hidden">
          {users.map((user) => (
            <div
              key={user._id?.toString()}
              className="bg-white shadow-md rounded-lg p-4 mb-4"
            >
              {isEditing === user._id?.toString() ? (
                <div>
                  <input
                    type="text"
                    defaultValue={user.fullName}
                    className="w-full p-2 border rounded mb-2"
                    onChange={(e) =>
                      setupdateUser((prev) => ({
                        ...prev,
                        fullName: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="email"
                    defaultValue={user.email}
                    className="w-full p-2 border rounded mb-2"
                    onChange={(e) =>
                      setupdateUser((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                  />
                  <input
                    type="text"
                    defaultValue={user.password}
                    className="w-full p-2 border rounded mb-2"
                    disabled
                  />
                  <input
                    type="text"
                    defaultValue={user.phone}
                    className="w-full p-2 border rounded mb-2"
                    onChange={(e) =>
                      setupdateUser((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                  />
                  <div className="flex justify-between mt-2">
                    <button
                      className="bg-blue-500 text-white px-4 py-2 rounded"
                      onClick={() => {
                        if (user._id)
                          handleEdit(user._id.toString(), updateUser);
                      }}
                    >
                      Save
                    </button>
                    <button
                      className="bg-gray-500 text-white px-4 py-2 rounded"
                      onClick={() => setIsEditing(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p>
                    <strong>Full Name:</strong> {user.fullName}
                  </p>
                  <p>
                    <strong>Email:</strong> {user.email}
                  </p>
                  <p>
                    <strong>Password:</strong> {user.password}
                  </p>
                  <p>
                    <strong>Phone:</strong> {user.phone}
                  </p>
                  <div className="flex justify-between mt-2">
                    <button
                      className="bg-yellow-500 text-white px-4 py-2 rounded"
                      onClick={() => handleIsEditing(user)}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 text-white px-4 py-2 rounded"
                      onClick={() =>
                        user._id && handleDelete(user._id.toString())
                      }
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
          <div className="bg-white shadow-md rounded-lg p-4 mb-4">
            <input
              type="text"
              placeholder="Full Name"
              value={newUser.fullName || ""}
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setNewUser({ ...newUser, fullName: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={newUser.email || ""}
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              value={newUser.password || ""}
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={newUser.phone || ""}
              className="w-full p-2 border rounded mb-2"
              onChange={(e) =>
                setNewUser({ ...newUser, phone: e.target.value })
              }
            />
            <div className="flex justify-between mt-2">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={handleAdd}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UsersTable;
