// cashfree.js - A utility to handle the Cashfree checkout flow
export const cashfree = {
    checkout: function ({ paymentSessionId, redirectTarget }) {
      if (window.Cashfree) {
        window.Cashfree.checkout({
          paymentSessionId,
          redirectTarget, // '_self' means redirect in the same window
        });
      } else {
        console.error("Cashfree checkout SDK is not loaded.");
      }
    },
  };
  