import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '' })

  function handleSubmit(event) {
    event.preventDefault()
    register(form)
    navigate('/profile')
  }

  return (
    <section className="auth-layout">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Create account</p>
        <h1>Register</h1>
        <label>Name<input value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} required /></label>
        <label>Email<input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
        <label>Password<input type="password" minLength="6" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
        <button className="primary-btn full" type="submit">Register</button>
        <p>Already registered? <Link to="/login">Login</Link></p>
      </form>
    </section>
  )
}
