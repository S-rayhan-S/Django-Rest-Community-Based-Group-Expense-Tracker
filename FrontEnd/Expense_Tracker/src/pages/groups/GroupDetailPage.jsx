import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Button } from '../../components/common';
import { MemberStatus } from '../../components/groups';
import { ContributionForm } from '../../components/forms';
import { getGroupDetails } from '../../services/groups';
import useAuth from '../../hooks/useAuth';

export const GroupDetailPage = () => {
  const { id } = useParams();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showContributionForm, setShowContributionForm] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    const fetchGroupDetails = async () => {
      try {
        const data = await getGroupDetails(id);
        setGroup(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch group details');
      } finally {
        setLoading(false);
      }
    };

    fetchGroupDetails();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!group) return <div>Group not found</div>;

  const isAdmin = group.admin.id === user?.id;
  const currentCycle = group.cycles.find(cycle => cycle.is_current);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">{group.name}</h1>
        <p className="text-gray-600 mb-4">{group.description}</p>
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Monthly Contribution</p>
            <p className="text-lg font-semibold">₹{group.monthly_amount}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Current Cycle</p>
            <p className="text-lg font-semibold">
              {currentCycle ? currentCycle.month_year : 'No active cycle'}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg">
            <p className="text-sm text-gray-500">Admin</p>
            <p className="text-lg font-semibold">{group.admin.name}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-6">
          {isAdmin && (
            <Button>Start New Cycle</Button>
          )}
          {!isAdmin && currentCycle && (
            <Button onClick={() => setShowContributionForm(true)}>
              Make Contribution
            </Button>
          )}
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Members</h2>
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {group.members.map(member => (
                <tr key={member.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{member.name}</div>
                        <div className="text-sm text-gray-500">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <MemberStatus status={member.status} />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ₹{group.monthly_amount}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showContributionForm && (
        <ContributionForm
          group={group}
          onClose={() => setShowContributionForm(false)}
          onSubmit={(data) => {
            console.log('Contribution data:', data);
            setShowContributionForm(false);
          }}
        />
      )}
    </div>
  );
};