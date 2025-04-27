
import { Budget } from "@/types/Budgets";

interface BudgetListProps {
    budgets: Budget[];
    onEdit: (budget: Budget) => void;
    onDelete: (id: string) => void;
}

const BudgetList: React.FC<BudgetListProps> = ({ budgets, onEdit, onDelete }) => {
    return (
        <div className="bg-white p-5 rounded-lg shadow-md max-w-3xl text-center mx-10 max-h-[90vh] overflow-scroll overflow-x-hidden my-4">
            <h2 className="text-xl font-semibold mb-5 text-blue-600 text-center">Budgets</h2>
            <ul className="space-y-4">
                {budgets.map((budget) => (
                    <li key={budget._id} className="flex justify-between items-center border border-gray-300 p-4 rounded-lg hover:shadow-md transition duration-300 ease-in-out transform hover:scale-103">
                        <div>
                            <div className="font-semibold text-sm text-gray-500">{budget.category}</div>
                            <div className="text-sm text-blue-500">${budget.amount}</div>
                            <div>{budget.month}</div>
                        </div>
                        <div className="flex space-x-2">
                            <button className="text-blue-600 hover:text-blue-800 hover:bg-blue-200 transition-colors duration-200 cursor-pointer border border-blue-600 rounded px-2 py-1" onClick={() => onEdit(budget)}>Edit</button>
                            <button className="text-red-600 hover:text-red-800 hover:bg-red-200 transition-colors duration-200 cursor-pointer border border-red-600 rounded px-2 py-1" onClick={() => onDelete(budget._id!)}>Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BudgetList;
