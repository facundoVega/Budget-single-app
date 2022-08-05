import Container from 'react-bootstrap/Container'
import { Stack, Button } from 'react-bootstrap'
import BudgetCard from './Components/BudgetCard';
import AddBudgetModal from './Components/AddBudgetModel';
import { useState } from 'react';
import { UNCATEGORIZED_BUDGET_ID, useBudgets } from './Contexts/BudgetsContext';
import AddExpenseModal from './Components/AddExpenseModal';
import UncategorizedBudgetCard from './Components/UncategorizedBudgetCard';
import TotalBudgetCard from './Components/TotalBudgetCard';
import ViewExpensesModal from './Components/ViewExpensesModal'

function App() {
    const [showAddBudgetModal, setShowBudgetModal] = useState(false)
    const [showAddExpenseModal, setShowAddExpenseModal ] = useState(false)
    const [addExpenseModalBudgetId, setAddExpenseModalBudgetId ] = useState()
    const { budgets, getBudgetExpenses } = useBudgets();
    const [viewExpensesModelBudgetId, setViewExpensesModelBudgetId] = useState()

    function openAddExpenseModal(budgetId){
        setShowAddExpenseModal(true)
        setAddExpenseModalBudgetId(budgetId)
    }

    return (
        <>
            <Container className="my-4">
                <Stack direction="horizontal" gap="2" className="mb-4">
                    <h1 className="me-auto">Budgets</h1>
                    <Button onClick={()=> setShowBudgetModal(true)} variant="primary">Add Budget</Button>
                    <Button onClick={openAddExpenseModal} variant="outline-primary">Add Expense</Button>
                </Stack>
                <div
                style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                    gap:'1rem',
                    alignItems: 'flex-start'
                }}>
                    {
                        budgets.map(budget =>{
                            const amount = getBudgetExpenses(budget.id).reduce(
                                (total, expense) => total + expense.amount,
                                0
                            )

                            return <BudgetCard 
                                key={budget.id}
                                name={budget.name}
                                amount={amount}  
                                max={budget.max} 
                                onAddExpenseClik={() => openAddExpenseModal(budget.id)} 
                                onViewExpenseClick={() => setViewExpensesModelBudgetId(budget.id)} />
                        })
                    }
                    <UncategorizedBudgetCard 
                        onAddExpenseClik={openAddExpenseModal}
                        onViewExpenseClick={() => setViewExpensesModelBudgetId(UNCATEGORIZED_BUDGET_ID)}
                    />
                    <TotalBudgetCard />
                </div>
            </Container>
            <AddBudgetModal show={showAddBudgetModal} handleClose={()=> setShowBudgetModal(false)} />
            <AddExpenseModal 
                show={showAddExpenseModal}
                handleClose={()=> setShowAddExpenseModal(false)} 
                defaultBudgetId={addExpenseModalBudgetId} />   
            <ViewExpensesModal 
                budgetId={viewExpensesModelBudgetId}
                handleClose={()=> setViewExpensesModelBudgetId()} 
            />    
        </>
    );
}

export default App;