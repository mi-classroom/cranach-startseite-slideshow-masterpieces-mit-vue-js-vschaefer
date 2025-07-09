class MainFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <footer class="has-base-grid">

        <a class="logo" href="../index.html">
            <img src="../assets/images/cda-logo-ws.svg" alt="Cranach Digital Archive Logo">
        </a>

        <div class="footer-navigation">
            <div class="general">
                <h3>Allgemeines</h3>
                <ul>
                    <li><a href="/">Home</a></li>
                    <li>Impressum</li>
                    <li>Leitfaden</li>
                    <li>Nutzungsbedingungen</li>
                    <li>FAQ</li>
                </ul>
            </div>

            <div>
                <h3>Entdecken</h3>
                <ul>
                    <li><a href="/persons/biography-lucas-cranach.html">Lucas Cranach</a></li>
                    <li>Luther</li>
                    <li>Über uns</li>
                    <li>Aktuelles</li>
                    <li>Partner</li>
                    <li>Forschung</li>
                </ul>
            </div>

            <div>
                <h3>Kontakt</h3>
                <p>Haben Sie Fragen oder Anregungen?<br>
                    Kontaktieren Sie uns ganz einfach über folgenden Link:</p>
                <p>Zum Kontaktformular</p>
            </div>
        </div>

        <small class="copyright">Stiftung Museum Kunstpalast, Düsseldorf / Technische Hochschule Köln, 2025</small>
    </footer>
    `;
  }
}
customElements.define('main-footer', MainFooter);