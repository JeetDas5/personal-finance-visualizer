import { Budget } from "@/types/Budgets";

interface BudgetListProps {
  budgets: Budget[];
  onEdit: (budget: Budget) => void;
  onDelete: (id: string) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({
  budgets,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white p-5 md:p-6 rounded-lg shadow-lg max-w-full md:w-[40vw] mx-4 md:mx-10 max-h-[50vh] md:max-h-[78vh] overflow-y-auto overflow-x-hidden scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-100">
      <h2 className="text-2xl font-semibold mb-1 md:mb-2 text-blue-600 text-center">
        Budgets
      </h2>
      <ul className="flex flex-col gap-1 ">
        {budgets.map((budget) => (
          <li
            key={budget._id}
            className="flex justify-between items-center border border-gray-300 p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:scale-103 "
          >
            <div>
              <div className="font-semibold text-sm text-gray-500">
                {budget.category}
              </div>
              <div className="text-sm text-blue-500">${budget.amount}</div>
              <div className="text-xs text-gray-500">{budget.month}</div>
            </div>
            <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 w-[20vw] md:w-auto">
              <button
                className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 transition-colors duration-200 cursor-pointer border border-blue-600 rounded px-2 py-1 w-full md:w-auto"
                onClick={() => onEdit(budget)}
              >
                Edit
              </button>
              <button
                className="text-red-600 hover:text-red-800 hover:bg-red-200 transition-colors duration-200 cursor-pointer border border-red-600 rounded px-2 py-1 w-full md:w-auto"
                onClick={() => onDelete(budget._id!)}
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BudgetList;
