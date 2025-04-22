let cartItems = [];
        let cartCount = 0;
        let isCartVisible = false;

        function addToCart(name, price, quantityId) {
            const quantity = parseInt(document.getElementById(quantityId).value);
            const item = {
                name: name,
                price: price,
                quantity: quantity
            };

            cartItems.push(item);
            cartCount += quantity;
            updateCartDisplay();

            // Show success message
            alert(`Added ${quantity} ${name} to cart!`);

            // Debug - log cart items to console
            console.log('Cart Items:', cartItems);
            console.log('Cart Count:', cartCount);

            // Show the cart dropdown after adding an item
            if (!isCartVisible) {
                toggleCart();
            }
        }

        function updateCartDisplay() {
            // Update cart count
            document.getElementById('cartCount').textContent = cartCount;

            // Update cart items display
            const cartItemsContainer = document.getElementById('cartItems');
            // Make sure the container exists
            if (!cartItemsContainer) {
                console.error('Cart items container not found!');
                return;
            }

            cartItemsContainer.innerHTML = '';

            if (cartItems.length === 0) {
                cartItemsContainer.innerHTML = `
                    <div class="empty-cart-message">
                        Your cart is empty
                    </div>
                `;
            } else {
                // Debug - log that we're adding items to the cart display
                console.log('Adding', cartItems.length, 'items to cart display');

                cartItems.forEach((item, index) => {
                    const itemTotal = (item.price * item.quantity).toFixed(2);
                    cartItemsContainer.innerHTML += `
                        <div class="cart-item">
                            <div class="d-flex justify-content-between">
                                <div>
                                    <div class="fw-bold">${item.name}</div>
                                    <div>Qty: ${item.quantity}</div>
                                    <div>$${item.price} each</div>
                                </div>
                                <div>
                                    <div class="text-end">$${itemTotal}</div>
                                    <button class="btn btn-sm btn-danger mt-2" onclick="removeItem(${index})">
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    `;
                });
            }

            // Update total
            const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            document.getElementById('cartTotal').textContent = `Total: $${total.toFixed(2)}`;

            // Debug - log the current state after updating
            console.log('Cart display updated. Items:', cartItems.length, 'Total:', total.toFixed(2));
        }

        function toggleCart() {
            const dropdown = document.getElementById('cartDropdown');
            isCartVisible = !isCartVisible;
            if (isCartVisible) {
                dropdown.classList.add('show');
            } else {
                dropdown.classList.remove('show');
            }
            // Ensure the cart is updated when opened
            if (isCartVisible) {
                updateCartDisplay();
            }
        }

        function removeItem(index) {
            cartCount -= cartItems[index].quantity;
            cartItems.splice(index, 1);
            updateCartDisplay();
        }

        function checkout() {
            if (cartItems.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            // Implement checkout logic here
            alert('Proceeding to checkout...');
        }

        function changeQuantity(quantityId, change) {
            const quantityInput = document.getElementById(quantityId);
            let quantity = parseInt(quantityInput.value);
            quantity = Math.max(1, quantity + change); // Ensure quantity never goes below 1
            quantityInput.value = quantity;
        }

        // Close cart when clicking outside
        document.addEventListener('click', function(event) {
            const cartContainer = document.querySelector('.cart-icon-container');
            const cartDropdown = document.getElementById('cartDropdown');

            // Only close if cart is visible and click is outside both the cart icon and dropdown
            if (isCartVisible &&
                !cartContainer.contains(event.target) &&
                !cartDropdown.contains(event.target)) {
                toggleCart();
            }
        });

        // Initialize cart display when page loads
        document.addEventListener('DOMContentLoaded', function() {
            updateCartDisplay();
        });