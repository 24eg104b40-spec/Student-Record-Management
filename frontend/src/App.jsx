import { useEffect, useState } from 'react'
import {
  addStudent,
  deleteStudent,
  getStudents,
  updateStudent,
} from './services/studentService'

const emptyStudent = {
  rollNumber: '',
  name: '',
  branch: '',
  email: '',
}

function App() {
  const [students, setStudents] = useState([])
  const [formData, setFormData] = useState(emptyStudent)
  const [editingId, setEditingId] = useState(null)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadStudents()
  }, [])

  async function loadStudents() {
    try {
      const response = await getStudents()
      setStudents(response.data)
    } catch (error) {
      showError(error)
    } finally {
      setLoading(false)
    }
  }

  function showError(error) {
    const serverMessage = error.response?.data?.message
    setMessage({
      type: 'error',
      text: serverMessage || 'Unable to complete the request. Please try again.',
    })
  }

  function handleChange(event) {
    const { name, value } = event.target
    setFormData((current) => ({ ...current, [name]: value }))
  }

  function resetForm() {
    setFormData(emptyStudent)
    setEditingId(null)
  }

  async function handleSubmit(event) {
    event.preventDefault()
    setMessage({ type: '', text: '' })

    try {
      if (editingId) {
        await updateStudent(editingId, formData)
        setMessage({ type: 'success', text: 'Student updated successfully.' })
      } else {
        await addStudent(formData)
        setMessage({ type: 'success', text: 'Student added successfully.' })
      }
      resetForm()
      await loadStudents()
    } catch (error) {
      showError(error)
    }
  }

  function handleEdit(student) {
    setFormData({
      rollNumber: student.rollNumber,
      name: student.name,
      branch: student.branch || '',
      email: student.email,
    })
    setEditingId(student.id)
    setMessage({ type: '', text: '' })
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this student?')) {
      return
    }

    try {
      await deleteStudent(id)
      setMessage({ type: 'success', text: 'Student deleted successfully.' })
      if (editingId === id) {
        resetForm()
      }
      await loadStudents()
    } catch (error) {
      showError(error)
    }
  }

  return (
    <main className="page">
      <div className="container">
        <header className="page-header">
          <h1>Student Record Management</h1>
          <p>Manage Student Details</p>
        </header>

        <section className="form-section" aria-labelledby="form-title">
          <h2 id="form-title">{editingId ? 'Edit Student' : 'Add Student'}</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <label>
                Roll Number
                <input
                  name="rollNumber"
                  value={formData.rollNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter roll number"
                />
              </label>
              <label>
                Name
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Enter student name"
                />
              </label>
              <label>
                Branch
                <input
                  name="branch"
                  value={formData.branch}
                  onChange={handleChange}
                  placeholder="Enter branch"
                />
              </label>
              <label>
                Email
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="student@example.com"
                />
              </label>
            </div>
            <div className="form-actions">
              <button type="submit" className="primary-button">
                {editingId ? 'Update Student' : 'Add Student'}
              </button>
              {editingId && (
                <button type="button" className="secondary-button" onClick={resetForm}>
                  Cancel
                </button>
              )}
            </div>
          </form>
        </section>

        {message.text && (
          <p className={`message ${message.type}`} role="alert">
            {message.text}
          </p>
        )}

        <section aria-labelledby="records-title">
          <h2 id="records-title">Student Records</h2>
          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Roll Number</th>
                  <th>Name</th>
                  <th>Branch</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr><td colSpan="5" className="empty-state">Loading students...</td></tr>
                ) : students.length === 0 ? (
                  <tr><td colSpan="5" className="empty-state">No student records found.</td></tr>
                ) : (
                  students.map((student) => (
                    <tr key={student.id}>
                      <td>{student.rollNumber}</td>
                      <td>{student.name}</td>
                      <td>{student.branch || '-'}</td>
                      <td>{student.email}</td>
                      <td className="actions">
                        <button className="edit-button" onClick={() => handleEdit(student)}>Edit</button>
                        <button className="delete-button" onClick={() => handleDelete(student.id)}>Delete</button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>
      </div>
    </main>
  )
}

export default App