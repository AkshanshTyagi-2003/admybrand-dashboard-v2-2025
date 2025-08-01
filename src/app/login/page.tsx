'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import LoginForm from './LoginForm'; // ✅ Relative path since it's in the same folder

export default function LoginPage() {
  const router = useRouter();

  const handleLogin = () => {
    // ✅ Redirect to the dashboard
    router.push('/dashboard');
  };

  return <LoginForm onLogin={handleLogin} />;
}
