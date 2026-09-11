import { useState, useEffect, useMemo } from 'react'
import axios from 'axios'
import Navbar from './components/Navbar'
import SummaryCard from './components/SummaryCard'
import ExpenseForm from './components/ExpenseForm'
import ExpenseList from './components/ExpenseList'
import FilterBar from './components/FilterBar'
import ExpenseChart from './components/ExpenseChart'
import Galaxy from './components/Galaxy'

const API_URL = 'http://127.0.0.1:5000/api/expenses'

function App() {
  const [theme, setTheme] = useState('light')
  const [expenses, setExpenses] = useState([])
  const [filterText, setFilterText] = useState('')
  const [filterCategory, setFilterCategory] = useState('All')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Theme setup
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      setTheme('dark')
      document.documentElement.classList.add('dark')
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
    }

    fetchExpenses()
  }, [])

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark')
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      setTheme('light')
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  const fetchExpenses = async () => {
    try {
      setLoading(true)
      const response = await axios.get(API_URL)
      setExpenses(response.data)
      setError(null)
    } catch (err) {
      console.error('Failed to fetch expenses:', err)
      setError('Could not connect to the backend server. Make sure Flask is running.')
    } finally {
      setLoading(false)
    }
  }

  const handleAddExpense = async (expenseData) => {
    try {
      const response = await axios.post(API_URL, expenseData)
      // To ensure sorting, we insert at the beginning visually 
      // though backend sorts it on GET.
      setExpenses([response.data, ...expenses])
    } catch (err) {
      console.error('Failed to add expense:', err)
      alert('Failed to add expense. Check console for details.')
    }
  }

  const handleDeleteExpense = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`)
      setExpenses(expenses.filter(e => e.id !== id))
    } catch (err) {
      console.error('Failed to delete expense:', err)
      alert('Failed to delete expense.')
    }
  }

  const filteredExpenses = useMemo(() => {
    return expenses.filter(expense => {
      const matchTitle = expense.title.toLowerCase().includes(filterText.toLowerCase())
      const matchCategory = filterCategory === 'All' || expense.category === filterCategory
      return matchTitle && matchCategory
    })
  }, [expenses, filterText, filterCategory])

  return (
    <>
      <div className="fixed top-0 left-0 w-full h-full -z-10 bg-[#0a0a0a]">
        <Galaxy 
          mouseRepulsion
          mouseInteraction
          density={1}
          glowIntensity={0.3}
          saturation={0}
          hueShift={140}
          twinkleIntensity={0.3}
          rotationSpeed={0.1}
          repulsionStrength={2}
          autoCenterRepulsion={0}
          starSpeed={0.5}
          speed={1}
        />
      </div>
      <div className="min-h-screen text-gray-800 dark:text-gray-100 flex flex-col p-4 md:p-8 font-sans transition-colors duration-300">
        <div className="max-w-6xl w-full mx-auto">
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        
        {error && (
          <div className="bg-red-100/80 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded glass-card">
            <p className="font-bold">Connection Target Missing</p>
            <p>{error}</p>
          </div>
        )}

        <SummaryCard expenses={expenses} />
        <ExpenseChart expenses={expenses} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ExpenseForm onAddExpense={handleAddExpense} />
          </div>
          <div className="lg:col-span-2">
            <FilterBar 
              filterText={filterText} 
              filterCategory={filterCategory} 
              onFilterTextChange={setFilterText}
              onFilterCategoryChange={setFilterCategory}
            />
            {loading ? (
              <div className="glass-card p-8 text-center opacity-70">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
                <p>Loading expenses...</p>
              </div>
            ) : (
              <ExpenseList expenses={filteredExpenses} onDeleteExpense={handleDeleteExpense} />
            )}
          </div>
        </div>
      </div>
    </div>
    </>
  )
}

export default App
