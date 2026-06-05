import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

export default function Settings() {
  const { theme, toggleTheme } = useTheme()
  const { user } = useAuth()

  return (
    <section className="settings-layout">
      <div className="page-hero compact">
        <div>
          <p className="eyebrow">Preferences</p>
          <h1>Settings</h1>
          <p>Control account display and theme preferences stored locally.</p>
        </div>
      </div>
      <div className="settings-panel">
        <div>
          <strong>Theme</strong>
          <small>Current mode: {theme}</small>
        </div>
        <button className="toggle-switch" type="button" onClick={toggleTheme} aria-pressed={theme === 'dark'}>
          <span />
        </button>
      </div>
      <div className="settings-panel">
        <div>
          <strong>Logged in user</strong>
          <small>{user?.email || 'Guest user'}</small>
        </div>
      </div>
    </section>
  )
}
