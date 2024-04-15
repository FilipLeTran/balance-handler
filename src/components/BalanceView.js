class BalanceView extends HTMLElement {
  constructor() {
    super()

    // Create a shadow root
    this.shadow = this.attachShadow({ mode: 'open' })

    // Define default values for properties
    this.openingBalance = ''
    this.closingBalance = ''
    this.differenceBalance = ''
    this.customerEvents = []
  }

  // Define observed attributes
  static get observedAttributes() {
    return [
      'opening-balance',
      'closing-balance',
      'difference-balance'
    ]
  }

  // Handle attribute changes
  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this[name] = newValue
      this.render()
    }
  }

  connectedCallback() {
    this.render()
  }

  render() {
    this.shadow.innerHTML = `
        <div>
          <h3>Opening balance: ${this.openingBalance}</h3>
          <h3>Closing balance: ${this.closingBalance}</h3>
          <h3>Difference: ${this.differenceBalance}</h3>
        </div>
      `
  }

  renderCustomerEvents() {
    return this.customerEvents
      .map(
        (data) => `
        <div key="${data.id}" class="balance-events">
          <balance-item 
            event-id="${data.id}" 
            date="${data.time}" 
            customer-id="${data.customerId}" 
            balance-value="${data.value}" 
            event-type="${data.type}">
          </balance-item>
        </div>
      `
      )
      .join('')
  }
}

// Define the custom elements
customElements.define('balance-view', BalanceView)
