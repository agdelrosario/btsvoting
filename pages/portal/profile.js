import { useState, useEffect } from "react";
import { useSession } from "next-auth/client";
import PortalNavBar from '../../components/PortalNavBar';

export default function Portal() {
  const [session, loading] = useSession();
  const [admin, setAdmin] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch(`/api/admin`);
      const json = await res.json();

      if (json.admin) {
        setAdmin(json.admin);
      }
    };
    fetchData();
  }, [session]);

  if (typeof window !== "undefined" && loading) return null;

  if (!session) {
    return (
      <main>
        <div>
          <h1>You aren't signed in, please sign in first</h1>
        </div>
      </main>
    );
  }

  console.log('session', session)

  return (
    <div className="container">
      <PortalNavBar />
      <main>
        <div className="profile">
          <div className="heading">
            <h1>Profile</h1>
            <span>Your information are viewable only by you and the admins</span>
          </div>
          <div className="profile-info">
            <div className="profile-info-card">
              <h6>Team</h6>
              <input />
            </div>
            <div className="profile-info-card">
              <h6>Country</h6>
              <div>Australia</div>
            </div>
            <div className="profile-info-card">
              <h6>Birthday</h6>
              <div>September 18</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
