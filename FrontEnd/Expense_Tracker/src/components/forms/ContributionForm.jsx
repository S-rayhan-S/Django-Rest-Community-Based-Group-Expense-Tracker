import { useState } from 'react';
import { Modal } from '../common';
import { Input, Button } from '../common';

export const ContributionForm = ({ group, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    amount: group.monthly_amount,
    reference_id: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      await onSubmit(formData);
    } catch (err) {
      setError(err.message || 'Failed to submit contribution');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal onClose={onClose} title="Make Contribution">
      <form onSubmit={handleSubmit}>
        <Input
          label="Amount"
          name="amount"
          type="number"
          value={formData.amount}
          onChange={handleChange}
          required
        />
        <Input
          label="Payment Reference ID"
          name="reference_id"
          value={formData.reference_id}
          onChange={handleChange}
          required
        />
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="flex justify-end gap-4">
          <Button type="button" onClick={onClose} variant="outline">
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Submitting...' : 'Submit Contribution'}
          </Button>
        </div>
      </form>
    </Modal>
  );
};