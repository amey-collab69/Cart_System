import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()
  const [form, setForm] = useState({ username: 'mor_2314', password: '83r5^_' })
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(event) {
    event.preventDefault()
    setSubmitting(true)
    await login(form)
    setSubmitting(false)
    navigate(location.state?.from || '/profile')
  }

  return (
    <section className="auth-layout">
      <form className="auth-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Welcome back</p>
        <h1>Login</h1>
        <label>Username<input value={form.username} onChange={(event) => setForm({ ...form, username: event.target.value })} required /></label>
        <label>Password<input type="password" value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} required /></label>
        <button className="primary-btn full" type="submit" disabled={submitting}>{submitting ? 'Signing in...' : 'Login'}</button>
        <p>New customer? <Link to="/register">Create an account</Link></p>
      </form>
    </section>
  )
}
