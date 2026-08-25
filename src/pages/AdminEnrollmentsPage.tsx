import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchAdminMatriculas, type AdminMatriculaRecord } from '../services/enrollmentApi';
import { ApiRequestError } from '../services/api';
import './EnrollmentPage.css';
import './UserPortalPage.css';

export default function AdminEnrollmentsPage() {
  const { token, isAdmin } = useAuth();
  const [enrollments, setEnrollments] = useState<AdminMatriculaRecord[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      if (!token || !isAdmin) return;
      try {
        const rows = await fetchAdminMatriculas(token);
        setEnrollments(rows);
        setError('');
      } catch (err) {
        setError(err instanceof ApiRequestError ? err.message : 'Erro ao carregar matrículas.');
      }
    }
    void load();
  }, [token, isAdmin]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return (
      <section className="enrollment">
        <div className="container">
          <p className="form-error">Acesso restrito à secretaria ou administração.</p>
          <Link to="/portal" className="btn btn--primary">Voltar ao portal</Link>
        </div>
      </section>
    );
  }

  return (
    <section className="enrollment">
      <div className="container">
        <div className="enrollment__header">
          <h1 className="enrollment__title">Matrículas — Admin</h1>
          <p className="enrollment__subtitle">Solicitações registradas no banco de dados.</p>
          <p>
            <Link to="/portal">← Voltar ao portal</Link>
          </p>
        </div>

        {error && <p className="form-error">{error}</p>}

        <div className="enrollment__form">
          {enrollments.length === 0 ? (
            <p>Nenhuma matrícula encontrada.</p>
          ) : (
            <table className="admin-table">
              <thead>
                <tr>
                  <th align="left">Protocolo</th>
                  <th align="left">Aluno</th>
                  <th align="left">Curso</th>
                  <th align="left">Turno</th>
                </tr>
              </thead>
              <tbody>
                {enrollments.map((row) => (
                  <tr key={row.id}>
                    <td>{row.protocolo}</td>
                    <td>{row.full_name}<br /><small>{row.email}</small></td>
                    <td>{row.course_name ?? '—'}</td>
                    <td>{row.shift ?? '—'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </section>
  );
}
