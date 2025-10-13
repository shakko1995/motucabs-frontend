// You can add this component at the top of your Sitemap.jsx file or in a separate file.

import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const SitemapSection = ({ title, items, loading, linkPrefix, slugField = 'slug' }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md border">
      <h2 className="text-xl font-bold text-gray-800 mb-4 pb-2 border-b">
        {title}
      </h2>
      {loading ? (
        <p className="text-sm text-gray-500">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-gray-500">No items available.</p>
      ) : (
        <ul className="space-y-2">
          {items.map(item => (
            <li key={item._id}>
              <Link
                to={`${linkPrefix}/${item[slugField]}`}
                className="flex items-center gap-2 p-2 text-sm text-gray-700 rounded-md hover:bg-gray-100 hover:text-blue-600 transition-colors"
              >
                <ArrowRight className="w-4 h-4 text-gray-400" />
                <span>{item.name || `${item.from} to ${item.to}` || item.fromCity}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
export default SitemapSection;