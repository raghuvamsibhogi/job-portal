
import paypal from "@paypal/checkout-server-sdk";


const environment = new paypal.core.SandboxEnvironment(
  'Ac8OpdOAlp6hd-ZwdLRiR13Cox1jREPb0UGtLNZIy2NjFTOqa06M7RVr2mdUeV_tXj_HwFUls8tbKU68',
  'EPJFCWLt5OprOejPIrjcWkajtgnmO8iXGqX3ftq4MTI_mf7YY5JOWOmF8Q3cB7WYekJyBJ504jZTkn4u'
);

const client = new paypal.core.PayPalHttpClient(environment);

export default client;
// import paypal from "@paypal/paypal-server-sdk";

// const environment = new paypal.core.SandboxEnvironment(
//   "Ac8OpdOAlp6hd-ZwdLRiR13Cox1jREPb0UGtLNZIy2NjFTOqa06M7RVr2mdUeV_tXj_HwFUls8tbKU68",
//   "EPJFCWLt5OprOejPIrjcWkajtgnmO8iXGqX3ftq4MTI_mf7YY5JOWOmF8Q3cB7WYekJyBJ504jZTkn4u"
// );

// const client = new paypal.core.PayPalHttpClient(environment);

// export default client;

