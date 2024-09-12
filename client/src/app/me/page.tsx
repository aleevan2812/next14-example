'use client';

import { accountApiRequest } from '@/apiRequests/account';
import ProfileForm from '@/app/me/profile-form';
import React, { useEffect, useState } from 'react';
import { Profile } from '../../../public/types';

export default function MeProfile() {
  const [profile, setProfile] = useState<Profile | null>(null);
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await accountApiRequest.sMe();
        setProfile(res.payload.data);
      } catch (err) {
        console.error(err); // Log error for debugging
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <h1>Profile</h1>
      {profile ? <ProfileForm profile={profile} /> : <p>Loading profile...</p>}
    </div>
  );
}
