import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getGroupReports } from '../../services/groups';

export const ReportPage = () => {
  const { id } = useParams();
  const [reports, setReports] = useState([]);
  const [selectedCycle, setSelectedCycle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const data = await getGroupReports(id);
        setReports(data);
        if (data.length > 0) {
          setSelectedCycle(data[0].id);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch reports');
      } finally {
        setLoading(false);
      }
    };

    fetchReports();
  }, [id]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  const currentReport = reports.find(r => r.id === selectedCycle) || reports[0];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Group Reports</h1>
        <div>
          <select
            value={selectedCycle || ''}
            onChange={(e) => setSelectedCycle(e.target.value)}
            className="shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          >
            {reports.map(report => (
              <option key={report.id} value={report.id}>
                {report.cycle_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {currentReport && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-2">Summary</h3>
              <p>Total Amount: ₹{currentReport.total_amount}</p>
              <p>Collected: ₹{currentReport.collected_amount}</p>
              <p>Pending: ₹{currentReport.pending_amount}</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow md:col-span-2">
              <h3 className="text-lg font-semibold mb-4">Payment Status</h3>
              {/* Placeholder for chart - you would integrate a chart library here */}
              <div className="h-64 bg-gray-100 flex items-center justify-center">
                [Chart would display here - {currentReport.paid_members} paid, {currentReport.unpaid_members} unpaid]
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-hidden">
            <h3 className="text-lg font-semibold p-6">Contribution History</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Member</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {currentReport.contributions.map(contribution => (
                  <tr key={contribution.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{contribution.member_name}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      ₹{contribution.amount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${contribution.status === 'paid' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {contribution.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {contribution.payment_date || '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};