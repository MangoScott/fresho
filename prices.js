// Replaces the static fallback prices with current ones from Stripe.
fetch('https://functions.fresho.workers.dev/fresho/prices')
    .then((res) => res.json())
    .then(({ prices }) => {
        document.querySelectorAll('[data-price]').forEach((el) => {
            const price = prices?.[el.dataset.price];
            if (price?.amount == null) return;
            const value = price.amount / 100;
            el.textContent = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: price.currency,
                minimumFractionDigits: Number.isInteger(value) ? 0 : 2,
            }).format(value);
        });
    })
    .catch((error) => console.error('Failed to load prices', error));
