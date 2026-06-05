import { Outlet } from 'react-router-dom'
import CardNav from './CardNav'

export default function Layout() {
  return (
    <div className="app-shell">
      <CardNav />
      <main className="page-transition">
        <Outlet />
      </main>
    </div>
  )
}
