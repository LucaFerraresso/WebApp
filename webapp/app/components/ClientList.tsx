import { FC } from "react";

const UserList: FC<{ users: { name: string; email: string }[] }> = ({ users }) => {
  return (
    <div className="flex flex-col space-y-4 p-6">
      <h2 className="text-2xl font-semibold">Users</h2>
      <ul className="space-y-2">
        {users.map((user, index) => (
          <li key={index} className="p-4 border rounded-lg shadow-md">
            <h3 className="text-lg font-medium">{user.name}</h3>
            <p>{user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;