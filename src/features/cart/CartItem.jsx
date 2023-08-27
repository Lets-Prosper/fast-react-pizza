import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import UpdateItemQuantity from "./UpdateItemQuantity";
import DeleteItem from "./deleteItem";

function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item;

  return (
    <li className=" py-3 sm:flex sm:items-center sm:justify-between ">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between text-sm font-bold sm:gap-6">
        <p>{formatCurrency(totalPrice)}</p>
        <UpdateItemQuantity pizzaId={pizzaId} />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  );
}

export default CartItem;
