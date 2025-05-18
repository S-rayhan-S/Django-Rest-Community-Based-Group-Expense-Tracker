import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Input, Button } from '../../components/common';
import { createGroup } from '../../services/groups';

export const CreateGroupPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    monthly_amount: '',
    cycle_type: 'monthly',
    invite_emails: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const group = await createGroup(formData);
      navigate(`/groups/${group.id}`);
    } catch (err) {
      setError(err.message || 'Failed to create group');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-2xl font-bold mb-8">Create New Group</h1>
      
      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          label="Group Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          as="textarea"
          rows={3}
        />
        <Input
          label="Monthly Contribution Amount (₹)"
          name="monthly_amount"
          type="number"
          value={formData.monthly_amount}
          onChange={handleChange}
          required
        />
        <div>
          <label className="block text-gray-700 text-sm font-bold mb-2">Cycle Type</label>
          <select
            name="cycle_type"
            value={formData.cycle_type}
            onChange={handleChange}
            className="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="biweekly">Bi-weekly</option>
          </select>
        </div>
        <Input
          label="Invite Members (comma separated emails)"
          name="invite_emails"
          value={formData.invite_emails}
          onChange={handleChange}
          placeholder="email1@example.com, email2@example.com"
        />
        <div className="flex justify-end">
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Create Group'}
          </Button>
        </div>
      </form>
    </div>
  );
};