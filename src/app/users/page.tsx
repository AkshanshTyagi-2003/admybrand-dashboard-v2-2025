'use client';

import React, { useEffect, useState } from 'react';
import Sidebar from '@/components/Sidebar';
import UsersTable from './components/UsersTable';

interface ApiUser {
  id: number;
  name: {
    firstname: string;
    lastname: string;
  };
  email: string;
  phone: string;
}

interface User {
  id: number;
  name: string;
  email: string;
  phone: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUsers = async () => {
      setIsLoading(true);
      try {
        const res = await fetch('https://fakestoreapi.com/users');
        const data: ApiUser[] = await res.json();

        const mappedUsers: User[] = data.map((user) => ({
          id: user.id,
          name: `${user.name.firstname} ${user.name.lastname}`,
          email: user.email,
          phone: user.phone,
        }));

        setUsers(mappedUsers);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 p-8 overflow-auto">
        <h1 className="text-3xl font-semibold mb-8 text-gray-900 dark:text-gray-100">
          Users
        </h1>

        {isLoading ? (
          <p className="text-gray-700 dark:text-gray-300">Loading users...</p>
        ) : (
          <UsersTable users={users} />
        )}
      </main>
    </div>
  );
}
