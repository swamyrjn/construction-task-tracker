export function SettingsPage() {
  return (
    <div>
      <header className="page-header">
        <h1>Settings</h1>
        <p>Manage your application preferences and configuration</p>
      </header>

      <section className="settings-stack">
        <article className="panel settings-panel">
          <h2>👤 Profile Settings</h2>
          <label>
            Full Name
            <input value="Administrator" readOnly />
          </label>
          <label>
            Email Address
            <input value="admin@trimble.com" readOnly />
          </label>
        </article>

        <article className="panel settings-panel">
          <h2>🔔 Notifications</h2>
          <div className="toggle-row">
            <div>
              <h3>Task Assignments</h3>
              <p>Get notified when tasks are assigned to you</p>
            </div>
            <input type="checkbox" checked readOnly />
          </div>
          <div className="toggle-row">
            <div>
              <h3>Due Date Reminders</h3>
              <p>Receive reminders before task due dates</p>
            </div>
            <input type="checkbox" checked readOnly />
          </div>
          <div className="toggle-row">
            <div>
              <h3>Status Updates</h3>
              <p>Get notified when task status changes</p>
            </div>
            <input type="checkbox" readOnly />
          </div>
        </article>

        <article className="panel settings-panel">
          <h2>🎨 Appearance</h2>
          <label>
            Theme
            <select defaultValue="Trimble Light">
              <option>Trimble Light</option>
              <option>Trimble Dark</option>
            </select>
          </label>
        </article>

        <article className="panel settings-panel">
          <h2>🔒 Security</h2>
          <button className="primary-button">Change Password</button>
        </article>
      </section>
    </div>
  );
}