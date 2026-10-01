import { Link } from 'react-router-dom';
import { BRAND } from '../data/constants';
import './PrivacyPolicyPage.css';

export default function PrivacyPolicyPage() {
  return (
    <section className="section">
      <div className="container">
        <div className="privacy__content">
          <h1 className="privacy__title">Política de Privacidade</h1>
          <p className="privacy__updated">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <div className="privacy__section">
            <h2>1. Introdução</h2>
            <p>
              A {BRAND.name} está comprometida em proteger a privacidade dos nossos
              alunos, responsáveis e visitantes. Esta Política de Privacidade descreve
              como coletamos, usamos, armazenamos e protegemos os dados pessoais fornecidos
              através do nosso site e formulários de matrícula, de acordo com a
              <strong> Lei Geral de Proteção de Dados Pessoais (LGPD)</strong>.
            </p>
          </div>

          <div className="privacy__section">
            <h2>2. Dados Coletados</h2>
            <p>Pode coletar os seguintes dados pessoais:</p>
            <ul>
              <li>Nome completo</li>
              <li>Endereço de e-mail</li>
              <li>Número de telefone</li>
              <li>CPF e RG</li>
              <li>Data de nascimento</li>
              <li>Endereço completo (CEP, rua, número, bairro, cidade, estado)</li>
              <li>Informações médicas e de saúde</li>
              <li>Dados acadêmicos e sociais</li>
            </ul>
          </div>

          <div className="privacy__section">
            <h2>3. Finalidade do Tratamento</h2>
            <p>Os dados são coletados e tratados para:</p>
            <ul>
              <li>Realizar o processo de matrícula e admissão estudantil</li>
              <li>Comunicar-se com o aluno e responsáveis</li>
              <li>Cumprir obrigações legais e regulamentares</li>
              <li>Enviar informações institucionais (com consentimento opcional)</li>
            </ul>
          </div>

          <div className="privacy__section">
            <h2>4. Base Legal</h2>
            <p>
              O tratamento de dados pessoais é realizado com base nos seguintes fundamentos:
              <strong> consentimento</strong> (para comunicações marketing),{' '}
              <strong>execução de contrato</strong> (para matrícula),{' '}
              <strong>obrigação legal</strong> e{' '}
              <strong>legítimo interesse</strong>.
            </p>
          </div>

          <div className="privacy__section">
            <h2>5. Retenção dos Dados</h2>
            <p>
              Os dados pessoais são mantidos pelo tempo necessário para cumprir as
              finalidades descritas nesta política, salvo obrigações legais de retenção
              prolongada.
            </p>
          </div>

          <div className="privacy__section">
            <h2>6. Direitos do Titular</h2>
            <p>
              Você tem direito de acessar, corrigir, excluir, portar e anonimizar seus
              dados. Para exercer seus direitos, entre em contato pelo e-mail{' '}
              <a href={`mailto:${BRAND.contact.email}`}>{BRAND.contact.email}</a>.
            </p>
          </div>

          <div className="privacy__section">
            <h2>7. Compartilhamento</h2>
            <p>
              Os dados podem ser compartilhados com parceiros necessários para a
              execução do contrato de matrícula, sempre sob compromisso de confidencialidade.
            </p>
          </div>

          <div className="privacy__section privacy__section--full">
            <h2>8. Contato</h2>
            <p>
              Em caso de dúvidas sobre esta política, entre em contato:
            </p>
            <ul>
              <li>E-mail: {BRAND.contact.email}</li>
              <li>Telefone: {BRAND.contact.phone}</li>
              <li>WhatsApp: {BRAND.contact.whatsapp}</li>
              <li>Endereço: {BRAND.contact.address}</li>
            </ul>
            <div style={{ marginTop: '1.5rem' }}>
              <Link to="/matricula" className="btn btn--primary">Voltar para Matrícula</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
