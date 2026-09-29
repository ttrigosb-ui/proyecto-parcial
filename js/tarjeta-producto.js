/**
 * Web Component nativo: <tarjeta-producto>
 *
 * Atributos:
 * - imagen
 * - titulo
 * - descripcion
 * - precio
 *
 * Evento:
 * - agregar-al-carrito
 */

class TarjetaProducto extends HTMLElement {
  static get observedAttributes() {
    return ["imagen", "titulo", "descripcion", "precio"];
  }

  constructor() {
    super();

    this.attachShadow({ mode: "open" });

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          height: 100%;
        }

        .tarjeta {
          background: #ffffff;
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
          display: flex;
          flex-direction: column;
          height: 100%;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
          font-family: Arial, Helvetica, sans-serif;
        }

        .tarjeta:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 24px rgba(0, 0, 0, 0.16);
        }

        img {
          width: 100%;
          height: 200px;
          object-fit: cover;
          display: block;
          background: #e5e7eb;
        }

        .contenido {
          padding: 1rem;
          display: flex;
          flex-direction: column;
          gap: 0.6rem;
          flex: 1;
        }

        h2 {
          font-size: 1.15rem;
          color: #111827;
        }

        .descripcion {
          font-size: 0.95rem;
          color: #4b5563;
          line-height: 1.45;
          flex: 1;
        }

        .precio {
          font-size: 1.3rem;
          font-weight: bold;
          color: #047857;
        }

        button {
          background: #1d4ed8;
          color: #ffffff;
          border: none;
          border-radius: 8px;
          padding: 0.75rem 1rem;
          font-size: 1rem;
          cursor: pointer;
          transition: background 0.2s ease, transform 0.1s ease;
        }

        button:hover {
          background: #1e40af;
        }

        button:active {
          transform: scale(0.98);
        }

        button:focus-visible {
          outline: 3px solid #93c5fd;
          outline-offset: 2px;
        }

        @media (max-width: 480px) {
          img {
            height: 160px;
          }
        }
      </style>

      <article class="tarjeta">
        <img alt="">
        <div class="contenido">
          <h2></h2>
          <p class="descripcion"></p>
          <span class="precio"></span>
          <button type="button">Agregar al carrito</button>
        </div>
      </article>
    `;

    this._img = this.shadowRoot.querySelector("img");
    this._titulo = this.shadowRoot.querySelector("h2");
    this._desc = this.shadowRoot.querySelector(".descripcion");
    this._precio = this.shadowRoot.querySelector(".precio");
    this._boton = this.shadowRoot.querySelector("button");

    this._boton.addEventListener("click", () => {
      const titulo = this.getAttribute("titulo") || "";
      const precio = Number(this.getAttribute("precio")) || 0;

      this.dispatchEvent(
        new CustomEvent("agregar-al-carrito", {
          detail: { titulo, precio },
          bubbles: true,
          composed: true
        })
      );
    });
  }

  connectedCallback() {
    this._actualizar();
  }

  attributeChangedCallback() {
    if (this._img) {
      this._actualizar();
    }
  }

  _formatearPrecio(valor) {
    const numero = Number(valor);

    if (Number.isNaN(numero)) {
      return valor || "";
    }

    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      maximumFractionDigits: 0
    }).format(numero);
  }

  _actualizar() {
    const titulo = this.getAttribute("titulo") || "Sin título";

    this._img.src = this.getAttribute("imagen") || "";
    this._img.alt = titulo;
    this._titulo.textContent = titulo;
    this._desc.textContent = this.getAttribute("descripcion") || "";
    this._precio.textContent = this._formatearPrecio(
      this.getAttribute("precio")
    );
  }
}

customElements.define("tarjeta-producto", TarjetaProducto);
