import axios from 'axios'

const api = axios.create({
  baseURL: 'http://localhost:8080/api/students',
  headers: {
    'Content-Type': 'application/json',
  },
})

export const getStudents = () => api.get('/')
export const addStudent = (student) => api.post('/', student)
export const updateStudent = (id, student) => api.put(`/${id}`, student)
export const deleteStudent = (id) => api.delete(`/${id}`)