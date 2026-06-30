import {footerLinks} from "../constants/index.js";

const Footer = () => {
    return (
        <footer>
            <div className="info">
                <p>Mais formas de comprar: Encontre uma Apple Store ou outro revendedor perto de você. Ou ligue para (35) 99201-1313.</p>
                <img src="/logo.svg" alt="Logo Apple"/>
            </div>

            <hr />

            <div className="links">
                <p>Copyright © 2026 Apple Inc. Todos os direitos reservados.</p>

                <ul>
                    {footerLinks.map(({label, link }) => (
                        <li key={label}>
                            <a href={link}>{label}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </footer>
    )
}
export default Footer