class ReusableComponent extends HTMLElement {
  constructor() {
    super()

    // Create a shadow root
    this.shadow = this.attachShadow({ mode: 'open' })

    // Define default values for properties
    this.openingBalance = ''
    this.closingBalance = ''
    this.differenceBalance = ''
    this.businessUnits = []
    this.customers = []
    this.customerEvents = []
    this.showBusinessUnitsView = false
    this.showCustomersView = false
  }

  // Define observed attributes
  static get observedAttributes() {
    return [
      'opening-balance',
      'closing-balance',
      'difference-balance',
      'show-business-units-view',
      'show-customers-view'
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
          <div>
            ${this.showBusinessUnitsView ? this.renderBusinessUnits() : ''}
            ${this.showCustomersView ? this.renderCustomers() : ''}
            ${!this.showBusinessUnitsView && !this.showCustomersView ? this.renderCustomerEvents() : ''}
          </div>
        </div>
      `
  }

  renderBusinessUnits() {
    return this.businessUnits
      .map(
        (businessUnit) => `
        <div key="${businessUnit.name}">
          <business-unit 
            business-unit="${businessUnit.name}" 
            opening-balance="${businessUnit.openingBalance}" 
            closing-balance="${businessUnit.closingBalance}" 
            difference-balance="${businessUnit.differenceBalance}">
          </business-unit>
        </div>
      `
      )
      .join('')
  }

  renderCustomers() {
    return this.customers
      .map(
        (customer) => `
        <div key="${customer.name}">
          <business-unit 
            business-unit="${customer.name}" 
            opening-balance="${customer.openingBalance}" 
            closing-balance="${customer.closingBalance}" 
            difference-balance="${customer.differenceBalance}">
          </business-unit>
        </div>
      `
      )
      .join('')
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
customElements.define('reusable-component', ReusableComponent)
