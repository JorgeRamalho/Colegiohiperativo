import { useState, FormEvent, ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import { BRAND } from '../../data/constants';
import { formatPhone, validateEmail } from '../../utils/validation';
import { submitContato } from '../../services/enrollmentApi';
import './FooterLeadForm.css';

const INITIAL = {
  name: '',
  phone: '',
  email: '',
  acceptPrivacy: false,
};

export default function FooterLeadForm() {
  const [form, setForm] = useState(INITIAL);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  }

  function handlePhoneChange(e: ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, phone: formatPhone(e.target.value) }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const newErrors: Record<string, string> = {};
    if (!form.name.trim()) newErrors.name = 'Nome é obrigatório';
    if (!form.phone.trim()) newErrors.phone = 'Telefone é obrigatório';
    if (!form.email.trim() || !validateEmail(form.email)) {
      newErrors.email = 'Informe um e-mail válido';
    }
    if (!form.acceptPrivacy) {
      newErrors.acceptPrivacy = 'Você deve aceitar a política de privacidade';
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setLoading(true);
    setSubmitError('');

    submitContato({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: 'interesse-site',
      message: 'Solicitação de contato enviada pelo formulário acima do rodapé do site.',
    })
      .then(() => {
        setSent(true);
        setForm(INITIAL);
      })
      .catch((error: Error) => {
        setSubmitError(error.message || 'Não foi possível enviar. Tente novamente.');
      })
      .finally(() => setLoading(false));
  }

  return (
    <section className="footer-lead" aria-labelledby="footer-lead-title">
      <div className="container footer-lead__container">
        <header className="footer-lead__header">
          <p className="footer-lead__eyebrow">Atendimento personalizado</p>
          <h2 id="footer-lead-title" className="footer-lead__title">
            Fale com a {BRAND.shortName}
          </h2>
          <p className="footer-lead__text">
            Deixe seus dados e retornamos em até um dia útil.
          </p>
        </header>

        <div className="footer-lead__form-wrap">
          {sent ? (
            <div className="alert alert--success footer-lead__success">
              <strong>Solicitação recebida.</strong> Retornaremos pelo e-mail ou telefone informado.
            </div>
          ) : (
            <form className="footer-lead__form" onSubmit={handleSubmit} noValidate>
              <h3 className="footer-lead__form-title">Seus dados de contato</h3>

              {submitError && <div className="alert alert--error">{submitError}</div>}

              <div className="footer-lead__fields">
                <div className={`footer-lead__block${errors.name ? ' footer-lead__block--error' : ''}`}>
                  <label className="form-label form-label--required" htmlFor="footer-lead-name">
                    Nome completo
                  </label>
                  <input
                    id="footer-lead-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="Ex.: Maria Silva Santos"
                    className={`form-input ${errors.name ? 'form-input--error' : ''}`}
                    value={form.name}
                    onChange={handleChange}
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className={`footer-lead__block${errors.phone ? ' footer-lead__block--error' : ''}`}>
                  <label className="form-label form-label--required" htmlFor="footer-lead-phone">
                    Telefone / WhatsApp
                  </label>
                  <input
                    id="footer-lead-phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    inputMode="tel"
                    placeholder="(00) 00000-0000"
                    className={`form-input ${errors.phone ? 'form-input--error' : ''}`}
                    value={form.phone}
                    onChange={handlePhoneChange}
                  />
                  {errors.phone && <span className="form-error">{errors.phone}</span>}
                </div>

                <div className={`footer-lead__block${errors.email ? ' footer-lead__block--error' : ''}`}>
                  <label className="form-label form-label--required" htmlFor="footer-lead-email">
                    E-mail
                  </label>
                  <input
                    id="footer-lead-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    placeholder="seu.email@exemplo.com"
                    className={`form-input ${errors.email ? 'form-input--error' : ''}`}
                    value={form.email}
                    onChange={handleChange}
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div
                  className={`footer-lead__block footer-lead__block--consent${errors.acceptPrivacy ? ' footer-lead__block--error' : ''}`}
                >
                  <div className="footer-lead__privacy">
                    <input
                      type="checkbox"
                      id="footer-lead-privacy"
                      name="acceptPrivacy"
                      checked={form.acceptPrivacy}
                      onChange={handleChange}
                    />
                    <label className="footer-lead__privacy-label" htmlFor="footer-lead-privacy">
                      Li e concordo com a{' '}
                      <Link to="/politica-privacidade" target="_blank" rel="noopener noreferrer">
                        Política de Privacidade
                      </Link>
                      .
                    </label>
                  </div>
                  {errors.acceptPrivacy && <span className="form-error">{errors.acceptPrivacy}</span>}
                </div>
              </div>

              <button type="submit" className="btn btn--primary footer-lead__submit" disabled={loading}>
                {loading ? 'Enviando...' : 'Enviar solicitação'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
