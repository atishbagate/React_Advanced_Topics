/*
The Container and Presentational Components pattern is a way to separate concerns in React applications by dividing components into two categories:

Presentational Components:
- Focus only on how things look (UI).
- Receive data and callbacks exclusively via props.
- Rarely have their own state (except for UI state like input values).
- Are often written as functional components.
- Do not know where the data comes from or how to change it.

Container Components:
- Focus on how things work (logic, data fetching, state management).
- Provide data and behavior to presentational components.
- Handle state, side effects, and connect to stores or APIs.
- Pass data and callbacks as props to presentational components.
- Are often class components or use hooks.

Benefits:
- Improves code reusability and testability.
- Makes UI components easier to reuse and style.
- Keeps business logic separate from UI, making code easier to maintain.

Example:
A container component fetches a list of users and passes it to a presentational component that simply renders the list.
*/

import React, { useEffect, useState } from "react";

// Presentational Component
type User = { id: number; name: string };

const UserList: React.FC<{ users: User[] }> = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.id}>{user.name}</li>
    ))}
  </ul>
);

// Container Component
const UserListContainer: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setUsers([
        { id: 1, name: "Alice" },
        { id: 2, name: "Bob" },
        { id: 3, name: "Charlie" },
      ]);
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <div>Loading users...</div>;
  return <UserList users={users} />;
};

export default UserListContainer;
