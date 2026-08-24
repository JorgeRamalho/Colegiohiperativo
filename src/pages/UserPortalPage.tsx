import { useEffect, useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { fetchMyMatriculas, type AdminMatriculaRecord } from '../services/enrollmentApi';
import { BRAND } from '../data/constants';
import './UserPortalPage.css';

export default function UserPortalPage() {
  const { token, user, isAdmin, signout } = useAuth();
  const [enrollments, setEnrollments] = useState<AdminMatriculaRecord[]>([]);

  useEffect(() => {
    async function loadEnrollments() {
      if (!token) return;
      try {
        const rows = await fetchMyMatriculas(token);
        setEnrollments(rows);
      } catch {
        setEnrollments([]);
      }
    }
    void loadEnrollments();
  }, [token]);

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  const latestEnrollment = enrollments[0] ?? null;

  return (
    <>
      <section className="portal-hero">
        <div className="container">
          <h1 className="portal-hero__title">Portal do Usuário</h1>
          <p className="portal-hero__subtitle">
            Bem-vindo(a) ao portal do {BRAND.shortName}. Aqui você acompanha sua jornada
            acadêmica e acessa os serviços da instituição.
          </p>
          <p className="portal-hero__subtitle" style={{ marginTop: '0.75rem' }}>
            Conta: <strong>{user?.full_name || user?.email}</strong>
          </p>

          {latestEnrollment && (
            <div className="portal-status">
              <div className="portal-status__item">
                <div className="portal-status__label">Protocolo</div>
                <div className="portal-status__value">{latestEnrollment.protocolo}</div>
              </div>
              <div className="portal-status__item">
                <div className="portal-status__label">Curso</div>
                <div className="portal-status__value">{latestEnrollment.course_name ?? '—'}</div>
              </div>
              <div className="portal-status__item">
                <div className="portal-status__label">Turno</div>
                <div className="portal-status__value">{latestEnrollment.shift ?? '—'}</div>
              </div>
            </div>
          )}

          <div className="portal-actions">
            <Link to="/matricula" className="btn btn--outline" style={{ color: 'white', borderColor: 'rgba(255,255,255,0.6)' }}>
              Nova matrícula
            </Link>
            {isAdmin && (
              <Link to="/admin/matriculas" className="btn btn--ghost" style={{ color: 'white' }}>
                Admin matrículas
              </Link>
            )}
            <button type="button" className="btn btn--ghost" style={{ color: 'white' }} onClick={signout}>
              Sair
            </button>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="portal-grid">
            <article className="portal-card">
              <div className="portal-card__emoji">📋</div>
              <h2 className="portal-card__title">Dados da matrícula</h2>
              <p className="portal-card__text">
                {latestEnrollment
                  ? `Sua solicitação ${latestEnrollment.protocolo} está registrada. Abra uma nova matrícula se precisar de outro curso.`
                  : 'Você ainda não tem uma matrícula vinculada a este e-mail. Inicie uma nova solicitação.'}
              </p>
              <Link to="/matricula" className="btn btn--primary btn--sm">
                {latestEnrollment ? 'Nova matrícula' : 'Fazer matrícula'}
              </Link>
            </article>

            <article className="portal-card">
              <div className="portal-card__emoji">🎓</div>
              <h2 className="portal-card__title">Cursos e modalidades</h2>
              <p className="portal-card__text">
                Conheça os níveis de ensino, cursos técnicos, graduação e pós-graduação do Hiperativo.
              </p>
              <Link to="/cursos" className="btn btn--outline btn--sm">Ver cursos</Link>
            </article>

            <article className="portal-card">
              <div className="portal-card__emoji">💬</div>
              <h2 className="portal-card__title">Fale conosco</h2>
              <p className="portal-card__text">
                Precisa de ajuda? Entre em contato com a secretaria ou envie uma mensagem pelo formulário.
              </p>
              <Link to="/contato" className="btn btn--outline btn--sm">Contato</Link>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
