'use client'

import { useEffect, useState } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/user') // 제공된 API 엔드포인트로 변경
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      })
      .catch((error) => setError("Failed to fetch users"));
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (users.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Users List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            <span>{user.name}</span> - <span>{user.email}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UsersPage;
