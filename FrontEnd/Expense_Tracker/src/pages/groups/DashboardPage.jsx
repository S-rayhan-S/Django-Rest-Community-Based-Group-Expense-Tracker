import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { GroupCard } from '../../components/groups';
import { Button } from '../../components/common';
import { getGroups } from '../../services/groups';
import useAuth from '../../hooks/useAuth';

export const DashboardPage = () => {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { user } = useAuth();

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const data = await getGroups();
        setGroups(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch groups');
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Your Groups</h1>
        <Link to="/groups/create">
          <Button>Create New Group</Button>
        </Link>
      </div>
      
      {groups.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You're not part of any groups yet.</p>
          <Link to="/groups/create">
            <Button>Create Your First Group</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map(group => (
            <GroupCard key={group.id} group={group} />
          ))}
        </div>
      )}
    </div>
  );
};