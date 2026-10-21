import { footerLinks } from "../constants";

const SUPPORT_PHONE = "(35) 99201-1313"
const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer>
      <div className="info">
        <p>
          Mais formas de comprar:{" "}
          <span>encontre uma Apple Store ou outro revendedor</span> perto de
          você. Ou ligue para {SUPPORT_PHONE}.
        </p>
        <img src="/logo.svg" alt="Logo da Apple" width="14" height="18" />
      </div>

      <hr />

      <div className="links">
        <p>Copyright © {year} Apple Inc. Todos os direitos reservados.</p>

        <nav aria-label="Links do rodapé">
          <ul>
            {footerLinks.map(({ label, link }) => (
              <li key={label}>
                <a href={link}>{label}</a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;