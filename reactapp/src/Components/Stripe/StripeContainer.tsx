import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import CheckoutForm from "./CheckoutForm"
import "./CheckoutForm.styles.css";

const PUBLIC_KEY = "pk_test_51IbjhSEifScnyKE579vUUWmbSL20LRIN7X13Nj03ndOsmQCCXtTGPg1pAs5LC5KDhxdkuWwRFePrT2PdYLfnKOL200dhh0nXdu"

const stripeTestPromise = loadStripe(PUBLIC_KEY)

type Props = {
	amount: number,
	removeAllFromCart: () => void
}

const StripeContainer: React.FC<Props> = ({ amount, removeAllFromCart}) => {
	return (
		<Elements stripe={stripeTestPromise}>
            <CheckoutForm amount={amount} removeAllFromCart={removeAllFromCart}/>
		</Elements>
	)
}

export default StripeContainer;
