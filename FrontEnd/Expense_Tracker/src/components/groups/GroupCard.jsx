import { Link } from 'react-router-dom';

export const GroupCard = ({ group }) => {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-md transition-shadow">
      <h3 className="text-xl font-semibold mb-2">{group.name}</h3>
      <p className="text-gray-600 mb-4">{group.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {group.members_count} member{group.members_count !== 1 ? 's' : ''}
        </span>
        <Link to={`/groups/${group.id}`}>
          <button className="text-blue-600 hover:text-blue-800 font-medium">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};