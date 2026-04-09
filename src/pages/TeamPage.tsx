import { teamMembers } from '../data/mockData';

export function TeamPage() {
  return (
    <div>
      <header className="page-header">
        <h1>Team</h1>
        <p>Manage team members and view their task assignments</p>
      </header>

      <section className="team-grid">
        {teamMembers.map((member) => (
          <article key={member.email} className="team-card">
            <div className="team-head">
              <span className="avatar large">{member.initials}</span>
              <div>
                <h3>{member.name}</h3>
                <p>{member.title}</p>
              </div>
            </div>
            <p>✉ {member.email}</p>
            <p>☏ {member.phone}</p>
            <hr />
            <div className="team-stats">
              <div>
                <strong>{member.total}</strong>
                <span>Total</span>
              </div>
              <div>
                <strong>{member.active}</strong>
                <span>Active</span>
              </div>
              <div>
                <strong>{member.done}</strong>
                <span>Done</span>
              </div>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
}