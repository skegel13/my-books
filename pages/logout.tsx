import { useRouter } from 'next/router';
import React from 'react';
import useAuth from '../context/auth-context';

function Logout() {
  const router = useRouter();
  const { logout } = useAuth();

  logout();

  return null;
}

export default Logout;
